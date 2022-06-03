package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.Test;
import com.teameleven.anchorex.dto.test.CreateTestDto;
import com.teameleven.anchorex.dto.test.TestDto;
import com.teameleven.anchorex.dto.test.UpdateTestDto;
import com.teameleven.anchorex.dto.user.UserDto;
import com.teameleven.anchorex.mapper.TestMapper;
import com.teameleven.anchorex.mapper.UserMapper;
import com.teameleven.anchorex.service.TestService;
import com.teameleven.anchorex.service.UserService;
import com.teameleven.anchorex.util.TokenUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping("/api/getUserByToken")
public class UserByToken {
    private final TokenUtils tokenUtils;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public UserByToken(TokenUtils tokenUtils, AuthenticationManager authenticationManager, UserService userService) {
        this.tokenUtils = tokenUtils;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }



    @GetMapping( produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDto> getUserByToken(@RequestParam("token") String token) {
        if(token == null)
            return new ResponseEntity<>( HttpStatus.NOT_FOUND);
        try{
            String username = this.tokenUtils.getUsernameFromToken(token);
            var user = userService.findByEmail(username);

            if (user == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        String.format("User with username %d doesn't exist.", username));
            }

            var userDto = UserMapper.UserToUserDto(user);
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>( HttpStatus.UNAUTHORIZED);
        }

    }
}
