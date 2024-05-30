package com.challenge.note.domain.service;

import com.challenge.note.domain.dto.category.CreateCategoryDTO;
import com.challenge.note.domain.dto.category.UpdateCategoryDTO;
import com.challenge.note.domain.model.Category;
import com.challenge.note.domain.model.User;
import com.challenge.note.domain.repository.CategoryRepository;
import com.challenge.note.domain.repository.UserRepository;
import com.challenge.note.infra.exceptions.CustomExceptionResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public Category createCategory(CreateCategoryDTO categoryDTO) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null) {
                throw new CustomExceptionResponse("User not authenticated", 401);
            }

            String username = authentication.getName();
            User user = userRepository.findByUsername(username);

            Category category = new Category(categoryDTO);
            if (categoryRepository.existsByNameAndUser(category.getName(), user)) {
                throw new CustomExceptionResponse("Category already exists", 400);
            }

            category.setUser(user);
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

    public List<Category> getCategoriesByUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null) {
                throw new CustomExceptionResponse("User not authenticated", 401);
            }
            String username = authentication.getName();
            return categoryRepository.findByUserUsername(username);
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to get categories by user", 500);
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
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new EntityNotFoundException("Category not found: " + categoryId));

            if (!category.getNotes().isEmpty()) {
                throw new CustomExceptionResponse("Category has notes, delete them first", 400);
            }

            categoryRepository.deleteById(categoryId);
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to delete category by ID", 500);
        }
    }
}
