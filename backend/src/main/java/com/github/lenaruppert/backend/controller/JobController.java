package com.github.lenaruppert.backend.controller;

import com.github.lenaruppert.backend.model.Job;
import com.github.lenaruppert.backend.model.JobDTO;
import com.github.lenaruppert.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/jobs")
@RequiredArgsConstructor
@RestController
public class JobController {

    private final JobService jobService;

    @PostMapping
    public Job addJob(@RequestBody JobDTO jobDTO) {
        return jobService.addJob(jobDTO);
    }
}
