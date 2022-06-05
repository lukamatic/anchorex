package com.teameleven.anchorex.dto;

import java.util.Date;

public class BookingItemsRequestDTO {
    private Date startDate;
    private Date endDate;

    private int numberOfPeople;


    public BookingItemsRequestDTO() {
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

    public int getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(int numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
