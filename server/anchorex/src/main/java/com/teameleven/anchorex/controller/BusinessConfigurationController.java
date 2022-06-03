package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.BusinessConfiguration;
import com.teameleven.anchorex.service.BusinessConfigurationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/businessConfiguration")
public class BusinessConfigurationController {
    private final BusinessConfigurationService businessConfigurationService;

    public BusinessConfigurationController(BusinessConfigurationService businessConfigurationService) {
        this.businessConfigurationService = businessConfigurationService;
    }

    @GetMapping(path="", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BusinessConfiguration> getBusinessConfiguration() {
        return new ResponseEntity<>(this.businessConfigurationService.getBussinessConfiguration(1L), HttpStatus.OK);
    }

    @PutMapping(path="", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BusinessConfiguration> getBusinessConfiguration(@RequestBody BusinessConfiguration businessConfiguration) {
        return new ResponseEntity<>(this.businessConfigurationService.update(businessConfiguration), HttpStatus.OK);
    }
}
