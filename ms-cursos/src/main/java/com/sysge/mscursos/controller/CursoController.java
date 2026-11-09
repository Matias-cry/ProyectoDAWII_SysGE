package com.sysge.mscursos.controller;

import com.sysge.mscursos.dto.CursoRequest;
import com.sysge.mscursos.dto.CursoResponse;
import com.sysge.mscursos.entity.Curso;
import com.sysge.mscursos.service.CursoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cursos")
@RequiredArgsConstructor
public class CursoController {

    private final CursoService cursoService;

    @GetMapping
    public ResponseEntity<List<CursoResponse>> listar() {
        return ResponseEntity.ok(cursoService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CursoResponse> buscarPorId(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                cursoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<CursoResponse> guardar(
            @RequestBody CursoRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(cursoService.guardar(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CursoResponse> actualizar(
            @PathVariable Integer id,
            @RequestBody CursoRequest request) {

        return ResponseEntity.ok(
                cursoService.actualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Integer id) {

        cursoService.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}