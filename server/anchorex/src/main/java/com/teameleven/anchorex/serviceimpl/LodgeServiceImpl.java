package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.dto.reservationEntity.CreateLodgeDTO;
import com.teameleven.anchorex.enums.ReservationEntityType;
import com.teameleven.anchorex.repository.LodgeRepository;
import com.teameleven.anchorex.service.LodgeService;
import org.springframework.stereotype.Service;

@Service
public class LodgeServiceImpl implements LodgeService {
    private final LodgeRepository lodgeRepository;

    public LodgeServiceImpl(LodgeRepository lodgeRepository) {
        this.lodgeRepository = lodgeRepository;
    }

    @Override
    public Lodge create(CreateLodgeDTO createLodgeDTO){
        Lodge lodge = new Lodge();
        lodge.setDescription(createLodgeDTO.getDescription());
        lodge.setDeleted(false);
        lodge.setAverageRating(0);
        lodge.setName(createLodgeDTO.getName());
        lodge.setPrice(createLodgeDTO.getPrice());
        lodge.setOwnerId(createLodgeDTO.getOwnerId());
        lodge.setReservationEntityType(ReservationEntityType.LODGE);
        lodge.setRulesOfConduct(createLodgeDTO.getRulesOfConduct());
        lodge.setSingleBedroomNumber(createLodgeDTO.getSingleBedroomNumber());
        lodge.setDoubleBedroomNumber(createLodgeDTO.getDoubleBedroomNumber());
        lodge.setFourBedroomNumber(createLodgeDTO.getFourBedroomNumber());
        lodgeRepository.save(lodge);
        return lodge;
    }
}
