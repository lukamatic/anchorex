package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Location;
import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.domain.ReservationEntityImage;
import com.teameleven.anchorex.domain.Service;
import com.teameleven.anchorex.dto.BookingItemsRequestDTO;
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
import com.teameleven.anchorex.repository.ReservationEntityImageRepository;
import com.teameleven.anchorex.repository.ServiceRepository;
import com.teameleven.anchorex.service.FreePeriodService;
import com.teameleven.anchorex.service.ImageService;
import com.teameleven.anchorex.service.LodgeService;
import com.teameleven.anchorex.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@org.springframework.stereotype.Service
public class LodgeServiceImpl implements LodgeService {
    private final LodgeRepository lodgeRepository;
    private final ServiceRepository serviceRepository;
    private final LocationRepository locationRepository;
    private final FreePeriodService freePeriodService;
    private final ReservationService reservationService;
    private final ImageService imageService;
    private final ReservationEntityImageRepository reservationEntityImageRepository;

    public LodgeServiceImpl(LodgeRepository lodgeRepository, ServiceRepository additionalServiceRepository, LocationRepository locationRepository, FreePeriodService freePeriodService, ReservationService reservationService, ImageService imageService, ReservationEntityImageRepository reservationEntityImageRepository) {
        this.lodgeRepository = lodgeRepository;
        this.serviceRepository = additionalServiceRepository;
        this.locationRepository = locationRepository;
        this.freePeriodService = freePeriodService;
        this.reservationService = reservationService;
        this.imageService = imageService;
        this.reservationEntityImageRepository = reservationEntityImageRepository;
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
    public List<Lodge> getAllLodges() {
        List<Lodge> lodges = lodgeRepository.getLodges();
        return lodges;
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

    @Override
    public List<Lodge> getFreeLodges(BookingItemsRequestDTO requestPeriod) {
        List<Lodge> allLodges = lodgeRepository.findAll();
        List<Lodge> retList = new ArrayList<>();
        for(Lodge lodge: allLodges){
            int numberOfAcceptablePeople = lodge.getFourBedroomNumber() * 4 + lodge.getSingleBedroomNumber() + lodge.getDoubleBedroomNumber() * 2;
            if( numberOfAcceptablePeople >= requestPeriod.getNumberOfPeople()){
                if(freePeriodService.checkIfPeriodIsFree(requestPeriod.getStartDate(), requestPeriod.getEndDate(), lodge.getId()) ){
                    retList.add(lodge);
                }
            }
        }
        return retList;
    }

    @Override
    public void addImages(Long id, MultipartFile[] files) {
        var lodgeToUpdate = lodgeRepository.findById(id).orElse(null);

        if (lodgeToUpdate == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Fishing lesson with id %d doesn't exist.", id));
        }

        var urls = this.imageService.uploadImages(files);
        urls.forEach(url -> lodgeToUpdate.addImage(ReservationEntityImage.builder().url(url).build()));
        lodgeRepository.save(lodgeToUpdate);
    }

    @Override
    public void removeImage(Long imageId) {
        reservationEntityImageRepository.deleteById(imageId);
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
