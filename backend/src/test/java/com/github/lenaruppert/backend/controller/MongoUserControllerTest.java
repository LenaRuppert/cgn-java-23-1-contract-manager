package com.github.lenaruppert.backend.controller;

import com.github.lenaruppert.backend.repository.MongoUserRepository;
import com.github.lenaruppert.backend.service.MongoUserDetailsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MongoUserControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    MongoUserDetailsService userDetailsService;
    MongoUserRepository mongoUserRepository;


    @Test
    @DirtiesContext
    void create_whenValid_then200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "username": "test",
                                    "password": "test",
                                    "role": "basic"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void getStatus401ifUserIsNotAuthenticatedAdmin() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/admin")
                        .with(csrf()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    void createUserWithoutUsername_ThenBadRequest400() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "username": "",
                                    "password": "test",
                                    "role": "basic"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void createUserWithoutPassword_ThenBadRequest400() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "username": "test",
                                    "password": "",
                                    "role": "basic"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void createUser_UserAlreadyExists() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "username": "test",
                                    "password": "test",
                                    "role": "basic"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "username": "test",
                                    "password": "test",
                                    "basic": "test"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isConflict());
    }

    @Test
    void login() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "username": "user",
                                "password": "123",
                                "role": "basic"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/login")
                        .with(httpBasic("user", "123"))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "username": "user",
                        "role": "basic"
                        }
                                                """));
    }

    @Test
    @DirtiesContext
    void loginUserWithInvalidUsernameAndPassword_Then401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "username": "invalidUsername",
                                    "password": "invalidPassword",
                                    "role": "basic"
                                }
                                """))

                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void logoutUser_Then200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/logout")
                        .with(csrf()))
                .andExpect(status().isOk());

    }

}