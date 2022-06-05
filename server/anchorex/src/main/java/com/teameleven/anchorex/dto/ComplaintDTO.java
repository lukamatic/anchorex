package com.teameleven.anchorex.dto;

import java.util.Date;

public class ComplaintDTO {

    private Long userId;
    private Long reservationEntityId;
    private String comment;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getReservationEntityId() {
        return reservationEntityId;
    }

    public void setReservationEntityId(Long reservationEntityId) {
        this.reservationEntityId = reservationEntityId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public ComplaintDTO() {
        super();
    }


}
