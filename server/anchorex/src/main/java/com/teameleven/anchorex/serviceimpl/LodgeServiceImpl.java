package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.FreePeriod;
import com.teameleven.anchorex.domain.Location;
import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.domain.Service;
import com.teameleven.anchorex.dto.reservationEntity.*;
import com.teameleven.anchorex.enums.ServiceType;
import com.teameleven.anchorex.mapper.LocationMapper;
import com.teameleven.anchorex.mapper.LodgeMapper;
import com.teameleven.anchorex.mapper.ServiceMapper;
import com.teameleven.anchorex.repository.FreePeriodRepository;
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
    private final FreePeriodRepository freePeriodRepository;

    public LodgeServiceImpl(LodgeRepository lodgeRepository, ServiceRepository additionalServiceRepository, LocationRepository locationRepository, FreePeriodRepository freePeriodRepository) {
        this.lodgeRepository = lodgeRepository;
        this.serviceRepository = additionalServiceRepository;
        this.locationRepository = locationRepository;
        this.freePeriodRepository = freePeriodRepository;
    }

    @Override
    public Lodge create(CreateLodgeDTO createLodgeDTO){
        Lodge lodge = LodgeMapper.LodgeDTOToLodge(createLodgeDTO);
        lodgeRepository.save(lodge);
        setLocation(createLodgeDTO.getLocation(), lodge);
        setAdditionalServices(createLodgeDTO.getAdditionalServices(), lodge);
        setRegularServices(createLodgeDTO.getRegularServices(), lodge);
        return lodge;
    }

    @Override
    public List<LodgeDTO> getLodges(Long id) {
        List<Lodge> lodges = lodgeRepository.getLodgeByUserId(id);
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

    @Override
    public void addFreePeriod(FreePeriodDTO periodDTO, Long id) {
        if(checkIfPeriodIsValid(periodDTO, id)) {
            checkForOverlapingPeriods(periodDTO, id);
            checkForInbetweenPeriods(periodDTO, id);
        }
    }

    private void checkForInbetweenPeriods(FreePeriodDTO periodDTO, Long id){

        List<FreePeriod> busyPeriods = new ArrayList<>();
        List<FreePeriod> newPeriods = new ArrayList<>();
        for (FreePeriod freePeriod : freePeriodRepository.getFreePeriods(id)){
            if(((periodDTO.getEndDate().after(freePeriod.getStartDate())) ||
                    (periodDTO.getEndDate().compareTo(freePeriod.getStartDate()) == 0))
                    &&(periodDTO.getEndDate().before(freePeriod.getEndDate()))){
                busyPeriods.add(freePeriod);
                FreePeriod newPeriod = new FreePeriod();
                newPeriod.setEntity(getLodgeById(id));
                newPeriod.setStartDate(periodDTO.getStartDate());
                newPeriod.setEndDate(freePeriod.getEndDate());
                newPeriods.add(newPeriod);
            }
            else if(((freePeriod.getEndDate().after(periodDTO.getStartDate())) ||
                    (freePeriod.getEndDate().compareTo(periodDTO.getStartDate()) == 0))
            &&(freePeriod.getEndDate().before(periodDTO.getEndDate()))){
                busyPeriods.add(freePeriod);
                FreePeriod newPeriod = new FreePeriod();
                newPeriod.setEntity(getLodgeById(id));
                newPeriod.setStartDate(freePeriod.getStartDate());
                newPeriod.setEndDate(periodDTO.getEndDate());
                newPeriods.add(newPeriod);
            }
        }
        if(newPeriods.isEmpty()){
            FreePeriod newPeriod = new FreePeriod();
            newPeriod.setEntity(getLodgeById(id));
            newPeriod.setEndDate(periodDTO.getEndDate());
            newPeriod.setStartDate(periodDTO.getStartDate());
            freePeriodRepository.save(newPeriod);
        }
        else if(newPeriods.size()>1){
            FreePeriod newPeriod = new FreePeriod();
            newPeriod.setEntity(getLodgeById(id));
            newPeriod.setStartDate(newPeriods.get(0).getStartDate());
            newPeriod.setEndDate(newPeriods.get(0).getEndDate());
            for(FreePeriod period: newPeriods){
                if(period.getStartDate().before(newPeriod.getStartDate())){
                    newPeriod.setStartDate(period.getStartDate());
                }
                if(period.getEndDate().after(newPeriod.getEndDate())){
                    newPeriod.setEndDate(period.getEndDate());
                }
            }
            freePeriodRepository.save(newPeriod);
        }
        else{
            freePeriodRepository.saveAll(newPeriods);
        }
        freePeriodRepository.deleteAll(busyPeriods);
    }

    private void checkForOverlapingPeriods(FreePeriodDTO periodDTO, Long id){
        List<FreePeriod> busyPeriods = new ArrayList<>();
        for (FreePeriod freePeriod : freePeriodRepository.getFreePeriods(id)) {
            if(freePeriod.getStartDate().after(periodDTO.getStartDate())
            && freePeriod.getEndDate().before(periodDTO.getEndDate())){
                busyPeriods.add(freePeriod);
            }
        }
        freePeriodRepository.deleteAll(busyPeriods);
    }
    private boolean checkIfPeriodIsValid(FreePeriodDTO periodDTO, Long id) {
        List<FreePeriod> freePeriods = freePeriodRepository.getFreePeriods(id);
        for (FreePeriod freePeriod : freePeriods) {
            if ((freePeriod.getStartDate().before(periodDTO.getStartDate()) ||
                    freePeriod.getStartDate().compareTo(periodDTO.getStartDate()) == 0) &&
            (freePeriod.getEndDate().after(periodDTO.getEndDate()) ||
                    freePeriod.getEndDate().compareTo(periodDTO.getEndDate()) == 0)){
                return false;
            }
        }
        return true;
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
        Location location = LocationMapper.locationDTOToLocation(locationDTO);
        location.setEntity(lodge);
        locationRepository.save(location);
    }
}
