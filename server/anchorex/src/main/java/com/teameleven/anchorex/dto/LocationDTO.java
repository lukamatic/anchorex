package com.teameleven.anchorex.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class LocationDTO {
    private double latitude;
    private double longitude;
    private String address;
    private String city;
    private String country;
}
