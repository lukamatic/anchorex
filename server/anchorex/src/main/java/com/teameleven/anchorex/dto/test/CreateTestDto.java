package com.teameleven.anchorex.dto.test;

import javax.validation.constraints.NotEmpty;

public class CreateTestDto {
	@NotEmpty(message = "Field name is required.")
	private String name;

	public CreateTestDto() {
	}

	public CreateTestDto(String name) {
		this.name = name;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
