package com.teameleven.anchorex.domain;

import com.teameleven.anchorex.enums.ReviewStatus;

import javax.persistence.*;

@Entity
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn (name= "user_id")
    private User user;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn (name= "reservation_entity_id")
    private ReservationEntity reservationEntity;

    public Subscription() {
        super();
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public ReservationEntity getReservationEntity() {
        return reservationEntity;
    }

    public void setReservationEntity(ReservationEntity reservationEntity) {
        this.reservationEntity = reservationEntity;
    }

    public Subscription(Long id, ReservationEntity reservationEntity, User user) {
        this.id = id;
        this.user = user;
        this.reservationEntity = reservationEntity;

    }
}
