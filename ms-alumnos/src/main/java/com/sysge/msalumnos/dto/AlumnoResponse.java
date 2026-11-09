package com.sysge.msalumnos.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AlumnoResponse {
    private Integer id;
    private String dni;
    private String nombres;
    private String apellidos;
    private String correo;
}
