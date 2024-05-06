package com.challenge.note.domain.dto.User;

import jakarta.validation.constraints.NotBlank;

public record UserAuthDTO(
        @NotBlank String username,
        @NotBlank String password
) {
}
