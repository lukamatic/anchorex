package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.BusinessConfiguration;

import java.util.Collection;

public interface BusinessConfigurationService {
    BusinessConfiguration getBussinessConfiguration(Long id);

    BusinessConfiguration update(BusinessConfiguration BusinessConfiguration);
}
