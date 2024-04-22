package com.challenge.note.domain.dto.User;

import com.challenge.note.domain.model.User;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public record UserDetailsDTO(
        long id,
        String username
) {
    public UserDetailsDTO(User user) {
        this(user.getId(), user.getUsername());
    }

    public static Iterable<UserDetailsDTO> fromUsers(Iterable<User> users) {
        return StreamSupport.stream(users.spliterator(), false)
                .map(UserDetailsDTO::new)
                .collect(Collectors.toList());
    }
}
