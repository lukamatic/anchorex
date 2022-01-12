package com.teameleven.anchorex.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.teameleven.anchorex.enums.ReservationEntityType;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@SQLDelete(sql = "UPDATE reservationEntity SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class ReservationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column
    public Long ownerId;
    @Column
    public String name;
    @Column
    public String description;
    @Column
    public double averageRating;
    @Column
    public String rulesOfConduct;
    @Column
    public ReservationEntityType reservationEntityType;
    @Column
    public boolean deleted;

    @JsonManagedReference
    @OneToMany(mappedBy = "entity", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    public Set<Service> services = new HashSet<Service>();

    @OneToOne(mappedBy = "entity", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    public Location location;

    public ReservationEntity() {
        super();
    }

    public ReservationEntity(Long id, Long ownerId, String name, String description, double averageRating,
                             String rulesOfConduct, ReservationEntityType reservationEntityType,
                             boolean deleted) {
        super();
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.description = description;
        this.averageRating = averageRating;
        this.rulesOfConduct = rulesOfConduct;
        this.reservationEntityType = reservationEntityType;
        this.deleted = deleted;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public String getRulesOfConduct() {
        return rulesOfConduct;
    }

    public void setRulesOfConduct(String rulesOfConduct) {
        this.rulesOfConduct = rulesOfConduct;
    }

    public ReservationEntityType getReservationEntityType() {
        return reservationEntityType;
    }

    public void setReservationEntityType(ReservationEntityType reservationEntityType) {
        this.reservationEntityType = reservationEntityType;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public Set<Service> getServices() {
        return services;
    }

    public void setServices(Set<Service> services) {
        this.services = services;
    }
}
