package com.teameleven.anchorex.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LoyaltyProgram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;


    @Column
    public Integer reservationPoints;

    @Column
    public Integer bronzeBorder;

    @Column
    public Integer silverBorder;

    @Column
    public Integer goldBorder;

    @Column
    public Double bronzeDiscount;

    @Column
    public Double silverDiscount;

    @Column
    public Double goldDiscount;
}
