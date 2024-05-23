package com.challenge.note.domain.repository;

import com.challenge.note.domain.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByArchivedTrue();

    List<Note> findByArchivedFalse();

    List<Note> findByUserUsername(String username);

    List<Note> findByUserUsernameAndArchivedTrue(String username);

    List<Note> findByUserUsernameAndArchivedFalse(String username);
}
