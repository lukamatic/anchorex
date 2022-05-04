package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.FishingLesson;
import com.teameleven.anchorex.dto.fishingLesson.CreateFishingLessonDto;
import com.teameleven.anchorex.dto.fishingLesson.UpdateFishingLessonDto;

import java.util.Collection;

public interface FishingLessonService {

    FishingLesson create(CreateFishingLessonDto createFishingLessonDto) throws Exception;

    Collection<FishingLesson> findAll();

    Collection<FishingLesson> findByOwnerId(Long ownerId);

    FishingLesson findOneById(Long id);

    FishingLesson update(UpdateFishingLessonDto updateFishingLessonDto) throws Exception;

    void delete(Long id);
}
