package com.sysge.msalumnos.dto;

import lombok.Data;

@Data
public class AlumnoRequest {
    private String dni;
    private String nombres;
    private String apellidos;
    private String correo;
}
