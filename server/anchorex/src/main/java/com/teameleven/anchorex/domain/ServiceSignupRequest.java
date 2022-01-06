package com.teameleven.anchorex.domain;

import com.teameleven.anchorex.domain.enumerations.ServiceSignupRequestStatus;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
public class ServiceSignupRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn (name= "user_id", referencedColumnName = "id")
    private User user;

    @Column
    @NotEmpty(message = "Signup explanation is required")
    private String signupExplanation;

    @Column
    private ServiceSignupRequestStatus status;

    public ServiceSignupRequest() {

    }

    public ServiceSignupRequest(User user, String signupExplanation) {
        this.user = user;
        this.signupExplanation = signupExplanation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getSignupExplanation() {
        return signupExplanation;
    }

    public void setSignupExplanation(String signupExplanation) {
        this.signupExplanation = signupExplanation;
    }

    public ServiceSignupRequestStatus getStatus() {
        return status;
    }

    public void setStatus(ServiceSignupRequestStatus status) {
        this.status = status;
    }
}
