package com.challenge.note.domain.dto.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateCategoryDTO(
        @NotBlank(message = "The name field is required")
        @Size(min = 3, max = 50, message = "The name field must be between 3 and 50 characters")
        String name
) {
}
