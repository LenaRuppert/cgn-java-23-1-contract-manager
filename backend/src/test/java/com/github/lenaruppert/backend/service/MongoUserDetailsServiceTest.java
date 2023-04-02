package com.github.lenaruppert.backend.service;

import com.github.lenaruppert.backend.model.MongoUser;
import com.github.lenaruppert.backend.model.MongoUserRequest;
import com.github.lenaruppert.backend.model.MongoUserResponse;
import com.github.lenaruppert.backend.repository.MongoUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class MongoUserDetailsServiceTest {
    MongoUserRepository mongoUserRepository;
    PasswordEncoder passwordEncoder;
    IdService idService;
    MongoUser mongoUser;
    MongoUserDetailsService mongoUserDetailsService;

    @BeforeEach
    void setUp() {
        mongoUserRepository = mock(MongoUserRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        idService = mock(IdService.class);
        mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepository, idService, passwordEncoder);
        mongoUser = new MongoUser("1", "username", "123", "BASIC");
    }

    @Test
    void loadUserByUsername() {
        //GIVEN
        when(mongoUserRepository.findByUsername("username")).thenReturn(Optional.of(mongoUser));
        //WHEN
        UserDetails actual = mongoUserDetailsService.loadUserByUsername("username");
        UserDetails expected = new User(mongoUser.username(), mongoUser.password(),
                List.of(new SimpleGrantedAuthority(("ROLE_" + mongoUser.role()))));
        //THEN
        verify(mongoUserRepository).findByUsername("username");
        assertEquals(expected, actual);
    }

    @Test
    void create() {
        //GIVEN
        when(passwordEncoder.encode(mongoUser.password())).thenReturn(mongoUser.password());
        when(idService.generateId()).thenReturn(mongoUser.id());
        MongoUserRequest mongoUserDTO = new MongoUserRequest(mongoUser.username(), mongoUser.password());
        when(mongoUserRepository.save(mongoUser)).thenReturn(mongoUser);

        //WHEN
        MongoUserResponse actual = mongoUserDetailsService.create(mongoUserDTO);
        MongoUserResponse expected = new MongoUserResponse(mongoUser.id(), mongoUser.username(), mongoUser.role());


        //THEN
        verify(passwordEncoder).encode(mongoUser.password());
        verify(idService).generateId();
        verify(mongoUserRepository).save(mongoUser);
        assertEquals(expected, actual);
    }
}