package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.Reservation;
import com.teameleven.anchorex.dto.ReservationDTO;

public class ReservationMapper {

    public static Reservation reservationDTOToReservation(ReservationDTO reservationDTO){
        Reservation reservation = new Reservation();
        reservation.setDiscount(reservationDTO.getDiscount());
        reservation.setReservationEntityId(reservationDTO.getReservationEntityId());
        reservation.setEndDate(reservationDTO.getEndDate());
        reservation.setPrice(reservationDTO.getPrice());
        reservation.setStartDate(reservationDTO.getStartDate());
        reservation.setServices(reservationDTO.getServices());
        reservation.setMaxPersonNumber(reservationDTO.getMaxPersonNumber());
        return reservation;
    }
}
