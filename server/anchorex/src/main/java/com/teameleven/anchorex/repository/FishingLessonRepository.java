package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.FishingLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface FishingLessonRepository extends JpaRepository<FishingLesson, Long> {
    @Query(value = "SELECT fl FROM FishingLesson fl WHERE fl.ownerId=?1", nativeQuery = false)
    Collection<FishingLesson> findByOwnerId(Long ownerId);
}
