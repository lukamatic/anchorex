package com.teameleven.anchorex.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
public class Lodge extends ReservationEntity{
    @Column
    private Integer singleBedroomNumber;

    @Column
    private Integer doubleBedroomNumber;

    @Column
    private Integer fourBedroomNumber;
}
