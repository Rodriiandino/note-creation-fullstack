package com.challenge.note.domain.model;

import com.challenge.note.domain.dto.Note.CreateNoteDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notes")
@EqualsAndHashCode(of = "id")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime created_at;
    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime updated_at;
    private boolean archived;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "note_categories",
            joinColumns = @JoinColumn(name = "note_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id")
    )
    private Set<Category> categories;

    public Note(CreateNoteDTO noteDTO) {
        this.title = noteDTO.title();
        this.content = noteDTO.content();
        this.created_at = LocalDateTime.now();
        this.updated_at = LocalDateTime.now();
        this.archived = false;
        User user = new User();
        user.setId(noteDTO.userId());
        this.user = user;
    }

    public Note(CreateNoteDTO noteDTO, Set<Category> categories) {
        this.title = noteDTO.title();
        this.content = noteDTO.content();
        this.created_at = LocalDateTime.now();
        this.updated_at = LocalDateTime.now();
        this.archived = false;
        User user = new User();
        user.setId(noteDTO.userId());
        this.user = user;
        this.categories = categories;
    }
}
