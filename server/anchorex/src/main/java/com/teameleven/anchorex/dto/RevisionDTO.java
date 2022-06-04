package com.teameleven.anchorex.dto;

import com.teameleven.anchorex.domain.Reservation;
import com.teameleven.anchorex.domain.ReservationEntity;
import com.teameleven.anchorex.domain.Service;
import com.teameleven.anchorex.enums.ReviewStatus;

import java.util.Date;
import java.util.Set;

public class RevisionDTO {

    private Long id;
    private Long reservationId;
    private Long userId;
    private String comment;
    private Integer rating;
    private ReviewStatus status;

    public RevisionDTO(){
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getReservationId() {
        return reservationId;
    }

    public void setReservationId(Long reservationId) {
        this.reservationId = reservationId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public ReviewStatus getStatus() {
        return status;
    }

    public void setStatus(ReviewStatus status) {
        this.status = status;
    }
}
