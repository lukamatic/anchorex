package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Revision;

import java.util.Collection;

public interface RevisionService {
    Collection<Revision> findAll();
    void approve(Long id);
    void reject(Long id);
}
