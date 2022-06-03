package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Reservation;
import com.teameleven.anchorex.domain.ReservationReport;
import com.teameleven.anchorex.dto.DateRangeDTO;
import com.teameleven.anchorex.dto.ReservationDTO;
import com.teameleven.anchorex.dto.ReservationReportDTO;
import com.teameleven.anchorex.dto.reservationentity.ClientReservationDTO;
import com.teameleven.anchorex.mapper.ReportMapper;
import com.teameleven.anchorex.mapper.ReservationMapper;
import com.teameleven.anchorex.repository.*;
import com.teameleven.anchorex.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private final ReservationRepository reservationRepository;

    @Autowired
    private final ReservationEntityRepository entityRepository;

    @Autowired
    private final ReservationReportRepository reportRepository;

    @Autowired
    private final UserRepository userRepository;

    private final BusinessConfigurationRepository businessConfigurationRepository;

    public ReservationServiceImpl(ReservationRepository reservationRepository,
                                  ReservationEntityRepository entityRepository,
                                  ReservationReportRepository reportRepository, UserRepository userRepository,
                                  BusinessConfigurationRepository businessConfigurationRepository) {
        this.reservationRepository = reservationRepository;
        this.entityRepository = entityRepository;
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
        this.businessConfigurationRepository = businessConfigurationRepository;
    }

    @Override
    public Reservation createReservation(ReservationDTO reservationDTO) {
        Reservation reservation = ReservationMapper.reservationDTOToReservation(reservationDTO);
        reservation.setOwnerId(entityRepository.getOwnerId(reservation.getReservationEntityId()));
        reservation.setAppPercentage(businessConfigurationRepository.findById(1L).get().getAppPercentage());
        reservationRepository.save(reservation);
        return reservation;
    }

    @Override
    public Reservation createPersonalReservation(ReservationDTO reservationDTO) {
        Reservation personalReservation = ReservationMapper.reservationDTOToReservation(reservationDTO);
        personalReservation.setUserId(reservationDTO.getUserId());
        personalReservation.setOwnerId(entityRepository.getOwnerId(personalReservation.getReservationEntityId()));
        personalReservation.setAppPercentage(businessConfigurationRepository.findById(1L).get().getAppPercentage());
        reservationRepository.save(personalReservation);
        return personalReservation;
    }

    @Override
    public boolean checkCaptainAvailability(DateRangeDTO dateRangeDTO) {
        List<Reservation> reservations = reservationRepository.getOwnerReservations(dateRangeDTO.getOwnerId());
        for(Reservation reservation: reservations){
            if(dateRangeDTO.getStartDate().before(reservation.getStartDate()) &&
               dateRangeDTO.getEndDate().before(reservation.getStartDate())){
                continue;
            }
            else if(dateRangeDTO.getStartDate().after(reservation.getEndDate()) &&
                    dateRangeDTO.getEndDate().after(reservation.getEndDate())) {
                continue;
            }
            else{
                return false;
            }
        }
        return true;
    }

    @Override
    public List<ClientReservationDTO> getFreeReservationDtos(Long id) {
        List<ClientReservationDTO> reservationDTOS = new ArrayList<>();
        var reservations =  reservationRepository.getEntityReservations(id);
        for(Reservation reservation: reservations){
            reservationDTOS.add(ReservationMapper.reservationToClientReservationDTO(reservation));
        }
        return reservationDTOS;
    }

    @Override
    public List<ClientReservationDTO> getBookedReservationDtos(Long id) {
        List<ClientReservationDTO> reservationDTOS = new ArrayList<>();
        var reservations =  reservationRepository.getBookedReservations(id);
        for(Reservation reservation: reservations){
            reservationDTOS.add(ReservationMapper.reservationToClientReservationDTO(reservation));
        }
        return reservationDTOS;
    }

    @Override
    public List<ClientReservationDTO> getClosedReservationDtos(Long id) {
        List<ClientReservationDTO> reservationDTOS = new ArrayList<>();
        var reservations =  reservationRepository.getClosedReservations(id);
        for(Reservation reservation: reservations){
            reservationDTOS.add(ReservationMapper.reservationToClientReservationDTO(reservation));
        }
        return reservationDTOS;
    }

    @Override
    public List<Reservation> getClosedReservations() {
        return this.reservationRepository.getClosedReservations();
    }

    @Override
    public ReservationReport createReport(ReservationReportDTO reportDTO) {
        ReservationReport report = ReportMapper.reportDTOToReport(reportDTO);
        report.setClient(userRepository.getOne(reportDTO.getClientId()));
        reportRepository.save(report);
        return report;
    }
}
















