package com.challenge.note.domain.service;

import com.challenge.note.domain.dto.Note.CreateNoteDTO;
import com.challenge.note.domain.dto.Note.UpdateNoteDTO;
import com.challenge.note.domain.model.Category;
import com.challenge.note.domain.model.Note;
import com.challenge.note.domain.model.User;
import com.challenge.note.domain.repository.CategoryRepository;
import com.challenge.note.domain.repository.NoteRepository;
import com.challenge.note.domain.repository.UserRepository;
import com.challenge.note.infra.exceptions.CustomExceptionResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class NoteService {
    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public NoteService(NoteRepository noteRepository, UserRepository userRepository, CategoryRepository categoryRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    public Note createNote(CreateNoteDTO noteDTO) {
        try {
            Note note;
            if (!userRepository.existsById(noteDTO.userId())) {
                throw new EntityNotFoundException("User not found: " + noteDTO.userId());
            }
            if (noteDTO.categories().isEmpty()) {
                note = new Note(noteDTO);
            } else {
                Set<String> categoryNames = noteDTO.categories();
                Set<Category> categories = mapCategoriesStringToCategory(categoryNames);
                note = new Note(noteDTO, categories);
            }
            User user = userRepository.findById(noteDTO.userId()).orElse(null);
            note.setUser(user);
            return noteRepository.save(note);
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to create note", 500);
        }
    }

    public List<Note> getAllNote() {
        try {
            List<Note> notes = noteRepository.findAll();
            if (notes.isEmpty()) {
                throw new EntityNotFoundException("Note not found");
            }
            return notes;
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to get all note", 500);
        }
    }

    public Note getNoteById(Long noteId) {
        try {
            if (!noteRepository.existsById(noteId)) {
                throw new EntityNotFoundException("Note not found: " + noteId);
            }
            return noteRepository.findById(noteId).orElse(null);
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to get note by ID", 500);
        }
    }

    public Note updateNoteById(Long noteId, UpdateNoteDTO updateNoteDTO) {
        try {
            Note note = getNoteById(noteId);
            if (note != null) {
                if (updateNoteDTO.title() != null) {
                    note.setTitle(updateNoteDTO.title());
                }
                if (updateNoteDTO.content() != null) {
                    note.setContent(updateNoteDTO.content());
                }
                if (updateNoteDTO.categories() != null) {

                    Set<String> categoryNames = updateNoteDTO.categories();
                    Set<Category> categories = mapCategoriesStringToCategory(categoryNames);
                    note.setCategories(categories);
                }
                return noteRepository.save(note);
            } else {
                throw new EntityNotFoundException("Note not found: " + noteId);
            }
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to update note", 500);
        }
    }

    public void deleteNoteById(Long NoteId) {
        try {
            if (!noteRepository.existsById(NoteId)) {
                throw new EntityNotFoundException("Note not found: " + NoteId);
            }
            noteRepository.deleteById(NoteId);
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to delete note by ID", 500);
        }
    }

    public Note archiveNoteById(Long noteId) {
        try {
            Note note = getNoteById(noteId);
            if (note != null) {
                if (note.isArchived()) {
                    throw new CustomExceptionResponse("Note already archived", 400);
                }
                note.setArchived(true);
                return noteRepository.save(note);
            } else {
                throw new EntityNotFoundException("Note not found: " + noteId);
            }
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to archive note by ID", 500);
        }
    }

    public Note unarchiveNoteById(Long noteId) {
        try {
            Note note = getNoteById(noteId);
            if (note != null) {
                if (!note.isArchived()) {
                    throw new CustomExceptionResponse("Note already unarchived", 400);
                }
                note.setArchived(false);
                return noteRepository.save(note);
            } else {
                throw new EntityNotFoundException("Note not found: " + noteId);
            }
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to unarchive note by ID", 500);
        }
    }


    public List<Note> getArchivedNotes() {
        try {
            List<Note> notes = noteRepository.findByArchivedTrue();
            if (notes.isEmpty()) {
                throw new EntityNotFoundException("Archived notes not found");
            }
            return notes;
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to get archived notes", 500);
        }
    }

    public List<Note> getUnarchivedNotes() {
        try {
            List<Note> notes = noteRepository.findByArchivedFalse();
            if (notes.isEmpty()) {
                throw new EntityNotFoundException("Unarchived notes not found");
            }
            return notes;
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to get unarchived notes", 500);
        }
    }

    public Set<Category> mapCategoriesStringToCategory(Set<String> categories) {
        categories.forEach(category -> {
            if (!categoryRepository.existsByName(category)) {
                throw new EntityNotFoundException("Category not found: " + category);
            }
        });

        return categories.stream()
                .map(categoryRepository::findByName)
                .collect(Collectors.toSet());
    }
}
