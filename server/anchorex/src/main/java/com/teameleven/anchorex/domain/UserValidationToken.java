package com.teameleven.anchorex.domain;

import javax.persistence.*;


@Entity
@Table
public class UserValidationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(unique = true)
    String token;

    @Column(unique = true)
    Long userId;

    public UserValidationToken(String token, Long userId) {
        this.token = token;
        this.userId = userId;
    }
    public UserValidationToken(){}

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
