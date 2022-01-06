package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.ServiceSignupRequest;

import java.util.Collection;

public interface ServiceSignupRequestService {

    ServiceSignupRequest create(ServiceSignupRequest serviceSignupRequest) throws Exception;

    Collection<ServiceSignupRequest> findAll();
}
