package com.sysge.msalumnos.repository;

import com.sysge.msalumnos.entity.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlumnoRepository extends JpaRepository<Alumno, Integer> {

}