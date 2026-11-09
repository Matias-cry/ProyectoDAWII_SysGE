package com.sysge.msmatriculas.client;

import com.sysge.msmatriculas.dto.CursoDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-cursos", path = "/cursos", fallback = CursoFallback.class)
public interface CursoClient {

    @GetMapping("/{id}")
    CursoDTO buscarPorId(@PathVariable("id") Integer id);
}