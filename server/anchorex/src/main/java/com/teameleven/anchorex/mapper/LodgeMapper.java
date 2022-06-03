package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.FishingLesson;
import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.domain.Service;
import com.teameleven.anchorex.dto.fishingLesson.FishingLessonDto;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDisplayDTO;
import com.teameleven.anchorex.dto.reservationEntity.CreateLodgeDTO;
import com.teameleven.anchorex.dto.LocationDTO;
import com.teameleven.anchorex.dto.ServiceDTO;
import com.teameleven.anchorex.enums.ReservationEntityType;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

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

    public static Lodge lodgeDTOToLodge(CreateLodgeDTO createLodgeDTO){
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

    public static LodgeDisplayDTO lodgeToLodgeDisplayDTO(Lodge lodge){
        LodgeDisplayDTO dto = new LodgeDisplayDTO();
        dto.setId(lodge.getId());
        dto.setName(lodge.getName());
        dto.setOwnerId(lodge.getOwnerId());
        dto.setDescription(lodge.getDescription());
        dto.setRulesOfConduct(lodge.getRulesOfConduct());
        dto.setSingleBedroomNumber(lodge.getSingleBedroomNumber());
        dto.setDoubleBedroomNumber(lodge.getDoubleBedroomNumber());
        dto.setFourBedroomNumber(lodge.getFourBedroomNumber());
        Set<ServiceDTO> services = new HashSet<>();
        for(Service service: lodge.getServices()){
            ServiceDTO serviceDTO = new ServiceDTO();
            serviceDTO.setId(service.getId());
            serviceDTO.setInfo(service.getInfo());
            serviceDTO.setPrice(service.getPrice());
            serviceDTO.setType(service.getType());
            services.add(serviceDTO);
        }
        dto.setServices(services);

        LocationDTO locationDTO = new LocationDTO();
        locationDTO.setAddress(lodge.getLocation().getAddress());
        locationDTO.setCity(lodge.getLocation().getCity());
        locationDTO.setCountry(lodge.getLocation().getCountry());
        locationDTO.setLongitude(lodge.getLocation().getLongitude());
        locationDTO.setLatitude(lodge.getLocation().getLatitude());
        dto.setLocation(locationDTO);
        return dto;
    }

    public static Collection<LodgeDisplayDTO> toDtos(Collection<Lodge> models) {
        Collection<LodgeDisplayDTO> dtos = new ArrayList<LodgeDisplayDTO>();
        for (var model : models){
            dtos.add(lodgeToLodgeDisplayDTO(model));
        }
        return dtos;
    }
}
