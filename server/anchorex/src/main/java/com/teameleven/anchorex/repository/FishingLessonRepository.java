package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.FishingLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;

public interface FishingLessonRepository extends JpaRepository<FishingLesson, Long> {
    @Query(value = "SELECT fl FROM FishingLesson fl WHERE fl.ownerId=?1", nativeQuery = false)
    Collection<FishingLesson> findByOwnerId(Long ownerId);



    @Modifying
    @Query(value = "UPDATE ReservationEntity r SET r.deleted=true WHERE r.id=?1 ")
    void deleteFishingLesson (Long id);
}
