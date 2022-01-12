package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TestRepository extends JpaRepository<Test, Long> {

    @Query(value = "SELECT * FROM test AS t WHERE t.name = ?1 AND t.deleted = false", nativeQuery = true)
    Test findByName(String name);
}
