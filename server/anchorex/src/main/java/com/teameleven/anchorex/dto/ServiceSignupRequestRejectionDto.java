package com.teameleven.anchorex.dto;

import javax.validation.constraints.NotEmpty;

public class ServiceSignupRequestRejectionDto {
    @NotEmpty(message = "Rejection reason must be provided.")
    private String reason;

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
