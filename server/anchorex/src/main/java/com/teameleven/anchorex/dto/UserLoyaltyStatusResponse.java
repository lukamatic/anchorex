package com.teameleven.anchorex.dto;

import com.teameleven.anchorex.domain.enumerations.LoyaltyStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserLoyaltyStatusResponse {
    LoyaltyStatus loyaltyStatus;
    Integer points;
    Double discount;
}
