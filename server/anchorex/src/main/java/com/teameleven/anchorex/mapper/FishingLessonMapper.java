package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.FishingLesson;
import com.teameleven.anchorex.dto.fishingLesson.CreateFishingLessonDto;
import com.teameleven.anchorex.dto.fishingLesson.FishingLessonDisplayDto;
import com.teameleven.anchorex.dto.fishingLesson.FishingLessonDto;
import com.teameleven.anchorex.dto.test.TestDto;
import com.teameleven.anchorex.enums.ReservationEntityType;
import com.teameleven.anchorex.enums.ServiceType;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;

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
                .description(model.getDescription())
                .averageRating(model.getAverageRating())
                .rulesOfConduct(model.getRulesOfConduct())
                .capacity(model.getCapacity())
                .cancellationPercentage(model.getCancellationPercentage())
                .fishingKit(model.getFishingKit())
                .services(ServiceMapper.toDtos(model.getServices()))
                .location(LocationMapper.toDto(model.getLocation()))
                .build();
    }
}
