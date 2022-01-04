package com.teameleven.anchorex.domain;


import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
public class AdditionalService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String info;
    @Column
    private double price;

    @JsonBackReference
    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn (name= "reservation_entity_id")
    private ReservationEntity entity;


    public AdditionalService() {
        super();
    }

    public AdditionalService(Long id, String info, double price) {
        super();
        this.id = id;
        this.info = info;
        this.price = price;
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

    public ReservationEntity getEntity() {
        return entity;
    }

    public void setEntity(ReservationEntity entity) {
        this.entity = entity;
    }
}
