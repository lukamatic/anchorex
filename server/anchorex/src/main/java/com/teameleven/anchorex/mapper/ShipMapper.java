package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.domain.Service;
import com.teameleven.anchorex.domain.Ship;
import com.teameleven.anchorex.dto.LocationDTO;
import com.teameleven.anchorex.dto.ServiceDTO;
import com.teameleven.anchorex.dto.reservationEntity.CreateShipDTO;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDisplayDTO;
import com.teameleven.anchorex.dto.reservationEntity.ShipDTO;
import com.teameleven.anchorex.dto.reservationEntity.ShipDisplayDTO;
import com.teameleven.anchorex.enums.ReservationEntityType;

import java.util.*;

public class ShipMapper {

    private ShipMapper(){

    }

    public static Ship shipDTOToShip(CreateShipDTO shipDTO){
        Ship ship = new Ship();
        ship.setCapacity(shipDTO.getCapacity());
        ship.setShipType(shipDTO.getType());
        ship.setCancellationPercentage(shipDTO.getCancellationPercentage());
        ship.setEngineCount(shipDTO.getEngineCount());
        ship.setLength(shipDTO.getLength());
        ship.setEnginePower(shipDTO.getEnginePower());
        ship.setFishingKit(shipDTO.getFishingKit());
        ship.setMaxSpeed(shipDTO.getMaxSpeed());
        ship.setNavigationKit(shipDTO.getNavigationKit());
        ship.setAverageRating(0);
        ship.setDeleted(false);
        ship.setDescription(shipDTO.getDescription());
        ship.setReservationEntityType(ReservationEntityType.SHIP);
        ship.setOwnerId(shipDTO.getOwnerId());
        ship.setName(shipDTO.getName());
        ship.setRulesOfConduct(shipDTO.getRulesOfConduct());
        return ship;
    }

    public static List<ShipDTO> getShipsDTO(List<Ship> ships) {
        List<ShipDTO> shipsDTO = new ArrayList<>();
        for(Ship ship : ships){
            ShipDTO shipDTO = new ShipDTO();
            shipDTO.setId(ship.getId());
            shipDTO.setName(ship.getName());
            shipsDTO.add(shipDTO);
        }
        return shipsDTO;
    }

    public static ShipDisplayDTO shipToShipDisplayDTO(Ship ship){
        ShipDisplayDTO dto = new ShipDisplayDTO();
        dto.setCapacity(ship.getCapacity());
        dto.setDescription(ship.getDescription());
        dto.setEngineCount(ship.getEngineCount());
        dto.setCancellationPercentage(ship.getCancellationPercentage());
        dto.setEnginePower(ship.getEnginePower());
        dto.setId(ship.getId());
        dto.setLength(ship.getLength());
        dto.setMaxSpeed(ship.getMaxSpeed());
        dto.setShipType(ship.getShipType());
        dto.setFishingKit(ship.getFishingKit());
        dto.setOwnerId(ship.getOwnerId());
        dto.setName(ship.getName());
        dto.setRulesOfConduct(ship.getRulesOfConduct());
        dto.setNavigationKit(ship.getNavigationKit());
        Set<ServiceDTO> services = new HashSet<>();
        for(Service service: ship.getServices()){
            ServiceDTO serviceDTO = new ServiceDTO();
            serviceDTO.setId(service.getId());
            serviceDTO.setInfo(service.getInfo());
            serviceDTO.setPrice(service.getPrice());
            serviceDTO.setType(service.getType());
            services.add(serviceDTO);
        }
        dto.setServices(services);

        LocationDTO locationDTO = new LocationDTO();
        locationDTO.setAddress(ship.getLocation().getAddress());
        locationDTO.setCity(ship.getLocation().getCity());
        locationDTO.setCountry(ship.getLocation().getCountry());
        locationDTO.setLongitude(ship.getLocation().getLongitude());
        locationDTO.setLatitude(ship.getLocation().getLatitude());
        dto.setLocation(locationDTO);
        return dto;
    }

    public static Collection<ShipDisplayDTO> toDtos(Collection<Ship> models) {
        Collection<ShipDisplayDTO> dtos = new ArrayList<ShipDisplayDTO>();
        for (var model : models){
            dtos.add(shipToShipDisplayDTO(model));
        }
        return dtos;
    }
}
