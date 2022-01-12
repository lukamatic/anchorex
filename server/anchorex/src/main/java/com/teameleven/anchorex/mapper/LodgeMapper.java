package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.dto.reservationEntity.CreateLodgeDTO;

public class LodgeMapper {
    public static CreateLodgeDTO LodgeToLodgeDTO(Lodge lodge){
        CreateLodgeDTO dto = new CreateLodgeDTO();
        dto.setName(lodge.getName());
        dto.setOwnerId(lodge.getOwnerId());
        dto.setDescription(lodge.getDescription());
        dto.setRulesOfConduct(lodge.getRulesOfConduct());
        dto.setSingleBedroomNumber(lodge.getSingleBedroomNumber());
        dto.setDoubleBedroomNumber(lodge.getDoubleBedroomNumber());
        dto.setFourBedroomNumber(lodge.getFourBedroomNumber());
        return dto;
    }
}
