package com.github.lenaruppert.backend.service;

import com.github.lenaruppert.backend.model.Job;
import com.github.lenaruppert.backend.model.JobDTO;
import com.github.lenaruppert.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class JobService {

    private final JobRepository jobRepository;
    private final IdService idService;

    public Job addJob(JobDTO jobDTO) {
        Job jobToSave = new Job(
                idService.generateId(),
                jobDTO.title()
        );
        jobRepository.save(jobToSave);
        return jobToSave;
    }
}
