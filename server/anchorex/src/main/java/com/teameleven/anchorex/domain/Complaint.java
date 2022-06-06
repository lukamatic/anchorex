package com.teameleven.anchorex.domain;

import com.teameleven.anchorex.enums.ComplaintStatus;

import javax.persistence.*;

@Entity
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private ComplaintStatus status;

    public ComplaintStatus getStatus() {
        return status;
    }

    public void setStatus(ComplaintStatus status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Column
    private String comment;

    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn (name= "user_id")
    private User user;

    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn (name= "reservation_id")
    private ReservationEntity reservation;

    @Version
    @Column(name="version", nullable = false)
    private Integer version;

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    private String reservationEntityName;

    public String getReservationEntityName() {
        return reservationEntityName;
    }

    public void setReservationEntityName(String reservationEntityName) {
        this.reservationEntityName = reservationEntityName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ReservationEntity getReservation() {
        return reservation;
    }

    public void setReservation(ReservationEntity reservation) {
        this.reservation = reservation;
    }



    public Complaint() {
        super();
    }

}
