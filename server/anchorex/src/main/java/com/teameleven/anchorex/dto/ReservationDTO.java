package com.teameleven.anchorex.dto;

import com.teameleven.anchorex.domain.Service;

import java.util.Date;
import java.util.Set;

public class ReservationDTO {
    private Date startDate;
    private Date endDate;
    private Integer maxPersonNumber;
    private double discount;
    private double price;
    private Set<Service> services;
    private Long reservationEntityId;

    public ReservationDTO(){
        super();
    }

    public Long getReservationEntityId() {
        return reservationEntityId;
    }

    public void setReservationEntityId(Long reservationEntityId) {
        this.reservationEntityId = reservationEntityId;
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

    public Integer getMaxPersonNumber() {
        return maxPersonNumber;
    }

    public void setMaxPersonNumber(Integer maxPersonNumber) {
        this.maxPersonNumber = maxPersonNumber;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Set<Service> getServices() {
        return services;
    }

    public void setServices(Set<Service> services) {
        this.services = services;
    }
}
