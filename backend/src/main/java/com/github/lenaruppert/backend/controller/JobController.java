package com.github.lenaruppert.backend.controller;

import com.github.lenaruppert.backend.model.Job;
import com.github.lenaruppert.backend.model.JobDTO;
import com.github.lenaruppert.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api/jobs")
@RequiredArgsConstructor
@RestController
public class JobController {

    private final JobService jobService;

    @PostMapping("/add/{clientId}")
    public Job addJob(@PathVariable String clientId, @RequestBody JobDTO jobDTO) {
        return jobService.addJob(clientId, jobDTO);
    }
}
