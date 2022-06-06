package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Complaint;
import com.teameleven.anchorex.domain.Revision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {


    @Query(value = "SELECT c FROM Complaint c WHERE c.user.id=?1")
    List<Complaint> getReservationComplaintsFromUser(Long userId);
}
