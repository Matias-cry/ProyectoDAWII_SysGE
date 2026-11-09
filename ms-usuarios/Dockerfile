# Usamos la versión Alpine de Temurin (pesa un ~40% menos que la estándar)
FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache curl # Necesario para los healthchecks si se requieren
WORKDIR /app
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]