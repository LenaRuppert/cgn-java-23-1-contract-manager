package com.github.lenaruppert.backend.service;

import com.github.lenaruppert.backend.model.Client;
import com.github.lenaruppert.backend.model.Job;
import com.github.lenaruppert.backend.model.JobDTO;
import com.github.lenaruppert.backend.repository.ClientRepository;
import com.github.lenaruppert.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class JobService {

    private final JobRepository jobRepository;
    private final IdService idService;

    private final ClientRepository clientRepository;

    public Job addJob(String clientId, JobDTO jobDTO) {
        Client client = clientRepository.findById(clientId).orElseThrow(NoSuchElementException::new);
        Job jobToSave = new Job(
                idService.generateId(),
                jobDTO.title(),
                clientId
        );

        client.jobId().add(jobToSave.id());
        clientRepository.save(client);
        jobRepository.save(jobToSave);

        return jobToSave;
    }

    public List<Job> listAllJobs() {
        return jobRepository.findAll();
    }
}
