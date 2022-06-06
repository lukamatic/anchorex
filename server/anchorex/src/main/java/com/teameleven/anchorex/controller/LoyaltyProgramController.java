package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.LoyaltyProgram;
import com.teameleven.anchorex.domain.enumerations.LoyaltyStatus;
import com.teameleven.anchorex.dto.UpdateLoyaltyProgramDto;
import com.teameleven.anchorex.dto.UserLoyaltyStatusResponse;
import com.teameleven.anchorex.service.LoyaltyProgramService;
import com.teameleven.anchorex.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/loyaltyProgram")
public class LoyaltyProgramController {
    private final LoyaltyProgramService loyaltyProgramService;
    private final UserService userService;

    public LoyaltyProgramController(LoyaltyProgramService loyaltyProgramService, UserService userService) {
        this.loyaltyProgramService = loyaltyProgramService;
        this.userService = userService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LoyaltyProgram> get() {
        var loyaltyProgram = this.loyaltyProgramService.get();
        return new ResponseEntity<>(loyaltyProgram, HttpStatus.OK);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LoyaltyProgram> update(@Valid @RequestBody UpdateLoyaltyProgramDto updateLoyaltyProgramDto) throws Exception {
        var loyaltyProgram = this.loyaltyProgramService.update(updateLoyaltyProgramDto);
        return new ResponseEntity<>(loyaltyProgram, HttpStatus.OK);
    }

    @GetMapping(path="/usersLoyaltyStatus", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserLoyaltyStatusResponse> getUsersLoyaltyStatus(Principal principal) {
        var user = this.userService.findByEmail(principal.getName());
        var statusResponse = new UserLoyaltyStatusResponse();
        var loyaltyProgram = this.loyaltyProgramService.get();

        if (loyaltyProgram.getGoldBorder() <= user.getPoints()) {
            statusResponse.setLoyaltyStatus(LoyaltyStatus.GOLD);
            statusResponse.setDiscount(loyaltyProgram.getGoldDiscount());
        } else if (loyaltyProgram.getSilverBorder() <= user.getPoints()) {
            statusResponse.setLoyaltyStatus(LoyaltyStatus.SILVER);
            statusResponse.setDiscount(loyaltyProgram.getSilverDiscount());
        } else if (loyaltyProgram.getBronzeBorder() <= user.getPoints()) {
            statusResponse.setLoyaltyStatus(LoyaltyStatus.BRONZE);
            statusResponse.setDiscount(loyaltyProgram.getBronzeDiscount());
        }

        statusResponse.setPoints(user.getPoints());

        return new ResponseEntity<>(statusResponse, HttpStatus.OK);
    }
}
