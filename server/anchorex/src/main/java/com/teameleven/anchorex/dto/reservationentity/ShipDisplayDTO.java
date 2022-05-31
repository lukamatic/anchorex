package com.teameleven.anchorex.dto.reservationentity;

import java.util.Set;

public class ShipDisplayDTO {
    private Long id;
    private Long ownerId;
    private String name;
    private String description;
    private String rulesOfConduct;
    private Set<ServiceDTO> services;
    private LocationDTO location;
    private String shipType;
    private double length;
    private Integer engineCount;
    private double enginePower;
    private double maxSpeed;
    private String navigationKit;
    private Integer capacity;
    private String fishingKit;
    private double cancellationPercentage;

    public ShipDisplayDTO(){
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<ServiceDTO> getServices() {
        return services;
    }

    public void setServices(Set<ServiceDTO> services) {
        this.services = services;
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
    }

    public String getShipType() {
        return shipType;
    }

    public void setShipType(String shipType) {
        this.shipType = shipType;
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
}
