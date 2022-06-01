package com.teameleven.anchorex.dto.reservationentity;

import com.teameleven.anchorex.domain.Service;
import com.teameleven.anchorex.dto.ServiceDTO;

import java.util.Date;
import java.util.Set;

public class ClientReservationDTO {
    private Date startDate;
    private Date endDate;
    private Integer maxPersonNumber;
    private double discount;
    private double price;
    private Set<ServiceDTO> services;
    private Long userId;
    private boolean captain;
    private Long reservationEntityId;
    private String userFullname;

    public String getUserFullname() {
        return userFullname;
    }

    public void setUserFullname(String userFullname) {
        this.userFullname = userFullname;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public ClientReservationDTO(){
        super();
    }

    public boolean isCaptain() {
        return captain;
    }

    public void setCaptain(boolean captain) {
        this.captain = captain;
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

    public Set<ServiceDTO> getServices() {
        return services;
    }

    public void setServices(Set<ServiceDTO> services) {
        this.services = services;
    }
}
