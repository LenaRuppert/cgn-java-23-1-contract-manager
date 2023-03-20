package com.github.lenaruppert.backend.service;

import com.github.lenaruppert.backend.model.Client;
import com.github.lenaruppert.backend.model.ClientDTO;
import com.github.lenaruppert.backend.repository.ClientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ClientServiceTest {

    ClientService clientService;
    ClientRepository clientRepository;
    IdService idService;
    Client clientOne;
    ClientDTO clientDto;

    @BeforeEach
    public void setUp() {
        clientRepository = mock(ClientRepository.class);
        idService = mock(IdService.class);
        clientService = new ClientService(clientRepository, idService);
        clientOne = new Client("1", "nameOfClient");
        clientDto = new ClientDTO("nameOfClient");
    }

    @Test
    void whenListClientsAndClientListIsEmpty_thenReturnEmptyList() {
        //GIVEN
        List<Client> expectedClientList = new ArrayList<>();
        when(clientRepository.findAll()).thenReturn(expectedClientList);

        //WHEN
        List<Client> ListOfClients = clientService.listAllClients();

        //THEN
        verify(clientRepository).findAll();
        assertEquals(expectedClientList, ListOfClients);
    }

    @Test
    void whenListClientsAndClientListHasOneClient_thenReturnListWithOneClient() {
        //GIVEN
        List<Client> expectedClientList = new ArrayList<>();
        expectedClientList.add(clientOne);
        when(clientRepository.findAll()).thenReturn(expectedClientList);

        //WHEN
        List<Client> ListOfClients = clientService.listAllClients();

        //THEN
        verify(clientRepository).findAll();
        assertEquals(expectedClientList, ListOfClients);
    }

    @Test
    void whenAddClient_thenReturnNewClient() {
        //GIVEN
        when(idService.generateId()).thenReturn("1");
        when(clientRepository.save(clientOne)).thenReturn(clientOne);

        //WHEN
        Client clientTest = clientService.addClient(clientDto);

        //THEN
        verify(clientRepository).save(clientOne);
        assertEquals(clientTest, clientOne);
    }
}
