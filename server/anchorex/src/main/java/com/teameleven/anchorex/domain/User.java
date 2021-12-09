package com.teameleven.anchorex.domain;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.teameleven.anchorex.dto.user.CreateUserDto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
/*
 * @SQLDelete(sql = "UPDATE user SET deleted = true WHERE id = ?")
 * 
 * @Where(clause = "deleted = false")
 */
@Table(name = "users")
public class User implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
	private Set<Role> roles;

	@Column(unique = true)
	private String email;

	@Column
	private String password;

	@Column
	private String firstName;

	@Column
	private String lastName;

	@Column
	private String address;

	@Column
	private String city;

	@Column
	private String country;

	@Column
	private String phoneNumber;

	@Column
	private String biography;

	@Column
	private Timestamp lastPasswordResetDate;

	public User() {
	}

	public User(Long id, HashSet<Role> roles, String email, String password, String firstName, String lastName,
			String address, String city, String country, String phoneNumber, String biography) {
		this.id = id;
		this.roles = roles;
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.city = city;
		this.country = country;
		this.phoneNumber = phoneNumber;
		this.biography = biography;
	}

	public User(CreateUserDto createUserDto) {
		this.roles = new HashSet<Role>();
		this.email = createUserDto.getEmail();
		this.password = createUserDto.getPassword();
		this.firstName = createUserDto.getFirstName();
		this.lastName = createUserDto.getLastName();
		this.address = createUserDto.getAddress();
		this.city = createUserDto.getCity();
		this.country = createUserDto.getCountry();
		this.phoneNumber = createUserDto.getPhoneNumber();
		this.biography = createUserDto.getBiography();
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Collection<Role> getRoles() {
		return this.roles;
	}

	public void setRoles(HashSet<Role> roles) {
		this.roles = roles;
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

	public Timestamp getLastPasswordResetDate() {
		return this.lastPasswordResetDate;
	}

	public void setLastPasswordResetDate(Timestamp lastPasswordResetDate) {
		this.lastPasswordResetDate = lastPasswordResetDate;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return roles;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public void encodePassword() {
		this.password = new BCryptPasswordEncoder().encode(this.password);
	}
}
