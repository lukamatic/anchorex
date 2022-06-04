package com.teameleven.anchorex.dto.reservationentity;

import com.teameleven.anchorex.domain.Revision;
import com.teameleven.anchorex.dto.ServiceDTO;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDisplayDTO;
import com.teameleven.anchorex.enums.ReviewStatus;

import java.util.Date;
import java.util.Set;

public class FullClientReservationDTO {
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
    private Revision revision;
    private ReviewStatus revisionStatus;

    public ReviewStatus getRevisionStatus() {
        return revisionStatus;
    }

    public void setRevisionStatus(ReviewStatus revisionStatus) {
        this.revisionStatus = revisionStatus;
    }

    public Revision getRevision() {
        return revision;
    }

    public void setRevision(Revision revision) {
        this.revision = revision;
    }

    private com.teameleven.anchorex.dto.reservationEntity.LodgeDisplayDTO lodgeInfo;

    public LodgeDisplayDTO getLodgeInfo() {
        return lodgeInfo;
    }

    public void setLodgeInfo(LodgeDisplayDTO lodgeInfo) {
        this.lodgeInfo = lodgeInfo;
    }

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

    public FullClientReservationDTO(){
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
