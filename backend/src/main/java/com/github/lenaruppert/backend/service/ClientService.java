package com.github.lenaruppert.backend.service;

import com.github.lenaruppert.backend.model.Client;
import com.github.lenaruppert.backend.model.ClientDTO;
import com.github.lenaruppert.backend.repository.ClientRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ClientService {
    private final ClientRepository clientRepository;

    private final IdService idService;

    public Client addClient(ClientDTO clientDto) {
        Client clientToAdd = new Client(
                idService.generateId(),
                clientDto.name()
        );
        return clientRepository.save(clientToAdd);
    }
}
