package com.challenge.note.domain.model;

import com.challenge.note.domain.dto.Note.CreateNoteDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notes")
@EqualsAndHashCode(of = "id")
@EntityListeners(AuditingEntityListener.class)
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
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


    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime created_at;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime updated_at;

    private boolean archived;

    public Note(CreateNoteDTO noteDTO) {
        this.title = noteDTO.title();
        this.content = noteDTO.content();
        this.archived = false;
        User user = new User();
        user.setId(noteDTO.userId());
        this.user = user;
    }

    public Note(CreateNoteDTO noteDTO, Set<Category> categories) {
        this.title = noteDTO.title();
        this.content = noteDTO.content();
        this.archived = false;
        User user = new User();
        user.setId(noteDTO.userId());
        this.user = user;
        this.categories = categories;
    }
}
