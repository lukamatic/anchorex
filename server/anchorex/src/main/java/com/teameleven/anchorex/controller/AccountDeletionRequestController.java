package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.AccountDeletionRequest;
import com.teameleven.anchorex.dto.CreateAccountDeletionRequestDto;
import com.teameleven.anchorex.dto.ServiceSignupRequestDto;
import com.teameleven.anchorex.mapper.ServiceSignupRequestMapper;
import com.teameleven.anchorex.service.AccountDeletionRequestService;
import com.teameleven.anchorex.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collection;

@RestController
@RequestMapping("/api/accountDeletionRequests")
public class AccountDeletionRequestController {
    private final AccountDeletionRequestService accountDeletionRequestService;

    public AccountDeletionRequestController(AccountDeletionRequestService accountDeletionRequestService, UserService userService) {
        this.accountDeletionRequestService = accountDeletionRequestService;
    }

    @PostMapping(path="/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AccountDeletionRequest> create(Principal principal, @RequestParam("reason") String reason) {
        var request = this.accountDeletionRequestService.create(reason, principal.getName());
        return new ResponseEntity<>(request, HttpStatus.CREATED);
    }

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Collection<AccountDeletionRequest>> findAll() {
        var requests = this.accountDeletionRequestService.findAll();
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @PostMapping(path="/approve/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> approve(@PathVariable("id") Long id) {
        this.accountDeletionRequestService.approve(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path="/reject/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> reject(@PathVariable("id") Long id, @RequestParam("reason") String reason) {
        this.accountDeletionRequestService.reject(id, reason);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
