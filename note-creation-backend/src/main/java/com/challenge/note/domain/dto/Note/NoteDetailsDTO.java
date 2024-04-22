package com.challenge.note.domain.dto.Note;

import com.challenge.note.domain.dto.User.UserDetailsDTO;
import com.challenge.note.domain.dto.category.CategoryDetailsDTO;
import com.challenge.note.domain.model.Note;

import java.util.Set;
import java.util.stream.StreamSupport;

public record NoteDetailsDTO(
        Long id,
        String title,
        String content,
        String createdAt,
        String updatedAt,
        boolean archived,
        UserDetailsDTO user,
        Set<CategoryDetailsDTO> categories
) {
    public NoteDetailsDTO(Note note) {
        this(
                note.getId(),
                note.getTitle(),
                note.getContent(),
                note.getCreated_at().toString(),
                note.getUpdated_at().toString(),
                note.isArchived(),
                new UserDetailsDTO(note.getUser()),
                CategoryDetailsDTO.fromCategories(note.getCategories())
        );
    }

    public static Iterable<NoteDetailsDTO> fromNotes(Iterable<Note> notes) {
        return StreamSupport.stream(notes.spliterator(), false)
                .map(NoteDetailsDTO::new)
                .collect(java.util.stream.Collectors.toList());
    }
}
