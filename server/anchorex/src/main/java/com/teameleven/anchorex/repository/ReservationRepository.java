package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query(value = "SELECT r FROM Reservation r where r.ownerId=?1 and r.captain=true")
    List<Reservation> getOwnerReservations(Long id);

    @Query(value = "SELECT r FROM Reservation r where r.reservationEntityId=?1 and r.userId=null")
    List<Reservation> getEntityReservations(Long id);

}
