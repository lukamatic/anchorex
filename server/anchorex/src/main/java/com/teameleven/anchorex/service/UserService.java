package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.User;
import com.teameleven.anchorex.dto.user.CreateUserDto;
import com.teameleven.anchorex.dto.user.UpdateUserDto;

import java.util.Collection;

public interface UserService {

	User create(CreateUserDto createUserDto) throws Exception;

	Collection<User> findAll();

	User findOneById(Long id);

	void update(UpdateUserDto updateUserDto) throws Exception;

	User update(User user) throws Exception;

	void delete(Long id);

	User findByEmail(String email);
	
    void enableUser(Long id);
	void updatePassword(Long userId, String password) throws Exception;

	void incrementPenaltyCount(Long userId);
}
