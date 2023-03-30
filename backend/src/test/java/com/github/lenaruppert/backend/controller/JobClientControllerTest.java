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
class JobClientControllerTest {

    @Autowired
    JobRepository jobRepository;
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    MockMvc mockMvc;

    Client clientOne;
    Job jobOne;

    @BeforeEach
    void setUp() {
        clientOne = new Client("1", "nameOfClient", new ArrayList<>());
        jobOne = new Job("1", "titleOfJob", "description", "street", "1", "11111", "city", "1");
        clientRepository.save(clientOne);
        jobRepository.save(jobOne);
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void whenAddJob_thenReturnNewJob() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/clients/1/addJob").with(csrf())
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
        mockMvc.perform(MockMvcRequestBuilders.get("/api/clients/1/getJobs").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                        {"id": "1",
                        "title": "titleOfJob",
                        "description": "description",
                        "street": "street",
                        "houseNumber": "1",
                        "postalCode": "11111",
                        "city": "city",
                        "clientId": "1"}
                        ]
                        """));
    }


}
