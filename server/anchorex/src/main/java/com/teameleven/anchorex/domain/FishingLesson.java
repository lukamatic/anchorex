package com.teameleven.anchorex.domain;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
public class FishingLesson extends ReservationEntity {
    @Column
    private int capacity;

    @Column
    private double cancellationPercentage;

    @Column
    private String fishingKit;
}
