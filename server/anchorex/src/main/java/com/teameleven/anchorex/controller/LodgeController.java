package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.dto.FreePeriodDTO;
import com.teameleven.anchorex.dto.ServiceDTO;
import com.teameleven.anchorex.dto.reservationEntity.CreateLodgeDTO;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDTO;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDisplayDTO;
import com.teameleven.anchorex.mapper.LodgeMapper;
import com.teameleven.anchorex.service.FreePeriodService;
import com.teameleven.anchorex.service.LodgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lodge")
public class LodgeController {

    private final LodgeService lodgeService;

    @Autowired
    private FreePeriodService freePeriodService;

    public LodgeController(LodgeService lodgeService) {
        this.lodgeService = lodgeService;
    }

    @PostMapping(path="/createLodge", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Lodge> create(@RequestBody CreateLodgeDTO createLodgeDTO){
        var lodge = lodgeService.create(createLodgeDTO);
        return new ResponseEntity<>(lodge, HttpStatus.CREATED);
    }

    @GetMapping(path="/lodges/{id}")
    public ResponseEntity<List<LodgeDTO>> getLodges(@PathVariable Long id){
        var lodges = lodgeService.getLodges(id);
        return new ResponseEntity<>(lodges, HttpStatus.OK);
    }

    @DeleteMapping(path="/deleteLodge/{id}")
    public ResponseEntity<Void> deleteLodge(@PathVariable Long id){
        lodgeService.deleteLodge(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path="/{id}")
    public ResponseEntity<LodgeDisplayDTO> getLodge(@PathVariable Long id){
        Lodge lodge = lodgeService.getLodgeById(id);
        LodgeDisplayDTO lodgeDTO = LodgeMapper.lodgeToLodgeDisplayDTO(lodge);
        return new ResponseEntity<>(lodgeDTO, HttpStatus.OK);
    }

    @PutMapping(path="/updateLodge", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateLodge(@RequestBody Lodge lodge){
        lodgeService.updateLodge(lodge);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(path="/deleteService/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id){
        lodgeService.deleteService(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path="/addService/{id}")
    public ResponseEntity<ServiceDTO> addService(@RequestBody ServiceDTO service, @PathVariable Long id){
        lodgeService.addService(service, id);
        return new ResponseEntity<>(service, HttpStatus.CREATED);
    }

    @PostMapping(path="/addFreePeriod/{id}")
    public ResponseEntity<FreePeriodDTO> addFreePeriod(@RequestBody FreePeriodDTO freePeriod, @PathVariable Long id){
        Lodge lodge = lodgeService.getLodgeById(id);
        freePeriodService.addFreePeriod(freePeriod, lodge);
        return new ResponseEntity<>(freePeriod, HttpStatus.CREATED);
    }
}
