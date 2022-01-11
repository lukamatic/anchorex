package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.domain.User;
import com.teameleven.anchorex.dto.reservationEntity.CreateLodgeDTO;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDTO;
import com.teameleven.anchorex.dto.reservationEntity.ServiceDTO;
import com.teameleven.anchorex.service.LodgeService;
import com.teameleven.anchorex.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservationEntity")
public class LodgeController {

    private final LodgeService lodgeService;
    private final UserService userService;

    public LodgeController(LodgeService lodgeService, UserService userService) {
        this.lodgeService = lodgeService;
        this.userService = userService;
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

    @GetMapping(path="/lodge/{id}")
    public ResponseEntity<Lodge> getLodge(@PathVariable Long id){
        Lodge lodge = lodgeService.getLodgeById(id);
        return new ResponseEntity<>(lodge, HttpStatus.OK);
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
}
