package com.teameleven.anchorex.service;

import com.teameleven.anchorex.dto.FullClientComplaintDTO;


import java.util.Collection;

public interface ComplaintService {

    Collection<FullClientComplaintDTO> findComplaintsForUser(Long userId);
}
