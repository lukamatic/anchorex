package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Complaint;
import com.teameleven.anchorex.domain.FreePeriod;
import com.teameleven.anchorex.domain.ReservationEntity;
import com.teameleven.anchorex.dto.ComplaintDTO;
import com.teameleven.anchorex.dto.FreePeriodDTO;

import java.util.Collection;
import java.util.Date;
import java.util.List;

public interface ComplaintService {

    Complaint makeComplaint(ComplaintDTO complaintDTO);

    Collection<Complaint> getComplainsForUser(Long userId);
}
