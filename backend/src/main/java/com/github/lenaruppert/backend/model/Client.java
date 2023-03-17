package com.github.lenaruppert.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public record Client(
        @Id
        String id,
        String name) {
}
