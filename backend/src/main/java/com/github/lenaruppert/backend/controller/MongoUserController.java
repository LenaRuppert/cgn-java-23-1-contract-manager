package com.github.lenaruppert.backend.controller;

import com.github.lenaruppert.backend.model.MongoUserRequest;
import com.github.lenaruppert.backend.model.MongoUserResponse;
import com.github.lenaruppert.backend.service.MongoUserDetailsService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class MongoUserController {

    private final MongoUserDetailsService mongoUserDetailsService;

    @PostMapping
    public MongoUserResponse create(@RequestBody MongoUserRequest user) {
        return mongoUserDetailsService.create(user);
    }

    @PostMapping("/login")
    public MongoUserResponse login(Principal principal) {
        return getMe(principal);
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
        SecurityContextHolder.clearContext();
    }

    @GetMapping("/me")
    public MongoUserResponse getMe(Principal principal) {
        return mongoUserDetailsService.getMe(principal);
    }

    @GetMapping
    public String getStatus() {
        return "OK";
    }
}

