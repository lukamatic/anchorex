package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.dto.BookingItemsRequestDTO;
import com.teameleven.anchorex.dto.FreePeriodDTO;
import com.teameleven.anchorex.dto.ServiceDTO;
import com.teameleven.anchorex.dto.reservationEntity.CreateLodgeDTO;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDTO;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDisplayDTO;
import com.teameleven.anchorex.mapper.LodgeMapper;
import com.teameleven.anchorex.service.FreePeriodService;
import com.teameleven.anchorex.service.LodgeService;
import com.teameleven.anchorex.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;

import java.util.Collection;

import java.util.List;

@RestController
@RequestMapping("/api/lodge")
public class LodgeController {

    private final LodgeService lodgeService;

    @Autowired
    private FreePeriodService freePeriodService;

    @Autowired
    private ReservationService reservationService;

    public LodgeController(LodgeService lodgeService) {
        this.lodgeService = lodgeService;
    }

    @PostMapping(path="/createLodge", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Lodge> create(@RequestBody CreateLodgeDTO createLodgeDTO){
        var lodge = lodgeService.create(createLodgeDTO);
        return new ResponseEntity<>(lodge, HttpStatus.CREATED);
    }

    @GetMapping(path="/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Collection<LodgeDisplayDTO>> getAll(){
        var lodges = lodgeService.getAll();
        var dtos = LodgeMapper.toDtos(lodges);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<LodgeDisplayDTO>> getAllLodges(){
        var lodges = lodgeService.getAllLodges();
        List<LodgeDisplayDTO> retDto = new ArrayList<>();
        for(var lodge: lodges){
            LodgeDisplayDTO lodgeDTO = LodgeMapper.lodgeToLodgeDisplayDTO(lodge);
            retDto.add(lodgeDTO);
        }

        return new ResponseEntity<>(retDto, HttpStatus.OK);
    }

    @GetMapping(path="/lodges/{id}")
    public ResponseEntity<List<LodgeDTO>> getLodges(@PathVariable Long id){
        var lodges = lodgeService.getLodges(id);
        return new ResponseEntity<>(lodges, HttpStatus.OK);
    }

    @DeleteMapping(path="/deleteLodge/{id}")
    public ResponseEntity<Void> deleteLodge(@PathVariable Long id){
        if(!reservationService.checkIfEntityIsAvailable(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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
        if(!reservationService.checkIfEntityIsAvailable(lodge.getId())){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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
        if(!reservationService.checkIfEntityIsAvailable(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        lodgeService.addService(service, id);
        return new ResponseEntity<>(service, HttpStatus.CREATED);
    }

    @PostMapping(path="/addFreePeriod/{id}")
    public ResponseEntity<FreePeriodDTO> addFreePeriod(@RequestBody FreePeriodDTO freePeriod, @PathVariable Long id){
        Lodge lodge = lodgeService.getLodgeById(id);
        freePeriodService.addFreePeriod(freePeriod, lodge);
        return new ResponseEntity<>(freePeriod, HttpStatus.CREATED);
    }

    @PostMapping(path="/possibleReservations")
    public ResponseEntity<List<LodgeDisplayDTO>> getPossibleReservations(@RequestBody BookingItemsRequestDTO freePeriod){
        List<Lodge> lodges = lodgeService.getFreeLodges(freePeriod);
        List<LodgeDisplayDTO> retDto = new ArrayList<>();
        for(var lodge: lodges){
            LodgeDisplayDTO lodgeDTO = LodgeMapper.lodgeToLodgeDisplayDTO(lodge);
            retDto.add(lodgeDTO);
        }

        return new ResponseEntity<>(retDto, HttpStatus.OK);
    }
}
