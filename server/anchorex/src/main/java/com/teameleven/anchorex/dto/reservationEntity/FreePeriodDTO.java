package com.teameleven.anchorex.dto.reservationEntity;

import java.util.Date;

public class FreePeriodDTO {
    public Date startDate;
    public Date endDate;


    public FreePeriodDTO() {

    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
