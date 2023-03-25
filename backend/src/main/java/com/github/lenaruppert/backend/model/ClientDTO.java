package com.github.lenaruppert.backend.model;

import java.util.List;

public record ClientDTO(String name, List<Job> jobList) {
}
