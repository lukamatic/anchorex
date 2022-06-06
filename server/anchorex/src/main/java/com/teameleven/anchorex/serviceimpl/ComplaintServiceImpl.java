package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Complaint;
import com.teameleven.anchorex.dto.FullClientComplaintDTO;
import com.teameleven.anchorex.repository.ComplaintRepository;
import com.teameleven.anchorex.repository.ReservationRepository;
import com.teameleven.anchorex.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private final ComplaintRepository complaintRepository;

    @Autowired
    private final ReservationRepository reservationRepository;


    public ComplaintServiceImpl(ComplaintRepository complaintRepository, ReservationRepository reservationRepository) {
        this.complaintRepository = complaintRepository;
        this.reservationRepository = reservationRepository;
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
}
