package com.teameleven.anchorex.dto.fishingLesson;

import com.teameleven.anchorex.domain.Location;
import com.teameleven.anchorex.domain.Service;
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
    private Set<Service> services;
    private Location location;
    private int capacity;
    private double cancellationPercentage;
    private String fishingKit;
}
