package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.domain.Reservation;
import com.teameleven.anchorex.domain.ReservationReport;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDTO;
import com.teameleven.anchorex.repository.LodgeRepository;
import com.teameleven.anchorex.repository.ReservationRepository;
import com.teameleven.anchorex.serviceimpl.LodgeServiceImpl;
import com.teameleven.anchorex.serviceimpl.ReservationServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(SpringExtension.class)
public class ReservationServiceTest {
    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private Reservation reservationMock;


    @InjectMocks
    private ReservationServiceImpl reservationService;


    @Test
    public void findAllTest(){
        when(reservationRepository.findAll()).thenReturn(List.of(reservationMock));
        List<com.teameleven.anchorex.dto.reservationentity.ClientReservationDTO> reservations = reservationService.getAllReservations();
        assertThat(reservations).hasSize(0);
    }

    @Test
    public void getClosedReservations(){
        when(reservationRepository.getClosedReservations()).thenReturn(List.of(reservationMock));
        List<Reservation> reservations = reservationService.getClosedReservations();
        assertThat(reservations).hasSize(1);
    }

    @Test
    public void getOpenReservations(){
        when(reservationRepository.getOwnerReservations(3L)).thenReturn(List.of(reservationMock));;
        assertThat(List.of(reservationMock)).hasSize(1);
    }

    @Test
    public void checkSalary(){
        double price = 0;
        when(reservationRepository.getSalaryByYear(2022, 3L)).thenReturn(price);
        assertThat(price).isEqualTo(0);
    }

    @Test
    public void getNumberOfReservationsPerYear(){
        int reservationNumber = 0;
        when(reservationRepository.getReservationNumberByYear(2022, 3L )).thenReturn(reservationNumber);
        assertThat(reservationNumber).isEqualTo(0);
    }

    @Test
    public void getNumberOfReservationsPerMonth(){
        int reservationNumber = 0;
        when(reservationRepository.getReservationNumberByMonth(5, 2022, 3l)).thenReturn(reservationNumber);
        assertThat(reservationNumber).isEqualTo(0);
    }

    @Test
    public void getNumberOfReservationsPerWeek(){
        when(reservationRepository.getReservationsByWeek(5, 2022, 3L)).thenReturn(List.of(reservationMock));
        assertThat(List.of(reservationMock)).hasSize(1);
    }

    @Test
    public void getUserReservations(){
        when(reservationRepository.getReservationsForUser(3L)).thenReturn(List.of(reservationMock));
        assertThat(List.of(reservationMock)).hasSize(1);
    }

}
