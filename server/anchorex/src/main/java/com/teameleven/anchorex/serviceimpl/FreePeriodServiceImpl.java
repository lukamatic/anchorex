package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.FreePeriod;
import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.domain.ReservationEntity;
import com.teameleven.anchorex.dto.reservationentity.FreePeriodDTO;
import com.teameleven.anchorex.repository.FreePeriodRepository;
import com.teameleven.anchorex.service.FreePeriodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FreePeriodServiceImpl implements FreePeriodService {

    @Autowired
    private final FreePeriodRepository freePeriodRepository;

    public FreePeriodServiceImpl(FreePeriodRepository freePeriodRepository) {
        this.freePeriodRepository = freePeriodRepository;
    }

    @Override
    public void addFreePeriod(FreePeriodDTO periodDTO, ReservationEntity entity) {
        if(checkIfPeriodIsValid(periodDTO, entity.getId())) {
            checkForOverlapingPeriods(periodDTO, entity.getId());
            checkForInbetweenPeriods(periodDTO, entity);
        }
    }

    private void checkForInbetweenPeriods(FreePeriodDTO periodDTO, ReservationEntity entity){
        Long id = entity.getId();
        List<FreePeriod> busyPeriods = new ArrayList<>();
        List<FreePeriod> newPeriods = new ArrayList<>();
        for (FreePeriod freePeriod : freePeriodRepository.getFreePeriods(id)){
            if(((periodDTO.getEndDate().after(freePeriod.getStartDate())) ||
                    (periodDTO.getEndDate().compareTo(freePeriod.getStartDate()) == 0))
                    &&(periodDTO.getEndDate().before(freePeriod.getEndDate()))){
                busyPeriods.add(freePeriod);
                FreePeriod newPeriod = new FreePeriod();
                newPeriod.setStartDate(periodDTO.getStartDate());
                newPeriod.setEndDate(freePeriod.getEndDate());
                newPeriods.add(newPeriod);
            }
            else if(((freePeriod.getEndDate().after(periodDTO.getStartDate())) ||
                    (freePeriod.getEndDate().compareTo(periodDTO.getStartDate()) == 0))
                    &&(freePeriod.getEndDate().before(periodDTO.getEndDate()))){
                busyPeriods.add(freePeriod);
                FreePeriod newPeriod = new FreePeriod();
                newPeriod.setStartDate(freePeriod.getStartDate());
                newPeriod.setEndDate(periodDTO.getEndDate());
                newPeriods.add(newPeriod);
            }
        }
        if(newPeriods.isEmpty()){
            FreePeriod newPeriod = new FreePeriod();
            newPeriod.setEndDate(periodDTO.getEndDate());
            newPeriod.setStartDate(periodDTO.getStartDate());
            newPeriod.setEntity(entity);
            freePeriodRepository.save(newPeriod);
        }
        else if(newPeriods.size()>1){
            FreePeriod newPeriod = new FreePeriod();
            newPeriod.setStartDate(newPeriods.get(0).getStartDate());
            newPeriod.setEndDate(newPeriods.get(0).getEndDate());
            for(FreePeriod period: newPeriods){
                if(period.getStartDate().before(newPeriod.getStartDate())){
                    newPeriod.setStartDate(period.getStartDate());
                }
                if(period.getEndDate().after(newPeriod.getEndDate())){
                    newPeriod.setEndDate(period.getEndDate());
                }
            }
            newPeriod.setEntity(entity);
            freePeriodRepository.save(newPeriod);
        }
        else{
            newPeriods.get(0).setEntity(entity);
            freePeriodRepository.saveAll(newPeriods);
        }
        freePeriodRepository.deleteAll(busyPeriods);
    }


    private void checkForOverlapingPeriods(FreePeriodDTO periodDTO, Long id){
        List<FreePeriod> busyPeriods = new ArrayList<>();
        for (FreePeriod freePeriod : freePeriodRepository.getFreePeriods(id)) {
            if((freePeriod.getStartDate().after(periodDTO.getStartDate()) ||
                    freePeriod.getStartDate().compareTo(periodDTO.getStartDate()) == 0)
                    && (freePeriod.getEndDate().before(periodDTO.getEndDate()) ||
                    freePeriod.getEndDate().compareTo(periodDTO.getEndDate()) == 0)){
                busyPeriods.add(freePeriod);
            }
        }
        freePeriodRepository.deleteAll(busyPeriods);
    }
    private boolean checkIfPeriodIsValid(FreePeriodDTO periodDTO, Long id) {
        List<FreePeriod> freePeriods = freePeriodRepository.getFreePeriods(id);
        for (FreePeriod freePeriod : freePeriods) {
            if ((freePeriod.getStartDate().before(periodDTO.getStartDate()) ||
                    freePeriod.getStartDate().compareTo(periodDTO.getStartDate()) == 0) &&
                    (freePeriod.getEndDate().after(periodDTO.getEndDate()) ||
                            freePeriod.getEndDate().compareTo(periodDTO.getEndDate()) == 0)){
                return false;
            }
        }
        return true;
    }
}
