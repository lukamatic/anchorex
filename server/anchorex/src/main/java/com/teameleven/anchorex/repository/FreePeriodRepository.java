package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.FreePeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FreePeriodRepository extends JpaRepository<FreePeriod, Long> {

    @Query(value = "SELECT p FROM FreePeriod p WHERE p.reservationEntity.id=?1")
    List<FreePeriod> getFreePeriods(Long id);
}
