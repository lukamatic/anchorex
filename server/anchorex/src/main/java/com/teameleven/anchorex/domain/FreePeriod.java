package com.teameleven.anchorex.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.teameleven.anchorex.domain.ReservationEntity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class FreePeriod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private Date startDate;
    @Column
    private Date endDate;

    @JsonBackReference
    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn (name= "reservation_entity_id")
    private ReservationEntity entity;

    public FreePeriod() {
        super();
    }

    public FreePeriod(Long id, Date startDate, Date endDate) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public ReservationEntity getEntity() {
        return entity;
    }

    public void setEntity(ReservationEntity entity) {
        this.entity = entity;
    }
}
