package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.ReservationReport;
import com.teameleven.anchorex.dto.ReservationReportDTO;

public class ReportMapper {
    private ReportMapper(){
    }

    public static ReservationReport reportDTOToReport(ReservationReportDTO reportDTO){
        ReservationReport report = new ReservationReport();
        report.setComment(reportDTO.getComment());
        report.setOwner(reportDTO.getOwnerId());
        report.setClientShowedUp(reportDTO.isClientShowedUp());
        report.setPenaltySuggestion(reportDTO.isPenaltySuggestion());
        return report;
    }
}
