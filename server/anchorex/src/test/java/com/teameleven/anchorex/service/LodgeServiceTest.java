package com.teameleven.anchorex.service;

import com.teameleven.anchorex.domain.Lodge;
import com.teameleven.anchorex.dto.reservationEntity.LodgeDTO;
import com.teameleven.anchorex.repository.LodgeRepository;
import com.teameleven.anchorex.serviceimpl.LodgeServiceImpl;
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
public class LodgeServiceTest {
    @Mock
    private LodgeRepository lodgeRepository;

    @Mock
    private Lodge lodgeMock;

    @InjectMocks
    private LodgeServiceImpl lodgeService;

    @Test
    public void getLodgeByUserId(){
       when(lodgeRepository.getLodgeByUserId(3L)).thenReturn(List.of(lodgeMock));
       List<LodgeDTO> lodges = lodgeService.getLodges(3L);
       assertThat(lodges).hasSize(1);
    }

    @Test
    public void findAllTest(){
        when(lodgeRepository.getLodges()).thenReturn(List.of(lodgeMock));
        List<Lodge> lodges = lodgeService.getAllLodges();
        assertThat(lodges).hasSize(1);
    }




}
