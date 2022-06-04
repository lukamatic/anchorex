package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Role;
import com.teameleven.anchorex.domain.ServiceSignupRequest;
import com.teameleven.anchorex.domain.User;
import com.teameleven.anchorex.domain.UserValidationToken;
import com.teameleven.anchorex.dto.user.CreateUserDto;
import com.teameleven.anchorex.dto.user.UpdateUserDto;
import com.teameleven.anchorex.repository.UserRepository;
import com.teameleven.anchorex.service.*;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
	private final UserRepository userRepository;
	private final RoleService roleService;
	private final AuthService authService;
	private final UserValidationTokenService userValidationTokenService;
	private final ServiceSignupRequestService serviceSignupRequestService;

	public UserServiceImpl(UserRepository userRepository, RoleService roleService, AuthService authService, UserValidationTokenService userValidationTokenService, @Lazy ServiceSignupRequestService serviceSignupRequestService) {
		this.userRepository = userRepository;
		this.roleService = roleService;
		this.authService = authService;
		this.userValidationTokenService = userValidationTokenService;
		this.serviceSignupRequestService = serviceSignupRequestService;
	}

	@Override
	public User create(CreateUserDto createUserDto) throws Exception {
		User savedUser = null;

		try {
			var user = new User(createUserDto);
			var role = validateRole(createUserDto.getRole());
			user.getRoles().add(role);
			user.encodePassword();
			user.setPenaltyCount(0);
			savedUser = userRepository.save(user);
			if (savedUser.isClient()) {
				String token = UUID.randomUUID().toString();
				UserValidationToken userValidationToken = new UserValidationToken(token, user.getId());
				userValidationTokenService.create(userValidationToken);
				this.authService.sendVerificationMail(savedUser, token);
			} else if (savedUser.isService()) {
				var serviceSignupRequest = new ServiceSignupRequest(savedUser, createUserDto.getSignupExplanation());
				serviceSignupRequestService.create(serviceSignupRequest);
			}
		} catch (DataIntegrityViolationException e) {
			throw new ResponseStatusException(HttpStatus.CONFLICT,
					"An account with entered email address already exists.");
		}

		return savedUser;
	}

	@Override
	public Collection<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public User findOneById(Long id) {
		return this.userRepository.findById(id).orElse(null);
	}

	@Override
	public void update(UpdateUserDto updateUserDto) throws Exception {
		this.userRepository.updateUser(	updateUserDto.getId(),
													updateUserDto.getAddress(),
													updateUserDto.getBiography(),
													updateUserDto.getCity(),
													updateUserDto.getEmail(),
													updateUserDto.getCountry(),
													updateUserDto.getFirstName(),
													updateUserDto.getLastName(),
													updateUserDto.getPhoneNumber()
													);
		return;
//		return success != 0;
	}

	@Override
	public void updatePassword(Long userId, String password) throws  Exception{

		User user = this.userRepository.findOneById(userId);
		user.setPassword(password);
		user.encodePassword();
		this.userRepository.updateUser(user.getId(), user.getPassword());

	}

	@Override
	public void incrementPenaltyCount(Long userId) {
		var userToUpdate = this.userRepository.findById(userId).orElse(null);
		userToUpdate.setPenaltyCount(userToUpdate.getPenaltyCount() + 1);
		this.userRepository.save(userToUpdate);
	}

	@Override
	public User update(User user) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Long id) {
		userRepository.deleteById(id);
	}

	@Override
	public void enableUser(Long id) {
		var user = findOneById(id);

		if (user == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("User with id %d doesn't exist.", id));
		}

		user.setEnabled(true);
		userRepository.save(user);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	private Role validateRole(String roleName) {
		if (roleName.equals("ROLE_ADMIN")) {
			var auth = SecurityContextHolder.getContext().getAuthentication();

			if (auth == null || !auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
				throw new ResponseStatusException(HttpStatus.FORBIDDEN,
						"You do not have permission to create an admin account.");
			}
		}

		var role = roleService.findOneByName(roleName);

		if (role == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
					String.format("Role %s doesn't exist.", roleName));
		}

		return role;
	}
}
