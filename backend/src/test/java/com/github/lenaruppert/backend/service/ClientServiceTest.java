package com.github.lenaruppert.backend.service;

import com.github.lenaruppert.backend.model.Client;
import com.github.lenaruppert.backend.model.ClientDTO;
import com.github.lenaruppert.backend.repository.ClientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class ClientServiceTest {

    ClientService clientService;
    ClientRepository clientRepository;
    IdService idService;
    Client clientOne;
    ClientDTO clientDto;
    Client updateClient;
    Client clientWithJob;

    @BeforeEach
    public void setUp() {
        clientRepository = mock(ClientRepository.class);
        idService = mock(IdService.class);
        clientService = new ClientService(clientRepository, idService);
        clientOne = new Client("1", "nameOfClient", Collections.emptyList());
        clientDto = new ClientDTO("nameOfClient");
        updateClient = new Client(clientOne.id(), clientDto.name(), clientOne.jobId());
        clientWithJob = new Client("1", "nameOfClient", List.of("jobId"));
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

    @Test
    void whenUpdateClientWithValidId_thenReturnUpdatedClient() {
        //GIVEN
        String clientId = "1";
        when(clientRepository.existsById(clientId)).thenReturn(true);
        when(idService.generateId()).thenReturn(clientId);
        when(clientRepository.save(any(Client.class))).thenReturn(updateClient);
        when(clientRepository.findById(clientId)).thenReturn(Optional.of(clientOne));

        //WHEN
        Client actual = clientService.updateClient(clientId, clientDto);
        Client expected = updateClient;

        //THEN
        verify(clientRepository).save(any(Client.class));
        verify(clientRepository).findById(clientId);
        assertEquals(expected, actual);
    }

    @Test
    void whenUpdateClientWithNotExistingId_thenThrowNoSuchElementException() {

        when(clientRepository.existsById(clientOne.id())).thenReturn(false);

        assertThrows(NoSuchElementException.class, () -> {
            clientService.updateClient("1", clientDto);
        });

        verify(clientRepository).findById("1");

    }

    @Test
    void whenDeleteClientByIdWithExistingId_thenReturnClientToDelete() {
        //GIVEN
        when(clientRepository.findById(clientOne.id())).thenReturn(Optional.of(clientOne));
        //WHEN
        Client actual = clientService.deleteClientById(clientOne.id());
        Client expected = clientOne;

        //THEN
        assertEquals(expected, actual);
        verify(clientRepository).findById(clientOne.id());
    }

    @Test
    void whenDeleteClientByIdWithNotExistingId_thenThrowNoSuchElementException() {
        String nonExistingId = "1";
        when(clientRepository.findById(nonExistingId)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> clientService.deleteClientById(nonExistingId));

        verify(clientRepository).findById(nonExistingId);
        verify(clientRepository, never()).deleteById(nonExistingId);
    }

    @Test
    void whenDeleteClientByIdWithOpenJobs_thenThrowIllegalStateException() {
        Optional<Client> clientOptional = Optional.of(clientWithJob);
        when(clientRepository.findById(clientWithJob.id())).thenReturn(clientOptional);

        assertThrows(IllegalStateException.class, () -> {
            clientService.deleteClientById(clientWithJob.id());
        });

        verify(clientRepository).findById(clientWithJob.id());
        verify(clientRepository, never()).deleteById(clientWithJob.id());
    }
}
