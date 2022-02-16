package com.teameleven.anchorex.dto.reservationentity;

import java.util.Set;

public class LodgeDisplayDTO {
    private Long id;
    private Long ownerId;
    private String name;
    private String description;
    private String rulesOfConduct;
    private Integer singleBedroomNumber;
    private Integer doubleBedroomNumber;
    private Integer fourBedroomNumber;
    private Set<ServiceDTO> services;
    private LocationDTO location;

    public LodgeDisplayDTO() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
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

    public Set<ServiceDTO> getServices() {
        return services;
    }

    public void setServices(Set<ServiceDTO> services) {
        this.services = services;
    }
}
