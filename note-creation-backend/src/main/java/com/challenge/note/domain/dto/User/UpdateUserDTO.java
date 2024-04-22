package com.challenge.note.domain.dto.User;

public record UpdateUserDTO(
        String username,
        String email,
        String password
) implements UserDTO {
}