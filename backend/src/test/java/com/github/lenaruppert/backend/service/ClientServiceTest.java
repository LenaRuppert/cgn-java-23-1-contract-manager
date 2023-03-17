package com.github.lenaruppert.backend.service;

import com.github.lenaruppert.backend.model.Client;
import com.github.lenaruppert.backend.repository.ClientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ClientServiceTest {

    ClientService clientService;
    ClientRepository clientRepository;
    IdService idService;
    Client clientOne;

    @BeforeEach
    public void setUp() {
        clientRepository = mock(ClientRepository.class);
        idService = mock(IdService.class);
        clientService = new ClientService(clientRepository, idService);
        clientOne = new Client("1", "nameOfClient");
    }

    @Test
    void checkAddClient() {
        //GIVEN
        when(idService.generateId()).thenReturn("1");
        when(clientRepository.save(clientOne)).thenReturn(clientOne);

        //WHEN
        Client clientTest = clientService.addClient(clientOne);

        //THEN
        verify(clientRepository).save(clientOne);
        assertEquals(clientTest, clientOne);
    }
}