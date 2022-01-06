package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.ServiceSignupRequest;
import com.teameleven.anchorex.repository.ServiceSignupRequestRepository;
import com.teameleven.anchorex.service.ServiceSignupRequestService;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class ServiceSignupRequestServiceImpl implements ServiceSignupRequestService {

    private final ServiceSignupRequestRepository serviceSignupRequestRepository;

    public ServiceSignupRequestServiceImpl(ServiceSignupRequestRepository serviceSignupRequestRepository) {
        this.serviceSignupRequestRepository = serviceSignupRequestRepository;
    }

    @Override
    public ServiceSignupRequest create(ServiceSignupRequest serviceSignupRequest) throws Exception {
        return serviceSignupRequestRepository.save(serviceSignupRequest);
    }

    @Override
    public Collection<ServiceSignupRequest> findAll() {
        return serviceSignupRequestRepository.findAll();
    }
}
