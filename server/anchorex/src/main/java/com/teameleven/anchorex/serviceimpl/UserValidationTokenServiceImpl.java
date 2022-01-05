package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Test;
import com.teameleven.anchorex.domain.UserValidationToken;
import com.teameleven.anchorex.dto.test.CreateTestDto;
import com.teameleven.anchorex.dto.test.UpdateTestDto;
import com.teameleven.anchorex.exceptions.TestNameTakenException;
import com.teameleven.anchorex.repository.TestRepository;
import com.teameleven.anchorex.repository.UserValidationTokenRepository;
import com.teameleven.anchorex.service.TestService;
import com.teameleven.anchorex.service.UserValidationTokenService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;

@Service
public class UserValidationTokenServiceImpl implements UserValidationTokenService {
    private final UserValidationTokenRepository repository;

    public UserValidationTokenServiceImpl(UserValidationTokenRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserValidationToken create( UserValidationToken userValidationToken) throws Exception {
        UserValidationToken savedUserValidationToken = null;

        try {
            savedUserValidationToken = repository.save(userValidationToken);
        } catch (DataIntegrityViolationException e) {
            throw new TestNameTakenException();
        }

        return savedUserValidationToken;
    }

    @Override
    public UserValidationToken findByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    @Override
    public UserValidationToken findByToken(String token) {
        return repository.findByToken(token);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }


}
