package com.teameleven.anchorex.domain;

import com.teameleven.anchorex.enums.ReservationEntityType;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
//@SQLDelete(sql = "UPDATE reservation_entity SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
public class ReservationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column
    public Long ownerId;

    @Column
    public String name;

    @Column
    public String description;

    @Column
    public double averageRating;

    @Column
    public String rulesOfConduct;

    @Column
    public ReservationEntityType reservationEntityType;

    @Column
    public boolean deleted;

    @OneToMany(mappedBy = "reservationEntity", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    public Set<Service> services = new HashSet<>();

    @OneToMany(mappedBy = "reservationEntity", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    public Set<FreePeriod> periods = new HashSet<>();

    @OneToOne(mappedBy = "reservationEntity", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    public Location location;

    @OneToMany(mappedBy = "reservationEntity", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    public Set<ReservationEntityImage> images = new HashSet<>();

    public void addService(Service service) {
        this.services.add(service);
        service.setReservationEntity(this);
    }

    public void removeService(Service service) {
        this.services.remove(service);
        service.setReservationEntity(null);
    }

    public void setLocation(Location location) {
        this.location = location;
        location.setReservationEntity(this);
    }

    public void addImage(ReservationEntityImage image) {
        this.images.add(image);
        image.setReservationEntity(this);
    }

    public void removeImage(ReservationEntityImage image) {
        this.images.remove(image);
        image.setReservationEntity(null);
    }
}
