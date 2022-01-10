package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.Service;
import com.teameleven.anchorex.dto.reservationEntity.ServiceDTO;

public class ServiceMapper {
    public static Service serviceDTOToService(ServiceDTO serviceDTO){
        Service service = new Service();
        service.setType(serviceDTO.getType());
        service.setInfo(serviceDTO.getInfo());
        service.setPrice(serviceDTO.getPrice());
        return service;
    }
}
