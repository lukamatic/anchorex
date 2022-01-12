package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Location;
import com.teameleven.anchorex.domain.Service;
import com.teameleven.anchorex.domain.Ship;
import com.teameleven.anchorex.dto.reservationEntity.CreateShipDTO;
import com.teameleven.anchorex.dto.reservationEntity.LocationDTO;
import com.teameleven.anchorex.dto.reservationEntity.ServiceDTO;
import com.teameleven.anchorex.dto.reservationEntity.ShipDTO;
import com.teameleven.anchorex.enums.ServiceType;
import com.teameleven.anchorex.mapper.LocationMapper;
import com.teameleven.anchorex.mapper.ServiceMapper;
import com.teameleven.anchorex.mapper.ShipMapper;
import com.teameleven.anchorex.repository.LocationRepository;
import com.teameleven.anchorex.repository.ServiceRepository;
import com.teameleven.anchorex.repository.ShipRepository;
import com.teameleven.anchorex.service.ShipService;

import java.util.List;
import java.util.Set;

@org.springframework.stereotype.Service
public class ShipServiceImpl implements ShipService {
    private final ShipRepository shipRepository;
    private final LocationRepository locationRepository;
    private final ServiceRepository serviceRepository;

    public ShipServiceImpl(ShipRepository shipRepository, LocationRepository locationRepository, ServiceRepository serviceRepository) {
        this.shipRepository = shipRepository;
        this.locationRepository = locationRepository;
        this.serviceRepository = serviceRepository;
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
        service.setEntity(getShipById(id));
        serviceRepository.save(service);
    }

    private void setLocation(LocationDTO locationDTO, Ship ship){
        Location location = LocationMapper.locationDTOToLocation(locationDTO);
        location.setEntity(ship);
        locationRepository.save(location);
    }

    private void setAdditionalServices(Set<ServiceDTO> additionalServices, Ship ship){
        for(ServiceDTO serviceDTO: additionalServices) {
            Service service = new Service();
            service.setInfo(serviceDTO.getInfo());
            service.setPrice(serviceDTO.getPrice());
            service.setEntity(ship);
            service.setType(ServiceType.ADDITIONAL);
            serviceRepository.save(service);
        }
    }
    private void setRegularServices(Set<ServiceDTO> regularServices,Ship ship){
        for(ServiceDTO serviceDTO: regularServices) {
            Service service = new Service();
            service.setInfo(serviceDTO.getInfo());
            service.setPrice(serviceDTO.getPrice());
            service.setEntity(ship);
            service.setType(ServiceType.REGULAR);
            serviceRepository.save(service);
        }
    }
}
