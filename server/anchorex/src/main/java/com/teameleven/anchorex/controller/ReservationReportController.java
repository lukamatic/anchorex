package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.ReservationReport;
import com.teameleven.anchorex.service.ReservationReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/reservationReports")
public class ReservationReportController {
    private final ReservationReportService reservationReportService;

    public ReservationReportController(ReservationReportService reservationReportService) {
        this.reservationReportService = reservationReportService;
    }

    @GetMapping(path="/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Collection<ReservationReport>> findAll() {
        var reports = this.reservationReportService.findAll();
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    @PostMapping(path="/approve/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> approve(@PathVariable("id") Long id, @RequestParam("penalty") Boolean penalty) {
        this.reservationReportService.approve(id, penalty);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path="/reject/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> reject(@PathVariable("id") Long id) {
        this.reservationReportService.reject(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
