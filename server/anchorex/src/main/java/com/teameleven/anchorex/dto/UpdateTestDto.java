package com.teameleven.anchorex.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class UpdateTestDto {
	@NotNull(message = "Field id is required.")
	private Long id;

	@NotEmpty(message = "Field name is required.")
	private String name;

	public UpdateTestDto() {
	}

	public UpdateTestDto(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}
}