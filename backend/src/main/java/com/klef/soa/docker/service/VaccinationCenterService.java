package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.dto.VaccinationCenterRequest;
import com.klef.soa.docker.dto.VaccinationCenterResponse;

public interface VaccinationCenterService {

    VaccinationCenterResponse saveCenter(VaccinationCenterRequest request);

    List<VaccinationCenterResponse> getAllCenters();

    VaccinationCenterResponse getCenterById(Long id);

    VaccinationCenterResponse updateCenter(
            Long id, VaccinationCenterRequest request);

    void deleteCenter(Long id);
}