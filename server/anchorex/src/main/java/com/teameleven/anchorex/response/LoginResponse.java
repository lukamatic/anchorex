package com.teameleven.anchorex.response;

import com.teameleven.anchorex.dto.UserTokenState;

public class LoginResponse {
    private UserTokenState userTokenState;
    private String userRole;

    public LoginResponse(UserTokenState userTokenState, String userRole) {
        this.userTokenState = userTokenState;
        this.userRole = userRole;
    }

    public UserTokenState getUserTokenState() {
        return userTokenState;
    }

    public void setUserTokenState(UserTokenState userTokenState) {
        this.userTokenState = userTokenState;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
}
