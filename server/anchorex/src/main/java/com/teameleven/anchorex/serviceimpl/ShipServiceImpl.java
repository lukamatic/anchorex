package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Location;
import com.teameleven.anchorex.domain.ReservationEntityImage;
import com.teameleven.anchorex.domain.Service;
import com.teameleven.anchorex.domain.Ship;
import com.teameleven.anchorex.dto.reservationEntity.CreateShipDTO;
import com.teameleven.anchorex.dto.LocationDTO;
import com.teameleven.anchorex.dto.ServiceDTO;
import com.teameleven.anchorex.dto.reservationEntity.ShipDTO;
import com.teameleven.anchorex.enums.ServiceType;
import com.teameleven.anchorex.mapper.LocationMapper;
import com.teameleven.anchorex.mapper.ServiceMapper;
import com.teameleven.anchorex.mapper.ShipMapper;
import com.teameleven.anchorex.repository.LocationRepository;
import com.teameleven.anchorex.repository.ReservationEntityImageRepository;
import com.teameleven.anchorex.repository.ServiceRepository;
import com.teameleven.anchorex.repository.ShipRepository;
import com.teameleven.anchorex.service.ImageService;
import com.teameleven.anchorex.service.ShipService;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;

@org.springframework.stereotype.Service
public class ShipServiceImpl implements ShipService {
    private final ShipRepository shipRepository;
    private final LocationRepository locationRepository;
    private final ServiceRepository serviceRepository;
    private final ImageService imageService;
    private final ReservationEntityImageRepository reservationEntityImageRepository;

    public ShipServiceImpl(ShipRepository shipRepository, LocationRepository locationRepository, ServiceRepository serviceRepository, ImageService imageService, ReservationEntityImageRepository reservationEntityImageRepository) {
        this.shipRepository = shipRepository;
        this.locationRepository = locationRepository;
        this.serviceRepository = serviceRepository;
        this.imageService = imageService;
        this.reservationEntityImageRepository = reservationEntityImageRepository;
    }

    @Override
    public Ship createShip(CreateShipDTO createShipDTO) {
        Ship ship = ShipMapper.shipDTOToShip(createShipDTO);
        shipRepository.save(ship);
        setLocation(createShipDTO.getLocation(), ship);
        setAdditionalServices(createShipDTO.getAdditionalServices(), ship);
        setRegularServices(createShipDTO.getRegularServices(), ship);
        return ship;
    }

    @Override
    public List<ShipDTO> getShips(Long id) {
        List<Ship> ships = shipRepository.getShipByUserId(id);
        return ShipMapper.getShipsDTO(ships);
    }

    @Override
    public List<Ship> getAll() {
        return this.shipRepository.findAll();
    }

    @Override
    public void deleteShip(Long id) {
        shipRepository.deleteShip(id);
    }

    @Override
    public Ship getShipById(Long id) {
       return shipRepository.findById(id).get();
    }

    @Override
    public void updateShip(Ship ship) {
        shipRepository.updateShip(ship.getDescription(),ship.getName(), ship.getLength(), ship.getEngineCount(),
        ship.getEnginePower(), ship.getRulesOfConduct(), ship.getMaxSpeed(), ship.getNavigationKit(),
        ship.getCapacity(), ship.getFishingKit(), ship.getCancellationPercentage(), ship.getShipType(), ship.getId());
        locationRepository.updateLocation(ship.location.getLatitude(), ship.location.getLongitude(),
                ship.location.getAddress(), ship.location.getCity(), ship.location.getCountry(), ship.getId());
    }

    @Override
    public void addService(ServiceDTO serviceDTO, Long id) {
        Service service = ServiceMapper.serviceDTOToService(serviceDTO);
        service.setReservationEntity(getShipById(id));
        serviceRepository.save(service);
    }

    @Override
    public void deleteService(Long id) {
        serviceRepository.deleteService(id);
    }

    @Override
    public void addImages(Long id, MultipartFile[] files) {
        var shipToUpdate = shipRepository.findById(id).orElse(null);

        if (shipToUpdate == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Fishing lesson with id %d doesn't exist.", id));
        }

        var urls = this.imageService.uploadImages(files);
        urls.forEach(url -> shipToUpdate.addImage(ReservationEntityImage.builder().url(url).build()));
        shipRepository.save(shipToUpdate);
    }

    @Override
    public void removeImage(Long imageId) {
        reservationEntityImageRepository.deleteById(imageId);
    }

    private void setLocation(LocationDTO locationDTO, Ship ship){
        Location location = LocationMapper.locationDTOToLocation(locationDTO);
        location.setReservationEntity(ship);
        locationRepository.save(location);
    }

    private void setAdditionalServices(Set<ServiceDTO> additionalServices, Ship ship){
        for(ServiceDTO serviceDTO: additionalServices) {
            Service service = new Service();
            service.setInfo(serviceDTO.getInfo());
            service.setPrice(serviceDTO.getPrice());
            service.setReservationEntity(ship);
            service.setType(ServiceType.ADDITIONAL);
            serviceRepository.save(service);
        }
    }
    private void setRegularServices(Set<ServiceDTO> regularServices,Ship ship){
        for(ServiceDTO serviceDTO: regularServices) {
            Service service = new Service();
            service.setInfo(serviceDTO.getInfo());
            service.setPrice(serviceDTO.getPrice());
            service.setReservationEntity(ship);
            service.setType(ServiceType.REGULAR);
            serviceRepository.save(service);
        }
    }
}
