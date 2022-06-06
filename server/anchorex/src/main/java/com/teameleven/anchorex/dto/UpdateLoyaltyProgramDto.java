package com.teameleven.anchorex.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UpdateLoyaltyProgramDto {
    public Long id;
    public Integer reservationPoints;
    public Integer silverBorder;
    public Integer goldBorder;
    public Double silverDiscount;
    public Double goldDiscount;
}
