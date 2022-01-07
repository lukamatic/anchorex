package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.dto.reservationEntity.CreateLodgeDTO;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDTO;

import java.util.List;

public interface LodgeService {
    Lodge create (CreateLodgeDTO createLodgeDTO);

    List<LodgeDTO> getLodges();

    void deleteLodge(Long id);

    Lodge getLodgeById(Long id);
}
