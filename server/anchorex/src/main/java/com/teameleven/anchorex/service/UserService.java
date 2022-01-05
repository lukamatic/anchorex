package com.teameleven.anchorex.service;

import java.util.Collection;

import com.teameleven.anchorex.domain.User;
import com.teameleven.anchorex.dto.user.CreateUserDto;
import com.teameleven.anchorex.dto.user.UpdateUserDto;

public interface UserService {

	User create(CreateUserDto createUserDto) throws Exception;

	Collection<User> findAll();

	User findOneById(Long id);

	User update(UpdateUserDto updateUserDto) throws Exception;
	User update(User user) throws Exception;

	void delete(Long id);
}
