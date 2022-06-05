package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Revision;
import com.teameleven.anchorex.domain.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {



}
