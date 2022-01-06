package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.ServiceSignupRequest;
import com.teameleven.anchorex.domain.enumerations.ServiceSignupRequestStatus;
import com.teameleven.anchorex.repository.ServiceSignupRequestRepository;
import com.teameleven.anchorex.service.ServiceSignupRequestService;
import com.teameleven.anchorex.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;

@Service
public class ServiceSignupRequestServiceImpl implements ServiceSignupRequestService {

    private final ServiceSignupRequestRepository serviceSignupRequestRepository;
    private final UserService userService;
    private final JavaMailSender javaMailSender;

    public ServiceSignupRequestServiceImpl(ServiceSignupRequestRepository serviceSignupRequestRepository, UserService userService, JavaMailSender javaMailSender) {
        this.serviceSignupRequestRepository = serviceSignupRequestRepository;
        this.userService = userService;
        this.javaMailSender = javaMailSender;
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
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);

        msg.setSubject("Signup request approval");
        msg.setText(String.format("Dear %s,\n\nYour service signup request has been approved and your account is now enabled. Enjoy Anchorex!", firstName));

        javaMailSender.send(msg);
    }

    private void sendRejectionMail(String email, String firstName, String rejectionReason) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);

        msg.setSubject("Signup request approval");
        msg.setText(String.format("Dear %s,\n\nYour service signup request has been rejected. Reason is:\n%s", firstName, rejectionReason));

        javaMailSender.send(msg);
    }
}
