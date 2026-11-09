package com.sysge.msmatriculas.dto;

import lombok.Data;

@Data
public class AlumnoDTO {
    private Integer id;
    private String codigo;
    private String nombres;
    private String apellidos;
    private String correo;
}