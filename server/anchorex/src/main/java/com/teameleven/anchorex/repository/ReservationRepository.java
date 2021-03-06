package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query(value = "SELECT r FROM Reservation r where r.ownerId=?1 and r.captain=true")
    List<Reservation> getOwnerReservations(Long id);

    @Query(value = "SELECT r FROM Reservation r where r.reservationEntity.id=?1 and r.user.id=null")
    List<Reservation> getEntityReservations(Long id);

    @Query(value = "SELECT r FROM Reservation r WHERE r.user.id!=null")
    List<Reservation> getAllUsedReservations();

    @Query(value = "SELECT r FROM Reservation r where r.user.id=?1")
    List<Reservation> getReservationsForUser(Long userId);

    @Query(value = "SELECT r FROM Reservation r where r.reservationEntity.id=?1 and r.user.id!=null")
    List<Reservation> getBookedReservations(Long id);

    @Query(value = "SELECT r FROM Reservation r where r.ownerId=?1 and r.user.id!=null")
    List<Reservation> getClosedReservations(Long id);

    @Query(value = "SELECT r FROM Reservation r where r.user.id!=null")
    List<Reservation> getClosedReservations();

    @Query(value = "SELECT count(*) FROM Reservation r where extract(month from r.startDate) = ?1 and extract(year from r.endDate) = ?2 and r.ownerId=?3")
    int getReservationNumberByMonth(int month, int year, Long id);

    @Query(value = "SELECT count(*) FROM Reservation r where extract(year from r.startDate) = ?1 and r.ownerId=?2")
    int getReservationNumberByYear(int year, Long id);

    @Query(value = "SELECT coalesce(sum(r.price), 0)  FROM Reservation r where extract(year from r.startDate) = ?1 and r.ownerId=?2")
    double getSalaryByYear(int year, Long id);

    @Query(value = "SELECT r FROM Reservation r where extract(month from r.startDate) = ?1 and extract(year from r.endDate) = ?2 and r.ownerId=?3")
    List<Reservation> getReservationsByWeek(int month, int year, Long id);

    @Query(value = "SELECT r FROM Reservation r where r.reservationEntity.id=?1")
    Collection<Reservation> getAllRes(Long entityId);
}
