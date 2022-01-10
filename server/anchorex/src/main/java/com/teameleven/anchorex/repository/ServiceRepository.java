package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface ServiceRepository extends JpaRepository<Service, Long> {

    @Transactional
    @Modifying
    @Query(value = "DELETE Service s WHERE s.id=?1")
    void deleteService(Long id);
}
