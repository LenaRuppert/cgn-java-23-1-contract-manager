package com.github.lenaruppert.backend.service;

import com.github.lenaruppert.backend.model.Client;
import com.github.lenaruppert.backend.model.ClientDTO;
import com.github.lenaruppert.backend.repository.ClientRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ClientService {
    private final ClientRepository clientRepository;

    private final IdService idService;

    public List<Client> listAllClients() {
        return clientRepository.findAll();
    }

    public Client addClient(ClientDTO clientDto) {
        Client clientToAdd = new Client(
                idService.generateId(),
                clientDto.name(),
                new ArrayList<>()
        );
        return clientRepository.save(clientToAdd);
    }

    public Client updateClient(String id, ClientDTO clientToUpdate) {
        Optional<Client> currentClient = clientRepository.findById(id);
        if (!currentClient.isPresent()) {
            throw new NoSuchElementException(id);
        }
        clientRepository.deleteById(id);
        Client updatedClient = new Client(id, clientToUpdate.name(), currentClient.get().jobId());
        return clientRepository.save(updatedClient);
    }

    public Client deleteClientById(String id) {
        Optional<Client> clientToDelete = clientRepository.findById(id);
        if (!clientToDelete.isPresent()) {
            throw new NoSuchElementException(id);
        }
        if (!clientToDelete.get().getJobId().isEmpty()) {
            throw new IllegalStateException("Client has jobs associated with it and cannot be deleted.");
        }
        clientRepository.deleteById(id);
        return clientToDelete.get();
    }
}
