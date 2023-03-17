package com.github.lenaruppert.backend.model;

import org.springframework.data.annotation.Id;

public record Client(
        @Id
        String id,
        String name) {
}
