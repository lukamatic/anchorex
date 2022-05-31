package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.FishingLesson;
import com.teameleven.anchorex.dto.fishingLesson.CreateFishingLessonDto;
import com.teameleven.anchorex.dto.fishingLesson.UpdateFishingLessonDto;
import com.teameleven.anchorex.mapper.FishingLessonMapper;
import com.teameleven.anchorex.repository.FishingLessonRepository;
import com.teameleven.anchorex.service.FishingLessonService;
import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;

@Service
public class FishingLessonServiceImpl implements FishingLessonService {
    private final FishingLessonRepository fishingLessonRepository;

    public FishingLessonServiceImpl(FishingLessonRepository fishingLessonRepository) {
        this.fishingLessonRepository = fishingLessonRepository;
    }

    @Override
    @Transactional
    public FishingLesson create(CreateFishingLessonDto createFishingLessonDto) throws Exception {
        FishingLesson savedFishingLesson;

        try {
            FishingLesson fishingLesson = FishingLessonMapper.toModel(createFishingLessonDto);
            savedFishingLesson = fishingLessonRepository.save(fishingLesson);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Reservation entity with entered name address already exists.");
        }

        return savedFishingLesson;
    }

    @Override
    public Collection<FishingLesson> findAll() {
        return fishingLessonRepository.findAll();
    }

    @Override
    public Collection<FishingLesson> findByOwnerId(Long id) {
        return fishingLessonRepository.findByOwnerId(id);
    }

    @Override
    public FishingLesson findOneById(Long id) {
        return fishingLessonRepository.findById(id).orElse(null);
    }

    @Override
    public FishingLesson update(UpdateFishingLessonDto updateFishingLessonDto) throws Exception {
        throw new NotYetImplementedException();
    }

    @Override
    @Transactional
    public void delete(Long id) {
        fishingLessonRepository.deleteFishingLesson(id);
    }
}
