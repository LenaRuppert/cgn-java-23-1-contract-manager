package com.github.lenaruppert.backend.controller;

import com.github.lenaruppert.backend.repository.ClientRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ClientControllerTest {

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    MockMvc mockMvc;

    @Test
    @DirtiesContext
    void checkAddClient() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/clients/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "name": "nameOfClient"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(content().json(
                                """
                                        {
                                        "name": "nameOfClient"
                                        }
                                        """
                        )
                )
                .andExpect(jsonPath("$.id").isNotEmpty());
    }
}
