package com.teameleven.anchorex.dto.reservationentity;

import com.teameleven.anchorex.domain.Revision;
import com.teameleven.anchorex.dto.LocationDTO;
import com.teameleven.anchorex.dto.ReservationEntityImageDto;
import com.teameleven.anchorex.dto.ServiceDTO;
import com.teameleven.anchorex.dto.fishingLesson.FishingLessonDisplayDto;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDisplayDTO;
import com.teameleven.anchorex.dto.reservationEntity.ShipDisplayDTO;
import com.teameleven.anchorex.enums.ReservationEntityType;
import com.teameleven.anchorex.enums.RevisionStatus;

import java.util.Date;
import java.util.Set;

public class FullClientReservationDTO {
    private Long id;
    private Date startDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    private Date endDate;
    private Integer maxPersonNumber;
    private double discount;
    private double price;
    private Set<ServiceDTO> services;
    private Long userId;
    private boolean captain;
    private Long reservationEntityId;
    private ReservationEntityType reservationType;
    private String userFullname;
    private Revision revision;
    private RevisionStatus revisionStatus;

    private String reservationName;

    public String getReservationName() {
        return reservationName;
    }

    public void setReservationName(String reservationName) {
        this.reservationName = reservationName;
    }

    public ReservationEntityType getReservationType() {
        return reservationType;
    }

    public void setReservationType(ReservationEntityType reservationType) {
        this.reservationType = reservationType;
    }

    public RevisionStatus getRevisionStatus() {
        return revisionStatus;
    }

    public void setRevisionStatus(RevisionStatus revisionStatus) {
        this.revisionStatus = revisionStatus;
    }

    public Revision getRevision() {
        return revision;
    }

    public void setRevision(Revision revision) {
        this.revision = revision;
    }


    private String name;
    private String description;

    private Set<ReservationEntityImageDto> images;
    private LocationDTO location;
    private Double averageRating;
    private ReservationEntityType type;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<ReservationEntityImageDto> getImages() {
        return images;
    }

    public void setImages(Set<ReservationEntityImageDto> images) {
        this.images = images;
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public ReservationEntityType getType() {
        return type;
    }

    public void setType(ReservationEntityType type) {
        this.type = type;
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
