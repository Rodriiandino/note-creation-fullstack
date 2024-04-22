package com.challenge.note.domain.dto.Note;

import java.util.Set;

public record UpdateNoteDTO (
        String title,
        String content,
        Set<String> categories
) {
}
