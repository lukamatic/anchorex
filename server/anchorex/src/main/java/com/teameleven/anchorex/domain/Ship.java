package com.teameleven.anchorex.domain;

import com.teameleven.anchorex.enums.ReservationEntityType;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Ship extends ReservationEntity{
    @Column
    private String shipType;
    @Column
    private double length;
    @Column
    private Integer engineCount;
    @Column
    private double enginePower;
    @Column
    private double maxSpeed;
    @Column
    private String navigationKit;
    @Column
    private Integer capacity;
    @Column
    private String fishingKit;
    @Column
    private double cancellationPercentage;

    public Ship(){

    }


    public Ship(Long id, Long ownerId, String name, String description, double averageRating, String rulesOfConduct,
                ReservationEntityType reservationEntityType, boolean deleted, String shipType, double length,
                Integer engineCount, double enginePower, double maxSpeed, String navigationKit, Integer capacity,
                String fishingKit, double cancellationPercentage) {
        super(id, ownerId, name, description, averageRating, rulesOfConduct, reservationEntityType, deleted);
        this.shipType = shipType;
        this.length = length;
        this.engineCount = engineCount;
        this.enginePower = enginePower;
        this.maxSpeed = maxSpeed;
        this.navigationKit = navigationKit;
        this.capacity = capacity;
        this.fishingKit = fishingKit;
        this.cancellationPercentage = cancellationPercentage;
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
