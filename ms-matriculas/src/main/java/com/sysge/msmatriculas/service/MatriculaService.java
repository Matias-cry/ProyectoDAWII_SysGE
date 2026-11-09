package com.sysge.msmatriculas.service;

import com.sysge.msmatriculas.client.AlumnoClient;
import com.sysge.msmatriculas.client.CursoClient;
import com.sysge.msmatriculas.dto.AlumnoDTO;
import com.sysge.msmatriculas.dto.CursoDTO;
import com.sysge.msmatriculas.dto.MatriculaResponseDTO;
import com.sysge.msmatriculas.entity.Matricula;
import com.sysge.msmatriculas.repository.MatriculaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatriculaService {

    private final MatriculaRepository matriculaRepository;
    private final AlumnoClient alumnoClient;
    private final CursoClient cursoClient;

    public MatriculaService(MatriculaRepository matriculaRepository, AlumnoClient alumnoClient, CursoClient cursoClient) {
        this.matriculaRepository = matriculaRepository;
        this.alumnoClient = alumnoClient;
        this.cursoClient = cursoClient;
    }

    public List<MatriculaResponseDTO> listarTodas() {
        return matriculaRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public MatriculaResponseDTO guardar(Matricula matricula) {
        // Validar que el alumno existe
        AlumnoDTO alumno = alumnoClient.buscarPorId(matricula.getAlumnoId());
        if (alumno == null) {
            throw new RuntimeException("El alumno con ID " + matricula.getAlumnoId() + " no existe.");
        }
        
        // Validar que el curso existe
        CursoDTO curso = cursoClient.buscarPorId(matricula.getCursoId());
        if (curso == null) {
            throw new RuntimeException("El curso con ID " + matricula.getCursoId() + " no existe.");
        }

        Matricula nuevaMatricula = matriculaRepository.save(matricula);
        return convertToDto(nuevaMatricula);
    }

    public MatriculaResponseDTO actualizar(Integer id, Matricula matricula) {
        Matricula matriculaExistente = matriculaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Matrícula con ID " + id + " no encontrada."));

        // Validar que el alumno existe
        AlumnoDTO alumno = alumnoClient.buscarPorId(matricula.getAlumnoId());
        if (alumno == null) {
            throw new RuntimeException("El alumno con ID " + matricula.getAlumnoId() + " no existe.");
        }
        
        // Validar que el curso existe
        CursoDTO curso = cursoClient.buscarPorId(matricula.getCursoId());
        if (curso == null) {
            throw new RuntimeException("El curso con ID " + matricula.getCursoId() + " no existe.");
        }

        matriculaExistente.setAlumnoId(matricula.getAlumnoId());
        matriculaExistente.setCursoId(matricula.getCursoId());
        matriculaExistente.setCiclo(matricula.getCiclo());
        // La fecha de matrícula no se actualiza, se mantiene la original o se establece en @PrePersist

        Matricula matriculaActualizada = matriculaRepository.save(matriculaExistente);
        return convertToDto(matriculaActualizada);
    }

    public void eliminar(Integer id) {
        matriculaRepository.deleteById(id);
    }

    private MatriculaResponseDTO convertToDto(Matricula matricula) {
        AlumnoDTO alumno = null;
        try {
            alumno = alumnoClient.buscarPorId(matricula.getAlumnoId());
        } catch (Exception e) {
            // Manejar error si el microservicio de alumnos está caído o el alumno no existe
        }

        CursoDTO curso = null;
        try {
            curso = cursoClient.buscarPorId(matricula.getCursoId());
        } catch (Exception e) {
            // Manejar error si el microservicio de cursos está caído o el curso no existe
        }

        return MatriculaResponseDTO.builder()
                .id(matricula.getId())
                .alumno(alumno)
                .curso(curso)
                .fechaMatricula(matricula.getFechaMatricula())
                .ciclo(matricula.getCiclo())
                .build();
    }
}