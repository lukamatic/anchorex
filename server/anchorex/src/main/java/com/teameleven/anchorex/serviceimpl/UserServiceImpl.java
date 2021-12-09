package com.teameleven.anchorex.serviceimpl;

import java.util.Collection;

import com.teameleven.anchorex.domain.Role;
import com.teameleven.anchorex.domain.User;
import com.teameleven.anchorex.dto.user.CreateUserDto;
import com.teameleven.anchorex.dto.user.UpdateUserDto;
import com.teameleven.anchorex.repository.UserRepository;
import com.teameleven.anchorex.service.RoleService;
import com.teameleven.anchorex.service.UserService;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserServiceImpl implements UserService {
	private final UserRepository userRepository;
	private final RoleService roleService;

	public UserServiceImpl(UserRepository userRepository, RoleService roleService) {
		this.userRepository = userRepository;
		this.roleService = roleService;
	}

	@Override
	public User create(CreateUserDto createUserDto) throws Exception {
		User savedUser = null;

		try {
			var user = new User(createUserDto);
			var role = validateRole(createUserDto.getRole());
			user.getRoles().add(role);
			user.encodePassword();
			savedUser = userRepository.save(user);
		} catch (DataIntegrityViolationException e) {
			throw new ResponseStatusException(HttpStatus.CONFLICT,
					"An account with entered email address already exists.");
		}

		return savedUser;
	}

	@Override
	public Collection<User> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User findOneById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User update(UpdateUserDto updateUserDto) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub

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