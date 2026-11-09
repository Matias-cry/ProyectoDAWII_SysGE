package com.sysge.msusuarios.service;

import com.sysge.msusuarios.dto.LoginRequest;
import com.sysge.msusuarios.dto.LoginResponse;
import com.sysge.msusuarios.dto.RegistroRequest;
import com.sysge.msusuarios.entity.Rol;
import com.sysge.msusuarios.entity.Usuario;
import com.sysge.msusuarios.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UsuarioRepository repository;
    private final BCryptPasswordEncoder encoder;
    private final JwtService jwtService;



    public void registrar(RegistroRequest request) {
        if(repository.findByDni(request.getDni()).isPresent()) {
            throw new RuntimeException("El DNI ya existe");
        }

        Usuario usuario = Usuario.builder()
                        .dni(request.getDni())
                        .nombre(request.getNombre())
                        .password(encoder.encode(request.getPassword()))
                        .rol(Rol.valueOf(request.getRol()))
                        .build();

        repository.save(usuario);
    }

    public LoginResponse login(LoginRequest request){
        Usuario usuario = repository.findByDni(request.getDni())
                        .orElseThrow(() -> new RuntimeException("Usuario no existe"));

        boolean valido = encoder.matches(request.getPassword(), usuario.getPassword());

        if(!valido){
            throw new RuntimeException("Credenciales incorrectas");
        }

        String token = jwtService.generarToken(usuario);

        return LoginResponse.builder()
                .id(usuario.getId())
                .dni(usuario.getDni())
                .nombre(usuario.getNombre())
                .rol(String.valueOf(usuario.getRol()))
                .token(token)
                .build();
    }
}
