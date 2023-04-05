package com.github.lenaruppert.backend.service;

import com.github.lenaruppert.backend.model.Client;
import com.github.lenaruppert.backend.model.Job;
import com.github.lenaruppert.backend.model.JobDTO;
import com.github.lenaruppert.backend.repository.ClientRepository;
import com.github.lenaruppert.backend.repository.JobRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.*;

import static com.mongodb.internal.connection.tlschannel.util.Util.assertTrue;
import static org.bson.assertions.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class JobServiceTest {

    JobRepository jobRepository;
    IdService idService;
    ClientRepository clientRepository;
    JobService jobService;
    Job jobOne;
    Job jobTwo;
    Job updateJob;
    JobDTO jobDTO;
    Client clientOne;

    @BeforeEach
    void setUp() {
        jobRepository = mock(JobRepository.class);
        idService = mock(IdService.class);
        clientRepository = mock(ClientRepository.class);
        jobService = new JobService(jobRepository, idService, clientRepository);
        jobOne = new Job("1", "titleOfJob", "description", "street", "1", "postalCode", "city", LocalDate.of(2023, 3, 3), "1");
        jobTwo = new Job("2", "titleOfJobTwo", "description", "street2", "1", "postalCode", "city", LocalDate.of(2023, 3, 3), "1");
        jobDTO = new JobDTO("titleOfJob", "description", "street", "1", "postalCode", "city", LocalDate.of(2023, 3, 3));
        clientOne = new Client("1", "nameOfClient", new ArrayList<>());
        updateJob = new Job(jobOne.id(), jobDTO.title(), jobDTO.description(), jobDTO.street(), jobDTO.houseNumber(), jobDTO.postalCode(), jobDTO.street(), jobDTO.orderDate(), jobOne.clientId());
    }

    @Test
    void whenAddJobWithClientWithGivenIdExists_ThenReturnNewJob() {
        //GIVEN
        when(idService.generateId()).thenReturn("1");
        when(jobRepository.save(jobOne)).thenReturn(jobOne);
        when(clientRepository.save(clientOne)).thenReturn(clientOne);
        when(clientRepository.findById("1")).thenReturn(Optional.of(clientOne));

        //WHEN
        Job actual = jobService.addJob("1", jobDTO);

        //Then
        verify(jobRepository).save(jobOne);
        assertEquals(actual, jobOne);
    }

    @Test
    void whenAddJobWithGivenNonExistentClientId_thenThrowException() {
        when(idService.generateId()).thenReturn("1");
        when(clientRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> jobService.addJob("1", jobDTO));
    }
    @Test
    void whenListAllJosAndJobListIsEmpty_thenReturnEmptyList() {
        //GIVEN
        when(jobRepository.findByClientId("3")).thenReturn(null);

        //WHEN
        List<Job> result = jobService.getJobsByClientId("3");

        //THEN
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void whenListAllJobsAndListContainsOneJob_thenReturnListWithOneJob() {
        //GIVEN
        List<Job> expected = new ArrayList<>();
        expected.add(jobOne);
        when(jobRepository.findAll()).thenReturn(expected);

        //WHEN
        List<Job> actual = jobService.listAllJobs();

        //THEN
        verify(jobRepository).findAll();
        assertEquals(actual, expected);
    }
    @Test
    void whenGetJobsByClientIdWithValidClientId_thenReturnJobsOfClient() {
        //GIVEN
        List<Job> jobList = new ArrayList<>();
        jobList.add(jobOne);
        jobList.add(jobTwo);
        when(jobRepository.findByClientId("1")).thenReturn(jobList);

        //WHEN
        List<Job> actual = jobService.getJobsByClientId("1");
        List<Job> expected = jobList;

        //THEN
        verify(jobRepository).findByClientId("1");
        assertEquals(actual, expected);
    }

    @Test
    void whenGetJobByClientIdWithNotValidClientId_thenReturnEmptyList() {
        when(jobRepository.findByClientId("2")).thenReturn(Collections.emptyList());

        List<Job> actual = jobService.getJobsByClientId("2");

        verify(jobRepository).findByClientId("2");
        assertTrue(actual.isEmpty());
    }

    @Test
    void whenGetJobByIdWithValidId_thenReturnJob() {
        //GIVEN
        when(jobRepository.findById("1")).thenReturn(Optional.of(jobOne));

        //WHEN
        Job actual = jobService.getJobById("1");
        Job expected = jobOne;

        //THEN
        verify(jobRepository).findById("1");
        assertEquals(actual, expected);
    }

    @Test
    void whenGetJobByIdWithNotValidId_thenThrowException() {
        when(jobRepository.findById("2")).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> jobService.getJobById("2"));

        verify(jobRepository).findById("2");
    }

    @Test
    void whenDeleteJobByIdWithExistingId_thenReturnJobToDelete() {
        //GIVEN
        when(jobRepository.findById(jobOne.id())).thenReturn(Optional.of(jobOne));
        when(clientRepository.findById(jobOne.clientId())).thenReturn(Optional.of(clientOne));
        //WHEN
        Job actual = jobService.deleteJobById(jobOne.id());
        Job expected = jobOne;

        //THEN
        verify(jobRepository).findById(jobOne.id());
        verify(clientRepository).findById(jobOne.clientId());
        assertEquals(expected, actual);

    }

    @Test
    void whenDeleteJobByIdWithNonExistingId_thenThrowNoSuchElementException() {
        //GIVEN
        String nonExistingJobId = "non-existing-job-id";
        when(jobRepository.findById(nonExistingJobId)).thenReturn(Optional.empty());

        //WHEN + THEN
        assertThrows(NoSuchElementException.class, () -> jobService.deleteJobById(nonExistingJobId));

        //VERIFY
        verify(jobRepository).findById(nonExistingJobId);
    }

    @Test
    void whenUpdateJobWithValidId_thenReturnUpdatedJob() {
        //GIVEN
        String jobId = "1";
        when(jobRepository.existsById(jobId)).thenReturn(true);
        when(idService.generateId()).thenReturn(jobId);
        when(jobRepository.save(any(Job.class))).thenReturn(updateJob);
        when(jobRepository.findById(jobId)).thenReturn(Optional.of(jobOne));

        //WHEN
        Job actual = jobService.updateJob(jobId, jobDTO);
        Job expected = updateJob;

        //THEN
        verify(jobRepository).save(any(Job.class));
        verify(jobRepository).findById(jobId);
        assertEquals(expected, actual);
    }

    @Test
    void whenUpdateJobWithNotExistingId_thenThrowNoSuchElementException() {
        when(clientRepository.existsById(clientOne.id())).thenReturn(false);

        assertThrows(NoSuchElementException.class, () -> {
            jobService.updateJob("1", jobDTO);
        });

        verify(jobRepository).findById("1");
    }
}