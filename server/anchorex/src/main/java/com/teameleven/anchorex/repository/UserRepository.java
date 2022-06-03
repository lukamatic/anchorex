package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

public interface UserRepository extends JpaRepository<User, Long> {

	@Query(value = "SELECT * FROM users AS u WHERE u.id = ?1", nativeQuery = true)
	User findOneById(Long id);

	@Query(value = "SELECT * FROM users AS u WHERE u.email = ?1 AND u.deleted = false", nativeQuery = true)
	User findByEmail(String email);
	@Query(value = "SELECT * FROM users AS u WHERE u.id = ?1", nativeQuery = true)
	User updateUser(Long id, User user);

	@Query(value = "UPDATE * FROM users AS u WHERE u.id = ?1", nativeQuery = true)
	User updateUser(User user);

	@Transactional
	@Modifying
	@Query(value = "UPDATE User u SET u.address=?2, u.biography=?3, u.city = ?4, u.email = ?5, u.country = ?6, u.firstName = ?7, u.lastName = ?8, u.phoneNumber = ?9 WHERE u.id=?1")
	void updateUser(Long id, String address, String biography, String city, String email, String country, String firstName, String lastName, String phoneNumber);


	@Transactional
	@Modifying
	@Query(value = "UPDATE User u SET u.password=?2 WHERE u.id=?1")
	void updateUser(Long id, String password );
}
