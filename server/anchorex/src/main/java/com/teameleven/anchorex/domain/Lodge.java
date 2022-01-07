package com.teameleven.anchorex.domain;

import com.teameleven.anchorex.enums.ReservationEntityType;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
public class Lodge extends ReservationEntity{
    @Column
    private Integer singleBedroomNumber;
    @Column
    private Integer doubleBedroomNumber;
    @Column
    private Integer fourBedroomNumber;


    public Lodge() {
    }

    public Lodge(Long id, Long ownerId, String name, String description, double averageRating,
                 String rulesOfConduct, double price, ReservationEntityType reservationEntityType, boolean deleted,
                 Integer singleBedroomNumber, Integer doubleBedroomNumber, Integer fourBedroomNumber) {
        super(id, ownerId, name, description, averageRating, rulesOfConduct, price, reservationEntityType, deleted);
        this.singleBedroomNumber = singleBedroomNumber;
        this.doubleBedroomNumber = doubleBedroomNumber;
        this.fourBedroomNumber = fourBedroomNumber;
    }

    public Integer getSingleBedroomNumber() {
        return singleBedroomNumber;
    }

    public void setSingleBedroomNumber(Integer singleBedroomNumber) {
        this.singleBedroomNumber = singleBedroomNumber;
    }

    public Integer getDoubleBedroomNumber() {
        return doubleBedroomNumber;
    }

    public void setDoubleBedroomNumber(Integer doubleBedroomNumber) {
        this.doubleBedroomNumber = doubleBedroomNumber;
    }

    public Integer getFourBedroomNumber() {
        return fourBedroomNumber;
    }

    public void setFourBedroomNumber(Integer fourBedroomNumber) {
        this.fourBedroomNumber = fourBedroomNumber;
    }


}
