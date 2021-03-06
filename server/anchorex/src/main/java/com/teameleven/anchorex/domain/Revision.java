package com.teameleven.anchorex.domain;

import com.teameleven.anchorex.enums.RevisionStatus;

import javax.persistence.*;

@Entity
public class Revision {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String comment;

    @Column
    private int rating;

    @Column
    private Long userId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Column
    private RevisionStatus status;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn (name= "reservation_entity_id")
    private ReservationEntity reservationEntity;

    @Version
    @Column(name="version", nullable = false)
    private Integer version;

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Revision() {
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

    public int getRating() {
        return rating;
    }

    public void setRating(int score) {
        this.rating = score;
    }

    public ReservationEntity getReservationEntity() {
        return reservationEntity;
    }

    public void setReservationEntity(ReservationEntity reservationEntity) {
        this.reservationEntity = reservationEntity;
    }

    public RevisionStatus getStatus() {
        return status;
    }

    public void setStatus(RevisionStatus status) {
        this.status = status;
    }

    public Revision(Long id, String comment, int rating, ReservationEntity reservationEntity) {
        this.id = id;
        this.comment = comment;
        this.rating = rating;
        this.reservationEntity = reservationEntity;
        this.status = RevisionStatus.PENDING;
    }
}
