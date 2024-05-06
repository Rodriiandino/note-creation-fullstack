package com.challenge.note.domain.dto.Note;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Set;

public record CreateNoteDTO(
        @NotBlank(message = "The title field is required") @Size(min = 3, message = "The title must be at least 3 characters long")
        String title,
        @NotBlank(message = "The description field is required") @Size(min = 3, message = "The description must be at least 3 characters long")
        String content,
        @NotNull(message = "The userId field is required") Long userId,
        Set<String> categories
) {
}