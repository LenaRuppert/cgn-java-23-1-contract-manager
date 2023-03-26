package com.github.lenaruppert.backend.controller;

import com.github.lenaruppert.backend.model.Client;
import com.github.lenaruppert.backend.repository.ClientRepository;
import com.github.lenaruppert.backend.repository.JobRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;

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

    Client clientOne;

    @BeforeEach
    void setUp() {
        clientOne = new Client("1", "nameOfClient", new ArrayList<>());
        clientRepository.save(clientOne);
    }

    @Test
    @DirtiesContext
    void whenAddJob_thenReturnNewJob() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/jobs/add/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "title": "titleOfJob",
                                "clientId": "1"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(content().json(
                                """
                                        {
                                        "title": "titleOfJob"
                                        }
                                        """
                        )
                )
                .andExpect(jsonPath("$.id").isNotEmpty());
    }
}
