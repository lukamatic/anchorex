package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.User;
import com.teameleven.anchorex.dto.user.CreateUserDto;
import com.teameleven.anchorex.dto.user.UserDto;
import com.teameleven.anchorex.mapper.UserMapper;
import com.teameleven.anchorex.service.UserService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping("api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Collection<UserDto>> findAll() {
        var users = userService.findAll();
        var userDtos = UserMapper.UsersToUserDtos(users);
        return new ResponseEntity<>(userDtos, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDto> findOneById(@PathVariable("id") Long id) {
        var user = userService.findOneById(id);

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("User with id %d doesn't exist.", id));
        }

        var userDto = UserMapper.UserToUserDto(user);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<User> patchUser(@Valid @RequestBody CreateUserDto createUserDto) throws Exception {
        var user = userService.update(createUserDto);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
    
    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> delete(@PathVariable("id") Long id) {
        try {
            userService.delete(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("User with id %d doesn't exist.", id));
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
