package com.challenge.note.domain.repository;

import com.challenge.note.domain.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByName(String category);

    Category findByName(String category);

    List<Category> findByUserUsername(String username);
}
