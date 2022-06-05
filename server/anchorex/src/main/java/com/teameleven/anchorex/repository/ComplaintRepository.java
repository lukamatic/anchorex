package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Complaint;
import com.teameleven.anchorex.domain.FishingLesson;
import com.teameleven.anchorex.domain.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    @Query(value = "SELECT c FROM Complaint c WHERE c.user.id=?1", nativeQuery = false)
    Collection<Complaint> findComplainsBy(Long ownerId);
}
