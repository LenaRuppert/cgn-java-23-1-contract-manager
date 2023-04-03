package com.github.lenaruppert.backend.controller;

import com.github.lenaruppert.backend.model.Client;
import com.github.lenaruppert.backend.model.Job;
import com.github.lenaruppert.backend.repository.ClientRepository;
import com.github.lenaruppert.backend.repository.JobRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest
class JobControllerTest {

    @Autowired
    JobRepository jobRepository;

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    MockMvc mockMvc;
    Job jobOne;
    Client clientOne;

    @BeforeEach
    void setUp() {

        jobOne = new Job("1", "titleOfJob", "description", "street", "1a", "11111", "city", "1");
        clientOne = new Client("1", "nameOfClient", new ArrayList<>());
        clientRepository.save(clientOne);
        jobRepository.save(jobOne);
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void whenListAllJobsAndJobListIsEmpty_thenReturnEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/jobs/all").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void whenListAllJobsWithOneJobInDataBase_thenReturnListWithOneJob() throws Exception {
        jobRepository.save(jobOne);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/jobs/all").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                        {"id": "1",
                        "title":  "titleOfJob",
                        "description": "description",
                        "street": "street",
                        "houseNumber": "1a",
                        "postalCode": "11111",
                        "city": "city",
                        "clientId": "1"}
                        ]
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void whenGetJobById_thenReturnJob() throws Exception {
        jobRepository.save(jobOne);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/jobs/1").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "title": "titleOfJob",
                        "street": "street",
                        "houseNumber": "1a",
                        "postalCode": "11111",
                        "city": "city",
                        "clientId": "1"
                        }
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void whenAddJob_thenReturnNewJob() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/jobs/add/1").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "title": "titleOfJob",
                                "description": "description",
                                "street": "street",
                                "houseNumber": "1",
                                "postalCode": "11111",
                                "city": "city",
                                "clientId": "1"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(content().json(
                                """
                                                {
                                                "title": "titleOfJob",
                                        "description": "description",
                                        "street": "street",
                                        "houseNumber": "1",
                                        "postalCode": "11111",
                                        "city": "city",
                                        "clientId": "1"
                                                }
                                                """
                        )
                )
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void whenGetJobsByClientId_thenReturnListOfJobs() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/jobs/get/1").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                        {"id": "1",
                        "title": "titleOfJob",
                        "description": "description",
                        "street": "street",
                        "houseNumber": "1a",
                        "postalCode": "11111",
                        "city": "city",
                        "clientId": "1"}
                        ]
                        """));
    }
}
