package com.github.lenaruppert.backend.service;

import com.github.lenaruppert.backend.model.Client;
import com.github.lenaruppert.backend.model.Job;
import com.github.lenaruppert.backend.model.JobDTO;
import com.github.lenaruppert.backend.repository.ClientRepository;
import com.github.lenaruppert.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class JobService {

    private final JobRepository jobRepository;
    private final IdService idService;

    private final ClientRepository clientRepository;

    public Job addJob(String id, JobDTO jobDTO) {
        Client client = clientRepository.findById(id).orElseThrow(NoSuchElementException::new);
        Job jobToSave = new Job(
                idService.generateId(),
                jobDTO.title(),
                jobDTO.description(),
                jobDTO.street(),
                jobDTO.houseNumber(),
                jobDTO.postalCode(),
                jobDTO.city(),
                id
        );

        client.jobId().add(jobToSave.id());
        clientRepository.save(client);
        jobRepository.save(jobToSave);

        return jobToSave;
    }

    public List<Job> listAllJobs() {
        return jobRepository.findAll();
    }

    public List<Job> getJobsByClientId(String clientId) {
        List<Job> jobs = jobRepository.findByClientId(clientId);
        if (jobs == null) {
            return Collections.emptyList();
        }
        return jobs;
    }

    public Job getJobById(String id) {
        return jobRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Job deleteJobById(String id) {
        Job job = getJobById(id);
        Client client = clientRepository.findById(job.clientId())
                .orElseThrow(NoSuchElementException::new);
        client.jobId().remove(id);
        clientRepository.save(client);
        jobRepository.delete(job);
        return job;
    }
}
