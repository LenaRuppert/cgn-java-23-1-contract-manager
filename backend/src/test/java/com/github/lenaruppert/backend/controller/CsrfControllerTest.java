package com.github.lenaruppert.backend.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("GET /api/csrf")
class CsrfControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Test
    void getCSRFandXSRFTOKEN() throws Exception {
        mockMvc.perform(get("/api/csrf"))
                .andExpect(status().isOk())
                .andExpect(content().string("CSRF OK"))
                .andExpect(cookie().exists("XSRF-TOKEN"));
    }
}