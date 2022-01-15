package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Reservation;
import com.teameleven.anchorex.dto.ReservationDTO;

public interface ReservationService {
    Reservation createReservation(ReservationDTO reservationDTO);
}
