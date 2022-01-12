package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.User;
import com.teameleven.anchorex.service.AuthService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class AuthServiceImpl implements AuthService {
    private final JavaMailSender javaMailSender;

    public AuthServiceImpl() {
        this.javaMailSender = new JavaMailSenderImpl();
    }

    @Override
    public void sendVerificationMail(User user, String token) throws MessagingException {
        SimpleMailMessage msg = new SimpleMailMessage();
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setSubject("Verify your Anchorex email");
        String verificationUrl = "http://localhost:3000/verification?token="+token;

        String html = "<!doctype html>\n" +
                "<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\"\n" +
                "      xmlns:th=\"http://www.thymeleaf.org\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\"\n" +
                "          content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\n" +
                "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n" +
                "    <title>Email</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "<div>Welcome <b>" + user.getFirstName() + "</b></div>\n" +
                "\n" +
                "<div> Your username is <b>" + user.getUsername() + "</b></div>\n" +
                "<div> Please click the following link to verify your email address:</div>\n" +
                "<div> <a href=\"" + verificationUrl+ "\">Verify your email<a/></div>\n" +
                "</body>\n" +
                "</html>\n";
        helper.setText(html, true);
//        helper.setTo("ns.o.petar@gmail.com");
        helper.setTo(user.getEmail());
        javaMailSender.send(mimeMessage);
    }
}
