package com.teameleven.anchorex.repository;

import com.teameleven.anchorex.domain.Lodge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LodgeRepository extends JpaRepository<Lodge, Long> {

    @Transactional
    @Modifying
    @Query(value = "UPDATE ReservationEntity r SET r.deleted=true WHERE r.id=?1 ")
    void deleteLodge (Long id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Lodge l SET l.description=?1, l.name=?2, l.singleBedroomNumber=?3, l.doubleBedroomNumber=?4, " +
            "l.fourBedroomNumber=?5, l.rulesOfConduct=?6 WHERE l.id=?7")
    void updateLodge(String description, String name, Integer singleBedroomNumber, Integer doubleBedroomNumber,
                     Integer fourBedroomNumber, String rulesOfConduct, Long id);

    @Query(value = "SELECT l FROM Lodge l WHERE l.ownerId=?1", nativeQuery = false)
    List<Lodge> getLodgeByUserId(Long id);

    @Query(value = "SELECT l FROM Lodge l WHERE l.deleted=false", nativeQuery = false)
    List<Lodge> getLodges();
}
