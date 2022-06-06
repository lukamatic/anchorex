package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.AccountDeletionRequest;
import com.teameleven.anchorex.domain.enumerations.AccountDeletionRequestStatus;
import com.teameleven.anchorex.repository.AccountDeletionRequestRepository;
import com.teameleven.anchorex.service.AccountDeletionRequestService;
import com.teameleven.anchorex.service.UserService;
import com.wildbit.java.postmark.Postmark;
import com.wildbit.java.postmark.client.ApiClient;
import com.wildbit.java.postmark.client.data.model.message.MessageResponse;
import com.wildbit.java.postmark.client.data.model.templates.TemplatedMessage;
import com.wildbit.java.postmark.client.exception.PostmarkException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;

@Service
public class AccountDeletionRequestServiceImpl implements AccountDeletionRequestService {
    private final AccountDeletionRequestRepository accountDeletionRequestRepository;
    private final UserService userService;


    public AccountDeletionRequestServiceImpl(AccountDeletionRequestRepository accountDeletionRequestRepository, UserService userService) {
        this.accountDeletionRequestRepository = accountDeletionRequestRepository;
        this.userService = userService;
    }

    @Override
    public AccountDeletionRequest create(String reason, String userEmail) {
        var accountDeletionRequest = new AccountDeletionRequest();
        var user = this.userService.findByEmail(userEmail);
        accountDeletionRequest.setUser(user);
        accountDeletionRequest.setReason(reason);
        accountDeletionRequest.setStatus(AccountDeletionRequestStatus.PENDING);
        accountDeletionRequest.setVersion(0);
        return this.accountDeletionRequestRepository.save(accountDeletionRequest);
    }

    @Override
    public Collection<AccountDeletionRequest> findAll() {
        return this.accountDeletionRequestRepository.findAll();
    }

    @Override
    @Transactional
    public void approve(Long id) {
        try {
            var request = this.accountDeletionRequestRepository.findById(id).orElse(null);

            if (request == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such request");
            }

            request.setStatus(AccountDeletionRequestStatus.APPROVED);
            this.accountDeletionRequestRepository.save(request);

            this.userService.delete(request.getUser().getId());

            ApiClient client = Postmark.getApiClient("2c3c225b-f823-4924-b983-4b1a82ad17ea");
            TemplatedMessage message = new TemplatedMessage("obradovic.petar@uns.ac.rs", request.getUser().getEmail());
            message.setTemplateId(28168859);
            // set model as HashMap
            HashMap model = new HashMap<String, Object>();
            model.put("firstName", request.getUser().getFirstName());

            message.setTemplateModel(model);

            try {
                MessageResponse response = client.deliverMessage(message);
            } catch (PostmarkException e) {
                throw new RuntimeException(e);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } catch (OptimisticLockingFailureException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Access locked.");
        }
    }

    @Override
    @Transactional
    public void reject(Long id, String reason) {
        try {
            var request = this.accountDeletionRequestRepository.findById(id).orElse(null);

            if (request == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such request");
            }

            request.setStatus(AccountDeletionRequestStatus.REJECTED);
            this.accountDeletionRequestRepository.save(request);

            ApiClient client = Postmark.getApiClient("2c3c225b-f823-4924-b983-4b1a82ad17ea");
            TemplatedMessage message = new TemplatedMessage("obradovic.petar@uns.ac.rs", request.getUser().getEmail());
            message.setTemplateId(28168766);
            // set model as HashMap
            HashMap model = new HashMap<String, Object>();
            model.put("firstName", request.getUser().getFirstName());
            model.put("reason", reason);

            message.setTemplateModel(model);

            try {
                MessageResponse response = client.deliverMessage(message);
            } catch (PostmarkException e) {
                throw new RuntimeException(e);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } catch (OptimisticLockingFailureException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Access locked.");
        }
    }
}
