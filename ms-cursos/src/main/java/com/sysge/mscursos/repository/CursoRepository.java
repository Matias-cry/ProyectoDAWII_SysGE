package com.sysge.mscursos.repository;

import com.sysge.mscursos.entity.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CursoRepository extends JpaRepository<Curso, Integer> {
    boolean existsByCodigo(String codigo);
}