package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.FishingLesson;
import com.teameleven.anchorex.dto.ServiceDTO;
import com.teameleven.anchorex.dto.fishingLesson.CreateFishingLessonDto;
import com.teameleven.anchorex.dto.fishingLesson.UpdateFishingLessonDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;

public interface FishingLessonService {

    FishingLesson create(CreateFishingLessonDto createFishingLessonDto) throws Exception;

    Collection<FishingLesson> findAll();

    Collection<FishingLesson> findByOwnerId(Long ownerId);

    FishingLesson findOneById(Long id);

    FishingLesson update(FishingLesson fishingLesson) throws Exception;

    void delete(Long id);

    void addService(ServiceDTO service, Long id);

    void deleteService(Long id);

    void addImages(Long id, MultipartFile[] files);

    void deleteImages(String[] imageIds);
}
