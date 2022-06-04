package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.ServiceSignupRequest;
import com.teameleven.anchorex.domain.enumerations.ServiceSignupRequestStatus;
import com.teameleven.anchorex.repository.ServiceSignupRequestRepository;
import com.teameleven.anchorex.service.ServiceSignupRequestService;
import com.teameleven.anchorex.service.UserService;
import com.wildbit.java.postmark.Postmark;
import com.wildbit.java.postmark.client.ApiClient;
import com.wildbit.java.postmark.client.data.model.message.MessageResponse;
import com.wildbit.java.postmark.client.data.model.templates.TemplatedMessage;
import com.wildbit.java.postmark.client.exception.PostmarkException;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;

@Service
public class ServiceSignupRequestServiceImpl implements ServiceSignupRequestService {

    private final ServiceSignupRequestRepository serviceSignupRequestRepository;
    private final UserService userService;

    public ServiceSignupRequestServiceImpl(ServiceSignupRequestRepository serviceSignupRequestRepository, UserService userService) {
        this.serviceSignupRequestRepository = serviceSignupRequestRepository;
        this.userService = userService;
    }

    @Override
    public ServiceSignupRequest create(ServiceSignupRequest serviceSignupRequest) throws Exception {
        return serviceSignupRequestRepository.save(serviceSignupRequest);
    }

    @Override
    public Collection<ServiceSignupRequest> findAll() {
        return serviceSignupRequestRepository.findAll();
    }

    @Override
    public ServiceSignupRequest findOneById(Long id) {
        return serviceSignupRequestRepository.findById(id).orElse(null);
    }

    @Override
    public void approve(Long id) throws Exception {
        var serviceSignupRequest = findOneById(id);

        if (serviceSignupRequest == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Service signup request with id %d doesn't exist.", id));
        }

        serviceSignupRequest.setStatus(ServiceSignupRequestStatus.APPROVED);
        serviceSignupRequestRepository.save(serviceSignupRequest);

        var user = serviceSignupRequest.getUser();
        userService.enableUser(user.getId());

        sendApprovalMail(user.getEmail(), user.getFirstName());
    }

    @Override
    public void reject(Long id, String rejectionReason) {
        var serviceSignupRequest = findOneById(id);

        if (serviceSignupRequest == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Service signup request with id %d doesn't exist.", id));
        }

        serviceSignupRequest.setStatus(ServiceSignupRequestStatus.REJECTED);
        serviceSignupRequestRepository.save(serviceSignupRequest);

        var user = serviceSignupRequest.getUser();
        sendRejectionMail(user.getEmail(), user.getFirstName(), rejectionReason);
    }

    private void sendApprovalMail(String email, String firstName) {
        ApiClient client = Postmark.getApiClient("2c3c225b-f823-4924-b983-4b1a82ad17ea");
        TemplatedMessage message = new TemplatedMessage("obradovic.petar@uns.ac.rs", email);
        message.setTemplateId(28161366);
        // set model as HashMap
        HashMap model = new HashMap<String, Object>();
        model.put("firstName", firstName);

        message.setTemplateModel(model);

        try {
            MessageResponse response = client.deliverMessage(message);
        } catch (PostmarkException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void sendRejectionMail(String email, String firstName, String rejectionReason) {
        ApiClient client = Postmark.getApiClient("2c3c225b-f823-4924-b983-4b1a82ad17ea");
        TemplatedMessage message = new TemplatedMessage("obradovic.petar@uns.ac.rs", email);
        message.setTemplateId(28161323);
        // set model as HashMap
        HashMap model = new HashMap<String, Object>();
        model.put("firstName", firstName);
        model.put("reason", rejectionReason);

        message.setTemplateModel(model);

        try {
            MessageResponse response = client.deliverMessage(message);
        } catch (PostmarkException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
