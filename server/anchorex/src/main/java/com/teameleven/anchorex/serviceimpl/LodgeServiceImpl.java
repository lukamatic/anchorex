package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Service;
import com.teameleven.anchorex.domain.Location;
import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.dto.reservationEntity.ServiceDTO;
import com.teameleven.anchorex.dto.reservationEntity.CreateLodgeDTO;
import com.teameleven.anchorex.dto.reservationEntity.LocationDTO;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDTO;
import com.teameleven.anchorex.enums.ReservationEntityType;
import com.teameleven.anchorex.enums.ServiceType;
import com.teameleven.anchorex.mapper.ServiceMapper;
import com.teameleven.anchorex.repository.ServiceRepository;
import com.teameleven.anchorex.repository.LocationRepository;
import com.teameleven.anchorex.repository.LodgeRepository;
import com.teameleven.anchorex.service.LodgeService;

import java.util.*;

@org.springframework.stereotype.Service
public class LodgeServiceImpl implements LodgeService {
    private final LodgeRepository lodgeRepository;
    private final ServiceRepository serviceRepository;
    private final LocationRepository locationRepository;

    public LodgeServiceImpl(LodgeRepository lodgeRepository, ServiceRepository additionalServiceRepository, LocationRepository locationRepository) {
        this.lodgeRepository = lodgeRepository;
        this.serviceRepository = additionalServiceRepository;
        this.locationRepository = locationRepository;
    }

    @Override
    public Lodge create(CreateLodgeDTO createLodgeDTO){
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
        lodgeRepository.save(lodge);
        setLocation(createLodgeDTO.getLocation(), lodge);
        setAdditionalServices(createLodgeDTO.getAdditionalServices(), lodge);
        setRegularServices(createLodgeDTO.getRegularServices(), lodge);
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

    @Override
    public Lodge getLodgeById(Long id) {
        return lodgeRepository.findById(id).get();
    }

    @Override
    public void updateLodge(Lodge lodge) {
        lodgeRepository.updateLodge(lodge.getDescription(), lodge.getName(), lodge.getSingleBedroomNumber(),
                lodge.getDoubleBedroomNumber(), lodge.getFourBedroomNumber(), lodge.getRulesOfConduct(), lodge.getId());
        locationRepository.updateLocation(lodge.location.getLatitude(), lodge.location.getLongitude(),
                lodge.location.getAddress(), lodge.location.getCity(), lodge.location.getCountry(), lodge.getId());
    }

    @Override
    public void deleteService(Long id){
        serviceRepository.deleteService(id);
    }

    @Override
    public void addService(ServiceDTO serviceDTO, Long id) {
        Service service = ServiceMapper.serviceDTOToService(serviceDTO);
        service.setEntity(getLodgeById(id));
        serviceRepository.save(service);
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


    private void setAdditionalServices(Set<ServiceDTO> additionalServices,Lodge lodge){
        for(ServiceDTO serviceDTO: additionalServices) {
            Service service = new Service();
            service.setInfo(serviceDTO.getInfo());
            service.setPrice(serviceDTO.getPrice());
            service.setEntity(lodge);
            service.setType(ServiceType.ADDITIONAL);
            serviceRepository.save(service);
        }
    }
    private void setRegularServices(Set<ServiceDTO> regularServices,Lodge lodge){
        for(ServiceDTO serviceDTO: regularServices) {
            Service service = new Service();
            service.setInfo(serviceDTO.getInfo());
            service.setPrice(serviceDTO.getPrice());
            service.setEntity(lodge);
            service.setType(ServiceType.REGULAR);
            serviceRepository.save(service);
        }
    }

    private void setLocation(LocationDTO locationDTO, Lodge lodge){
        Location location = new Location();
        location.setAddress(locationDTO.getAddress());
        location.setCity(locationDTO.getCity());
        location.setCountry(locationDTO.getCountry());
        location.setLatitude(locationDTO.getLatitude());
        location.setLongitude(locationDTO.getLongitude());
        location.setEntity(lodge);
        locationRepository.save(location);
    }
}
