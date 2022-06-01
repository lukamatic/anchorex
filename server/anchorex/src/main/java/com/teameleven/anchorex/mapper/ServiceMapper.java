package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.Service;
import com.teameleven.anchorex.dto.ServiceDTO;

import java.util.HashSet;
import java.util.Set;

public class ServiceMapper {
    public static Service serviceDTOToService(ServiceDTO serviceDTO){
        Service service = new Service();
        service.setType(serviceDTO.getType());
        service.setInfo(serviceDTO.getInfo());
        service.setPrice(serviceDTO.getPrice());
        return service;
    }

    public static ServiceDTO toDto(Service model) {
        return ServiceDTO.builder()
                .id(model.getId())
                .info(model.getInfo())
                .price(model.getPrice())
                .type(model.getType())
                .build();
    }

    public static Set<ServiceDTO> toDtos(Set<Service> models) {
        Set<ServiceDTO> dtos = new HashSet<>();
        for (var model : models){
            dtos.add(toDto(model));
        }
        return dtos;
    }
}
