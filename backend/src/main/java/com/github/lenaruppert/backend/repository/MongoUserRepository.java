package com.github.lenaruppert.backend.repository;

import com.github.lenaruppert.backend.model.MongoUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoUserRepository extends MongoRepository<MongoUser, String> {
}
