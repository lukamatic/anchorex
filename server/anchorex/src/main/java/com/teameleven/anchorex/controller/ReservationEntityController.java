package com.teameleven.anchorex.controller;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.dto.reservationEntity.CreateLodgeDTO;
import com.teameleven.anchorex.service.LodgeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reservationEntity")
public class ReservationEntityController {

    private final LodgeService lodgeService;

    public ReservationEntityController(LodgeService lodgeService) {
        this.lodgeService = lodgeService;
    }
    @PostMapping(path="/createLodge", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Lodge> create(@RequestBody CreateLodgeDTO createLodgeDTO){
        System.out.println("EVO ME");
        var lodge = lodgeService.create(createLodgeDTO);
        return new ResponseEntity<>(lodge, HttpStatus.CREATED);
    }
}
