package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Test;
import com.teameleven.anchorex.exceptions.TestNameTakenException;
import com.teameleven.anchorex.repository.TestRepository;
import com.teameleven.anchorex.service.TestService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class TestServiceImpl implements TestService {
    private final TestRepository testRepository;

    public TestServiceImpl(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    @Override
    public Test create(Test test) throws Exception {
        Test savedTest = null;

        try {
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
    public Test update(Test test) throws Exception {
        Test testToUpdate = findOneById(test.getId());
        testToUpdate.setName(test.getName());
        return testRepository.save(testToUpdate);
    }

    @Override
    public void delete(Long id) {
        testRepository.deleteById(id);
    }
}
