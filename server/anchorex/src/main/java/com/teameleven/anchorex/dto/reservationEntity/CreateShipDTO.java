package com.teameleven.anchorex.dto.reservationEntity;

import com.teameleven.anchorex.dto.LocationDTO;
import com.teameleven.anchorex.dto.ServiceDTO;

import java.util.Set;

public class CreateShipDTO {
    private Long ownerId;
    private String name;
    private String description;
    private String rulesOfConduct;
    private String type;
    private double length;
    private Integer engineCount;
    private double enginePower;
    private double maxSpeed;
    private String navigationKit;
    private Integer capacity;
    private String fishingKit;
    private double cancellationPercentage;
    private Set<ServiceDTO> regularServices;
    private Set<ServiceDTO> additionalServices;
    private LocationDTO location;

    public CreateShipDTO() {
        super();
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRulesOfConduct() {
        return rulesOfConduct;
    }

    public void setRulesOfConduct(String rulesOfConduct) {
        this.rulesOfConduct = rulesOfConduct;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }

    public Integer getEngineCount() {
        return engineCount;
    }

    public void setEngineCount(Integer engineCount) {
        this.engineCount = engineCount;
    }

    public double getEnginePower() {
        return enginePower;
    }

    public void setEnginePower(double enginePower) {
        this.enginePower = enginePower;
    }

    public double getMaxSpeed() {
        return maxSpeed;
    }

    public void setMaxSpeed(double maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    public String getNavigationKit() {
        return navigationKit;
    }

    public void setNavigationKit(String navigationKit) {
        this.navigationKit = navigationKit;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getFishingKit() {
        return fishingKit;
    }

    public void setFishingKit(String fishingKit) {
        this.fishingKit = fishingKit;
    }

    public double getCancellationPercentage() {
        return cancellationPercentage;
    }

    public void setCancellationPercentage(double cancellationPercentage) {
        this.cancellationPercentage = cancellationPercentage;
    }

    public Set<ServiceDTO> getRegularServices() {
        return regularServices;
    }

    public void setRegularServices(Set<ServiceDTO> regularServices) {
        this.regularServices = regularServices;
    }

    public Set<ServiceDTO> getAdditionalServices() {
        return additionalServices;
    }

    public void setAdditionalServices(Set<ServiceDTO> additionalServices) {
        this.additionalServices = additionalServices;
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
    }
}
