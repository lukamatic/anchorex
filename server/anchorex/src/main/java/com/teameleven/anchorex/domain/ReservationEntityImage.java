package com.teameleven.anchorex.domain;

import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@SQLDelete(sql = "UPDATE reservation_entity_image SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
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

    @Column
    private boolean deleted;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "reservation_entity_id")
    private ReservationEntity reservationEntity;
}
