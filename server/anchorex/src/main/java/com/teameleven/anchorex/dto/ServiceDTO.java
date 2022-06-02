package com.teameleven.anchorex.dto;

import com.teameleven.anchorex.enums.ServiceType;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ServiceDTO {
    private Long id;
    private String info;
    private double price;
    private ServiceType type;
}
