package com.teameleven.anchorex.controller;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import com.teameleven.anchorex.domain.User;
import com.teameleven.anchorex.dto.LoginDto;
import com.teameleven.anchorex.dto.UserTokenState;
import com.teameleven.anchorex.dto.user.CreateUserDto;

import com.teameleven.anchorex.response.LoginResponse;
import com.teameleven.anchorex.service.UserService;
import com.teameleven.anchorex.util.TokenUtils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private final TokenUtils tokenUtils;
	private final AuthenticationManager authenticationManager;
	private final UserService userService;

	public AuthController(TokenUtils tokenUtils, AuthenticationManager authenticationManager, UserService userService) {
		this.tokenUtils = tokenUtils;
		this.authenticationManager = authenticationManager;
		this.userService = userService;
	}

	@PostMapping(path = "/signup")
	public ResponseEntity<User> signup(@Valid @RequestBody CreateUserDto createUserDto) throws Exception {
		var user = userService.create(createUserDto);
		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}

	// Prvi endpoint koji pogadja korisnik kada se loguje.
	// Tada zna samo svoje korisnicko ime i lozinku i to prosledjuje na backend.
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> createAuthenticationToken(
			@RequestBody LoginDto authenticationRequest, HttpServletResponse response) {
		// Ukoliko kredencijali nisu ispravni, logovanje nece biti uspesno, desice se
		// AuthenticationException
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				authenticationRequest.getEmail(), authenticationRequest.getPassword()));

		// Ukoliko je autentifikacija uspesna, ubaci korisnika u trenutni security
		// kontekst
		SecurityContextHolder.getContext().setAuthentication(authentication);

		// Kreiraj token za tog korisnika
		User user = (User) authentication.getPrincipal();
		String jwt = tokenUtils.generateToken(user.getUsername());
		int expiresIn = tokenUtils.getExpiredIn();
		var accessToken = new UserTokenState(jwt, expiresIn);

		String userRole = user.getRoles().iterator().next().getName();
		var loginResponse = new LoginResponse(accessToken, userRole);

		return ResponseEntity.ok(loginResponse);
	}
}