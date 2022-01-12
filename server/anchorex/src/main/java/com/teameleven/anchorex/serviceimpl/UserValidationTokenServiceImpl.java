package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.UserValidationToken;
import com.teameleven.anchorex.exceptions.TestNameTakenException;
import com.teameleven.anchorex.repository.UserValidationTokenRepository;
import com.teameleven.anchorex.service.UserValidationTokenService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

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
