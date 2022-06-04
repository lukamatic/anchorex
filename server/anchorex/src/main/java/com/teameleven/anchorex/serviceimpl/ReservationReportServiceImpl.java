package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.ReservationReport;
import com.teameleven.anchorex.domain.enumerations.ReservationReportStatus;
import com.teameleven.anchorex.repository.ReservationReportRepository;
import com.teameleven.anchorex.service.ReservationReportService;
import com.teameleven.anchorex.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;

@Service
public class ReservationReportServiceImpl implements ReservationReportService {
    private final UserService userService;
    private final ReservationReportRepository reservationReportRepository;

    public ReservationReportServiceImpl(UserService userService, ReservationReportRepository reservationReportRepository) {
        this.userService = userService;
        this.reservationReportRepository = reservationReportRepository;
    }

    @Override
    public Collection<ReservationReport> findAll() {
        return this.reservationReportRepository.findAll();
    }

    @Override
    public void approve(Long id, Boolean penalty) {
        var report = this.reservationReportRepository.findById(id).orElse(null);

        if (report == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such report");
        }

        report.setStatus(ReservationReportStatus.APPROVED);
        this.reservationReportRepository.save(report);

        if (!report.getClientShowedUp() || penalty) {
            this.userService.incrementPenaltyCount(report.getClient().getId());
        }

        //TODO: send mail
    }

    @Override
    public void reject(Long id) {
        var report = this.reservationReportRepository.findById(id).orElse(null);

        if (report == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such report");
        }

        report.setStatus(ReservationReportStatus.REJECTED);
        this.reservationReportRepository.save(report);
    }
}
