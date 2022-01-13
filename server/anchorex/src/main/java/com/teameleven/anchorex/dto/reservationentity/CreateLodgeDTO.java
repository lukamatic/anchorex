package com.teameleven.anchorex.dto.reservationentity;

import java.util.Set;

public class CreateLodgeDTO {
    private Long ownerId;
    private String name;
    private String description;
    private String rulesOfConduct;
    private Integer singleBedroomNumber;
    private Integer doubleBedroomNumber;
    private Integer fourBedroomNumber;
    private Set<ServiceDTO> regularServices;
    private Set<ServiceDTO> additionalServices;
    private LocationDTO location;


    public CreateLodgeDTO() {
        super();
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
    }

    public Set<ServiceDTO> getAdditionalServices() {
        return additionalServices;
    }

    public void setAdditionalServices(Set<ServiceDTO> additionalServices) {
        this.additionalServices = additionalServices;
    }

    public Set<ServiceDTO> getRegularServices() {
        return regularServices;
    }

    public void setRegularServices(Set<ServiceDTO> regularServices) {
        this.regularServices = regularServices;
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
