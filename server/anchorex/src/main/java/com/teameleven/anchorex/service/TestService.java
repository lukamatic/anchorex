package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Test;
import com.teameleven.anchorex.dto.CreateTestDto;
import com.teameleven.anchorex.dto.UpdateTestDto;

import java.util.Collection;

public interface TestService {

    Test create(CreateTestDto createTestDto) throws Exception;

    Collection<Test> findAll();

    Test findOneById(Long id);

    Test findOneByName(String name);

    Test update(UpdateTestDto updateTestDto) throws Exception;

    void delete(Long id);
}
