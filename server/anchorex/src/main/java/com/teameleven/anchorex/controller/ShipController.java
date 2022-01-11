package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.Ship;
import com.teameleven.anchorex.dto.reservationEntity.CreateShipDTO;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDTO;
import com.teameleven.anchorex.dto.reservationEntity.ShipDTO;
import com.teameleven.anchorex.service.ShipService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservationEntity")
public class ShipController {

    private final ShipService shipService;

    public ShipController(ShipService shipService) {
        this.shipService = shipService;
    }

    @PostMapping(path="/createShip", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Ship> create(@RequestBody CreateShipDTO createShipDTO){
        Ship ship = shipService.createShip(createShipDTO);
        return new ResponseEntity<>(ship, HttpStatus.CREATED);
    }

    @GetMapping(path="/ships/{id}")
    public ResponseEntity<List<ShipDTO>> getShips(@PathVariable Long id){
        var ships = shipService.getShips(id);
        return new ResponseEntity<>(ships, HttpStatus.OK);
    }

    @DeleteMapping(path="/deleteShip/{id}")
    public ResponseEntity<Void> deleteShip(@PathVariable Long id){
        shipService.deleteShip(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
