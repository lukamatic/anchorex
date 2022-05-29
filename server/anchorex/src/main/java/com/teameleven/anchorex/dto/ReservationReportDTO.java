package com.teameleven.anchorex.dto;
import com.teameleven.anchorex.domain.User;

public class ReservationReportDTO {
    private Long ownerId;
    private boolean penaltySuggestion;
    private boolean clientShowedUp;
    private String comment;
    private Long clientId;

    public ReservationReportDTO(){
        super();
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public boolean isPenaltySuggestion() {
        return penaltySuggestion;
    }

    public void setPenaltySuggestion(boolean penaltySuggestion) {
        this.penaltySuggestion = penaltySuggestion;
    }

    public boolean isClientShowedUp() {
        return clientShowedUp;
    }

    public void setClientShowedUp(boolean clientShowedUp) {
        this.clientShowedUp = clientShowedUp;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
