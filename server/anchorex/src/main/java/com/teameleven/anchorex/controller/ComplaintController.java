package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.Complaint;
import com.teameleven.anchorex.domain.FreePeriod;
import com.teameleven.anchorex.dto.ComplaintDTO;
import com.teameleven.anchorex.service.ComplaintService;
import com.teameleven.anchorex.service.FreePeriodService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/complaint")
public class ComplaintController {
    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }



    @PostMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Complaint> makeComplaint(@RequestBody ComplaintDTO complaintDTO) {
        Complaint complaint = complaintService.makeComplaint(complaintDTO);
        return new ResponseEntity<>(complaint, HttpStatus.OK);
    }


    @GetMapping(path = "/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Collection<Complaint>> findForUser(@PathVariable("userId") Long userId) {
        var userComplains = complaintService.getComplainsForUser(userId);

        return new ResponseEntity<>(userComplains, HttpStatus.OK);
    }

}
