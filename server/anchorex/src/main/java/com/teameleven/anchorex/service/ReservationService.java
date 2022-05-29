package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Reservation;
import com.teameleven.anchorex.dto.DateRangeDTO;
import com.teameleven.anchorex.dto.ReservationDTO;
import com.teameleven.anchorex.dto.reservationentity.ClientReservationDTO;

import java.util.List;

public interface ReservationService {
    Reservation createReservation(ReservationDTO reservationDTO);

    Reservation createPersonalReservation(ReservationDTO reservationDTO);

    boolean checkCaptainAvailability(DateRangeDTO dateRangeDTO);

    List<ClientReservationDTO> getFreeReservations(Long id);

    List<ClientReservationDTO> getBookedReservations(Long id);
}
