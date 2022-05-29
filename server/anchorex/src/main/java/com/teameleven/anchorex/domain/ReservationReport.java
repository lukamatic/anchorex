package com.teameleven.anchorex.domain;

import javax.persistence.*;

@Entity
public class ReservationReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private Long ownerId;
    @Column
    private boolean penaltySuggestion;
    @Column
    private boolean clientShowedUp;
    @Column
    private String comment;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "client_id")
    private User client;



    public ReservationReport() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isPenaltySuggestion() {
        return penaltySuggestion;
    }

    public void setPenaltySuggestion(boolean penaltySuggestion) {
        this.penaltySuggestion = penaltySuggestion;
    }

    public boolean isClientShowedUp() {
        return clientShowedUp;
    }

    public void setClientShowedUp(boolean clientShowedUp) {
        this.clientShowedUp = clientShowedUp;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public Long getOwner() {
        return ownerId;
    }

    public void setOwner(Long ownerId) {
        this.ownerId = ownerId;
    }


}
