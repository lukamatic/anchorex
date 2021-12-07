package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.Test;
import com.teameleven.anchorex.dto.TestDto;

import java.util.ArrayList;
import java.util.Collection;

public class TestMapper {

    public static TestDto TestToTestDto(Test test) {
        return new TestDto(test.getId(), test.getName());
    }

    public static Collection<TestDto> TestsToTestDtos(Collection<Test> tests) {
        Collection<TestDto> testDtos = new ArrayList<TestDto>();
        for (var test : tests) {
            testDtos.add(TestToTestDto(test));
        }
        return testDtos;
    }
}
