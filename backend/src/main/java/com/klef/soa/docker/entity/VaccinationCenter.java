package com.klef.soa.docker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vaccination_centers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VaccinationCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String centerName;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String vaccineType;

    @Column(nullable = false)
    private boolean open;
}