package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.FishingLesson;
import com.teameleven.anchorex.domain.ReservationEntityImage;
import com.teameleven.anchorex.domain.Service;
import com.teameleven.anchorex.dto.LocationDTO;
import com.teameleven.anchorex.dto.ReservationEntityImageDto;
import com.teameleven.anchorex.dto.ServiceDTO;
import com.teameleven.anchorex.dto.fishingLesson.CreateFishingLessonDto;
import com.teameleven.anchorex.dto.fishingLesson.FishingLessonDisplayDto;
import com.teameleven.anchorex.dto.fishingLesson.FishingLessonDto;
import com.teameleven.anchorex.dto.test.TestDto;
import com.teameleven.anchorex.enums.ReservationEntityType;
import com.teameleven.anchorex.enums.ServiceType;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class FishingLessonMapper {
    public static FishingLesson toModel(CreateFishingLessonDto dto) {
        var fishingLesson = FishingLesson.builder()
                .ownerId(dto.getOwnerId())
                .name(dto.getName())
                .description(dto.getDescription())
                .averageRating(0)
                .rulesOfConduct(dto.getRulesOfConduct())
                .reservationEntityType(ReservationEntityType.FISHING_LESSON)
                .capacity(dto.getCapacity())
                .cancellationPercentage(dto.getCancellationPercentage())
                .fishingKit(dto.getFishingKit())
                .services(new HashSet<>())
                .images(new HashSet<>())
                .build();
        dto.getRegularServices().forEach(serviceDTO -> {
            serviceDTO.setType(ServiceType.REGULAR);
            var service = ServiceMapper.serviceDTOToService(serviceDTO);
            fishingLesson.addService(service);
        });
        dto.getAdditionalServices().forEach(serviceDTO -> {
            serviceDTO.setType(ServiceType.ADDITIONAL);
            var service = ServiceMapper.serviceDTOToService(serviceDTO);
            fishingLesson.addService(service);
        });
        fishingLesson.setLocation(dto.getLocation());
        return fishingLesson;
    }

    public static FishingLessonDto toDto(FishingLesson model) {
        return FishingLessonDto.builder()
                .id(model.getId())
                .name(model.getName())
                .build();
    }

    public static Collection<FishingLessonDto> toDtos(Collection<FishingLesson> models) {
        Collection<FishingLessonDto> dtos = new ArrayList<FishingLessonDto>();
        for (var model : models){
            dtos.add(toDto(model));
        }
        return dtos;
    }

    public static FishingLessonDisplayDto toDisplayDto(FishingLesson model) {
        return FishingLessonDisplayDto.builder()
                .id(model.getId())
                .name(model.getName())
                .ownerId(model.getOwnerId())
                .description(model.getDescription())
                .averageRating(model.getAverageRating())
                .rulesOfConduct(model.getRulesOfConduct())
                .capacity(model.getCapacity())
                .cancellationPercentage(model.getCancellationPercentage())
                .fishingKit(model.getFishingKit())
                .services(ServiceMapper.toDtos(model.getServices()))
                .location(LocationMapper.toDto(model.getLocation()))
                .images(ReservationEntityImageMapper.toDtos(model.getImages()))
                .build();
    }

    public static FishingLessonDisplayDto lessonToLessonDisplayDto(FishingLesson lesson) {
        FishingLessonDisplayDto dto = new FishingLessonDisplayDto();
        dto.setId(lesson.getId());
        dto.setName(lesson.getName());
        dto.setOwnerId(lesson.getOwnerId());
        dto.setDescription(lesson.getDescription());
        dto.setRulesOfConduct(lesson.getRulesOfConduct());
        dto.setCapacity(lesson.getCapacity());
        dto.setFishingKit(lesson.getFishingKit());
        Set<ServiceDTO> services = new HashSet<>();
        dto.setCancellationPercentage(lesson.getCancellationPercentage());
        dto.setAverageRating(lesson.getAverageRating());
        for(Service service: lesson.getServices()){
            ServiceDTO serviceDTO = new ServiceDTO();
            serviceDTO.setId(service.getId());
            serviceDTO.setInfo(service.getInfo());
            serviceDTO.setPrice(service.getPrice());
            serviceDTO.setType(service.getType());
            services.add(serviceDTO);
        }
        Set<ReservationEntityImageDto> images = new HashSet<>();
        for(ReservationEntityImage image: lesson.getImages()){
            ReservationEntityImageDto imageDto = new ReservationEntityImageDto();
            imageDto.setId(image.getId());
            imageDto.setUrl(image.getUrl());
            images.add(imageDto);
        }
        dto.setImages(images);
        dto.setServices(services);

        LocationDTO locationDTO = new LocationDTO();
        locationDTO.setAddress(lesson.getLocation().getAddress());
        locationDTO.setCity(lesson.getLocation().getCity());
        locationDTO.setCountry(lesson.getLocation().getCountry());
        locationDTO.setLongitude(lesson.getLocation().getLongitude());
        locationDTO.setLatitude(lesson.getLocation().getLatitude());
        dto.setLocation(locationDTO);
        return dto;
    }
}
