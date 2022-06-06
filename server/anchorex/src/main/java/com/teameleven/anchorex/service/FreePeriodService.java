package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.FreePeriod;
import com.teameleven.anchorex.domain.ReservationEntity;
import com.teameleven.anchorex.dto.FreePeriodDTO;

import java.util.Collection;
import java.util.Date;
import java.util.List;

public interface FreePeriodService  {
    void addFreePeriod(FreePeriodDTO period, ReservationEntity entity);

    boolean checkReservationDates(Date startDate, Date endDate, Long id);

    boolean checkIfPeriodIsFree(Date startDate, Date endDate, Long id);

    List<FreePeriod> getAllFreePeriods();

    Collection<FreePeriod> getAllFreePeriodsForEntity(Long entityId);
}
