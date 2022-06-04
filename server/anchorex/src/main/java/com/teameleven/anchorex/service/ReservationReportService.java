package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.ReservationReport;

import java.util.Collection;

public interface ReservationReportService {
    Collection<ReservationReport> findAll();

    void approve(Long id, Boolean penalty);

    void reject(Long id);
}
