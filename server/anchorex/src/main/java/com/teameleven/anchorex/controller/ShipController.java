package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.Ship;
import com.teameleven.anchorex.dto.FreePeriodDTO;
import com.teameleven.anchorex.dto.ServiceDTO;
import com.teameleven.anchorex.dto.reservationEntity.CreateShipDTO;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDisplayDTO;
import com.teameleven.anchorex.dto.reservationEntity.ShipDTO;
import com.teameleven.anchorex.dto.reservationEntity.ShipDisplayDTO;
import com.teameleven.anchorex.mapper.LodgeMapper;
import com.teameleven.anchorex.mapper.ShipMapper;
import com.teameleven.anchorex.service.FreePeriodService;
import com.teameleven.anchorex.service.ReservationService;
import com.teameleven.anchorex.service.ShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/ship")
public class ShipController {

    private final ShipService shipService;

    @Autowired
    private FreePeriodService freePeriodService;

    @Autowired
    private ReservationService reservationService;

    public ShipController(ShipService shipService) {
        this.shipService = shipService;
    }

    @PostMapping(path="/createShip", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Ship> create(@RequestBody CreateShipDTO createShipDTO){
        Ship ship = shipService.createShip(createShipDTO);
        return new ResponseEntity<>(ship, HttpStatus.CREATED);
    }

    @GetMapping(path="/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Collection<ShipDisplayDTO>> getAllLodges(){
        var ships = shipService.getAll();
        var dtos = ShipMapper.toDtos(ships);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping(path="/ships/{id}")
    public ResponseEntity<List<ShipDTO>> getShips(@PathVariable Long id){
        var ships = shipService.getShips(id);
        return new ResponseEntity<>(ships, HttpStatus.OK);
    }

    @DeleteMapping(path="/deleteShip/{id}")
    public ResponseEntity<Void> deleteShip(@PathVariable Long id){
        if(!reservationService.checkIfEntityIsAvailable(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        shipService.deleteShip(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path="/{id}")
    public ResponseEntity<ShipDisplayDTO> getShip(@PathVariable Long id){
        Ship ship = shipService.getShipById(id);
        ShipDisplayDTO shipDTO = ShipMapper.shipToShipDisplayDTO(ship);
        if(ship == null)
            return new ResponseEntity<>(shipDTO, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(shipDTO, HttpStatus.OK);
    }

    @PutMapping(path="/updateShip", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateShip(@RequestBody Ship ship){
        if(!reservationService.checkIfEntityIsAvailable(ship.getId())){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        shipService.updateShip(ship);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(path="/deleteService/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id){
        shipService.deleteService(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path="/addShipService/{id}")
    public ResponseEntity<ServiceDTO> addService(@RequestBody ServiceDTO service, @PathVariable Long id){
        if(!reservationService.checkIfEntityIsAvailable(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        shipService.addService(service, id);
        return new ResponseEntity<>(service, HttpStatus.CREATED);
    }

    @PostMapping(path="/addFreePeriod/{id}")
    public ResponseEntity<FreePeriodDTO> addFreePeriod(@RequestBody FreePeriodDTO freePeriod, @PathVariable Long id){
        Ship ship = shipService.getShipById(id);
        freePeriodService.addFreePeriod(freePeriod, ship);
        return new ResponseEntity<>(freePeriod, HttpStatus.CREATED);
    }
}
