package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.Complaint;
import com.teameleven.anchorex.domain.Revision;
import com.teameleven.anchorex.service.ComplaintService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {
    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Collection<Complaint>> findAll() {
        var complaints = this.complaintService.findAll();
        complaints.forEach(r -> r.setReservationEntityName(r.getReservation().getName()));
        complaints.forEach(r -> r.setReservation(null));
        return new ResponseEntity<>(complaints, HttpStatus.OK);
    }

    @PostMapping(path="/answer/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> approve(@PathVariable("id") Long id, @RequestParam("answer") String answer) {
        this.complaintService.answer(id, answer);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
