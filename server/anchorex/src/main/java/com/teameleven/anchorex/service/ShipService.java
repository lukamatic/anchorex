package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Ship;
import com.teameleven.anchorex.dto.reservationEntity.CreateShipDTO;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDTO;
import com.teameleven.anchorex.dto.reservationEntity.ShipDTO;

import java.util.List;

public interface ShipService {
    Ship createShip(CreateShipDTO createShipDTO);

    List<ShipDTO> getShips(Long id);

    void deleteShip(Long id);

}
