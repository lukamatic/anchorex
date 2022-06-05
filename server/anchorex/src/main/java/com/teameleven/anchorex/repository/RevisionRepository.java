package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Revision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface RevisionRepository extends JpaRepository<Revision, Long> {


    @Query(value = "SELECT r FROM Revision r WHERE r.userId=?2 AND r.reservationEntity.id =?1")
    Revision getReservationRevisionFromUser(Long reservationEntityId, Long userId);
}
