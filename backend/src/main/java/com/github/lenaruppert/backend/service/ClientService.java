package com.github.lenaruppert.backend.service;

import com.github.lenaruppert.backend.model.Client;
import com.github.lenaruppert.backend.model.ClientDTO;
import com.github.lenaruppert.backend.repository.ClientRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
                clientDto.name()
        );
        return clientRepository.save(clientToAdd);
    }

    public Client updateClient(String id, ClientDTO clientToUpdate) {
        if (!clientRepository.existsById(id)) {
            throw new NoSuchElementException(id);
        }
        clientRepository.deleteById(id);
        Client updatedClient = new Client(id, clientToUpdate.name());
        return clientRepository.save(updatedClient);
    }

    public Client deleteClientById(String id) {
        Optional<Client> clientToDelete = clientRepository.findById(id);
        if (!clientRepository.existsById(id)) {
            throw new NoSuchElementException(id);
        }
        clientRepository.deleteById(id);
        return clientToDelete.get();
    }

}
