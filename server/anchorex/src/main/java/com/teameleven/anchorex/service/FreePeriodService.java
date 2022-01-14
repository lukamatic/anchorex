package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.ReservationEntity;
import com.teameleven.anchorex.dto.reservationentity.FreePeriodDTO;

public interface FreePeriodService {
    void addFreePeriod(FreePeriodDTO period, ReservationEntity entity);
}
