package com.challenge.note.domain.service;

import com.challenge.note.domain.dto.category.CreateCategoryDTO;
import com.challenge.note.domain.dto.category.UpdateCategoryDTO;
import com.challenge.note.domain.model.Category;
import com.challenge.note.domain.repository.CategoryRepository;
import com.challenge.note.infra.exceptions.CustomExceptionResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category createCategory(CreateCategoryDTO categoryDTO) {
        try {
            Category category = new Category(categoryDTO);
            if (categoryRepository.existsByName(category.getName())) {
                throw new CustomExceptionResponse("Category already exists", 400);
            }
            return categoryRepository.save(category);
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to create category", 500);
        }
    }

    public List<Category> getAllCategories() {
        try {
            return categoryRepository.findAll();
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to get all categories", 500);
        }
    }

    public Category getCategoryById(Long categoryId) {
        try {
            if (!categoryRepository.existsById(categoryId)) {
                throw new EntityNotFoundException("Category not found: " + categoryId);
            }
            return categoryRepository.findById(categoryId).orElse(null);
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to get category by ID", 500);
        }
    }

    public Category updateCategory(Long categoryId, UpdateCategoryDTO updateCategoryDTO) {
        try {
            Category category = getCategoryById(categoryId);
            if (category != null) {
                if (updateCategoryDTO.name() != null) {
                    category.setName(updateCategoryDTO.name());
                }
                return categoryRepository.save(category);
            } else {
                throw new EntityNotFoundException("Category not found: " + categoryId);
            }
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to update category", 500);
        }
    }

    public void deleteCategoryById(Long categoryId) {
        try {
            if (!categoryRepository.existsById(categoryId)) {
                throw new EntityNotFoundException("Category not found: " + categoryId);
            }
            categoryRepository.deleteById(categoryId);
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to delete category by ID", 500);
        }
    }
}
