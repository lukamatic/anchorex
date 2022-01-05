package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.UserValidationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserValidationTokenRepository extends JpaRepository<UserValidationToken, Long> {

    @Query(value = "SELECT * FROM user_validation_token AS t WHERE t.userId = ?1", nativeQuery = true)
    UserValidationToken findByUserId(Long userId);

    @Query(value = "SELECT * FROM user_validation_token AS t WHERE t.token = ?1", nativeQuery = true)
    UserValidationToken findByToken(String token);
}
