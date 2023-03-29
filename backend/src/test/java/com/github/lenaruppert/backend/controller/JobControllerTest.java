package com.github.lenaruppert.backend.controller;

import com.github.lenaruppert.backend.model.Job;
import com.github.lenaruppert.backend.repository.JobRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
class JobControllerTest {

    @Autowired
    JobRepository jobRepository;

    @Autowired
    MockMvc mockMvc;
    Job jobOne;

    @BeforeEach
    void setUp() {
        jobOne = new Job("1", "titleOfJob", "street", "1a", "11111", "city", "1");
    }

    @Test
    @DirtiesContext
    void whenListAllJobsAndJobListIsEmpty_thenReturnEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/jobs/all"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void whenListAllJobsWithOneJobInDataBase_thenReturnListWithOneJob() throws Exception {
        jobRepository.save(jobOne);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/jobs/all"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                        {"id": "1",
                        "title":  "titleOfJob",
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
    void whenGetJobById_thenReturnJob() throws Exception {
        jobRepository.save(jobOne);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/jobs/1"))
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
}