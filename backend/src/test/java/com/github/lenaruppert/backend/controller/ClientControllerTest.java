package com.github.lenaruppert.backend.controller;

import com.github.lenaruppert.backend.model.Client;
import com.github.lenaruppert.backend.repository.ClientRepository;
import org.junit.jupiter.api.BeforeEach;
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
    Client clientOne;

    @BeforeEach
    void setUp() {
        clientOne = new Client("1", "nameOfClient");
    }

    @Test
    @DirtiesContext
    void whenListAllClientsAndClientListIsEmpty_thenReturnEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/clients/all"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void whenListAllClientsAndOneClientIsInDatabase_thenReturnListWithOneClient() throws Exception {
        clientRepository.save(clientOne);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/clients/all"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                        {"id": "1",
                        "name": "nameOfClient"}
                        ]
                        """));
    }

    @Test
    @DirtiesContext
    void whenAddClient_thenReturnNewClient() throws Exception {
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

    @Test
    @DirtiesContext
    void whenUpdateClientWithValidId_thenReturnUpdatedClient() throws Exception {
        clientRepository.save(clientOne);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/clients/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                 {
                                "name": "nameOfClient"
                                 }
                                 """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "id" : "1",
                        "name": "nameOfClient"
                        }
                        """));
    }

    @Test
    @DirtiesContext
    void whenUpdateClientWithNotExistingId_thenReturnStatusIsBadRequest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/clients/2"))
                .andExpect(status().isBadRequest());

    }

    @Test
    @DirtiesContext
    void whenDeleteClientByIdWithExistingId_thenReturnClientToDelete() throws Exception {
        clientRepository.save(clientOne);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/clients/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                                                "id" : "1",
                                                "name": "nameOfClient"
                                                }
                        """));
    }

    @Test
    @DirtiesContext
    void whenDeleteClientByIdtWithNotExistingId_thenReturnStatusIsBadRequest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/clients/2"))
                .andExpect(status().isBadRequest());
    }
}
