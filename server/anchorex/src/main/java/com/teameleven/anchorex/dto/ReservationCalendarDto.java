package com.teameleven.anchorex.dto;

import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ReservationCalendarDto {
    private Long id;
    private Date startDate;
    private Date endDate;
    private Long reservationEntityId;
    private String reservationEntityName;
    private Long userId;
    private String userFullName;
}
