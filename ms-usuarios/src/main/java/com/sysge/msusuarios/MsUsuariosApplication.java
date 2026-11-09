package com.sysge.msusuarios;

import com.sysge.msusuarios.entity.Usuario;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@SpringBootApplication
@EnableDiscoveryClient
public class MsUsuariosApplication {
	public static void main(String[] args) {
		SpringApplication.run(MsUsuariosApplication.class, args);
	}

}