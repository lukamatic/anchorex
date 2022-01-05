package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.AdditionalService;
import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.dto.reservationEntity.AdditionalServiceDTO;
import com.teameleven.anchorex.dto.reservationEntity.CreateLodgeDTO;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDTO;
import com.teameleven.anchorex.enums.ReservationEntityType;
import com.teameleven.anchorex.repository.AdditionalServiceRepository;
import com.teameleven.anchorex.repository.LodgeRepository;
import com.teameleven.anchorex.service.LodgeService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LodgeServiceImpl implements LodgeService {
    private final LodgeRepository lodgeRepository;
    private final AdditionalServiceRepository additionalServiceRepository;

    public LodgeServiceImpl(LodgeRepository lodgeRepository, AdditionalServiceRepository additionalServiceRepository) {
        this.lodgeRepository = lodgeRepository;
        this.additionalServiceRepository = additionalServiceRepository;
    }

    @Override
    public Lodge create(CreateLodgeDTO createLodgeDTO){
        Lodge lodge = new Lodge();
        lodge.setDescription(createLodgeDTO.getDescription());
        lodge.setDeleted(false);
        lodge.setAverageRating(0);
        lodge.setName(createLodgeDTO.getName());
        lodge.setPrice(createLodgeDTO.getLodgePrice());
        lodge.setOwnerId(createLodgeDTO.getOwnerId());
        lodge.setReservationEntityType(ReservationEntityType.LODGE);
        lodge.setRulesOfConduct(createLodgeDTO.getRulesOfConduct());
        lodge.setSingleBedroomNumber(createLodgeDTO.getSingleBedroomNumber());
        lodge.setDoubleBedroomNumber(createLodgeDTO.getDoubleBedroomNumber());
        lodge.setFourBedroomNumber(createLodgeDTO.getFourBedroomNumber());
        lodgeRepository.save(lodge);
        setAdditionalServices(createLodgeDTO.getServices(), lodge);
        return lodge;
    }

    @Override
    public List<LodgeDTO> getLodges() {
        var lodges = lodgeRepository.findAll();
        return getLodgesDTO(lodges);
    }

    @Override
    public void deleteLodge(Long id) {
         lodgeRepository.deleteLodge(id);
    }

    private List<LodgeDTO> getLodgesDTO(List<Lodge> lodges) {
        List<LodgeDTO> lodgesDTO = new ArrayList<>();
        for(Lodge lodge : lodges){
            if(!lodge.isDeleted()) {
                LodgeDTO lodgeDTO = new LodgeDTO();
                lodgeDTO.setId(lodge.getId());
                lodgeDTO.setName(lodge.getName());
                lodgesDTO.add(lodgeDTO);
            }
        }
        return lodgesDTO;
    }


    private void setAdditionalServices(Set<AdditionalServiceDTO> services, Lodge lodge){
        for(AdditionalServiceDTO serviceDTO: services){
            AdditionalService service = new AdditionalService();
            service.setInfo(serviceDTO.getInfo());
            service.setPrice(serviceDTO.getPrice());
            service.setEntity(lodge);
            additionalServiceRepository.save(service);
        }
    }
}
