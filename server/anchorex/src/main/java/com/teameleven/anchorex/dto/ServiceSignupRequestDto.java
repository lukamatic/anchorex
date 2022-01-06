package com.teameleven.anchorex.dto;

import com.teameleven.anchorex.domain.enumerations.ServiceSignupRequestStatus;
import com.teameleven.anchorex.dto.user.UserDto;

public class ServiceSignupRequestDto {
    private Long id;
    private UserDto user;
    private String signupExplanation;
    private ServiceSignupRequestStatus status;

    public ServiceSignupRequestDto(Long id, UserDto userDto, String signupExplanation, ServiceSignupRequestStatus status) {
        this.id = id;
        this.user = userDto;
        this.signupExplanation = signupExplanation;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public String getSignupExplanation() {
        return signupExplanation;
    }

    public void setSignupExplanation(String signupExplanation) {
        this.signupExplanation = signupExplanation;
    }

    public ServiceSignupRequestStatus getStatus() {
        return status;
    }

    public void setStatus(ServiceSignupRequestStatus status) {
        this.status = status;
    }
}
