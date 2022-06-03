package com.teameleven.anchorex.response;

import com.teameleven.anchorex.dto.UserTokenState;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private UserTokenState userTokenState;
    private Long userId;
    private String userRole;


    public LoginResponse(UserTokenState userTokenState, Long id, String userRole) {
        this.userTokenState = userTokenState;
        this.userId = id;
        this.userRole = userRole;
    }
}
