package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Complaint;
import com.teameleven.anchorex.dto.FullClientComplaintDTO;
import com.teameleven.anchorex.enums.ComplaintStatus;
import com.teameleven.anchorex.repository.ComplaintRepository;
import com.teameleven.anchorex.repository.ReservationRepository;
import com.teameleven.anchorex.service.ComplaintService;
import com.teameleven.anchorex.service.UserService;
import com.wildbit.java.postmark.Postmark;
import com.wildbit.java.postmark.client.ApiClient;
import com.wildbit.java.postmark.client.data.model.message.MessageResponse;
import com.wildbit.java.postmark.client.data.model.templates.TemplatedMessage;
import com.wildbit.java.postmark.client.exception.PostmarkException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private final ComplaintRepository complaintRepository;

    @Autowired
    private final ReservationRepository reservationRepository;

    private final UserService userService;


    public ComplaintServiceImpl(ComplaintRepository complaintRepository, ReservationRepository reservationRepository, UserService userService) {
        this.complaintRepository = complaintRepository;
        this.reservationRepository = reservationRepository;
        this.userService = userService;
    }

    @Override
    public Collection<FullClientComplaintDTO> findComplaintsForUser(Long userId) {
        List<Complaint> complaints = complaintRepository.getReservationComplaintsFromUser(userId);
        List<FullClientComplaintDTO> fullComplaints = new ArrayList<>();
        for(var complaint: complaints){
            FullClientComplaintDTO fcp = new FullClientComplaintDTO();
            fcp.setComment(complaint.getComment());
            fcp.setComplaintStatus(complaint.getStatus());
            fcp.setReservationName(complaint.getReservation().getName());
            fcp.setReservationId(complaint.getReservation().getId());
            fullComplaints.add(fcp);
        }
        return fullComplaints;
    }

    @Override
    public Collection<Complaint> findAll() {
        return this.complaintRepository.findAll();
    }


    @Override
    public void answer(Long id, String answer) {
        var complaint = this.complaintRepository.findById(id).orElse(null);

        if (complaint == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such complaint");
        }

        var owner = this.userService.findOneById(complaint.getReservation().getOwnerId());
        var user = this.userService.findOneById(complaint.getUser().getId());

        ApiClient client = Postmark.getApiClient("2c3c225b-f823-4924-b983-4b1a82ad17ea");
        TemplatedMessage message = new TemplatedMessage("obradovic.petar@uns.ac.rs", owner.getEmail());
        message.setTemplateId(28182911);
        // set model as HashMap
        HashMap model = new HashMap<String, Object>();
        model.put("complainId", complaint.getId());
        model.put("reservationEntity", complaint.getReservation().getName());
        model.put("comment", complaint.getComment());
        model.put("adminAnswer", answer);

        message.setTemplateModel(model);

        try {
            MessageResponse response = client.deliverMessage(message);
        } catch (PostmarkException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        ApiClient client2 = Postmark.getApiClient("2c3c225b-f823-4924-b983-4b1a82ad17ea");
        TemplatedMessage message2 = new TemplatedMessage("obradovic.petar@uns.ac.rs", user.getEmail());
        message.setTemplateId(28182911);
        // set model as HashMap
        HashMap model2 = new HashMap<String, Object>();
        model.put("complainId", complaint.getId());
        model.put("reservationEntity", complaint.getReservation().getName());
        model.put("comment", complaint.getComment());
        model.put("adminAnswer", answer);

        message.setTemplateModel(model);

        try {
            MessageResponse response = client.deliverMessage(message);
        } catch (PostmarkException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        complaint.setStatus(ComplaintStatus.ANSWERED);
        this.complaintRepository.save(complaint);
    }
}
