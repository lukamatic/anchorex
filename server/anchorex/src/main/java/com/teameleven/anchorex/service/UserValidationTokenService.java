package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Test;
import com.teameleven.anchorex.domain.UserValidationToken;
import com.teameleven.anchorex.dto.test.UpdateTestDto;

public interface UserValidationTokenService {

    UserValidationToken create(UserValidationToken userValidationToken) throws Exception;

    UserValidationToken findByUserId(Long userId);

    UserValidationToken findByToken(String token);

    void delete(Long id);
}
