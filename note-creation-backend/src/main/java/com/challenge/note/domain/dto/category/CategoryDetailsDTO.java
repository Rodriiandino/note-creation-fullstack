package com.challenge.note.domain.dto.category;

import com.challenge.note.domain.model.Category;

import java.util.List;
import java.util.Set;

public record CategoryDetailsDTO(
        long id,
        String name
) {
    public static Set<CategoryDetailsDTO> fromCategories(Set<Category> categories) {

        if (categories == null) return Set.of(
                new CategoryDetailsDTO(0, "No category")
        );

        return categories.stream()
                .map(category -> new CategoryDetailsDTO(category.getId(), category.getName()))
                .collect(java.util.stream.Collectors.toSet());
    }

    public static List<CategoryDetailsDTO> fromCategoriesToDTO(List<Category> categories) {
        return categories.stream().map(category -> new CategoryDetailsDTO(category.getId(), category.getName())).collect(java.util.stream.Collectors.toList());
    }
}
