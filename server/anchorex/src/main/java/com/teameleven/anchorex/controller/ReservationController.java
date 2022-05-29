package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.Reservation;
import com.teameleven.anchorex.dto.DateRangeDTO;
import com.teameleven.anchorex.dto.ReservationDTO;
import com.teameleven.anchorex.dto.reservationentity.ClientReservationDTO;
import com.teameleven.anchorex.service.FreePeriodService;
import com.teameleven.anchorex.service.ReservationService;
import com.teameleven.anchorex.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    @Autowired
    private final ReservationService reservationService;

    @Autowired
    private FreePeriodService freePeriodService;

    @Autowired
    private UserService userService;

    public ReservationController(ReservationService reservationService, FreePeriodService freePeriodService,
                                 UserService userService) {
        this.reservationService = reservationService;
        this.freePeriodService = freePeriodService;
        this.userService = userService;
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

    @GetMapping(path="/openReservations/{id}")
    public ResponseEntity<List<ClientReservationDTO>> getOpenReservations(@PathVariable Long id){
        var reservations = reservationService.getFreeReservations(id);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @PostMapping(path = "/createPersonalReservation", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Reservation> createPersonalReservation(@RequestBody ReservationDTO reservationDTO){
        if(!freePeriodService.checkReservationDates(reservationDTO.getStartDate(), reservationDTO.getEndDate(),
                reservationDTO.getReservationEntityId())){
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        var reservation = reservationService.createPersonalReservation(reservationDTO);
        return new ResponseEntity<>(reservation, HttpStatus.CREATED);
    }

    @GetMapping(path="/bookedReservations/{id}")
    public ResponseEntity<List<ClientReservationDTO>> getBookedReservations(@PathVariable Long id){
        var reservations = reservationService.getBookedReservations(id);
        for(ClientReservationDTO reservationDTO: reservations){
            reservationDTO.setUserFullname(userService.findOneById(reservationDTO.getUserId()).getFirstName()
                    + " " + userService.findOneById(reservationDTO.getUserId()).getLastName());
        }
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }
}
