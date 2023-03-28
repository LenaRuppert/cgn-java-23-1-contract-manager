package com.github.lenaruppert.backend.repository;

import com.github.lenaruppert.backend.model.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface JobRepository extends MongoRepository<Job, String> {
    List<Job> findByClientId(String clientId);
}
