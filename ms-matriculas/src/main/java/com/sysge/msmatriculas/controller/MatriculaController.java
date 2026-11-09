package com.sysge.msmatriculas.controller;

import com.sysge.msmatriculas.dto.MatriculaResponseDTO;
import com.sysge.msmatriculas.entity.Matricula;
import com.sysge.msmatriculas.service.MatriculaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/matriculas")
public class MatriculaController {

    private final MatriculaService matriculaService;

    public MatriculaController(MatriculaService matriculaService) {
        this.matriculaService = matriculaService;
    }

    @GetMapping
    public List<MatriculaResponseDTO> listar() {
        return matriculaService.listarTodas();
    }

    @PostMapping
    public ResponseEntity<MatriculaResponseDTO> guardar(@RequestBody Matricula matricula) {
        return ResponseEntity.ok(matriculaService.guardar(matricula));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MatriculaResponseDTO> actualizar(@PathVariable Integer id, @RequestBody Matricula matricula) {
        return ResponseEntity.ok(matriculaService.actualizar(id, matricula));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        matriculaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}