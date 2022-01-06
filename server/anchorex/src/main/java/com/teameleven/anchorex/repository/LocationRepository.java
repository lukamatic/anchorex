package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
