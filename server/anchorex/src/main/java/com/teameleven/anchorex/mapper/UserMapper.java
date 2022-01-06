package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.User;
import com.teameleven.anchorex.dto.user.UserDto;

public class UserMapper {

    public static UserDto UserToUserDto(User user) {
        String role = user.getRoles().iterator().next().getName();
        return new UserDto(user.getId(), role, user.getEmail(), user.getFirstName(), user.getLastName(), user.getAddress(), user.getCity(),user.getCountry(), user.getPhoneNumber(), user.getBiography());
    }
}
