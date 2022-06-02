package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.UserValidationToken;

public interface UserValidationTokenService {

    UserValidationToken create(UserValidationToken userValidationToken) throws Exception;

    UserValidationToken findByUserId(Long userId);

    UserValidationToken findByToken(String token);

    void delete(Long id);
}
