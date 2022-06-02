package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.ServiceSignupRequest;
import com.teameleven.anchorex.dto.ServiceSignupRequestDto;

import java.util.ArrayList;
import java.util.Collection;

public class ServiceSignupRequestMapper {

    public static ServiceSignupRequestDto ServiceSignupRequestToServiceSignupRequestDto(ServiceSignupRequest serviceSignupRequest) {
        var userDto = UserMapper.UserToUserDto(serviceSignupRequest.getUser());
        return new ServiceSignupRequestDto(serviceSignupRequest.getId(), userDto, serviceSignupRequest.getSignupExplanation(), serviceSignupRequest.getStatus());
    }

    public static Collection<ServiceSignupRequestDto> ServiceSignupRequestsToServiceSignupRequestDtos(Collection<ServiceSignupRequest> tests) {
        Collection<ServiceSignupRequestDto> testDtos = new ArrayList<>();
        for (var test : tests) {
            testDtos.add(ServiceSignupRequestToServiceSignupRequestDto(test));
        }
        return testDtos;
    }
}
