package com.teameleven.anchorex.dto;

// DTO za login
public class LoginDto {
    private String email;
    private String password;

    public LoginDto() {
        super();
    }

    public LoginDto(String email, String password) {
        this.setEmail(email);
        this.setPassword(password);
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
