package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.User;

import javax.mail.MessagingException;

public interface AuthService {
    void sendVerificationMail(User user, String token) throws MessagingException;
}
