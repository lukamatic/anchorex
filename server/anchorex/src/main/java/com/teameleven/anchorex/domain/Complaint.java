package com.teameleven.anchorex.domain;

import com.teameleven.anchorex.enums.ReviewStatus;

import javax.persistence.*;

@Entity
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String comment;

    @Column
    private String respond;

    public String getRespond() {
        return respond;
    }

    public void setRespond(String respond) {
        this.respond = respond;
    }

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn (name= "user_id")
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn (name= "reservation_entity_id")
    private ReservationEntity reservationEntity;

    public Complaint() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }


    public ReservationEntity getReservationEntity() {
        return reservationEntity;
    }

    public void setReservationEntity(ReservationEntity reservationEntity) {
        this.reservationEntity = reservationEntity;
    }

    public Complaint(Long id, String comment, User user, ReservationEntity reservationEntity) {
        this.id = id;
        this.comment = comment;

        this.reservationEntity = reservationEntity;
        this.user = user;
    }
}
