package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.domain.Ship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ShipRepository extends JpaRepository<Ship, Long> {

    @Query(value = "SELECT s FROM Ship s WHERE s.ownerId=?1")
    List<Ship> getShipByUserId(Long id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE ReservationEntity r SET r.deleted=true WHERE r.id=?1 ")
    void deleteShip (Long id);
}
