package com.sysge.msusuarios.controller;

import com.sysge.msusuarios.dto.LoginRequest;
import com.sysge.msusuarios.dto.LoginResponse;
import com.sysge.msusuarios.dto.RegistroRequest;
import com.sysge.msusuarios.service.AuthService;
import com.sysge.msusuarios.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService service;
    private final UsuarioService usuarioService;

    @GetMapping("/check")
    public String check() {
        return "USUARIOS-FUNCIONANDO";
    }

    @GetMapping
    public List<LoginResponse> listar() {
        return this.usuarioService.listarTodos();
    }

    @GetMapping("/{dni}")
    public ResponseEntity<LoginResponse> buscarPorDni(
            @PathVariable String dni) {

        return ResponseEntity.ok(
                usuarioService.buscarPorDni(dni));
    }

    @PutMapping("/{dni}")
    public ResponseEntity<LoginResponse> actualizar(
            @PathVariable String dni,
            @RequestBody RegistroRequest request) {

        return ResponseEntity.ok(
                usuarioService.actualizar(dni, request));
    }

    @DeleteMapping("/{dni}")
    public ResponseEntity<Void> eliminar(
            @PathVariable String dni) {

        usuarioService.eliminar(dni);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/auth/register")
    public ResponseEntity<String> registrar(
            @RequestBody RegistroRequest request){

        service.registrar(request);

        return ResponseEntity.ok(
                "Usuario registrado correctamente");
    }

    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request){

        return ResponseEntity.ok(
                service.login(request));
    }
}
