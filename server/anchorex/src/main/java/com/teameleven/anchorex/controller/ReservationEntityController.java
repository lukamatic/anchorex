package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.dto.reservationEntity.CreateLodgeDTO;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDTO;
import com.teameleven.anchorex.service.LodgeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservationEntity")
public class ReservationEntityController {

    private final LodgeService lodgeService;

    public ReservationEntityController(LodgeService lodgeService) {
        this.lodgeService = lodgeService;
    }

    @PostMapping(path="/createLodge", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Lodge> create(@RequestBody CreateLodgeDTO createLodgeDTO){
        var lodge = lodgeService.create(createLodgeDTO);
        return new ResponseEntity<>(lodge, HttpStatus.CREATED);
    }

    @GetMapping(path="/lodges")
    public ResponseEntity<List<LodgeDTO>> getLodges(){

        var lodges = lodgeService.getLodges();
        return new ResponseEntity<>(lodges, HttpStatus.OK);
    }

    @DeleteMapping(path="/deleteLodge/{id}")
    public ResponseEntity<Void> deleteLodge(@PathVariable Long id){
        lodgeService.deleteLodge(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
