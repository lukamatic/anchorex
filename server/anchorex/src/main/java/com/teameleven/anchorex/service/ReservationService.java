package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Reservation;
import com.teameleven.anchorex.domain.ReservationReport;
import com.teameleven.anchorex.dto.DateRangeDTO;
import com.teameleven.anchorex.dto.ReservationDTO;
import com.teameleven.anchorex.dto.ReservationReportDTO;
import com.teameleven.anchorex.dto.reservationentity.ClientReservationDTO;

import java.util.List;

public interface ReservationService {
    Reservation createReservation(ReservationDTO reservationDTO);

    Reservation createPersonalReservation(ReservationDTO reservationDTO);

    boolean checkCaptainAvailability(DateRangeDTO dateRangeDTO);

    List<ClientReservationDTO> getFreeReservationDtos(Long id);

    List<ClientReservationDTO> getBookedReservationDtos(Long id);

    List<ClientReservationDTO> getClosedReservationDtos(Long id);

    List<Reservation> getClosedReservations();

    ReservationReport createReport(ReservationReportDTO reportDTO);

    int[] getReservationNumberByMonth(int year, Long id);

    int[] getReservationNumberByYear(Long id);

    int[] getReservationNumberByWeek(Long id);

    double[] getSalaryByYear(Long id);

    boolean checkIfEntityIsAvailable(Long id);
}
