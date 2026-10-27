package com.klef.soa.docker.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.dto.VaccinationCenterRequest;
import com.klef.soa.docker.dto.VaccinationCenterResponse;
import com.klef.soa.docker.service.VaccinationCenterService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;

@RestController
@Validated
@RequestMapping("/vaccinationcenter")
@CrossOrigin("*")
public class VaccinationCenterController {

    @Autowired
    private VaccinationCenterService service;

    @GetMapping("/")
    public String home() {
        return "Vaccination Center Service Project";
    }

    @GetMapping("/test")
    public String test() {
        return "Test API Call";
    }

    @PostMapping("/add")
    public ResponseEntity<VaccinationCenterResponse> saveCenter(
            @Valid @RequestBody VaccinationCenterRequest request) {

        return new ResponseEntity<>(
                service.saveCenter(request), HttpStatus.CREATED);
    }

    @GetMapping("/displayall")
    public ResponseEntity<List<VaccinationCenterResponse>> getAllCenters() {

        return ResponseEntity.ok(service.getAllCenters());
    }

    @GetMapping("/display/{id}")
    public ResponseEntity<VaccinationCenterResponse> getCenterById(
            @PathVariable @Positive(message = "ID must be positive") Long id) {

        return ResponseEntity.ok(service.getCenterById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<VaccinationCenterResponse> updateCenter(
            @PathVariable @Positive(message = "ID must be positive") Long id,
            @Valid @RequestBody VaccinationCenterRequest request) {

        return ResponseEntity.ok(service.updateCenter(id, request));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCenter(
            @PathVariable @Positive(message = "ID must be positive") Long id) {

        service.deleteCenter(id);

        return ResponseEntity.ok("Vaccination center deleted successfully.");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(
            MethodArgumentNotValidException exception) {

        Map<String, String> errors = new java.util.HashMap<>();

        exception.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));

        return ResponseEntity.badRequest().body(errors);
    }
}