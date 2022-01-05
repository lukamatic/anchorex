package com.teameleven.anchorex.dto.reservationEntity;

public class AdditionalServiceDTO {
    private String info;
    private double price;

    public AdditionalServiceDTO() {
    }

    public AdditionalServiceDTO(String info, double price) {
        this.info = info;
        this.price = price;
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
