package com.teameleven.anchorex.dto;

import java.util.Date;

public class FreePeriodDatesDTO {
    private Date startDate;
    private Date endDate;


    public FreePeriodDatesDTO() {
        super();
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
