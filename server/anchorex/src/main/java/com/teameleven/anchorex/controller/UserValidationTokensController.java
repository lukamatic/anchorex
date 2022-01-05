package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.User;
import com.teameleven.anchorex.domain.UserValidationToken;
import com.teameleven.anchorex.service.UserService;
import com.teameleven.anchorex.service.UserValidationTokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/validateToken")
public class UserValidationTokensController {
    private final UserValidationTokenService userValidationTokenService;
    private final UserService userService;

    public UserValidationTokensController(UserValidationTokenService service, UserService userService) {
        this.userValidationTokenService = service;
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<HttpStatus> validateToken(@RequestParam("token") String token) {
        UserValidationToken userToken = this.userValidationTokenService.findByToken(token);
        if(userToken == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        User user = userService.findOneById(userToken.getUserId());
        user.setEnabled(true);
        try {
            userService.update(user);
            userValidationTokenService.delete(userToken.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
