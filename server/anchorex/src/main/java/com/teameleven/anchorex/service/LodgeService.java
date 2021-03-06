package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.dto.BookingItemsRequestDTO;
import com.teameleven.anchorex.dto.reservationEntity.CreateLodgeDTO;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDTO;
import com.teameleven.anchorex.dto.ServiceDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LodgeService {
    Lodge create (CreateLodgeDTO createLodgeDTO);

    List<Lodge> getAll();

    List<LodgeDTO> getLodges(Long id);

    List<Lodge> getAllLodges();

    void deleteLodge(Long id);

    Lodge getLodgeById(Long id);

    void updateLodge(Lodge lodge);

    void deleteService(Long id);

    void addService(ServiceDTO service, Long id);

    List<Lodge> getFreeLodges(BookingItemsRequestDTO freePeriod);

    void addImages(Long id, MultipartFile[] files);

    void removeImage(Long imageId);
}
