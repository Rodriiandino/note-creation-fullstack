package com.challenge.note.domain.dto.User;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateUserDTO(
        @NotBlank(message = "The username field is required") @Size(min = 3, message = "The username must be at least 3 characters long")
        String username,
        @NotBlank(message = "The password field is required") @Size(min = 7, message = "The password must be at least 7 characters long")
        String password) implements UserDTO {
}