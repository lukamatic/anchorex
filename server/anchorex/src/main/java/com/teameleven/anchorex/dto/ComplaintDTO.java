package com.teameleven.anchorex.dto;

public class ComplaintDTO {

    private Long id;
    private Long reservationId;
    private Long userId;
    private String comment;

    private ComplaintDTO status;

    public ComplaintDTO(){
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

    public ComplaintDTO getStatus() {
        return status;
    }

    public void setStatus(ComplaintDTO status) {
        this.status = status;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }


}
