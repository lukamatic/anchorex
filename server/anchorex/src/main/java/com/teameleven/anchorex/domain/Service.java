package com.teameleven.anchorex.domain;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.teameleven.anchorex.enums.ServiceType;

import javax.persistence.*;

@Entity
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String info;
    @Column
    private double price;
    @Column
    private ServiceType type;

    @JsonBackReference
    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn (name= "reservation_entity_id")
    private ReservationEntity entity;

    public Service() {
        super();
    }

    public Service(Long id, String info, double price, ServiceType type) {
        this.id = id;
        this.info = info;
        this.price = price;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public ServiceType getType() {
        return type;
    }

    public void setType(ServiceType type) {
        this.type = type;
    }

    public ReservationEntity getEntity() {
        return entity;
    }

    public void setEntity(ReservationEntity entity) {
        this.entity = entity;
    }
}
