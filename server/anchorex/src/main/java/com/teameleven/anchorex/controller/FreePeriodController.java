package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.FreePeriod;
import com.teameleven.anchorex.domain.Test;
import com.teameleven.anchorex.dto.test.CreateTestDto;
import com.teameleven.anchorex.dto.test.TestDto;
import com.teameleven.anchorex.dto.test.UpdateTestDto;
import com.teameleven.anchorex.mapper.TestMapper;
import com.teameleven.anchorex.service.FreePeriodService;
import com.teameleven.anchorex.service.TestService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping("/api/freePeriod")
public class FreePeriodController {
    private final FreePeriodService freePeriodService;

    public FreePeriodController(FreePeriodService freePeriodService) {
        this.freePeriodService = freePeriodService;
    }



    @GetMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Collection<FreePeriod>> findAll() {
        var tests = freePeriodService.getAllFreePeriods();

        return new ResponseEntity<>(tests, HttpStatus.OK);
    }

}
