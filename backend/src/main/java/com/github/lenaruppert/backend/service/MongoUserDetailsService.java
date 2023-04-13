package com.github.lenaruppert.backend.service;

import com.github.lenaruppert.backend.model.MongoUser;
import com.github.lenaruppert.backend.model.MongoUserRequest;
import com.github.lenaruppert.backend.model.MongoUserResponse;
import com.github.lenaruppert.backend.repository.MongoUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MongoUserDetailsService implements UserDetailsService {

    private final MongoUserRepository mongoUserRepository;
    private final IdService idService;
    private final PasswordEncoder passwordEncoder;

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

    public MongoUserResponse getMe(Principal principal) {
        MongoUser me = mongoUserRepository
                .findByUsername(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        return new MongoUserResponse(
                me.id(),
                me.username(),
                me.role()
        );
    }

    public MongoUserResponse create(MongoUserRequest user) {
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
        MongoUser newUser = new MongoUser(
                idService.generateId(),
                user.username(),
                passwordEncoder.encode(user.password()),
                user.role()
        );
        MongoUser out = mongoUserRepository.save(newUser);

        return new MongoUserResponse(
                out.id(),
                out.username(),
                out.role()
        );
    }
}


