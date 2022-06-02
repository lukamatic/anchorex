package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Reservation;
import com.teameleven.anchorex.domain.ReservationReport;
import com.teameleven.anchorex.dto.DateRangeDTO;
import com.teameleven.anchorex.dto.ReservationDTO;
import com.teameleven.anchorex.dto.ReservationReportDTO;
import com.teameleven.anchorex.dto.reservationentity.ClientReservationDTO;
import com.teameleven.anchorex.mapper.ReportMapper;
import com.teameleven.anchorex.mapper.ReservationMapper;
import com.teameleven.anchorex.repository.ReservationEntityRepository;
import com.teameleven.anchorex.repository.ReservationReportRepository;
import com.teameleven.anchorex.repository.ReservationRepository;
import com.teameleven.anchorex.repository.UserRepository;
import com.teameleven.anchorex.service.ReservationService;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
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

    public ReservationServiceImpl(ReservationRepository reservationRepository,
                                  ReservationEntityRepository entityRepository,
                                  ReservationReportRepository reportRepository, UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.entityRepository = entityRepository;
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Reservation createReservation(ReservationDTO reservationDTO) {
        Reservation reservation = ReservationMapper.reservationDTOToReservation(reservationDTO);
        reservation.setOwnerId(entityRepository.getOwnerId(reservation.getReservationEntityId()));
        reservationRepository.save(reservation);
        return reservation;
    }

    @Override
    public Reservation createPersonalReservation(ReservationDTO reservationDTO) {
        Reservation personalReservation = ReservationMapper.reservationDTOToReservation(reservationDTO);
        personalReservation.setUserId(reservationDTO.getUserId());
        personalReservation.setOwnerId(entityRepository.getOwnerId(personalReservation.getReservationEntityId()));
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
    public List<ClientReservationDTO> getFreeReservations(Long id) {
        List<ClientReservationDTO> reservationDTOS = new ArrayList<>();
        var reservations =  reservationRepository.getEntityReservations(id);
        for(Reservation reservation: reservations){
            reservationDTOS.add(ReservationMapper.reservationToClientReservationDTO(reservation));
        }
        return reservationDTOS;
    }

    @Override
    public List<ClientReservationDTO> getBookedReservations(Long id) {
        List<ClientReservationDTO> reservationDTOS = new ArrayList<>();
        var reservations =  reservationRepository.getBookedReservations(id);
        for(Reservation reservation: reservations){
            reservationDTOS.add(ReservationMapper.reservationToClientReservationDTO(reservation));
        }
        return reservationDTOS;
    }

    @Override
    public List<ClientReservationDTO> getClosedReservations(Long id) {
        List<ClientReservationDTO> reservationDTOS = new ArrayList<>();
        var reservations =  reservationRepository.getClosedReservations(id);
        for(Reservation reservation: reservations){
            reservationDTOS.add(ReservationMapper.reservationToClientReservationDTO(reservation));
        }
        return reservationDTOS;
    }

    @Override
    public ReservationReport createReport(ReservationReportDTO reportDTO) {
        ReservationReport report = ReportMapper.reportDTOToReport(reportDTO);
        report.setClient(userRepository.getOne(reportDTO.getClientId()));
        reportRepository.save(report);
        return report;
    }

    @Override
    public int[] getReservationNumberByMonth(int year, Long id) {
        int[] monthlyReservations = new int[12];
        for(int i = 1; i <= 12; i++){
            monthlyReservations[i-1] = reservationRepository.getReservationNumberByMonth(i, year, id);
        }
        return monthlyReservations;
    }

    @Override
    public int[] getReservationNumberByYear(Long id) {
        int[] yearlyReservations = new int[5];
        int index = 0;
        for(int i = 2018; i <= 2022; i++){
            yearlyReservations[index] = reservationRepository.getReservationNumberByYear(i, id);
            index++;
        }
        return yearlyReservations;
    }

    @Override
    public int[] getReservationNumberByWeek(Long id) {
        List<Reservation> monthlyReservations = reservationRepository.getReservationsByMonth(5, 2022, id);
        int[] weeklyReservations = new int[4];
        int index = 0;
        ZoneId defaultZoneId = ZoneId.systemDefault();
        for(int i = 1; i<= 29; i+=7){
            LocalDate localBeggining = LocalDate.of(2022,5,i);
            int endDayOfMonth = i + 6;
            if (i < 29){
                endDayOfMonth = 31;
            }
            LocalDate localEnding = LocalDate.of(2022,5,endDayOfMonth);
            Date begginingOfTheWeek = Date.from(localBeggining.atStartOfDay(defaultZoneId).toInstant());
            Date endingOfTheWeek = Date.from(localEnding.atStartOfDay(defaultZoneId).toInstant());
            for(Reservation reservation: monthlyReservations){
                if (reservation.getStartDate().after(begginingOfTheWeek) && reservation.getStartDate().before(endingOfTheWeek)){
                    weeklyReservations[index]++;
                    index++;
                }
            }
        }
        return weeklyReservations;
    }

    @Override
    public double[] getSalaryByYear(Long id) {
        double[] yearlySalaries = new double[5];
        int index = 0;
        for(int i = 2018; i <= 2022; i++){
            yearlySalaries[index] = reservationRepository.getSalaryByYear(i, id);
            index++;
        }
        return yearlySalaries;
    }

    @Override
    public boolean checkIfEntityIsAvailable(Long id){
        List<Reservation> bookedReservations = reservationRepository.getBookedReservations(id);
        for(Reservation reservation: bookedReservations){
            if(reservation.getStartDate().before(new Date()) && reservation.getEndDate().after(new Date())){
                return false;
            }
        }
        return true;
    }
}
