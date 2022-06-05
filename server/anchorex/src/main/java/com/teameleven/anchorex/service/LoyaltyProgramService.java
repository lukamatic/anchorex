package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.LoyaltyProgram;
import com.teameleven.anchorex.domain.enumerations.LoyaltyStatus;
import com.teameleven.anchorex.dto.UpdateLoyaltyProgramDto;

public interface LoyaltyProgramService {
    LoyaltyProgram get();
    LoyaltyProgram update(UpdateLoyaltyProgramDto updateLoyaltyProgramDto) throws Exception;

}
