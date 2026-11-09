package com.sysge.msmatriculas.client;

import com.sysge.msmatriculas.dto.AlumnoDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-alumnos", path = "/alumnos", fallback = AlumnoFallback.class)
public interface AlumnoClient {

    @GetMapping("/{id}")
    AlumnoDTO buscarPorId(@PathVariable("id") Integer id);
}