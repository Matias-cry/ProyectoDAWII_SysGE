package com.sysge.msusuarios.dto;

import lombok.Data;

@Data
public class RegistroRequest {
    private String dni;
    private String nombre;
    private String apellido;
    private String password;
    private String rol;
}
