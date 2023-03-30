package com.github.lenaruppert.backend.controller;

import com.github.lenaruppert.backend.model.Client;
import com.github.lenaruppert.backend.repository.ClientRepository;
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

import java.util.Collections;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
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
        clientOne = new Client("1", "nameOfClient", Collections.emptyList());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void whenListAllClientsAndClientListIsEmpty_thenReturnEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/clients/all").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void whenListAllClientsAndOneClientIsInDatabase_thenReturnListWithOneClient() throws Exception {
        clientRepository.save(clientOne);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/clients/all").with(csrf()))
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
    @WithMockUser(username = "user", password = "password")
    void whenAddClient_thenReturnNewClient() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/clients/add").with(csrf())
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
    @WithMockUser(username = "user", password = "password")
    void whenUpdateClientWithValidId_thenReturnUpdatedClient() throws Exception {
        clientRepository.save(clientOne);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/clients/1").with(csrf())
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
    @WithMockUser(username = "user", password = "password")
    void whenUpdateClientWithNotExistingId_thenReturnStatusIsBadRequest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/clients/2").with(csrf()))
                .andExpect(status().isBadRequest());

    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void whenDeleteClientByIdWithExistingId_thenReturnClientToDelete() throws Exception {
        clientRepository.save(clientOne);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/clients/1").with(csrf()))
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
    @WithMockUser(username = "user", password = "password")
    void whenDeleteClientByIdtWithNotExistingId_thenReturnStatusIsBadRequest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/clients/2").with(csrf()))
                .andExpect(status().isBadRequest());
    }
}
