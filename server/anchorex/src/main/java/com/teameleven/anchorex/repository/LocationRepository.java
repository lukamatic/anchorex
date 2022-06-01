package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface LocationRepository extends JpaRepository<Location, Long> {

    @Transactional
    @Modifying
    @Query(value = "UPDATE Location l SET l.latitude=?1, l.longitude=?2, l.address=?3, l.city=?4, " +
            "l.country=?5 WHERE l.reservationEntity.id=?6")
    void updateLocation(double latitude, double longitude, String address, String city,
                     String country, Long id);
}
