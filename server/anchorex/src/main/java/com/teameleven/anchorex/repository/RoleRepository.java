package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoleRepository extends JpaRepository<Role, Long> {

    @Query(value = "SELECT * FROM role AS r WHERE r.name = ?1", nativeQuery = true)
    Role findByName(String name);
}
