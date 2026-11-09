package com.sysge.msusuarios.service;

import com.sysge.msusuarios.dto.LoginRequest;
import com.sysge.msusuarios.dto.LoginResponse;
import com.sysge.msusuarios.dto.RegistroRequest;
import com.sysge.msusuarios.entity.Rol;
import com.sysge.msusuarios.entity.Usuario;
import com.sysge.msusuarios.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public List<LoginResponse> listarTodos() {
        return this.usuarioRepository.findAll()
                .stream()
                .map(this::convertirResponse)
                .toList();
    }

    public LoginResponse buscarPorDni(String dni) {

        Usuario usuario = usuarioRepository.findByDni(dni)
                .orElseThrow(() ->
                        new RuntimeException("Usuario no encontrado"));

        return convertirResponse(usuario);
    }

    public LoginResponse actualizar(String dni, RegistroRequest request) {

        Usuario usuario = usuarioRepository.findByDni(dni)
                .orElseThrow(() ->
                        new RuntimeException("Usuario no encontrado"));

        usuario.setDni(request.getDni());
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setPassword(request.getPassword());
        usuario.setRol(Rol.valueOf(request.getRol()));

        usuario = usuarioRepository.save(usuario);

        return convertirResponse(usuario);
    }

    public void eliminar(String dni) {

        Usuario usuario = usuarioRepository.findByDni(dni)
                .orElseThrow(() ->
                        new RuntimeException("Usuario no encontrado"));

        usuarioRepository.delete(usuario);
    }

    private LoginResponse convertirResponse(Usuario usuario) {

        return LoginResponse.builder()
                .id(usuario.getId())
                .dni(usuario.getDni())
                .nombre(usuario.getNombre())
                .rol(String.valueOf(usuario.getRol()))
                .build();
    }
}
