package com.github.lenaruppert.backend.model;


public record JobDTO(
        String title,
        String street,
        String houseNumber,
        String postalCode,
        String city) {
}
