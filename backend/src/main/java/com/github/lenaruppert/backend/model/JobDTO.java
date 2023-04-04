package com.github.lenaruppert.backend.model;

import java.time.LocalDate;

public record JobDTO(
        String title,
        String description,
        String street,
        String houseNumber,
        String postalCode,
        LocalDate orderDate,
        String city) {
}
