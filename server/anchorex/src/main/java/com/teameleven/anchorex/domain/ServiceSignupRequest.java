package com.teameleven.anchorex.domain;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@SQLDelete(sql = "UPDATE test SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class ServiceSignupRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn (name= "user_id", referencedColumnName = "id")
    private User user;

    @Column(unique = true)
    @NotEmpty(message = "Signup explanation is required")
    private String signupExplanation;

    public ServiceSignupRequest(User user, String signupExplanation) {
        this.user = user;
        this.signupExplanation = signupExplanation;
    }

    public ServiceSignupRequest() {

    }
}
