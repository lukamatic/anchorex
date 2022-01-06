package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.ServiceSignupRequest;

public interface ServiceSignupRequestService {

    ServiceSignupRequest create(ServiceSignupRequest serviceSignupRequest) throws Exception;
}
