package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.Role;
import com.teameleven.anchorex.domain.User;
import com.teameleven.anchorex.dto.user.CreateUserDto;
import com.teameleven.anchorex.dto.user.UpdateUserDto;
import com.teameleven.anchorex.dto.user.UserDto;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;

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

    public static User UserDTOtoUser(CreateUserDto createUserDto) {
        User user = new User(createUserDto);
        return user;
    }

    public static User UserDTOtoUser(UpdateUserDto updateUserDto) {
        User user = new User(updateUserDto);
        return user;
    }

    public static User updateUserFromDTO(UpdateUserDto updateUserDto, User extendedUser) {

        extendedUser.setEmail(updateUserDto.getEmail());
        extendedUser.setFirstName(updateUserDto.getFirstName());
        extendedUser.setLastName(updateUserDto.getLastName());
        extendedUser.setAddress(updateUserDto.getAddress());
        extendedUser.setCity(updateUserDto.getCity());
        extendedUser.setCountry( updateUserDto.getCountry());
        extendedUser.setPhoneNumber(updateUserDto.getPhoneNumber());
        extendedUser.setBiography(updateUserDto.getBiography());
        return extendedUser;
    }
}
