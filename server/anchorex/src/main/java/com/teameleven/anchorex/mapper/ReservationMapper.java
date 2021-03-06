package com.teameleven.anchorex.mapper;

import com.teameleven.anchorex.domain.Reservation;
import com.teameleven.anchorex.domain.Service;
import com.teameleven.anchorex.dto.ReservationCalendarDto;
import com.teameleven.anchorex.dto.ReservationDTO;
import com.teameleven.anchorex.dto.ServiceDTO;
import com.teameleven.anchorex.dto.fishingLesson.FishingLessonDto;
import com.teameleven.anchorex.dto.reservationentity.ClientReservationDTO;
import com.teameleven.anchorex.dto.reservationentity.FullClientReservationDTO;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class ReservationMapper {

    private ReservationMapper() {

    }

    public static Reservation reservationDTOToReservation(ReservationDTO reservationDTO) {
        Reservation reservation = new Reservation();
        reservation.setDiscount(reservationDTO.getDiscount());
        reservation.setEndDate(reservationDTO.getEndDate());
        reservation.setPrice(reservationDTO.getPrice());
        reservation.setStartDate(reservationDTO.getStartDate());
        reservation.setServices(reservationDTO.getServices());
        reservation.setMaxPersonNumber(reservationDTO.getMaxPersonNumber());
        reservation.setCaptain(reservationDTO.isCaptain());

        return reservation;
    }

    public static ClientReservationDTO reservationToClientReservationDTO(Reservation reservation) {
        ClientReservationDTO reservationDTO = new ClientReservationDTO();
        reservationDTO.setDiscount(reservation.getDiscount());
        reservationDTO.setReservationEntityId(reservation.getReservationEntity().getId());
        reservationDTO.setEndDate(reservation.getEndDate());
        reservationDTO.setPrice(reservation.getPrice());
        reservationDTO.setStartDate(reservation.getStartDate());
        Set<ServiceDTO> services = new HashSet<>();
        for (Service service : reservation.getServices()) {
            ServiceDTO serviceDTO = new ServiceDTO();
            serviceDTO.setId(service.getId());
            serviceDTO.setInfo(service.getInfo());
            serviceDTO.setPrice(service.getPrice());
            serviceDTO.setType(service.getType());
            services.add(serviceDTO);
        }
        reservationDTO.setServices(services);
        reservationDTO.setMaxPersonNumber(reservation.getMaxPersonNumber());
        reservationDTO.setCaptain(reservation.isCaptain());
        reservationDTO.setUserId(reservation.getUser().getId());
        reservationDTO.setId(reservation.getId());
        reservationDTO.setOwnerId(reservation.getOwnerId());
        return reservationDTO;
    }

    public static FullClientReservationDTO reservationToFullClientReservationDTO(Reservation reservation) {
        FullClientReservationDTO reservationDTO = new FullClientReservationDTO();
        reservationDTO.setDiscount(reservation.getDiscount());
        reservationDTO.setReservationEntityId(reservation.getReservationEntity().getId());
        reservationDTO.setEndDate(reservation.getEndDate());
        reservationDTO.setPrice(reservation.getPrice());
        reservationDTO.setStartDate(reservation.getStartDate());
        Set<ServiceDTO> services = new HashSet<>();
        for (Service service : reservation.getServices()) {
            ServiceDTO serviceDTO = new ServiceDTO();
            serviceDTO.setId(service.getId());
            serviceDTO.setInfo(service.getInfo());
            serviceDTO.setPrice(service.getPrice());
            serviceDTO.setType(service.getType());
            services.add(serviceDTO);
        }
        reservationDTO.setServices(services);
        reservationDTO.setMaxPersonNumber(reservation.getMaxPersonNumber());
        reservationDTO.setCaptain(reservation.isCaptain());
        reservationDTO.setUserId(reservation.getUser().getId());
        reservationDTO.setReservationType(reservation.getReservationEntity().getReservationEntityType());
        reservationDTO.setReservationName(reservation.getReservationEntity().getName());
        return reservationDTO;
    }

    public static ReservationCalendarDto toCalendarDto(Reservation model) {
        return ReservationCalendarDto.builder()
                .id(model.getId())
                .startDate(model.getStartDate())
                .endDate(model.getEndDate())
                .reservationEntityId(model.getReservationEntity().getId())
                .reservationEntityName(model.getReservationEntity().getName())
                .userId(model.getUser() == null ? null : model.getUser().getId())
                .userFullName(model.getUser() == null ? null : model.getUser().getFirstName() + " " + model.getUser().getLastName())
                .build();
    }

    public static Collection<ReservationCalendarDto> toCalendarDtos(Collection<Reservation> models) {
        Collection<ReservationCalendarDto> dtos = new ArrayList<ReservationCalendarDto>();
        for (var model : models){
            dtos.add(toCalendarDto(model));
        }
        return dtos;
    }
}
