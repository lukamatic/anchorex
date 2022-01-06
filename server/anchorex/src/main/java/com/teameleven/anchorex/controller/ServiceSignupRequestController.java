package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.dto.ServiceSignupRequestDto;
import com.teameleven.anchorex.dto.ServiceSignupRequestRejectionDto;
import com.teameleven.anchorex.mapper.ServiceSignupRequestMapper;
import com.teameleven.anchorex.service.ServiceSignupRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping("/api/serviceSignupRequests")
public class ServiceSignupRequestController {
    private final ServiceSignupRequestService serviceSignupRequestService;

    public ServiceSignupRequestController(ServiceSignupRequestService serviceSignupRequestService) {
        this.serviceSignupRequestService = serviceSignupRequestService;
    }

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Collection<ServiceSignupRequestDto>> findAll() {
        var serviceSignupRequests = serviceSignupRequestService.findAll();
        var serviceSignupRequestDtos
                = ServiceSignupRequestMapper.ServiceSignupRequestsToServiceSignupRequestDtos(serviceSignupRequests);
        return new ResponseEntity<>(serviceSignupRequestDtos, HttpStatus.OK);
    }

    @PostMapping(path = "/approve/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> approve(@PathVariable("id") Long id) throws Exception {
        serviceSignupRequestService.approve(id);
        return new ResponseEntity<>(String.format("Service signup request with id %d successfully approved.", id), HttpStatus.OK);
    }

    @PostMapping(path = "/reject/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> reject(@PathVariable("id") Long id,
                                         @Valid @RequestBody ServiceSignupRequestRejectionDto serviceSignupRequestRejectionDto) throws Exception {
        serviceSignupRequestService.reject(id, serviceSignupRequestRejectionDto.getReason());
        return new ResponseEntity<>(String.format("Service signup request with id %d successfully rejected.", id), HttpStatus.OK);
    }
}
