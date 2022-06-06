package com.teameleven.anchorex.dto;

import com.teameleven.anchorex.enums.ComplaintStatus;

public class FullClientComplaintDTO {


    private ComplaintStatus complaintStatus;

    private String reservationName;
    private Long reservationId;
    private String comment;

    public Long getReservationId() {
        return reservationId;
    }

    public void setReservationId(Long reservationId) {
        this.reservationId = reservationId;
    }

    public ComplaintStatus getComplaintStatus() {
        return complaintStatus;
    }

    public void setComplaintStatus(ComplaintStatus complaintStatus) {
        this.complaintStatus = complaintStatus;
    }

    public String getReservationName() {
        return reservationName;
    }

    public void setReservationName(String reservationName) {
        this.reservationName = reservationName;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public FullClientComplaintDTO(){
        super();
    }




}
