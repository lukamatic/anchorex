package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.BusinessConfiguration;
import com.teameleven.anchorex.repository.BusinessConfigurationRepository;
import com.teameleven.anchorex.service.BusinessConfigurationService;
import org.springframework.stereotype.Service;

@Service
public class BusinessConfigurationServiceImpl implements BusinessConfigurationService {
    private final BusinessConfigurationRepository businessConfigurationRepository;

    public BusinessConfigurationServiceImpl(BusinessConfigurationRepository businessConfigurationRepository) {
        this.businessConfigurationRepository = businessConfigurationRepository;
    }

    @Override
    public BusinessConfiguration getBussinessConfiguration(Long id) {
        return this.businessConfigurationRepository.findById(1L).orElse(null);
    }

    @Override
    public BusinessConfiguration update(BusinessConfiguration businessConfiguration) {
        var conf = this.getBussinessConfiguration(1L);
        conf.setAppPercentage(businessConfiguration.getAppPercentage());
        return this.businessConfigurationRepository.save(conf);
    }
}
