package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.User;
import com.teameleven.anchorex.dto.user.UserDto;

import java.util.ArrayList;
import java.util.Collection;

public class UserMapper {

    public static UserDto UserToUserDto(User user) {
        String role = user.getRoles().iterator().next().getName();
        return new UserDto(user.getId(), role, user.getEmail(), user.getFirstName(), user.getLastName(), user.getAddress(), user.getCity(),user.getCountry(), user.getPhoneNumber(), user.getBiography());
    }
    
    public static Collection<UserDto> UsersToUserDtos(Collection<User> users) {
        Collection<UserDto> userDtos = new ArrayList<>();
        for (var user : users) {
            userDtos.add(UserToUserDto(user));
        }
        return userDtos;
    }
}
