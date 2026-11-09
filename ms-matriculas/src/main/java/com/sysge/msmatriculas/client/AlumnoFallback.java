package com.sysge.msmatriculas.client;

import com.sysge.msmatriculas.dto.AlumnoDTO;
import org.springframework.stereotype.Component;

@Component
public class AlumnoFallback implements AlumnoClient {
    @Override
    public AlumnoDTO buscarPorId(Integer id) {
        AlumnoDTO fallbackAlumno = new AlumnoDTO();
        fallbackAlumno.setId(id);
        fallbackAlumno.setNombres("Usuario No Disponible");
        fallbackAlumno.setApellidos("(Servicio Caido)");
        return fallbackAlumno;
    }
}