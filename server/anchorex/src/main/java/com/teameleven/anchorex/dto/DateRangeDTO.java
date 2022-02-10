package com.teameleven.anchorex.dto;

import java.util.Date;

public class DateRangeDTO {
    private Date startDate;
    private Date endDate;
    private Long ownerId;

    public DateRangeDTO(){
        super();
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
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
