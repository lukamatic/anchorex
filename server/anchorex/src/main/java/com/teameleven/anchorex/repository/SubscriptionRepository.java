package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Complaint;
import com.teameleven.anchorex.domain.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {


    @Query(value = "SELECT c FROM Subscription c WHERE c.userId=?1")
    List<Subscription> getSubscriptionsFromUser(Long userId);
}
