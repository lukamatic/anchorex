package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.ServiceSignupRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceSignupRequestRepository extends JpaRepository<ServiceSignupRequest, Long> {
}
