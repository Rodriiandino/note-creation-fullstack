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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null) {
                throw new CustomExceptionResponse("User not authenticated", 401);
            }

            String username = authentication.getName();
            User user = userRepository.findByUsername(username);

            if (noteDTO.categories().isEmpty()) {
                note = new Note(noteDTO);
            } else {
                Set<String> categoryNames = noteDTO.categories();
                Set<Category> categories = mapCategoriesStringToCategory(categoryNames);
                note = new Note(noteDTO, categories);
            }

            note.setUser(user);
            return noteRepository.save(note);
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to create note", 500);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<Note> getAllNote() {
        try {
            return noteRepository.findAll();
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to get all note", 500);
        }
    }

    public List<Note> getNotesByUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null) {
                throw new CustomExceptionResponse("User not authenticated", 401);
            }
            String username = authentication.getName();
            return noteRepository.findByUserUsername(username);
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to get notes by user", 500);
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

    @PreAuthorize("hasRole('ADMIN')")
    public List<Note> getArchivedNotes() {
        try {
            return noteRepository.findByArchivedTrue();
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to get archived notes", 500);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<Note> getUnarchivedNotes() {
        try {
            return noteRepository.findByArchivedFalse();
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to get unarchived notes", 500);
        }
    }

    public List<Note> getArchivedNotesByUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null) {
                throw new CustomExceptionResponse("User not authenticated", 401);
            }
            String username = authentication.getName();
            return noteRepository.findByUserUsernameAndArchivedTrue(username);
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to get archived notes by user", 500);
        }
    }

    public List<Note> getUnarchivedNotesByUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null) {
                throw new CustomExceptionResponse("User not authenticated", 401);
            }
            String username = authentication.getName();
            return noteRepository.findByUserUsernameAndArchivedFalse(username);
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to get unarchived notes by user", 500);
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
