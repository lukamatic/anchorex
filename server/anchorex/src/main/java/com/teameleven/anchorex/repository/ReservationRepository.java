package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
