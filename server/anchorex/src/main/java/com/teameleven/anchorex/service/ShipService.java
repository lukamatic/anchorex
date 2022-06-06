package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Ship;
import com.teameleven.anchorex.dto.reservationEntity.CreateShipDTO;
import com.teameleven.anchorex.dto.ServiceDTO;
import com.teameleven.anchorex.dto.reservationEntity.ShipDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ShipService {
    Ship createShip(CreateShipDTO createShipDTO);

    List<ShipDTO> getShips(Long id);

    List<Ship> getAll();

    void deleteShip(Long id);

    Ship getShipById(Long id);

    void updateShip(Ship ship);

    void addService(ServiceDTO service, Long id);

    void deleteService(Long id);

    void addImages(Long id, MultipartFile[] files);

    void removeImage(Long imageId);
}
