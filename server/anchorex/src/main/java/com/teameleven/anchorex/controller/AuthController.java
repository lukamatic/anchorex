package com.teameleven.anchorex.controller;

import javax.validation.Valid;

import com.teameleven.anchorex.domain.User;
import com.teameleven.anchorex.dto.user.CreateUserDto;

import com.teameleven.anchorex.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private final UserService userService;

	public AuthController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping(path = "/signup")
	public ResponseEntity<User> signup(@Valid @RequestBody CreateUserDto createUserDto) throws Exception {
		var user = userService.create(createUserDto);
		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}
}
