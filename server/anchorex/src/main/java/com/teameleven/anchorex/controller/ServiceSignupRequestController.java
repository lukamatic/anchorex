package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.dto.ServiceSignupRequestDto;
import com.teameleven.anchorex.mapper.ServiceSignupRequestMapper;
import com.teameleven.anchorex.service.ServiceSignupRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
