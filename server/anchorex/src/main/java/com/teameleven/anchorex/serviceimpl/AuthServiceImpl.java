package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.User;
import com.teameleven.anchorex.service.AuthService;
import com.wildbit.java.postmark.Postmark;
import com.wildbit.java.postmark.client.ApiClient;
import com.wildbit.java.postmark.client.data.model.message.MessageResponse;
import com.wildbit.java.postmark.client.data.model.templates.TemplatedMessage;
import com.wildbit.java.postmark.client.exception.PostmarkException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.HashMap;

@Service
public class AuthServiceImpl implements AuthService {
    private final JavaMailSender javaMailSender;

    public AuthServiceImpl() {
        this.javaMailSender = new JavaMailSenderImpl();
    }

    @Override
    public void sendVerificationMail(User user, String token) throws MessagingException {
        ApiClient client = Postmark.getApiClient("2c3c225b-f823-4924-b983-4b1a82ad17ea");
        TemplatedMessage message = new TemplatedMessage("obradovic.petar@uns.ac.rs", user.getEmail());
        message.setTemplateId(28144927);
        String verificationUrl = "http://teameleven-anchorex.herokuapp.com/verification?token="+token;
        // set model as HashMap
        HashMap model = new HashMap<String, Object>();
        model.put("firstName", user.getFirstName());
        model.put("username", user.getEmail());
        model.put("verificationUrl", verificationUrl);

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
