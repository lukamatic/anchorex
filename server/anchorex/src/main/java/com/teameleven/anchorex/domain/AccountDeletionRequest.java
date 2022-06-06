package com.teameleven.anchorex.domain;

import com.teameleven.anchorex.domain.enumerations.AccountDeletionRequestStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AccountDeletionRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column
    public String reason;

    @Column
    public AccountDeletionRequestStatus status;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name= "user_id")
    private User user;
}
