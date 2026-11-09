package com.sysge.msmatriculas.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

@Data
@Builder
public class MatriculaResponseDTO {
    private Integer id;
    private AlumnoDTO alumno;
    private CursoDTO curso;
    private LocalDate fechaMatricula;
    private String ciclo;
}