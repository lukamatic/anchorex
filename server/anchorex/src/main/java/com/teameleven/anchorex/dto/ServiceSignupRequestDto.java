package com.teameleven.anchorex.dto;

import com.teameleven.anchorex.dto.user.UserDto;

public class ServiceSignupRequestDto {
    private Long id;
    private UserDto user;
    private String signupExplanation;

    public ServiceSignupRequestDto(Long id, UserDto userDto, String signupExplanation) {
        this.id = id;
        this.user = userDto;
        this.signupExplanation = signupExplanation;
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
}
