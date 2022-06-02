package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReservationEntityRepository extends JpaRepository<ReservationEntity, Long> {

    @Query(value = "SELECT e.ownerId FROM ReservationEntity e where e.id=?1")
    Long getOwnerId(Long id);
}
