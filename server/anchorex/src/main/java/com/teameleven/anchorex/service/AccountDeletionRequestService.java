package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.AccountDeletionRequest;

import java.util.Collection;

public interface AccountDeletionRequestService {

    AccountDeletionRequest create(String reason, String userEmail);

    Collection<AccountDeletionRequest> findAll();

    void approve(Long id);

    void reject(Long id, String reason);
}
