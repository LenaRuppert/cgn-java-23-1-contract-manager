package com.github.lenaruppert.backend.controller;

import com.github.lenaruppert.backend.model.Client;
import com.github.lenaruppert.backend.model.ClientDTO;
import com.github.lenaruppert.backend.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @GetMapping("/all")
    public List<Client> clientList() {
        return clientService.listAllClients();
    }

    @PostMapping("/add")
    public Client addClient(@RequestBody ClientDTO clientDto) {
        return clientService.addClient(clientDto);
    }

    @PutMapping("/update/{id}")
    public Client updateClient(@PathVariable String id, @RequestBody ClientDTO clientToUpdate) {
        return clientService.updateClient(id, clientToUpdate);
    }
}
