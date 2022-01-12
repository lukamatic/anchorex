package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.Location;
import com.teameleven.anchorex.dto.reservationEntity.LocationDTO;

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

    private LocationMapper(){

    }
}
