package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Reservation;
import com.teameleven.anchorex.domain.ReservationReport;
import com.teameleven.anchorex.domain.Revision;
import com.teameleven.anchorex.domain.*;
import com.teameleven.anchorex.domain.enumerations.ReservationReportStatus;
import com.teameleven.anchorex.dto.*;
import com.teameleven.anchorex.dto.reservationentity.ClientReservationDTO;
import com.teameleven.anchorex.dto.reservationentity.FullClientReservationDTO;
import com.teameleven.anchorex.enums.ReviewStatus;
import com.teameleven.anchorex.enums.RevisionStatus;
import com.teameleven.anchorex.enums.ComplaintStatus;
import com.teameleven.anchorex.mapper.ReportMapper;
import com.teameleven.anchorex.mapper.ReservationMapper;
import com.teameleven.anchorex.mapper.RevisionMapper;
import com.teameleven.anchorex.repository.*;
import com.teameleven.anchorex.service.FreePeriodService;
import com.teameleven.anchorex.service.ReservationService;
import com.teameleven.anchorex.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.PessimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

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

    @Autowired
    private final RevisionRepository revisionRepository;

    private final UserService userService;

    private final FreePeriodService freePeriodService;

    @Autowired
    private final ComplaintRepository complaintRepository;

    private final BusinessConfigurationRepository businessConfigurationRepository;



    public ReservationServiceImpl(ReservationRepository reservationRepository,
                                  ReservationEntityRepository entityRepository,
                                  ReservationReportRepository reportRepository, UserRepository userRepository,
                                  RevisionRepository revisionRepository, ReservationEntityRepository reservationEntityRepository,
                                  UserService userService, FreePeriodService freePeriodService, BusinessConfigurationRepository businessConfigurationRepository) {
                                  ComplaintRepository complaintRepository, BusinessConfigurationRepository businessConfigurationRepository) {

        this.reservationRepository = reservationRepository;
        this.entityRepository = entityRepository;
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
        this.revisionRepository = revisionRepository;
        this.userService = userService;
        this.freePeriodService = freePeriodService;
        this.reservationEntityRepository = reservationEntityRepository;
        this.complaintRepository = complaintRepository;
        this.businessConfigurationRepository = businessConfigurationRepository;
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
    @Override
    public Reservation createReservation(ReservationDTO reservationDTO) {
        Reservation reservation = ReservationMapper.reservationDTOToReservation(reservationDTO);
        try{
            var reservationEntity = entityRepository.getLocked(reservationDTO.getReservationEntityId());
            reservation.setReservationEntity(reservationEntity);
            reservation.setOwnerId(reservationEntity.getOwnerId());
            if(!freePeriodService.checkReservationDates(reservationDTO.getStartDate(), reservationDTO.getEndDate(),
                    reservationDTO.getReservationEntityId())){
                throw new PessimisticLockingFailureException("Entity already reserved");
            }
            else{
                reservation.setAppPercentage(businessConfigurationRepository.findById(1L).get().getAppPercentage());
                reservationRepository.save(reservation);
                return reservation;
            }
        }catch(PessimisticLockingFailureException e) {
            System.out.println(e.getMessage());
            throw new PessimisticLockingFailureException("Entity already reserved");
        }

    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
    @Override
    public Reservation createPersonalReservation(ReservationDTO reservationDTO) {
        Reservation personalReservation = ReservationMapper.reservationDTOToReservation(reservationDTO);
        try{
            var user = userRepository.findOneById(reservationDTO.getUserId());
            var reservationEntity = entityRepository.getLocked(reservationDTO.getReservationEntityId());
            personalReservation.setUser(user);
            personalReservation.setReservationEntity(reservationEntity);
            personalReservation.setOwnerId(reservationEntity.getOwnerId());
            if(!freePeriodService.checkReservationDates(reservationDTO.getStartDate(), reservationDTO.getEndDate(),
                    reservationDTO.getReservationEntityId())){
                throw new PessimisticLockingFailureException("Entity already reserved");
            }
            else{
                personalReservation.setAppPercentage(businessConfigurationRepository.findById(1L).get().getAppPercentage());
                reservationRepository.save(personalReservation);
                return personalReservation;
            }
        }catch(PessimisticLockingFailureException e) {
            System.out.println(e.getMessage());
            throw new PessimisticLockingFailureException("Entity already reserved");
        }
    }

    @Override
    public boolean checkCaptainAvailability(DateRangeDTO dateRangeDTO) {
        List<Reservation> reservations = reservationRepository.getOwnerReservations(dateRangeDTO.getOwnerId());
        for (Reservation reservation : reservations) {
            if (dateRangeDTO.getStartDate().before(reservation.getStartDate()) &&
                    dateRangeDTO.getEndDate().before(reservation.getStartDate())) {
                continue;
            } else if (dateRangeDTO.getStartDate().after(reservation.getEndDate()) &&
                    dateRangeDTO.getEndDate().after(reservation.getEndDate())) {
                continue;
            } else {
                return false;
            }
        }
        return true;
    }

    @Override
    public List<ClientReservationDTO> getFreeReservationDtos(Long id) {
        List<ClientReservationDTO> reservationDTOS = new ArrayList<>();
        var reservations = reservationRepository.getEntityReservations(id);
        for (Reservation reservation : reservations) {
            if (reservation.getUser().getId() == null)
                reservationDTOS.add(ReservationMapper.reservationToClientReservationDTO(reservation));
        }
        return reservationDTOS;
    }

    @Override
    public List<ClientReservationDTO> getBookedReservationDtos(Long id) {
        List<ClientReservationDTO> reservationDTOS = new ArrayList<>();
        var reservations = reservationRepository.getBookedReservations(id);
        for (Reservation reservation : reservations) {
            reservationDTOS.add(ReservationMapper.reservationToClientReservationDTO(reservation));
        }
        return reservationDTOS;
    }

    @Override
    public List<ClientReservationDTO> getClosedReservationDtos(Long id) {
        List<ClientReservationDTO> reservationDTOS = new ArrayList<>();
        List<Reservation> reservations = reservationRepository.getClosedReservations(id);
        for (Reservation reservation : reservations) {
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
        report.setClient(userRepository.findOneById(reportDTO.getClientId()));
        report.setOwner(userRepository.findOneById(reportDTO.getOwnerId()));
        if(!report.getClientShowedUp()){
            report.setStatus(ReservationReportStatus.APPROVED);
            userService.incrementPenaltyCount(report.getClient().getId());
        }
        else{
            report.setStatus(ReservationReportStatus.PENDING);
        }
        reportRepository.save(report);
        return report;
    }

    @Override
    public int[] getReservationNumberByMonth(int year, Long id) {
        int[] monthlyReservations = new int[12];
        for (int i = 1; i <= 12; i++) {
            monthlyReservations[i - 1] = reservationRepository.getReservationNumberByMonth(i, year, id);
        }
        return monthlyReservations;
    }

    @Override
    public int[] getReservationNumberByYear(Long id) {
        int[] yearlyReservations = new int[5];
        int index = 0;
        for (int i = 2018; i <= 2022; i++) {
            yearlyReservations[index] = reservationRepository.getReservationNumberByYear(i, id);
            index++;
        }
        return yearlyReservations;
    }

    @Override
    public int[] getReservationNumberByWeek(Long id) {
        List<Reservation> monthlyReservations = reservationRepository.getReservationsByWeek(5, 2022, id);
        int[] weeklyReservations = new int[4];
        int index = 0;
        ZoneId defaultZoneId = ZoneId.systemDefault();
        for (int i = 1; i <= 29; i += 7) {
            LocalDate localBegining = LocalDate.of(2022, 5, i);
            int endDayOfMonth = i + 6;
            if (endDayOfMonth > 29) {
                endDayOfMonth = 31;
            }
            LocalDate localEnding = LocalDate.of(2022, 5, endDayOfMonth);
            Date beginingOfTheWeek = Date.from(localBegining.atStartOfDay(defaultZoneId).toInstant());
            Date endingOfTheWeek = Date.from(localEnding.atStartOfDay(defaultZoneId).toInstant());
            for (Reservation reservation : monthlyReservations) {
                if (reservation.getStartDate().after(beginingOfTheWeek)
                        && reservation.getStartDate().before(endingOfTheWeek)) {
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
        for (int i = 2018; i <= 2022; i++) {
            yearlySalaries[index] = reservationRepository.getSalaryByYear(i, id);
            index++;
        }
        return yearlySalaries;
    }

    @Override
    public boolean checkIfEntityIsAvailable(Long id) {
        List<Reservation> bookedReservations = reservationRepository.getBookedReservations(id);
        for (Reservation reservation : bookedReservations) {
            if (reservation.getStartDate().before(new Date()) && reservation.getEndDate().after(new Date())) {
                return false;
            }
        }
        return true;
    }

    @Override

    public List<ClientReservationDTO> getAllReservations() {
        List<ClientReservationDTO> reservationDTOS = new ArrayList<>();
        var reservations = reservationRepository.getAllUsedReservations();
        for (Reservation reservation : reservations) {
            reservationDTOS.add(ReservationMapper.reservationToClientReservationDTO(reservation));
        }
        return reservationDTOS;
    }

    @Override
    public List<FullClientReservationDTO> getReservationsForUser(Long userId) {
        List<FullClientReservationDTO> reservationDTOS = new ArrayList<>();
        var reservations = reservationRepository.getReservationsForUser(userId);
        for (Reservation reservation : reservations) {
            var dto = ReservationMapper.reservationToFullClientReservationDTO(reservation);
            // dto.setLodgeInfo(.lodgeToLodgeDisplayDTO(entityRepository.findById(dto.getReservationEntityId())));
            reservationDTOS.add(dto);

        }
        return reservationDTOS;
    }

    @Override
    public void updateReservation(ReservationDTO reservationDTO) {
        Reservation personalReservation = ReservationMapper.reservationDTOToReservation(reservationDTO);
        personalReservation.setUser(userRepository.findOneById(reservationDTO.getUserId()));
        personalReservation.setOwnerId(reservationDTO.getOwnerId());
        personalReservation.setId(reservationDTO.getId());
        reservationRepository.save(personalReservation);
    }

    @Override
    public void crateRevision(RevisionDTO revisionDTO) {
        Revision revision = RevisionMapper.RevisionDtoToRevision(revisionDTO);
        revision.setReservationEntity(reservationEntityRepository.getOne(revisionDTO.getReservationId()));
        revision.setStatus(RevisionStatus.PENDING);
        revisionRepository.save(revision);
    }

    public Collection<Reservation> getAllRes(Long entityId) {
        return this.reservationRepository.getAllRes(entityId);
    }

    @Override
    public void createComplaint(ComplaintDTO complaintDTO) {
        Complaint complaint = new Complaint();
        complaint.setComment(complaintDTO.getComment());
        complaint.setReservation(reservationEntityRepository.getOne(complaintDTO.getReservationId()));
        complaint.setUser(userRepository.findOneById(complaintDTO.getUserId()));
        complaint.setStatus(ComplaintStatus.PENDING);
        complaintRepository.save(complaint);
    }

}
