package com.github.lenaruppert.backend.model;

public record MongoUserRequest(String username, String password, String role) {
}
