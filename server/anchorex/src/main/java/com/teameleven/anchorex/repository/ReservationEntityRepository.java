package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.ReservationEntity;
import org.springframework.dao.PessimisticLockingFailureException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.LockModeType;

public interface ReservationEntityRepository extends JpaRepository<ReservationEntity, Long> {

    @Query(value = "SELECT e.ownerId FROM ReservationEntity e where e.id=?1")
    Long getOwnerId(Long id);

    @Query("SELECT e FROM ReservationEntity e WHERE e.id = ?1 ")
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    ReservationEntity getLocked(Long id) throws PessimisticLockingFailureException;
  
    @Query(value = "SELECT e.name FROM ReservationEntity e where e.id=?1")
    String getName(Long id);

}
