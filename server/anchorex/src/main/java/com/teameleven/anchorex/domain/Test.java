package com.teameleven.anchorex.domain;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

import com.teameleven.anchorex.dto.CreateTestDto;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@SQLDelete(sql = "UPDATE test SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @NotEmpty(message = "Name is required")
    private String name;

    @Column
    private boolean deleted;

    public Test() {
    }

    public Test(Long id, String name, boolean deleted) {
        this.id = id;
        this.name = name;
        this.deleted = deleted;
    }

    public Test(CreateTestDto createTestDto) {
        this.name = createTestDto.getName();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
