package com.sysge.msalumnos.controller;

import com.sysge.msalumnos.dto.AlumnoRequest;
import com.sysge.msalumnos.dto.AlumnoResponse;
import com.sysge.msalumnos.entity.Alumno;
import com.sysge.msalumnos.service.AlumnoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alumnos")
@RequiredArgsConstructor
public class AlumnoController {

    private final AlumnoService service;

    @GetMapping
    public List<AlumnoResponse> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public AlumnoResponse buscarPorId(
            @PathVariable Integer id) {

        return service.buscarPorId(id);
    }

    @PostMapping
    public AlumnoResponse guardar(
            @RequestBody AlumnoRequest request) {

        return service.guardar(request);
    }

    @PutMapping("/{id}")
    public AlumnoResponse actualizar(
            @PathVariable Integer id,
            @RequestBody AlumnoRequest request) {

        return service.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public void eliminar(
            @PathVariable Integer id) {

        service.eliminar(id);
    }
}