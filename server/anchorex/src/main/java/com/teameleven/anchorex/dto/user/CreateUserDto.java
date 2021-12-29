package com.teameleven.anchorex.dto.user;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class CreateUserDto {
	@NotNull(message = "Role is required.")
	private String role;

	@NotEmpty(message = "Email is required.")
	private String email;

	@NotEmpty(message = "Password is required.")
	private String password;

	@NotEmpty(message = "First name is required.")
	private String firstName;

	@NotEmpty(message = "Last name is required.")
	private String lastName;

	@NotEmpty(message = "Address is required.")
	private String address;

	@NotEmpty(message = "City is required.")
	private String city;

	@NotEmpty(message = "Country is required.")
	private String country;

	@NotEmpty(message = "Phone number is required.")
	private String phoneNumber;

	private String biography;

	public CreateUserDto() {
	}

	public String getRole() {
		return this.role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return this.country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getPhoneNumber() {
		return this.phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getBiography() {
		return this.biography;
	}

	public void setBiography(String biography) {
		this.biography = biography;
	}

}
