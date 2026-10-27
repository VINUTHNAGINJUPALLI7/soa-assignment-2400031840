package com.klef.soa.docker.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VaccinationCenterResponse {

    private Long id;
    private String centerName;
    private String location;
    private String vaccineType;
    private boolean open;
}