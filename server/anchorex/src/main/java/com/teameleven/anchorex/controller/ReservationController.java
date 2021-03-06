package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.Complaint;
import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.domain.Reservation;
import com.teameleven.anchorex.domain.ReservationReport;
import com.teameleven.anchorex.dto.*;
import com.teameleven.anchorex.dto.reservationentity.ClientReservationDTO;
import com.teameleven.anchorex.dto.reservationentity.FullClientReservationDTO;
import com.teameleven.anchorex.enums.ReservationEntityType;
import com.teameleven.anchorex.mapper.LodgeMapper;
import com.teameleven.anchorex.mapper.ReservationMapper;
import com.teameleven.anchorex.repository.RevisionRepository;
import com.teameleven.anchorex.service.*;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.PessimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;

import java.security.Principal;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    @Autowired
    private final ReservationService reservationService;

    @Autowired
    private FreePeriodService freePeriodService;

    @Autowired
    private UserService userService;
    @Autowired
    private LodgeService lodgeService;

    @Autowired
    private RevisionRepository revisionRepository;

    @Autowired
    private ComplaintService complaintService;

    public ReservationController(ReservationService reservationService, FreePeriodService freePeriodService,
            UserService userService, LodgeService lodgeService, RevisionRepository revisionRepository,ComplaintService complaintService) {
        this.reservationService = reservationService;
        this.freePeriodService = freePeriodService;
        this.userService = userService;
        this.lodgeService = lodgeService;
        this.revisionRepository = revisionRepository;
        this.complaintService = complaintService;
    }

    @PostMapping(path = "/createReservation", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Reservation> create(@RequestBody ReservationDTO reservationDTO) {
        if(!freePeriodService.checkReservationDates(reservationDTO.getStartDate(), reservationDTO.getEndDate(),
                reservationDTO.getReservationEntityId())){
            throw new PessimisticLockingFailureException("Entity already reserved");
        }
        var reservation = reservationService.createReservation(reservationDTO);
        return new ResponseEntity<>(reservation, HttpStatus.CREATED);
    }

    @PostMapping(path = "/checkCaptainAvailability", consumes = MediaType.APPLICATION_JSON_VALUE)
    public boolean checkCaptainAvailability(@RequestBody DateRangeDTO dateRange) {
        return reservationService.checkCaptainAvailability(dateRange);
    }

    @GetMapping(path = "/openReservations/{id}")
    public ResponseEntity<List<ClientReservationDTO>> getOpenReservations(@PathVariable Long id) {
        var reservations = reservationService.getFreeReservationDtos(id);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<ClientReservationDTO>> getAllReservations() {
        var reservations = reservationService.getAllReservations();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @PostMapping(path = "/createPersonalReservation", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> createPersonalReservation(@RequestBody ReservationDTO reservationDTO) {
        if(!freePeriodService.checkReservationDates(reservationDTO.getStartDate(), reservationDTO.getEndDate(),
                reservationDTO.getReservationEntityId())){
            throw new PessimisticLockingFailureException("Entity already reserved");
        }
        var reservation = reservationService.createPersonalReservation(reservationDTO);
        return new ResponseEntity<>( HttpStatus.CREATED);
    }

    @PutMapping(path = "/takeQuickAction", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateLodge(@RequestBody ReservationDTO reservationDTO) {

        reservationService.updateReservation(reservationDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(path = "/bookedReservations/{id}")
    public ResponseEntity<List<ClientReservationDTO>> getBookedReservations(@PathVariable Long id) {
        var reservations = reservationService.getBookedReservationDtos(id);
        for (ClientReservationDTO reservationDTO : reservations) {
            reservationDTO.setUserFullname(userService.findOneById(reservationDTO.getUserId()).getFirstName()
                    + " " + userService.findOneById(reservationDTO.getUserId()).getLastName());
        }
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping(path = "/closedReservations")
    public ResponseEntity<List<ClientReservationDTO>> getClosedReservations(@RequestParam String email) {
        var user = userService.findByEmail(email);
        var reservations = reservationService.getClosedReservationDtos(user.getId());
        for (ClientReservationDTO reservationDTO : reservations) {
            reservationDTO.setUserFullname(userService.findOneById(reservationDTO.getUserId()).getFirstName()
                    + " " + userService.findOneById(reservationDTO.getUserId()).getLastName());
        }
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @PostMapping(path = "/report", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ReservationReport> createReport(@RequestParam String email,
            @RequestBody ReservationReportDTO reportDTO) {
        reportDTO.setOwnerId(userService.findByEmail(email).getId());
        var report = reservationService.createReport(reportDTO);
        return new ResponseEntity<>(report, HttpStatus.CREATED);
    }

    @GetMapping(path = "/forUser/{id}")
    public ResponseEntity<List<FullClientReservationDTO>> getReservationsForUser(@PathVariable Long id) {
        List<FullClientReservationDTO> retData = new ArrayList<>();
        var reservations = reservationService.getReservationsForUser(id);
        Date rn = new Date();
        for (FullClientReservationDTO reservationDTO : reservations) {
            if (reservationDTO.getEndDate().after(rn)) {
                reservationDTO.setUserFullname(userService.findOneById(reservationDTO.getUserId()).getFirstName()
                        + " " + userService.findOneById(reservationDTO.getUserId()).getLastName());
                reservationDTO.setLodgeInfo(LodgeMapper
                        .lodgeToLodgeDisplayDTO(lodgeService.getLodgeById(reservationDTO.getReservationEntityId())));
                retData.add(reservationDTO);
            }
        }
        return new ResponseEntity<>(retData, HttpStatus.OK);
    }

    @GetMapping(path = "/historyForUser/{id}")
    public ResponseEntity<List<FullClientReservationDTO>> getPastReservationsForUser(@PathVariable Long id) {

        List<FullClientReservationDTO> retData = new ArrayList<>();
        var reservations = reservationService.getReservationsForUser(id);
        Date rn = new Date();
        for (FullClientReservationDTO reservationDTO : reservations) {
            if (reservationDTO.getEndDate().before(rn)) {
                reservationDTO.setUserFullname(userService.findOneById(reservationDTO.getUserId()).getFirstName()
                        + " " + userService.findOneById(reservationDTO.getUserId()).getLastName());
                if(reservationDTO.getReservationType() == ReservationEntityType.LODGE)
                    reservationDTO.setLodgeInfo(LodgeMapper.lodgeToLodgeDisplayDTO(lodgeService.getLodgeById(reservationDTO.getReservationEntityId())));
                var revision = revisionRepository.getReservationRevisionFromUser(
                        reservationDTO.getReservationEntityId(), reservationDTO.getUserId());
                if (revision != null)
                    reservationDTO.setRevisionStatus(revision.getStatus());
                retData.add(reservationDTO);
            }
        }
        return new ResponseEntity<>(retData, HttpStatus.OK);
    }

    @GetMapping(path = "/monthly")
    public int[] reservationNumberByMonth(@RequestParam int year, @RequestParam String email) {
        Long id = userService.findByEmail(email).getId();
        return reservationService.getReservationNumberByMonth(year, id);
    }

    @GetMapping(path = "/yearly")
    public int[] reservationNumberByYear(@RequestParam String email) {
        Long id = userService.findByEmail(email).getId();
        return reservationService.getReservationNumberByYear(id);
    }

    @GetMapping(path = "/weekly")
    public int[] reservationNumberByWeek(@RequestParam String email) {
        Long id = userService.findByEmail(email).getId();
        return reservationService.getReservationNumberByWeek(id);
    }

    @GetMapping(path = "/salaryYearly")
    public double[] salaryByYear(@RequestParam String email) {
        Long id = userService.findByEmail(email).getId();
        return reservationService.getSalaryByYear(id);
    }

    @PostMapping(path = "/createRevision", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createReview(@RequestBody RevisionDTO revisionDTO) {
        reservationService.crateRevision(revisionDTO);
        return new ResponseEntity<>("Ok", HttpStatus.OK);
    }


    @PostMapping(path = "/createComplaint", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createComplaint(@RequestBody ComplaintDTO complaintDTO) {
        reservationService.createComplaint(complaintDTO);
        return new ResponseEntity<>("Ok", HttpStatus.OK);
    }

    @GetMapping(path = "/complaints/{userId}")
    public ResponseEntity<Collection<FullClientComplaintDTO>> getUserComplaints(@PathVariable Long userId) {
        var complaints = complaintService.findComplaintsForUser(userId);
        return new ResponseEntity<>(complaints, HttpStatus.OK);
    }

    @GetMapping(path = "/appRevenue", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Double> getAppRevenue(@RequestParam String from, @RequestParam String to) {
        var reservations = this.reservationService.getClosedReservations();

        var total = 0.0;

        for (var reservation : reservations) {
            if (reservation.getStartDate().after(new Date(from)) && reservation.getStartDate().before(new Date(to))) {
                total += reservation.getPrice() * reservation.getAppPercentage();
            }
        }

        return new ResponseEntity<>(total, HttpStatus.OK);
    }

    @GetMapping(path = "/allReservations/{entityId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Collection<ReservationCalendarDto>> getAllRes(@PathVariable("entityId") Long entityId) {
        var reservations = this.reservationService.getAllRes(entityId);
        var dtos = ReservationMapper.toCalendarDtos(reservations);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

}
