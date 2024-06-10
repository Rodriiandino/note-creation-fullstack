package com.challenge.note.domain.dto.User;

import com.challenge.note.domain.model.User;

import java.util.List;
import java.util.stream.Collectors;

public record UserDetailsDTO(
        long id,
        String username
) {
    public UserDetailsDTO(User user) {
        this(user.getId(), user.getUsername());
    }

    public static List<UserDetailsDTO> fromUsers(List<User> users) {
        return users.stream().map(UserDetailsDTO::new).collect(Collectors.toList());
    }
}
