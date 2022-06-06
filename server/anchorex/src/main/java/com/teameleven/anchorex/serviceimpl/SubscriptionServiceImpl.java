package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Subscription;
import com.teameleven.anchorex.dto.SubscriptionDTO;
import com.teameleven.anchorex.dto.SubscriptionDetailsDTO;
import com.teameleven.anchorex.repository.*;
import com.teameleven.anchorex.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ReservationEntityRepository reservationEntityRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;


    public SubscriptionServiceImpl(UserRepository userRepository, ReservationRepository reservationRepository, SubscriptionRepository subscriptionRepository,ReservationEntityRepository reservationEntityRepository) {
        this.userRepository = userRepository;
        this.reservationRepository = reservationRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.reservationEntityRepository = reservationEntityRepository;
    }

    @Override
    public void createSubscription(SubscriptionDTO subscriptionDto){
        Subscription sb = new Subscription();
        sb.setReservationId(subscriptionDto.getReservationId());
        sb.setUserId(subscriptionDto.getUserId());
        subscriptionRepository.save(sb);
    }

    @Override
    public List<SubscriptionDetailsDTO> getSubscriptionsForUser(Long userId) {
        var subscriptions = subscriptionRepository.getSubscriptionsFromUser(userId);
        List<SubscriptionDetailsDTO> retArr = new ArrayList<>();
        for(var subscription: subscriptions){
            SubscriptionDetailsDTO sb = new SubscriptionDetailsDTO();
            sb.setReservationId(subscription.getReservationId());
            sb.setReservationName(reservationEntityRepository.getName(subscription.getId()));
            retArr.add(sb);
        }
        return retArr;
    }
}
