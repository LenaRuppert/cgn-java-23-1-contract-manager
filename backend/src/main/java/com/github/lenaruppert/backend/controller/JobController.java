package com.github.lenaruppert.backend.controller;

import com.github.lenaruppert.backend.model.Job;
import com.github.lenaruppert.backend.model.JobDTO;
import com.github.lenaruppert.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api/clients/{id}")
@RequiredArgsConstructor
@RestController
public class JobController {

    private final JobService jobService;

    @PostMapping("/addJob")
    public Job addJob(@PathVariable String id, @RequestBody JobDTO jobDTO) {
        return jobService.addJob(id, jobDTO);
    }
}
