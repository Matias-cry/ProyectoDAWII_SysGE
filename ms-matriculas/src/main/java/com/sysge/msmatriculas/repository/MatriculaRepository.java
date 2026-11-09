package com.sysge.msmatriculas.repository;

import com.sysge.msmatriculas.entity.Matricula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatriculaRepository extends JpaRepository<Matricula, Integer> {
    List<Matricula> findByAlumnoId(Integer alumnoId);
}