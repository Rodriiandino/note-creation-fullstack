package com.challenge.note.controller;

import com.challenge.note.domain.dto.Note.CreateNoteDTO;
import com.challenge.note.domain.dto.Note.NoteDetailsDTO;
import com.challenge.note.domain.dto.Note.UpdateNoteDTO;
import com.challenge.note.domain.model.Note;
import com.challenge.note.domain.service.NoteService;
import com.challenge.note.infra.exceptions.CustomDeleteResponse;
import com.challenge.note.infra.exceptions.CustomError;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("notes")
@SecurityRequirement(name = "bearer-key")
@Tag(name = "Notes", description = "Note management")
public class NoteController {

    private final NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/create")
    @Operation(summary = "Create a new note", description = "Create a new note with a title and content")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Note created successfully.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = NoteDetailsDTO.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "404", description = "User or Category not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<NoteDetailsDTO> createNote(@RequestBody @Valid CreateNoteDTO createNoteDTO) {
        Note newNote = noteService.createNote(createNoteDTO);
        NoteDetailsDTO noteDetailsDTO = new NoteDetailsDTO(newNote);
        return ResponseEntity.status(HttpStatus.CREATED).body(noteDetailsDTO);
    }

    @GetMapping("/all")
    @Operation(summary = "Get All Notes", description = "Retrieve a list of all notes.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Notes found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = NoteDetailsDTO.class))),
            @ApiResponse(responseCode = "404", description = "Notes not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<Iterable<NoteDetailsDTO>> getAllNotes() {
        Iterable<Note> notes = noteService.getAllNote();
        Iterable<NoteDetailsDTO> noteDetailsDTO = NoteDetailsDTO.fromNotes(notes);
        return ResponseEntity.status(HttpStatus.OK).body(noteDetailsDTO);
    }

    @GetMapping("/user")
    @Operation(summary = "Get All Notes by User", description = "Retrieve a list of all notes by user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Notes found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = NoteDetailsDTO.class))),
            @ApiResponse(responseCode = "401", description = "User not authenticated.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "404", description = "Notes not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<Iterable<NoteDetailsDTO>> getAllNotesByUser() {
        Iterable<Note> notes = noteService.getNotesByUser();
        Iterable<NoteDetailsDTO> noteDetailsDTO = NoteDetailsDTO.fromNotes(notes);
        return ResponseEntity.status(HttpStatus.OK).body(noteDetailsDTO);
    }


    @GetMapping("/{noteId}")
    @Operation(summary = "Get Note by ID", description = "Retrieve a note by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Note found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = NoteDetailsDTO.class))),
            @ApiResponse(responseCode = "404", description = "Note not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<NoteDetailsDTO> getNoteById(@PathVariable Long noteId) {
        Note note = noteService.getNoteById(noteId);
        NoteDetailsDTO noteDetailsDTO = new NoteDetailsDTO(note);
        return ResponseEntity.status(HttpStatus.OK).body(noteDetailsDTO);
    }

    @PutMapping("/{noteId}")
    @Operation(summary = "Update Note", description = "Update a note by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Note updated successfully.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = NoteDetailsDTO.class))),
            @ApiResponse(responseCode = "404", description = "Note not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<NoteDetailsDTO> updateNoteById(@PathVariable Long noteId, @RequestBody @Valid UpdateNoteDTO updateNoteDTO) {
        Note updatedNote = noteService.updateNoteById(noteId, updateNoteDTO);
        NoteDetailsDTO noteDetailsDTO = new NoteDetailsDTO(updatedNote);
        return ResponseEntity.status(HttpStatus.OK).body(noteDetailsDTO);
    }

    @DeleteMapping("/{noteId}")
    @Operation(summary = "Delete Note by ID", description = "Delete a note by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Note deleted successfully.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomDeleteResponse.class))),
            @ApiResponse(responseCode = "404", description = "Note not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<CustomDeleteResponse> deleteNoteById(@PathVariable Long noteId) {
        noteService.deleteNoteById(noteId);
        CustomDeleteResponse response = new CustomDeleteResponse(true, "Note " + noteId + " deleted successfully.", HttpStatus.OK.value());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/archive/{noteId}")
    @Operation(summary = "Archive Note by ID", description = "Archive a note by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Note archived successfully.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = NoteDetailsDTO.class))),
            @ApiResponse(responseCode = "400", description = "Note already archived.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "404", description = "Note not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<NoteDetailsDTO> archiveNoteById(@PathVariable Long noteId) {
        Note archivedNote = noteService.archiveNoteById(noteId);
        NoteDetailsDTO noteDetailsDTO = new NoteDetailsDTO(archivedNote);
        return ResponseEntity.status(HttpStatus.OK).body(noteDetailsDTO);
    }

    @PostMapping("/unarchive/{noteId}")
    @Operation(summary = "Unarchive Note by ID", description = "Unarchive a note by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Note unarchived successfully.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = NoteDetailsDTO.class))),
            @ApiResponse(responseCode = "400", description = "Note already unarchived.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "404", description = "Note not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<NoteDetailsDTO> unarchiveNoteById(@PathVariable Long noteId) {
        Note unarchivedNote = noteService.unarchiveNoteById(noteId);
        NoteDetailsDTO noteDetailsDTO = new NoteDetailsDTO(unarchivedNote);
        return ResponseEntity.status(HttpStatus.OK).body(noteDetailsDTO);
    }

    @GetMapping("/all/archived")
    @Operation(summary = "Get All Archived Notes", description = "Retrieve a list of all archived notes.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Archived notes found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = NoteDetailsDTO.class))),
            @ApiResponse(responseCode = "404", description = "Archived notes not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<Iterable<NoteDetailsDTO>> getAllArchivedNotes() {
        Iterable<Note> notes = noteService.getArchivedNotes();
        Iterable<NoteDetailsDTO> noteDetailsDTO = NoteDetailsDTO.fromNotes(notes);
        return ResponseEntity.status(HttpStatus.OK).body(noteDetailsDTO);
    }

    @GetMapping("/all/unarchived")
    @Operation(summary = "Get All Unarchived Notes", description = "Retrieve a list of all unarchived notes.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Unarchived notes found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = NoteDetailsDTO.class))),
            @ApiResponse(responseCode = "404", description = "Unarchived notes not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<Iterable<NoteDetailsDTO>> getAllUnarchivedNotes() {
        Iterable<Note> notes = noteService.getUnarchivedNotes();
        Iterable<NoteDetailsDTO> noteDetailsDTO = NoteDetailsDTO.fromNotes(notes);
        return ResponseEntity.status(HttpStatus.OK).body(noteDetailsDTO);
    }

    @GetMapping("/user/archived")
    @Operation(summary = "Get All Archived Notes by User", description = "Retrieve a list of all archived notes by user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Archived notes found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = NoteDetailsDTO.class))),
            @ApiResponse(responseCode = "401", description = "User not authenticated.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "404", description = "Archived notes not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<Iterable<NoteDetailsDTO>> getArchivedNotesByUser() {
        Iterable<Note> notes = noteService.getArchivedNotesByUser();
        Iterable<NoteDetailsDTO> noteDetailsDTO = NoteDetailsDTO.fromNotes(notes);
        return ResponseEntity.status(HttpStatus.OK).body(noteDetailsDTO);
    }

    @GetMapping("/user/unarchived")
    @Operation(summary = "Get All Unarchived Notes by User", description = "Retrieve a list of all unarchived notes by user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Unarchived notes found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = NoteDetailsDTO.class))),
            @ApiResponse(responseCode = "401", description = "User not authenticated.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "404", description = "Unarchived notes not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<Iterable<NoteDetailsDTO>> getUnarchivedNotesByUser() {
        Iterable<Note> notes = noteService.getUnarchivedNotesByUser();
        Iterable<NoteDetailsDTO> noteDetailsDTO = NoteDetailsDTO.fromNotes(notes);
        return ResponseEntity.status(HttpStatus.OK).body(noteDetailsDTO);
    }
}

