package com.github.lenaruppert.backend.controller;

import com.github.lenaruppert.backend.model.MongoUser;
import com.github.lenaruppert.backend.model.MongoUserDTO;
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
    public MongoUser create(@RequestBody MongoUserDTO user) {
        return mongoUserDetailsService.create(user);
    }

    @PostMapping("/login")
    public MongoUser login(Principal principal) {
        return getMe(principal);
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
        SecurityContextHolder.clearContext();
    }

    @GetMapping("/me")
    public MongoUser getMe(Principal principal) {


    @GetMapping
    public String getStatus() {
        return "OK";
    }
}

