package com.sysge.msusuarios.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String dni;
    private String password;
}
