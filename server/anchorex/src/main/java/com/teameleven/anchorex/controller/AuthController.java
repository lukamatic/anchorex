package com.teameleven.anchorex.controller;

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
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

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

	@GetMapping(path="/email")
	public ResponseEntity<User> getUserID(@RequestParam String email){
		User user = userService.findByEmail(email);
		System.out.println(email);
		System.out.println(user.getId());
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	// Prvi endpoint koji pogadja korisnik kada se loguje.
	// Tada zna samo svoje korisnicko ime i lozinku i to prosledjuje na backend.
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> createAuthenticationToken(
			@RequestBody LoginDto authenticationRequest, HttpServletResponse response) {

		Authentication authentication = null;
		try {
			// Ukoliko kredencijali nisu ispravni, logovanje nece biti uspesno, desice se
			// AuthenticationException
			authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getEmail(), authenticationRequest.getPassword()));
		} catch (BadCredentialsException exception) {
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}  catch (DisabledException exception) {
			return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
		} // Ukoliko je autentifikacija uspesna, ubaci korisnika u trenutni security
			// kontekst
		SecurityContextHolder.getContext().setAuthentication(authentication);

		// Kreiraj token za tog korisnika
		User user = (User) authentication.getPrincipal();
		String jwt = tokenUtils.generateToken(user.getUsername());
		int expiresIn = tokenUtils.getExpiredIn();
		var accessToken = new UserTokenState(jwt, expiresIn);

		String userRole = user.getRoles().iterator().next().getName();
		var loginResponse = new LoginResponse(accessToken, user.getId(), userRole);

		return ResponseEntity.ok(loginResponse);
	}
}