package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Location;
import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.domain.Service;
import com.teameleven.anchorex.dto.LocationDTO;
import com.teameleven.anchorex.dto.ServiceDTO;
import com.teameleven.anchorex.dto.reservationEntity.CreateLodgeDTO;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDTO;
import com.teameleven.anchorex.enums.ServiceType;
import com.teameleven.anchorex.mapper.LocationMapper;
import com.teameleven.anchorex.mapper.LodgeMapper;
import com.teameleven.anchorex.mapper.ServiceMapper;
import com.teameleven.anchorex.repository.LocationRepository;
import com.teameleven.anchorex.repository.LodgeRepository;
import com.teameleven.anchorex.repository.ServiceRepository;
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
        Lodge lodge = LodgeMapper.lodgeDTOToLodge(createLodgeDTO);
        lodgeRepository.save(lodge);
        setLocation(createLodgeDTO.getLocation(), lodge);
        setAdditionalServices(createLodgeDTO.getAdditionalServices(), lodge);
        setRegularServices(createLodgeDTO.getRegularServices(), lodge);
        return lodge;
    }

    @Override
    public List<Lodge> getAll() {
        return this.lodgeRepository.findAll();
    }

    @Override
    public List<LodgeDTO> getLodges(Long id) {
        List<Lodge> lodges = lodgeRepository.getLodgeByUserId(id);
        return getLodgesDTO(lodges);
    }

    @Override
    public List<LodgeDTO> getAllLodges() {
        List<Lodge> lodges = lodgeRepository.getLodges();
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
        service.setReservationEntity(getLodgeById(id));
        serviceRepository.save(service);
    }



    private List<LodgeDTO> getLodgesDTO(List<Lodge> lodges) {
        List<LodgeDTO> lodgesDTO = new ArrayList<>();
        for(Lodge lodge : lodges){
            LodgeDTO lodgeDTO = new LodgeDTO();
            lodgeDTO.setId(lodge.getId());
            lodgeDTO.setName(lodge.getName());
            lodgesDTO.add(lodgeDTO);
        }
        return lodgesDTO;
    }


    private void setAdditionalServices(Set<ServiceDTO> additionalServices,Lodge lodge){
        for(ServiceDTO serviceDTO: additionalServices) {
            Service service = new Service();
            service.setInfo(serviceDTO.getInfo());
            service.setPrice(serviceDTO.getPrice());
            service.setReservationEntity(lodge);
            service.setType(ServiceType.ADDITIONAL);
            serviceRepository.save(service);
        }
    }
    private void setRegularServices(Set<ServiceDTO> regularServices,Lodge lodge){
        for(ServiceDTO serviceDTO: regularServices) {
            Service service = new Service();
            service.setInfo(serviceDTO.getInfo());
            service.setPrice(serviceDTO.getPrice());
            service.setReservationEntity(lodge);
            service.setType(ServiceType.REGULAR);
            serviceRepository.save(service);
        }
    }

    private void setLocation(LocationDTO locationDTO, Lodge lodge){
        Location location = LocationMapper.locationDTOToLocation(locationDTO);
        location.setReservationEntity(lodge);
        locationRepository.save(location);
    }
}
