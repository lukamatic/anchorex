package com.teameleven.anchorex.controller;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ReservationControllerTest  {
    private static final String URL_PREFIX = "/api/reservation";

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype());


    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @BeforeAll
    public void setup(){
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    @Transactional
    @Rollback(value = true)
    public void getAll() throws Exception{
        mockMvc.perform(get(URL_PREFIX + "/all")).andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    @Transactional
    @Rollback(value = true)
    public void getOpenReservations() throws Exception{
        mockMvc.perform(get(URL_PREFIX + "/openReservations/{id}",2)).andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    @Transactional
    @Rollback(value = true)
    public void getBookedReservations() throws Exception{
        mockMvc.perform(get(URL_PREFIX + "/bookedReservations/{id}",2)).andExpect(status().isOk());
    }

    @Test
    @Transactional
    @Rollback(value = true)
    public void getClosedReservations() throws Exception{
        mockMvc.perform(get(URL_PREFIX + "/closedReservations")).andExpect(status().is4xxClientError());
    }

    @Test
    @Transactional
    @Rollback(value = true)
    public void getAllReservations() throws Exception{
        mockMvc.perform(get(URL_PREFIX + "/allReservations/{entityId}",2)).andExpect(status().isOk());
    }



}
