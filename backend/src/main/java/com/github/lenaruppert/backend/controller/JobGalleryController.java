package com.github.lenaruppert.backend.controller;

import com.github.lenaruppert.backend.model.Job;
import com.github.lenaruppert.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("api/jobs")
@RestController
public class JobGalleryController {

    private final JobService jobService;

    @GetMapping("/all")
    public List<Job> listAllJobs() {
        return jobService.listAllJobs();
    }
}
