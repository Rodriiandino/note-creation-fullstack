package com.challenge.note.domain.dto.User;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserAuthDTO(
        @NotBlank(message = "The username field is required")
        @Size(min = 3, message = "The username must be at least 3 characters long")
        @NotNull(message = "The username field is required")
        String username,
        @NotBlank(message = "The password field is required")
        @Size(min = 7, message = "The password must be at least 7 characters long")
        @NotNull(message = "The password field is required")
        String password
) {
}
