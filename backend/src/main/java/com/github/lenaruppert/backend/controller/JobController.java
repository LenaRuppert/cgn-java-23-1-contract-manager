package com.github.lenaruppert.backend.controller;

import com.github.lenaruppert.backend.model.Job;
import com.github.lenaruppert.backend.model.JobDTO;
import com.github.lenaruppert.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("api/jobs")
@RestController
public class JobController {

    private final JobService jobService;

    @GetMapping("/all")
    public List<Job> listAllJobs() {
        return jobService.listAllJobs();
    }

    @GetMapping("{id}")
    public Job getJobById(@PathVariable String id) {
        return jobService.getJobById(id);
    }

    @PostMapping("/add/{clientId}")
    public Job addJob(@PathVariable String id, @RequestBody JobDTO jobDTO) {
        return jobService.addJob(id, jobDTO);
    }

    @GetMapping("/getJobs/{clientId}")
    public List<Job> getJobsByClientId(@PathVariable String id) {
        return jobService.getJobsByClientId(id);
    }
}
