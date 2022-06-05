package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Complaint;
import com.teameleven.anchorex.dto.ComplaintDTO;
import com.teameleven.anchorex.repository.*;
import com.teameleven.anchorex.service.ComplaintService;
import com.teameleven.anchorex.service.FreePeriodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private final ComplaintRepository complaintRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final ReservationEntityRepository reservationEntityRepository;

    public ComplaintServiceImpl(ComplaintRepository complaintRepository, UserRepository userRepository, ReservationEntityRepository reservationEntityRepository) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
        this.reservationEntityRepository = reservationEntityRepository;
    }

    @Override
    public Complaint makeComplaint(ComplaintDTO complaintDTO) {
        Complaint complaint = new Complaint();

        complaint.setUser(userRepository.getOne(complaintDTO.getUserId()));
        complaint.setComment(complaint.getComment());
        complaint.setReservationEntity(reservationEntityRepository.getOne(complaintDTO.getReservationEntityId()));

        complaintRepository.save(complaint);
        return complaint;
    }

    @Override
    public Collection<Complaint> getComplainsForUser(Long userId) {
        return complaintRepository.findComplainsBy(userId);
    }
}
