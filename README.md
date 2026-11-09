# SysGE - Sistema de Gestión Educativa

SysGE es una plataforma integral para la gestión de alumnos, cursos y matrículas, construida bajo una **Arquitectura de Microservicios** robusta, escalable y resiliente.

## Arquitectura del Sistema

El sistema se compone de los siguientes módulos:

*   **Eureka Server**: Servidor de descubrimiento para que los microservicios se localicen dinámicamente.
*   **API Gateway**: Puerta de enlace centralizada que maneja el enrutamiento, la seguridad JWT y el balanceo de carga.
*   **Microservicio de Usuarios**: Gestiona la autenticación, registro y administración de usuarios (RBAC).
*   **Microservicio de Alumnos**: Gestión de datos maestros de estudiantes con generación automática de códigos.
*   **Microservicio de Cursos**: Gestión de catálogo de cursos y créditos.
*   **Microservicio de Matrículas**: Proceso orquestado que conecta alumnos con cursos mediante comunicación inter-servicio (Feign).
*   **Frontend Angular**: Interfaz de usuario moderna y reactiva basada en Angular 17.

## Tecnologías Utilizadas

### Backend (Java / Spring Boot)
*   **Spring Boot 3.2.5**
*   **Spring Cloud (Eureka, Gateway, OpenFeign)**
*   **Resilience4j**: Implementación de Circuit Breaker para tolerancia a fallos.
*   **Spring Data JPA**: Persistencia de datos.
*   **JWT (JSON Web Token)**: Seguridad y autorización.
*   **MySQL 8.0**: Bases de datos independientes por servicio.

### Frontend (Angular)
*   **Angular 17**
*   **RxJS**: Programación reactiva.
*   **Nginx**: Servidor web para producción en Docker.

### Infraestructura
*   **Docker & Docker Compose**: Contenerización y orquestación.

## Instalación y Despliegue

### Requisitos previos
*   Docker Desktop instalado y corriendo.
*   Java 21 instalado (solo para compilar localmente).

### Paso 1: Compilar los microservicios
Desde la raíz del proyecto, abre una terminal de PowerShell y ejecuta:
```powershell
Get-ChildItem -Directory | Where-Object { Test-Path "$($_.FullName)\gradlew.bat" } | ForEach-Object { 
    Set-Location $_.FullName
    .\gradlew.bat build -x test
    Set-Location .. 
}
```

### Paso 2: Levantar la infraestructura con Docker
Antes de iniciar los contenedores, crea `.env` a partir de la plantilla y define
una contraseña de MySQL y una clave JWT aleatoria de al menos 32 caracteres. No
compartas ni subas `.env`.
```powershell
Copy-Item .env.example .env
notepad .env
```

La clave JWT debe ser la misma para el Gateway y todos los microservicios.

```bash
docker-compose up -d --build
```

## Acceso al Sistema

Una vez que los contenedores estén en estado "Healthy", accede a:

*   **Frontend**: [http://localhost:4200](http://localhost:4200)
*   **Eureka Dashboard**: [http://localhost:8761](http://localhost:8761)
*   **API Gateway**: [http://localhost:8085](http://localhost:8085)
*   **MySQL (Host)**: `localhost:3307` (User: `root`, contraseña configurada en `.env`)

## Roles y Permisos

*   **ADMIN**: Acceso total al CRUD de Alumnos, Cursos, Usuarios y Matrículas.
*   **USER**: Acceso restringido. Solo puede ver catálogos y gestionar sus propias matrículas.

## Resiliencia (Circuit Breaker)

El sistema cuenta con mecanismos de protección:
*   Si un microservicio falla, el Gateway activa un **Fallback** automático informando al usuario.
*   Si `ms-alumnos` o `ms-cursos` fallan, el módulo de Matrículas sigue operando devolviendo datos de emergencia ("Servicio No Disponible").
