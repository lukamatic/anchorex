package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.Ship;
import com.teameleven.anchorex.dto.reservationEntity.CreateShipDTO;
import com.teameleven.anchorex.dto.reservationEntity.ShipDTO;
import com.teameleven.anchorex.enums.ReservationEntityType;

import java.util.ArrayList;
import java.util.List;

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
}
