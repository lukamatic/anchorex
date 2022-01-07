package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

	@Query(value = "SELECT * FROM users u WHERE u.email=?1", nativeQuery = true)
	User findByEmail(String email);

	@Query(value = "SELECT * FROM users AS u WHERE u.id = ?1", nativeQuery = true)
	User findOneById(Long id);

}
