package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.ReservationEntity;
import com.teameleven.anchorex.dto.reservationentity.FreePeriodDTO;

import java.util.Date;

public interface FreePeriodService {
    void addFreePeriod(FreePeriodDTO period, ReservationEntity entity);

    boolean checkReservationDates(Date startDate, Date endDate, Long id);
}
