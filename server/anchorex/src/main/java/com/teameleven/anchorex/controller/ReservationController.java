package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.Reservation;
import com.teameleven.anchorex.dto.DateRangeDTO;
import com.teameleven.anchorex.dto.ReservationDTO;
import com.teameleven.anchorex.service.FreePeriodService;
import com.teameleven.anchorex.service.LodgeService;
import com.teameleven.anchorex.service.ReservationService;
import com.teameleven.anchorex.service.ShipService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    @Autowired
    private final ReservationService reservationService;

    @Autowired
    private FreePeriodService freePeriodService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }


    @PostMapping(path="/createReservation", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Reservation> create(@RequestBody ReservationDTO reservationDTO){
        if(!freePeriodService.checkReservationDates(reservationDTO.getStartDate(), reservationDTO.getEndDate(),
                reservationDTO.getReservationEntityId())) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        var reservation = reservationService.createReservation(reservationDTO);

        return new ResponseEntity<>(reservation, HttpStatus.CREATED);
    }

    @PostMapping(path="/checkCaptainAvailability", consumes = MediaType.APPLICATION_JSON_VALUE)
    public boolean checkCaptainAvailability(@RequestBody DateRangeDTO dateRange){
        return reservationService.checkCaptainAvailability(dateRange);
    }
}
