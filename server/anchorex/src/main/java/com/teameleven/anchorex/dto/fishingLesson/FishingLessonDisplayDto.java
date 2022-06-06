package com.teameleven.anchorex.dto.fishingLesson;

import com.teameleven.anchorex.dto.LocationDTO;
import com.teameleven.anchorex.dto.ReservationEntityImageDto;
import com.teameleven.anchorex.dto.ServiceDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Builder
public class FishingLessonDisplayDto {
    private Long id;
    private Long ownerId;
    private String name;
    private String description;
    public double averageRating;
    private String rulesOfConduct;
    private Set<ServiceDTO> services;
    private LocationDTO location;
    private Set<ReservationEntityImageDto> images;
    private int capacity;
    private double cancellationPercentage;
    private String fishingKit;

    public FishingLessonDisplayDto(){
        super();
    }

    public FishingLessonDisplayDto(Long id, Long ownerId, String name, String description, double averageRating, String rulesOfConduct, Set<ServiceDTO> services, LocationDTO location, Set<ReservationEntityImageDto> images, int capacity, double cancellationPercentage, String fishingKit) {
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.description = description;
        this.averageRating = averageRating;
        this.rulesOfConduct = rulesOfConduct;
        this.services = services;
        this.location = location;
        this.images = images;
        this.capacity = capacity;
        this.cancellationPercentage = cancellationPercentage;
        this.fishingKit = fishingKit;
    }
}
