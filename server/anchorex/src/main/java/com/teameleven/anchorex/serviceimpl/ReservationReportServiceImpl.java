package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.ReservationReport;
import com.teameleven.anchorex.domain.enumerations.ReservationReportStatus;
import com.teameleven.anchorex.repository.ReservationReportRepository;
import com.teameleven.anchorex.service.ReservationReportService;
import com.teameleven.anchorex.service.UserService;
import com.wildbit.java.postmark.Postmark;
import com.wildbit.java.postmark.client.ApiClient;
import com.wildbit.java.postmark.client.data.model.message.MessageResponse;
import com.wildbit.java.postmark.client.data.model.templates.TemplatedMessage;
import com.wildbit.java.postmark.client.exception.PostmarkException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;

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
        ApiClient client = Postmark.getApiClient("2c3c225b-f823-4924-b983-4b1a82ad17ea");
        TemplatedMessage message = new TemplatedMessage("obradovic.petar@uns.ac.rs", report.getOwner().getEmail());
        message.setTemplateId(28144927);
        // set model as HashMap
        HashMap model = new HashMap<String, Object>();
        model.put("Report id", report.getId());
        model.put("Client", String.format("%s %s", report.getClient().getFirstName(), report.getClient().getLastName()));
        model.put("Comment", report.getComment());
        model.put("Approved", "yes");
        if (report.getPenaltySuggestion()) {
            model.put("Penalty given", (!report.getClientShowedUp() || penalty) ? "yes" : "no");
        }

        message.setTemplateModel(model);

        try {
            MessageResponse response = client.deliverMessage(message);
        } catch (PostmarkException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
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
