package com.github.lenaruppert.backend.service;

import com.github.lenaruppert.backend.model.Job;
import com.github.lenaruppert.backend.model.JobDTO;
import com.github.lenaruppert.backend.repository.ClientRepository;
import com.github.lenaruppert.backend.repository.JobRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class JobServiceTest {

    JobRepository jobRepository;
    IdService idService;
    ClientRepository clientRepository;
    JobService jobService;
    Job jobOne;
    JobDTO jobDTO;

    @BeforeEach
    void setUp() {
        jobRepository = mock(JobRepository.class);
        idService = mock(IdService.class);
        clientRepository = mock(ClientRepository.class);
        jobService = new JobService(jobRepository, idService, clientRepository);
        jobOne = new Job("1", "titleOfJob");
        jobDTO = new JobDTO("titleOfJob", "10");
    }

    @Test
    void whenAddJob_ThenReturnNewJob() {
        //GIVEN
        when(idService.generateId()).thenReturn("1");
        when(jobRepository.save(jobOne)).thenReturn(jobOne);

        //WHEN
        Job actual = jobService.addJob(jobDTO);

        //Then
        verify(jobRepository).save(jobOne);
        assertEquals(actual, jobOne);
    }
}