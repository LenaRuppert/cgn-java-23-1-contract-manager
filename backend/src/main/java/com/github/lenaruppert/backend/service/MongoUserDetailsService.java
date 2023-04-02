package com.github.lenaruppert.backend.service;

import com.github.lenaruppert.backend.model.MongoUser;
import com.github.lenaruppert.backend.model.MongoUserDTO;
import com.github.lenaruppert.backend.repository.MongoUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MongoUserDetailsService implements UserDetailsService {

    private final MongoUserRepository mongoUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = mongoUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new User(
                mongoUser.username(),
                mongoUser.password(),
                List.of(new SimpleGrantedAuthority("ROLE_" + mongoUser.role()))
        );
    }

    public MongoUser create(MongoUserDTO user) {
        if (user.username() == null || user.username().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is required");
        }

        if (user.password() == null || user.password().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is required");
        }

        if (mongoUserRepository.existsByUsername(user.username())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "User already exists"
            );
        }
    }
