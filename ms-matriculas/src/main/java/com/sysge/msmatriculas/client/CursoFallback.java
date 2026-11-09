package com.sysge.msmatriculas.client;

import com.sysge.msmatriculas.dto.CursoDTO;
import org.springframework.stereotype.Component;

@Component
public class CursoFallback implements CursoClient {
    @Override
    public CursoDTO buscarPorId(Integer id) {
        CursoDTO fallbackCurso = new CursoDTO();
        fallbackCurso.setId(id);
        fallbackCurso.setNombre("Curso No Disponible");
        return fallbackCurso;
    }
}