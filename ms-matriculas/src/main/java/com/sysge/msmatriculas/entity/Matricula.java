package com.sysge.msmatriculas.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "matriculas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer alumnoId;

    @Column(nullable = false)
    private Integer cursoId;

    @Column(nullable = false)
    private LocalDate fechaMatricula;

    @Column(nullable = false)
    private String ciclo;
    
    @PrePersist
    public void prePersist() {
        this.fechaMatricula = LocalDate.now();
    }
}