package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.LoyaltyProgram;
import com.teameleven.anchorex.domain.enumerations.LoyaltyStatus;
import com.teameleven.anchorex.dto.UpdateLoyaltyProgramDto;
import com.teameleven.anchorex.repository.LoyaltyProgramRepository;
import com.teameleven.anchorex.service.LoyaltyProgramService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LoyaltyServiceImpl implements LoyaltyProgramService {
    private final LoyaltyProgramRepository loyaltyProgramRepository;

    public LoyaltyServiceImpl(LoyaltyProgramRepository loyaltyProgramRepository) {
        this.loyaltyProgramRepository = loyaltyProgramRepository;
    }

    @Override
    public LoyaltyProgram get() {
        return this.loyaltyProgramRepository.findById(1L).orElse(null);
    }

    @Override
    @Transactional
    public LoyaltyProgram update(UpdateLoyaltyProgramDto updateLoyaltyProgramDto) throws Exception {
        var loyaltyProgram = this.loyaltyProgramRepository.findById(1L).orElse(null);

        loyaltyProgram.setReservationPoints(updateLoyaltyProgramDto.getReservationPoints());
        loyaltyProgram.setSilverBorder(updateLoyaltyProgramDto.getSilverBorder());
        loyaltyProgram.setGoldBorder(updateLoyaltyProgramDto.getGoldBorder());
        loyaltyProgram.setSilverDiscount(updateLoyaltyProgramDto.getSilverDiscount());
        loyaltyProgram.setGoldDiscount(updateLoyaltyProgramDto.getGoldDiscount());

        return this.loyaltyProgramRepository.save(loyaltyProgram);
    }

}
