package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Test;

import java.util.Collection;

public interface TestService {

    Test create(Test test) throws Exception;

    Collection<Test> findAll();

    Test findOneById(Long id);

    Test findOneByName(String name);

    Test update(Test test) throws Exception;

    void delete(Long id);
}
