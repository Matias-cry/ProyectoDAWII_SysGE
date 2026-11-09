package com.sysge.mscursos.service;

import com.sysge.mscursos.dto.CursoRequest;
import com.sysge.mscursos.dto.CursoResponse;
import com.sysge.mscursos.entity.Curso;
import com.sysge.mscursos.repository.CursoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CursoService {

    private final CursoRepository cursoRepository;

    public List<CursoResponse> listar() {
        return cursoRepository.findAll()
                .stream()
                .map(this::convertirResponse)
                .toList();
    }

    public CursoResponse buscarPorId(Integer id) {

        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Curso no encontrado"));

        return convertirResponse(curso);
    }

    public CursoResponse guardar(CursoRequest request) {

        Curso curso = Curso.builder()
                .codigo(request.getCodigo())
                .nombre(request.getNombre())
                .creditos(request.getCreditos())
                .build();

        curso = cursoRepository.save(curso);

        return convertirResponse(curso);
    }

    public CursoResponse actualizar(Integer id,
                                    CursoRequest request) {

        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Curso no encontrado"));

        curso.setCodigo(request.getCodigo());
        curso.setNombre(request.getNombre());
        curso.setCreditos(request.getCreditos());

        curso = cursoRepository.save(curso);

        return convertirResponse(curso);
    }

    public void eliminar(Integer id) {

        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Curso no encontrado"));

        cursoRepository.delete(curso);
    }

    private CursoResponse convertirResponse(Curso curso) {

        return CursoResponse.builder()
                .id(curso.getId())
                .codigo(curso.getCodigo())
                .nombre(curso.getNombre())
                .creditos(curso.getCreditos())
                .build();
    }
}