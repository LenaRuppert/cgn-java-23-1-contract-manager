package com.github.lenaruppert.backend.service;

import com.github.lenaruppert.backend.model.Client;
import com.github.lenaruppert.backend.model.Job;
import com.github.lenaruppert.backend.model.JobDTO;
import com.github.lenaruppert.backend.repository.ClientRepository;
import com.github.lenaruppert.backend.repository.JobRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class JobServiceTest {

    JobRepository jobRepository;
    IdService idService;
    ClientRepository clientRepository;
    JobService jobService;
    Job jobOne;
    JobDTO jobDTO;
    Client clientOne;

    @BeforeEach
    void setUp() {
        jobRepository = mock(JobRepository.class);
        idService = mock(IdService.class);
        clientRepository = mock(ClientRepository.class);
        jobService = new JobService(jobRepository, idService, clientRepository);
        jobOne = new Job("1", "titleOfJob");
        jobDTO = new JobDTO("titleOfJob", "1");
        clientOne = new Client("1", "nameOfClient", new ArrayList<>());
    }

    @Test
    void whenAddJobWithClientWithGivenIdExists_ThenReturnNewJob() {
        //GIVEN
        when(idService.generateId()).thenReturn("1");
        when(jobRepository.save(jobOne)).thenReturn(jobOne);
        when(clientRepository.save(clientOne)).thenReturn(clientOne);
        when(clientRepository.findById("1")).thenReturn(Optional.of(clientOne));

        //WHEN
        Job actual = jobService.addJob(jobDTO);

        //Then
        verify(jobRepository).save(jobOne);
        assertEquals(actual, jobOne);
    }

    @Test
    void whenAddJobWithGivenNonExistentClientId_thenThrowException() {
        when(idService.generateId()).thenReturn("1");
        when(clientRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> jobService.addJob(jobDTO));
    }
}