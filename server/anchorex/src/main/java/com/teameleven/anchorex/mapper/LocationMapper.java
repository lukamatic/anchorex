package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.Location;
import com.teameleven.anchorex.dto.LocationDTO;

public class LocationMapper {
    public static Location locationDTOToLocation(LocationDTO locationDTO){
        Location location = new Location();
        location.setAddress(locationDTO.getAddress());
        location.setCity(locationDTO.getCity());
        location.setCountry(locationDTO.getCountry());
        location.setLatitude(locationDTO.getLatitude());
        location.setLongitude(locationDTO.getLongitude());
        return location;
    }

    public static LocationDTO toDto(Location model) {
        return LocationDTO.builder()
                .address(model.getAddress())
                .city(model.getCity())
                .country(model.getCountry())
                .latitude(model.getLatitude())
                .longitude(model.getLongitude())
                .build();
    }
}
