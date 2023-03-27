package com.github.lenaruppert.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public record Job(@Id String id, String title, String clientId) {
}
