package com.teameleven.anchorex.domain;

import com.teameleven.anchorex.domain.enumerations.ReservationReportStatus;
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
public class ReservationReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name= "owner_id")
    private User owner;

    @Column
    private Boolean penaltySuggestion;

    @Column
    private Boolean clientShowedUp;

    @Column
    private String comment;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name= "client_id")
    private User client;

    @Column
    private ReservationReportStatus status;
}
