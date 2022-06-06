package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.Revision;
import com.teameleven.anchorex.service.RevisionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping("/api/revisions")
public class RevisionController {
    private final RevisionService revisionService;

    public RevisionController(RevisionService revisionService) {
        this.revisionService = revisionService;
    }

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Collection<Revision>> findAll() {
        var revisions = this.revisionService.findAll();
        return new ResponseEntity<>(revisions, HttpStatus.OK);
    }

    @PostMapping(path = "/approve/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> approve(@PathVariable("id") Long id) throws Exception {
        this.revisionService.approve(id);
        return new ResponseEntity<>(String.format("Revision with id %d successfully approved.", id), HttpStatus.OK);
    }

    @PostMapping(path = "/reject/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> reject(@PathVariable("id") Long id) throws Exception {
        revisionService.reject(id);
        return new ResponseEntity<>(String.format("Revision with id %d successfully rejected.", id), HttpStatus.OK);
    }
}
