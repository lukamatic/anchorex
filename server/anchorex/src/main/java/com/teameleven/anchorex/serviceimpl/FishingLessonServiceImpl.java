package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.FishingLesson;
import com.teameleven.anchorex.domain.ReservationEntityImage;
import com.teameleven.anchorex.dto.ServiceDTO;
import com.teameleven.anchorex.dto.fishingLesson.CreateFishingLessonDto;
import com.teameleven.anchorex.mapper.FishingLessonMapper;
import com.teameleven.anchorex.mapper.ServiceMapper;
import com.teameleven.anchorex.repository.FishingLessonRepository;
import com.teameleven.anchorex.repository.LocationRepository;
import com.teameleven.anchorex.repository.ReservationEntityImageRepository;
import com.teameleven.anchorex.repository.ServiceRepository;
import com.teameleven.anchorex.service.FishingLessonService;
import com.teameleven.anchorex.service.ImageService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;

@Service
public class FishingLessonServiceImpl implements FishingLessonService {
    private final ImageService imageService;
    private final FishingLessonRepository fishingLessonRepository;
    private final LocationRepository locationRepository;
    private final ServiceRepository serviceRepository;
    private final ReservationEntityImageRepository reservationEntityImageRepository;

    public FishingLessonServiceImpl(ImageService imageService, FishingLessonRepository fishingLessonRepository,
                                    LocationRepository locationRepository, ServiceRepository serviceRepository,
                                    ReservationEntityImageRepository reservationEntityImageRepository) {
        this.imageService = imageService;
        this.fishingLessonRepository = fishingLessonRepository;
        this.locationRepository = locationRepository;
        this.serviceRepository = serviceRepository;
        this.reservationEntityImageRepository = reservationEntityImageRepository;
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
    @Transactional
    public FishingLesson update(FishingLesson fishingLesson) throws Exception {
        var fishingLessonToUpdate = findOneById(fishingLesson.getId());

        if (fishingLessonToUpdate == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Fishing lesson with id %d doesn't exist.", fishingLesson.getId()));
        }

        fishingLessonToUpdate.setName(fishingLesson.getName());
        fishingLessonToUpdate.setDescription(fishingLesson.getDescription());
        fishingLessonToUpdate.setRulesOfConduct(fishingLesson.getRulesOfConduct());
        locationRepository.updateLocation(fishingLesson.location.getLatitude(), fishingLesson.location.getLongitude(),
                fishingLesson.location.getAddress(), fishingLesson.location.getCity(), fishingLesson.location.getCountry(), fishingLesson.getId());
        fishingLessonToUpdate.setCapacity(fishingLesson.getCapacity());
        fishingLessonToUpdate.setCancellationPercentage(fishingLesson.getCancellationPercentage());
        fishingLessonToUpdate.setFishingKit(fishingLesson.getFishingKit());
        return fishingLessonRepository.save(fishingLessonToUpdate);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        fishingLessonRepository.deleteFishingLesson(id);
    }

    @Override
    public void addService(ServiceDTO serviceDTO, Long id) {
        var service = ServiceMapper.serviceDTOToService(serviceDTO);
        service.setReservationEntity(findOneById(id));
        serviceRepository.save(service);
    }
    @Override
    public void deleteService(Long id){
        serviceRepository.deleteService(id);
    }

    @Override
    public void addImages(Long id, MultipartFile[] files) {
        var fishingLessonToUpdate = findOneById(id);

        if (fishingLessonToUpdate == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Fishing lesson with id %d doesn't exist.", id));
        }

        var urls = this.imageService.uploadImages(files);
        urls.forEach(url -> fishingLessonToUpdate.addImage(ReservationEntityImage.builder().url(url).build()));
        fishingLessonRepository.save(fishingLessonToUpdate);
    }

    @Override
    public void removeImage(Long imageId) {
        reservationEntityImageRepository.deleteById(imageId);
    }
}
