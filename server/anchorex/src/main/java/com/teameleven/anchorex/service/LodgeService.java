package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.dto.reservationentity.CreateLodgeDTO;
import com.teameleven.anchorex.dto.reservationentity.FreePeriodDTO;
import com.teameleven.anchorex.dto.reservationentity.LodgeDTO;
import com.teameleven.anchorex.dto.reservationentity.ServiceDTO;

import java.util.List;

public interface LodgeService {
    Lodge create (CreateLodgeDTO createLodgeDTO);

    List<LodgeDTO> getLodges(Long id);

    void deleteLodge(Long id);

    Lodge getLodgeById(Long id);

    void updateLodge(Lodge lodge);

    void deleteService(Long id);

    void addService(ServiceDTO service, Long id);

    void addFreePeriod(FreePeriodDTO period, Long id);
}
