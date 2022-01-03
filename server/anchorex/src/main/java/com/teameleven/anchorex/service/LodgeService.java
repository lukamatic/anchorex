package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.dto.reservationEntity.CreateLodgeDTO;

public interface LodgeService {
    Lodge create (CreateLodgeDTO createLodgeDTO);
}
