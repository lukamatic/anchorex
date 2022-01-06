package com.teameleven.anchorex.domain;

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

    @Column(unique = true)
    @NotEmpty(message = "Signup explanation is required")
    private String signupExplanation;

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
}
