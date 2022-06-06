package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.FreePeriod;
import com.teameleven.anchorex.domain.Subscription;
import com.teameleven.anchorex.dto.SubscriptionDTO;
import com.teameleven.anchorex.dto.SubscriptionDetailsDTO;
import com.teameleven.anchorex.service.FreePeriodService;
import com.teameleven.anchorex.service.SubscriptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }



    @GetMapping(path = "/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Collection<SubscriptionDetailsDTO>> findAll(@PathVariable Long userId) {
        var tests = subscriptionService.getSubscriptionsForUser(userId);

        return new ResponseEntity<>(tests, HttpStatus.OK);
    }


    @PostMapping(path="")
    public ResponseEntity<Void> createSubscription(@RequestBody SubscriptionDTO subscriptionDTO){
        subscriptionService.createSubscription(subscriptionDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
