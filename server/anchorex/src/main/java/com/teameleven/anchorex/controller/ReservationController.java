package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.domain.Reservation;
import com.teameleven.anchorex.domain.ReservationReport;
import com.teameleven.anchorex.dto.DateRangeDTO;
import com.teameleven.anchorex.dto.ReservationDTO;
import com.teameleven.anchorex.dto.ReservationReportDTO;
import com.teameleven.anchorex.dto.RevisionDTO;
import com.teameleven.anchorex.dto.reservationentity.ClientReservationDTO;
import com.teameleven.anchorex.dto.reservationentity.FullClientReservationDTO;
import com.teameleven.anchorex.mapper.LodgeMapper;
import com.teameleven.anchorex.repository.RevisionRepository;
import com.teameleven.anchorex.service.FreePeriodService;
import com.teameleven.anchorex.service.LodgeService;
import com.teameleven.anchorex.service.ReservationService;
import com.teameleven.anchorex.service.UserService;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
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

    public ReservationController(ReservationService reservationService, FreePeriodService freePeriodService,
                                 UserService userService, LodgeService lodgeService, RevisionRepository revisionRepository) {
        this.reservationService = reservationService;
        this.freePeriodService = freePeriodService;
        this.userService = userService;
        this.lodgeService = lodgeService;
        this.revisionRepository = revisionRepository;
    }


    @PostMapping(path="/createReservation", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Reservation> create(@RequestBody ReservationDTO reservationDTO){
        if(!freePeriodService.checkReservationDates(reservationDTO.getStartDate(), reservationDTO.getEndDate(),
                reservationDTO.getReservationEntityId())) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        var reservation = reservationService.createReservation(reservationDTO);

        return new ResponseEntity<>(reservation, HttpStatus.CREATED);
    }

    @PostMapping(path="/checkCaptainAvailability", consumes = MediaType.APPLICATION_JSON_VALUE)
    public boolean checkCaptainAvailability(@RequestBody DateRangeDTO dateRange){
        return reservationService.checkCaptainAvailability(dateRange);
    }

    @GetMapping(path="/openReservations/{id}")
    public ResponseEntity<List<ClientReservationDTO>> getOpenReservations(@PathVariable Long id){
        var reservations = reservationService.getFreeReservations(id);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping(path="/all")
    public ResponseEntity<List<ClientReservationDTO>> getAllReservations(){
        var reservations = reservationService.getAllReservations();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @PostMapping(path = "/createPersonalReservation", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Reservation> createPersonalReservation(@RequestBody ReservationDTO reservationDTO){
        if(!freePeriodService.checkReservationDates(reservationDTO.getStartDate(), reservationDTO.getEndDate(),
                reservationDTO.getReservationEntityId())){
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        var reservation = reservationService.createPersonalReservation(reservationDTO);
        return new ResponseEntity<>(reservation, HttpStatus.CREATED);
    }


    @PutMapping(path="/takeQuickAction", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateLodge(@RequestBody ReservationDTO reservationDTO){

        reservationService.updateReservation(reservationDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }



    @GetMapping(path="/bookedReservations/{id}")
    public ResponseEntity<List<ClientReservationDTO>> getBookedReservations(@PathVariable Long id){
        var reservations = reservationService.getBookedReservations(id);
        for(ClientReservationDTO reservationDTO: reservations){
            reservationDTO.setUserFullname(userService.findOneById(reservationDTO.getUserId()).getFirstName()
                    + " " + userService.findOneById(reservationDTO.getUserId()).getLastName());
        }
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }


    @GetMapping(path="/closedReservations")
    public ResponseEntity<List<ClientReservationDTO>> getClosedReservations(@RequestParam String email){
        var user = userService.findByEmail(email);
        var reservations = reservationService.getClosedReservations(user.getId());
        for(ClientReservationDTO reservationDTO: reservations){
            reservationDTO.setUserFullname(userService.findOneById(reservationDTO.getUserId()).getFirstName()
                    + " " + userService.findOneById(reservationDTO.getUserId()).getLastName());
        }
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @PostMapping(path="/report", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ReservationReport> createReport(@RequestParam String email, @RequestBody ReservationReportDTO reportDTO){
        reportDTO.setOwnerId(userService.findByEmail(email).getId());
        var report = reservationService.createReport(reportDTO);
        return new ResponseEntity<>(report, HttpStatus.CREATED);
    }

    @GetMapping(path="/forUser/{id}")
    public ResponseEntity<List<FullClientReservationDTO>> getReservationsForUser(@PathVariable Long id){
        List<FullClientReservationDTO> retData = new ArrayList<>();
         var reservations = reservationService.getReservationsForUser( id);
        Date rn = new Date();
        for(FullClientReservationDTO reservationDTO: reservations){
            if(reservationDTO.getEndDate().after(rn)){
                reservationDTO.setUserFullname(userService.findOneById(reservationDTO.getUserId()).getFirstName()
                        + " " + userService.findOneById(reservationDTO.getUserId()).getLastName());
                reservationDTO.setLodgeInfo(LodgeMapper.lodgeToLodgeDisplayDTO(lodgeService.getLodgeById(reservationDTO.getReservationEntityId())));
                retData.add(reservationDTO);
            }
        }
        return new ResponseEntity<>(retData, HttpStatus.OK);
    }

    @GetMapping(path="/historyForUser/{id}")
    public ResponseEntity<List<FullClientReservationDTO>> getPastReservationsForUser(@PathVariable Long id){

        List<FullClientReservationDTO> retData = new ArrayList<>();
        var reservations = reservationService.getReservationsForUser( id);
        Date rn = new Date();
        for(FullClientReservationDTO reservationDTO: reservations){
            if(reservationDTO.getEndDate().before(rn)){
                reservationDTO.setUserFullname(userService.findOneById(reservationDTO.getUserId()).getFirstName()
                        + " " + userService.findOneById(reservationDTO.getUserId()).getLastName());
                reservationDTO.setLodgeInfo(LodgeMapper.lodgeToLodgeDisplayDTO(lodgeService.getLodgeById(reservationDTO.getReservationEntityId())));
                var revision = revisionRepository.getReservationRevisionFromUser(reservationDTO.getReservationEntityId(), reservationDTO.getUserId());
                if(revision != null)
                    reservationDTO.setRevisionStatus(revision.getStatus());
                retData.add(reservationDTO);
            }
        }
        return new ResponseEntity<>(retData, HttpStatus.OK);
    }

    @GetMapping(path="/monthly")
    public int[] reservationNumberByMonth(@RequestParam int year, @RequestParam String email){
        Long id = userService.findByEmail(email).getId();
        return reservationService.getReservationNumberByMonth(year, id);
    }

    @GetMapping(path="/yearly")
    public int[] reservationNumberByYear(@RequestParam String email){
        Long id = userService.findByEmail(email).getId();
        return reservationService.getReservationNumberByYear(id);
    }

    @GetMapping(path="/weekly")
    public int[] reservationNumberByWeek(@RequestParam String email){
        Long id = userService.findByEmail(email).getId();
        return reservationService.getReservationNumberByWeek(id);
    }

    @GetMapping(path="/salaryYearly")
    public double[] salaryByYear(@RequestParam String email){
        Long id = userService.findByEmail(email).getId();
        return reservationService.getSalaryByYear(id);
    }


    @PostMapping(path="/createRevision", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createReview( @RequestBody RevisionDTO revisionDTO){
        reservationService.crateRevision(revisionDTO);
        return new ResponseEntity<>("Ok", HttpStatus.OK);
    }

}
