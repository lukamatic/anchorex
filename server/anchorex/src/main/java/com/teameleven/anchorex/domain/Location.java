package com.teameleven.anchorex.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Location{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private double longitude;
    @Column
    private double latitude;
    @Column
    private String address;
    @Column
    private String city;
    @Column
    private String country;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "reservation_entity_id")
    private ReservationEntity entity;


    public Location() {
    }

    public Location(double longitude, double latitude, String address, String city, String country) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.address = address;
        this.city = city;
        this.country = country;
    }


    public ReservationEntity getEntity() {
        return entity;
    }

    public void setEntity(ReservationEntity entity) {
        this.entity = entity;
    }


    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
