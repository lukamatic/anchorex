package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Lodge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface LodgeRepository extends JpaRepository<Lodge, Long> {

    @Transactional
    @Modifying
    @Query(value = "UPDATE ReservationEntity r SET r.deleted=true WHERE r.id=?1 ")
    void deleteLodge (Long id);
}
