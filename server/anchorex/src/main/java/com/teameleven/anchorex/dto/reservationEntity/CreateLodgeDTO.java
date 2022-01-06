package com.teameleven.anchorex.dto.reservationEntity;

import com.teameleven.anchorex.domain.Location;

import java.util.Set;

public class CreateLodgeDTO {
    private Long ownerId;
    private String name;
    private String description;
    private String rulesOfConduct;
    private double lodgePrice;
    private Integer singleBedroomNumber;
    private Integer doubleBedroomNumber;
    private Integer fourBedroomNumber;
    private Set<AdditionalServiceDTO> services;
    private LocationDTO location;


    public CreateLodgeDTO() {
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
    }

    public Set<AdditionalServiceDTO> getServices() {
        return services;
    }

    public void setServices(Set<AdditionalServiceDTO> services) {
        this.services = services;
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

    public double getLodgePrice() {
        return lodgePrice;
    }

    public void setLodgePrice(double lodgePrice) {
        this.lodgePrice = lodgePrice;
    }

    public Integer getSingleBedroomNumber() {
        return singleBedroomNumber;
    }

    public void setSingleBedroomNumber(Integer singleBedroomNumber) {
        this.singleBedroomNumber = singleBedroomNumber;
    }

    public Integer getDoubleBedroomNumber() {
        return doubleBedroomNumber;
    }

    public void setDoubleBedroomNumber(Integer doubleBedroomNumber) {
        this.doubleBedroomNumber = doubleBedroomNumber;
    }

    public Integer getFourBedroomNumber() {
        return fourBedroomNumber;
    }

    public void setFourBedroomNumber(Integer fourBedroomNumber) {
        this.fourBedroomNumber = fourBedroomNumber;
    }
}
