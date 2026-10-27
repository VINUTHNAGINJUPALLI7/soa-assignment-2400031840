package com.klef.soa.docker.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Data;

@Data
public class VaccinationCenterRequest {

    @NotBlank(message = "Center name is required")
    @Size(max = 100, message = "Center name must not exceed 100 characters")
    private String centerName;

    @NotBlank(message = "Location is required")
    @Size(max = 150, message = "Location must not exceed 150 characters")
    private String location;

    @NotBlank(message = "Vaccine type is required")
    @Size(max = 100, message = "Vaccine type must not exceed 100 characters")
    private String vaccineType;

    @NotNull(message = "Open status is required")
    @Schema(description = "Whether the vaccination center is open",
            example = "true")
    private Boolean open;
}