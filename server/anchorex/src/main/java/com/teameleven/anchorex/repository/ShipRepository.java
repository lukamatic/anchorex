package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.domain.Ship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Column;
import java.util.List;

public interface ShipRepository extends JpaRepository<Ship, Long> {

    @Query(value = "SELECT s FROM Ship s WHERE s.ownerId=?1")
    List<Ship> getShipByUserId(Long id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE ReservationEntity r SET r.deleted=true WHERE r.id=?1 ")
    void deleteShip (Long id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Ship s SET s.description=?1, s.name=?2, s.length=?3, s.engineCount=?4, s.enginePower=?5, " +
            "s.rulesOfConduct=?6, s.maxSpeed=?7, s.navigationKit=?8, s.capacity=?9, s.fishingKit=?10, " +
            "s.cancellationPercentage=?11, s.shipType=?12 WHERE s.id=?13")
    void updateShip(String description, String name, double length, Integer engineCount,
                     double enginePower, String rulesOfConduct, double maxSpeed, String navigationKit,
                     Integer capacity, String fishingKit, double cancellationPercentage, String shipType, Long id);
}
