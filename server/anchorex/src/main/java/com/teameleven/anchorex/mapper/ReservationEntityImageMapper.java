package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.ReservationEntityImage;
import com.teameleven.anchorex.dto.ReservationEntityImageDto;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class ReservationEntityImageMapper {
    public static ReservationEntityImageDto toDto(ReservationEntityImage model) {
        return ReservationEntityImageDto.builder()
                .id(model.getId())
                .url(model.getUrl())
                .build();
    }

    public static Set<ReservationEntityImageDto> toDtos(Collection<ReservationEntityImage> models) {
        Set<ReservationEntityImageDto> dtos = new HashSet<>();
        for (var model : models){
            dtos.add(toDto(model));
        }
        return dtos;
    }
}
