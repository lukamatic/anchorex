package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Test;
import com.teameleven.anchorex.dto.test.CreateTestDto;
import com.teameleven.anchorex.dto.test.UpdateTestDto;
import com.teameleven.anchorex.exceptions.TestNameTakenException;
import com.teameleven.anchorex.repository.TestRepository;
import com.teameleven.anchorex.service.TestService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;

@Service
public class TestServiceImpl implements TestService {
    private final TestRepository testRepository;

    public TestServiceImpl(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    @Override
    public Test create(CreateTestDto createTestDto) throws Exception {
        Test savedTest = null;

        try {
            var test = new Test(createTestDto);
            savedTest = testRepository.save(test);
        } catch (DataIntegrityViolationException e) {
            throw new TestNameTakenException();
        }

        return savedTest;
    }

    @Override
    public Collection<Test> findAll() {
        return testRepository.findAll();
    }

    @Override
    public Test findOneById(Long id) {
        return testRepository.findById(id).orElse(null);
    }

    @Override
    public Test findOneByName(String name) {
        return testRepository.findByName(name);
    }

    @Override
    public Test update(UpdateTestDto updateTestDto) throws Exception {
        var testToUpdate = findOneById(updateTestDto.getId());

        if (testToUpdate == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Test with id %d doesn't exist.", updateTestDto.getId()));
        }

        testToUpdate.setName(updateTestDto.getName());
        return testRepository.save(testToUpdate);
    }

    @Override
    public void delete(Long id) {
        testRepository.deleteById(id);
    }
}
