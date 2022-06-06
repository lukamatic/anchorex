package com.teameleven.anchorex.dto.reservationEntity;

public class LodgeDTO {
    private Long id;
    private String name;
    private double averageRating;

    public LodgeDTO() {
        super();
    }

    public LodgeDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}
