package com.challenge.note.controller;


import com.challenge.note.domain.dto.category.CategoryDetailsDTO;
import com.challenge.note.domain.dto.category.CreateCategoryDTO;
import com.challenge.note.domain.dto.category.UpdateCategoryDTO;
import com.challenge.note.domain.model.Category;
import com.challenge.note.domain.service.CategoryService;
import com.challenge.note.infra.exceptions.CustomDeleteResponse;
import com.challenge.note.infra.exceptions.CustomError;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
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
@RequestMapping("categories")
@SecurityRequirement(name = "bearer-key")
@Tag(name = "Categories", description = "Category management")
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/create")
    @Operation(summary = "Create a new category", description = "Create a new category with a name and description")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Category created successfully.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CategoryDetailsDTO.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<CategoryDetailsDTO> createCategory(@RequestBody @Valid CreateCategoryDTO createCategoryDTO) {
        Category newCategory = categoryService.createCategory(createCategoryDTO);
        CategoryDetailsDTO categoryDetailsDTO = new CategoryDetailsDTO(newCategory.getId(), newCategory.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryDetailsDTO);
    }

    @GetMapping("/all")
    @Operation(summary = "Get All Categories", description = "Retrieve a list of all categories.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categories found.", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = CategoryDetailsDTO.class)))),
            @ApiResponse(responseCode = "404", description = "Categories not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<Iterable<CategoryDetailsDTO>> getAllCategories() {
        Iterable<Category> categories = categoryService.getAllCategories();
        Iterable<CategoryDetailsDTO> categoriesDetailsDTO = CategoryDetailsDTO.fromCategoriesToDTO(categories);
        return ResponseEntity.status(HttpStatus.OK).body(categoriesDetailsDTO);
    }

    @GetMapping("/{categoryId}")
    @Operation(summary = "Get Category by ID", description = "Retrieve a category by its ID."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CategoryDetailsDTO.class))),
            @ApiResponse(responseCode = "404", description = "Category not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<CategoryDetailsDTO> getCategoryById(@PathVariable Long categoryId) {
        Category category = categoryService.getCategoryById(categoryId);
        CategoryDetailsDTO categoryDetailsDTO = new CategoryDetailsDTO(category.getId(), category.getName());
        return ResponseEntity.status(HttpStatus.OK).body(categoryDetailsDTO);
    }

    @PutMapping("/{categoryId}")
    @Operation(summary = "Update Category", description = "Update a category by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category updated successfully.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CategoryDetailsDTO.class))),
            @ApiResponse(responseCode = "404", description = "Category not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<CategoryDetailsDTO> updateCategory(@PathVariable Long categoryId, @RequestBody @Valid UpdateCategoryDTO updateCategoryDTO) {
        Category updateCategory = categoryService.updateCategory(categoryId, updateCategoryDTO);
        CategoryDetailsDTO categoryDetailsDTO = new CategoryDetailsDTO(updateCategory.getId(), updateCategory.getName());
        return ResponseEntity.status(HttpStatus.OK).body(categoryDetailsDTO);
    }

    @DeleteMapping("/{categoryId}")
    @Operation(summary = "Delete Category by ID", description = "Delete a category by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category deleted successfully.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomDeleteResponse.class))),
            @ApiResponse(responseCode = "404", description = "Category not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<CustomDeleteResponse> deleteCategoryById(@PathVariable Long categoryId) {
        categoryService.deleteCategoryById(categoryId);
        CustomDeleteResponse response = new CustomDeleteResponse(true,"Category " + categoryId + " deleted successfully.", HttpStatus.OK.value());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}