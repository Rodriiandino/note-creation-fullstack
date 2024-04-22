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
    @Column(nullable = false, unique = true)
    private String name;
    @ManyToMany(mappedBy = "categories")
    private Set<Note> notes;

    public Category(CreateCategoryDTO categoryDTO) {
        this.name = categoryDTO.name();
    }
}
