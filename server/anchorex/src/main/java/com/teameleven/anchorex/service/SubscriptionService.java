package com.teameleven.anchorex.service;

import com.teameleven.anchorex.dto.FullClientComplaintDTO;
import com.teameleven.anchorex.dto.SubscriptionDTO;
import com.teameleven.anchorex.dto.SubscriptionDetailsDTO;

import java.util.Collection;
import java.util.List;

public interface SubscriptionService {

    List<SubscriptionDetailsDTO> getSubscriptionsForUser(Long userId);

    void createSubscription(SubscriptionDTO subscriptionDTO);
}
