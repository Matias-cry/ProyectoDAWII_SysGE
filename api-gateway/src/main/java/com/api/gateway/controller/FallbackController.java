package com.api.gateway.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping("/usuarios")
    public Mono<Object> usuariosFallback() {
        return Mono.just(Map.of("error", "Servicio de Usuarios no disponible"));
    }

    @GetMapping("/alumnos")
    public Mono<List<Map<String, String>>> alumnosFallback() {
        // Devolvemos una LISTA para que Angular no falle al intentar iterar la tabla
        return Mono.just(List.of(Map.of("error", "Servicio de Alumnos no disponible")));
    }

    @GetMapping("/cursos")
    public Mono<List<Map<String, String>>> cursosFallback() {
        return Mono.just(List.of(Map.of("error", "Servicio de Cursos no disponible")));
    }

    @GetMapping("/matriculas")
    public Mono<List<Map<String, String>>> matriculasFallback() {
        return Mono.just(List.of(Map.of("error", "Servicio de Matriculas no disponible")));
    }
}