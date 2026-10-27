package com.klef.soa.docker.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.dto.VaccinationCenterRequest;
import com.klef.soa.docker.dto.VaccinationCenterResponse;
import com.klef.soa.docker.entity.VaccinationCenter;
import com.klef.soa.docker.repository.VaccinationCenterRepository;
import com.klef.soa.docker.service.VaccinationCenterService;

@Service
public class VaccinationCenterServiceImpl
        implements VaccinationCenterService {

    @Autowired
    private VaccinationCenterRepository repository;

    @Override
    public VaccinationCenterResponse saveCenter(
            VaccinationCenterRequest request) {

        VaccinationCenter center = VaccinationCenter.builder()
                .centerName(request.getCenterName().trim())
                .location(request.getLocation().trim())
                .vaccineType(request.getVaccineType().trim())
                .open(request.getOpen())
                .build();

        VaccinationCenter savedCenter = repository.save(center);

        return mapToResponse(savedCenter);
    }

    @Override
    public List<VaccinationCenterResponse> getAllCenters() {

        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public VaccinationCenterResponse getCenterById(Long id) {

        VaccinationCenter center = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Vaccination center not found with ID: " + id));

        return mapToResponse(center);
    }

    @Override
    public VaccinationCenterResponse updateCenter(
            Long id, VaccinationCenterRequest request) {

        VaccinationCenter center = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Vaccination center not found with ID: " + id));

        center.setCenterName(request.getCenterName().trim());
        center.setLocation(request.getLocation().trim());
        center.setVaccineType(request.getVaccineType().trim());
        center.setOpen(request.getOpen());

        VaccinationCenter updatedCenter = repository.save(center);

        return mapToResponse(updatedCenter);
    }

    @Override
    public void deleteCenter(Long id) {

        VaccinationCenter center = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Vaccination center not found with ID: " + id));

        repository.delete(center);
    }

    private VaccinationCenterResponse mapToResponse(
            VaccinationCenter center) {

        return VaccinationCenterResponse.builder()
                .id(center.getId())
                .centerName(center.getCenterName())
                .location(center.getLocation())
                .vaccineType(center.getVaccineType())
                .open(center.isOpen())
                .build();
    }
}