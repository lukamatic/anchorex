package com.teameleven.anchorex.domain;

import javax.persistence.*;

@Entity
public class AdditionalService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @Column
    private String info;
    @Column
    private double price;

    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn (name= "reservation_entity_id")
    private ReservationEntity entity;

    public AdditionalService() {
        super();
    }

    public AdditionalService(String id, String info, double price) {
        super();
        this.id = id;
        this.info = info;
        this.price = price;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
