package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.dto.reservationEntity.CreateLodgeDTO;
import com.teameleven.anchorex.enums.ReservationEntityType;

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

    public static Lodge LodgeDTOToLodge(CreateLodgeDTO createLodgeDTO){
        Lodge lodge = new Lodge();
        lodge.setDescription(createLodgeDTO.getDescription());
        lodge.setDeleted(false);
        lodge.setAverageRating(0);
        lodge.setName(createLodgeDTO.getName());
        lodge.setOwnerId(createLodgeDTO.getOwnerId());
        lodge.setReservationEntityType(ReservationEntityType.LODGE);
        lodge.setRulesOfConduct(createLodgeDTO.getRulesOfConduct());
        lodge.setSingleBedroomNumber(createLodgeDTO.getSingleBedroomNumber());
        lodge.setDoubleBedroomNumber(createLodgeDTO.getDoubleBedroomNumber());
        lodge.setFourBedroomNumber(createLodgeDTO.getFourBedroomNumber());
        return lodge;
    }
}
