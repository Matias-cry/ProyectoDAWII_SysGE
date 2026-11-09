package com.sysge.mscursos.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CursoRequest {
    private String codigo;
    private String nombre;
    private Integer creditos;
}
