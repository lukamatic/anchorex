package com.teameleven.anchorex.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ReservationEntityImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String url;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "reservation_entity_id")
    private ReservationEntity reservationEntity;
}
