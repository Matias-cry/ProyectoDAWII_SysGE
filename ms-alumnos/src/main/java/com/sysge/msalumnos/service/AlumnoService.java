package com.sysge.msalumnos.service;

import com.sysge.msalumnos.dto.AlumnoRequest;
import com.sysge.msalumnos.dto.AlumnoResponse;
import com.sysge.msalumnos.entity.Alumno;
import com.sysge.msalumnos.repository.AlumnoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlumnoService {

    private final AlumnoRepository repository;

    public List<AlumnoResponse> listar() {
        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public AlumnoResponse buscarPorId(Integer id) {

        Alumno alumno = repository.findById(id).orElseThrow(() ->
                        new RuntimeException("Alumno no encontrado"));

        return mapToResponse(alumno);
    }

    public AlumnoResponse guardar(AlumnoRequest request) {

        Alumno alumno = Alumno.builder()
                .dni(request.getDni())
                .nombres(request.getNombres())
                .apellidos(request.getApellidos())
                .correo(request.getCorreo())
                .build();

        return mapToResponse(repository.save(alumno));
    }

    public AlumnoResponse actualizar(Integer id, AlumnoRequest request) {

        Alumno alumno = repository.findById(id).orElseThrow(() ->
                        new RuntimeException("Alumno no encontrado"));

        alumno.setDni(request.getDni());
        alumno.setNombres(request.getNombres());
        alumno.setApellidos(request.getApellidos());
        alumno.setCorreo(request.getCorreo());

        return mapToResponse(repository.save(alumno));
    }

    public void eliminar(Integer id) {

        Alumno alumno = repository.findById(id).orElseThrow(() ->
                        new RuntimeException("Alumno no encontrado"));

        repository.delete(alumno);
    }

    private AlumnoResponse mapToResponse(Alumno alumno) {
        return AlumnoResponse.builder()
                .id(alumno.getId())
                .dni(alumno.getDni())
                .nombres(alumno.getNombres())
                .apellidos(alumno.getApellidos())
                .correo(alumno.getCorreo())
                .build();
    }
}