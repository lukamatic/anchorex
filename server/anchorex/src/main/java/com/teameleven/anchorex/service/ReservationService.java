package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Reservation;
import com.teameleven.anchorex.domain.ReservationReport;
import com.teameleven.anchorex.dto.*;
import com.teameleven.anchorex.dto.reservationentity.ClientReservationDTO;
import com.teameleven.anchorex.dto.reservationentity.FullClientReservationDTO;

import java.util.Collection;
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

    List<ClientReservationDTO> getAllReservations();

    List<FullClientReservationDTO> getReservationsForUser(Long userId);

    void updateReservation(ReservationDTO reservationDTO);

    void crateRevision(RevisionDTO revisionDTO);

    Collection<Reservation> getAllReservationsByOwnerId(Long ownerId);

    void createComplaint(ComplaintDTO complaintDTO);
}
