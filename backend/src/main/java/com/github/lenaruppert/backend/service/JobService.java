package com.github.lenaruppert.backend.service;

import com.github.lenaruppert.backend.model.Client;
import com.github.lenaruppert.backend.model.Job;
import com.github.lenaruppert.backend.model.JobDTO;
import com.github.lenaruppert.backend.repository.ClientRepository;
import com.github.lenaruppert.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class JobService {

    private final JobRepository jobRepository;
    private final IdService idService;

    private final ClientRepository clientRepository;

    public Job addJob(JobDTO jobDTO) {
        Client client = clientRepository.findById(jobDTO.clientId()).orElseThrow(NoSuchElementException::new);
        Job jobToSave = new Job(
                idService.generateId(),
                jobDTO.title()
        );

        client.jobList().add(jobToSave);
        clientRepository.save(client);
        jobRepository.save(jobToSave);

        return jobToSave;
    }
}
