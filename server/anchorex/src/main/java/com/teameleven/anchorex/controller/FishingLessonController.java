package com.teameleven.anchorex.controller;

import com.teameleven.anchorex.domain.FishingLesson;
import com.teameleven.anchorex.domain.Test;
import com.teameleven.anchorex.dto.ServiceDTO;
import com.teameleven.anchorex.dto.fishingLesson.CreateFishingLessonDto;
import com.teameleven.anchorex.dto.fishingLesson.FishingLessonDisplayDto;
import com.teameleven.anchorex.dto.fishingLesson.FishingLessonDto;
import com.teameleven.anchorex.dto.test.TestDto;
import com.teameleven.anchorex.dto.test.UpdateTestDto;
import com.teameleven.anchorex.mapper.FishingLessonMapper;
import com.teameleven.anchorex.mapper.TestMapper;
import com.teameleven.anchorex.service.FishingLessonService;
import com.teameleven.anchorex.service.ImageService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping("/api/fishingLessons")
public class FishingLessonController {
    private final FishingLessonService fishingLessonService;

    public FishingLessonController(FishingLessonService fishingLessonService) {
        this.fishingLessonService = fishingLessonService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FishingLessonDisplayDto> create(@Valid @RequestBody CreateFishingLessonDto createFishingLessonDto) throws Exception {
        var savedFishingLesson = fishingLessonService.create(createFishingLessonDto);
        var fishingLessonDisplayDto = FishingLessonMapper.toDisplayDto(savedFishingLesson);
        return new ResponseEntity<>(fishingLessonDisplayDto, HttpStatus.CREATED);
    }

    @GetMapping(path="/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Collection<FishingLessonDto>> findAll() {
        var fishingLessons = fishingLessonService.findAll();
        var fishingLessonDtos = FishingLessonMapper.toDtos(fishingLessons);
        return new ResponseEntity<>(fishingLessonDtos, HttpStatus.OK);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Collection<FishingLessonDto>> findByOwnerId(@RequestParam("ownerId") Long ownerId) {
        var fishingLessons = fishingLessonService.findByOwnerId(ownerId);
        var fishingLessonDtos = FishingLessonMapper.toDtos(fishingLessons);
        return new ResponseEntity<>(fishingLessonDtos, HttpStatus.OK);
    }

    @GetMapping(path="{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FishingLessonDisplayDto> findOneById(@PathVariable("id") Long id) {
        var fishingLesson = fishingLessonService.findOneById(id);

        if (fishingLesson == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Fishing lesson with id %d doesn't exist.", id));
        }

        var fishingLessonDto = FishingLessonMapper.toDisplayDto(fishingLesson);
        return new ResponseEntity<>(fishingLessonDto, HttpStatus.OK);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FishingLesson> update(@Valid @RequestBody FishingLesson fishingLesson) throws Exception {
        var updatedFishingLesson = fishingLessonService.update(fishingLesson);
        return new ResponseEntity<>(updatedFishingLesson, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Test> delete(@PathVariable("id") Long id) {
        try {
            fishingLessonService.delete(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Fishing lesson with id %d doesn't exist.", id));
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping(path="/addService/{id}")
    public ResponseEntity<ServiceDTO> addService(@RequestBody ServiceDTO service, @PathVariable Long id){
        fishingLessonService.addService(service, id);
        return new ResponseEntity<>(service, HttpStatus.CREATED);
    }

    @DeleteMapping(path="/deleteService/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id){
        fishingLessonService.deleteService(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path = "/{id}/images/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> addImages(@PathVariable("id") Long id, @RequestParam("files") MultipartFile[] files) {
        this.fishingLessonService.addImages(id, files);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(path = "images/remove/{imageId}")
    public ResponseEntity<Void> removeImage(@PathVariable("imageId") Long imageId) {
        this.fishingLessonService.removeImage(imageId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
