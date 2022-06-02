package com.teameleven.anchorex.dto.fishingLesson;

import com.teameleven.anchorex.domain.Location;
import com.teameleven.anchorex.domain.Service;
import com.teameleven.anchorex.dto.ServiceDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class CreateFishingLessonDto {
    private Long ownerId;
    private String name;
    private String description;
    private String rulesOfConduct;
    private double price;
    private Set<ServiceDTO> regularServices;
    private Set<ServiceDTO> additionalServices;
    private Location location;
    private int capacity;
    private double cancellationPercentage;
    private String fishingKit;
}
