package com.challenge.note.domain.model;

import com.challenge.note.domain.dto.category.CreateCategoryDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categories")
@EqualsAndHashCode(of = "id")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @ManyToMany(mappedBy = "categories")
    private Set<Note> notes;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Category(CreateCategoryDTO categoryDTO) {
        this.name = categoryDTO.name();
        this.user = new User();
    }
}
