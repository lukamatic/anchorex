package com.teameleven.anchorex.serviceimpl;

import com.teameleven.anchorex.domain.Reservation;
import com.teameleven.anchorex.dto.DateRangeDTO;
import com.teameleven.anchorex.dto.ReservationDTO;
import com.teameleven.anchorex.dto.reservationentity.ClientReservationDTO;
import com.teameleven.anchorex.mapper.ReservationMapper;
import com.teameleven.anchorex.repository.ReservationEntityRepository;
import com.teameleven.anchorex.repository.ReservationRepository;
import com.teameleven.anchorex.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private final ReservationRepository reservationRepository;

    @Autowired
    private final ReservationEntityRepository entityRepository;

    public ReservationServiceImpl(ReservationRepository reservationRepository, ReservationEntityRepository entityRepository) {
        this.reservationRepository = reservationRepository;
        this.entityRepository = entityRepository;
    }

    @Override
    public Reservation createReservation(ReservationDTO reservationDTO) {
        Reservation reservation = ReservationMapper.reservationDTOToReservation(reservationDTO);
        reservation.setOwnerId(entityRepository.getOwnerId(reservation.getReservationEntityId()));
        reservationRepository.save(reservation);
        return reservation;
    }

    @Override
    public boolean checkCaptainAvailability(DateRangeDTO dateRangeDTO) {
        List<Reservation> reservations = reservationRepository.getOwnerReservations(dateRangeDTO.getOwnerId());
        for(Reservation reservation: reservations){
            if(dateRangeDTO.getStartDate().before(reservation.getStartDate()) &&
               dateRangeDTO.getEndDate().before(reservation.getStartDate())){
                continue;
            }
            else if(dateRangeDTO.getStartDate().after(reservation.getEndDate()) &&
                    dateRangeDTO.getEndDate().after(reservation.getEndDate())) {
                continue;
            }
            else{
                return false;
            }
        }
        return true;
    }

    @Override
    public List<ClientReservationDTO> getFreeReservations(Long id) {
        List<ClientReservationDTO> reservationDTOS = new ArrayList<>();
        var reservations =  reservationRepository.getEntityReservations(id);
        for(Reservation reservation: reservations){
            reservationDTOS.add(ReservationMapper.reservationToClientReservationDTO(reservation));
        }
        return reservationDTOS;
    }
}
