package com.github.lenaruppert.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document
public record Job(
        @Id String id,
        String title,
        String description,
        String street,
        String houseNumber,
        String postalCode,
        String city,
        LocalDate orderDate,
        String clientId) {
}
