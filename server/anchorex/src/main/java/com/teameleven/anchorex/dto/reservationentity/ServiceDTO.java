package com.teameleven.anchorex.dto.reservationentity;

import com.teameleven.anchorex.enums.ServiceType;

public class ServiceDTO {
    private String info;
    private double price;
    private ServiceType type;
    public ServiceDTO() {
    }

    public ServiceType getType() {
        return type;
    }

    public void setType(ServiceType type) {
        this.type = type;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

}
