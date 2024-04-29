package com.challenge.note.controller;

import com.challenge.note.domain.dto.User.UpdateUserDTO;
import com.challenge.note.domain.dto.User.UserDetailsDTO;
import com.challenge.note.domain.model.User;
import com.challenge.note.domain.service.UserService;
import com.challenge.note.infra.exceptions.CustomDeleteResponse;
import com.challenge.note.infra.exceptions.CustomError;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
@Tag(name = "Users", description = "User management")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    @Operation(summary = "Get All Users", description = "Retrieve a list of all users.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Users found.", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = UserDetailsDTO.class)))),
            @ApiResponse(responseCode = "404", description = "Users not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<Iterable<UserDetailsDTO>> getAllUsers() {
        Iterable<User> users = userService.getAllUsers();
        Iterable<UserDetailsDTO> userDetailsDTO = UserDetailsDTO.fromUsers(users);

        return ResponseEntity.status(HttpStatus.OK).body(userDetailsDTO);
    }

    @GetMapping("/{username}")
    @Operation(summary = "Get User by Username", description = "Retrieve a user by its username.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDetailsDTO.class))),
            @ApiResponse(responseCode = "404", description = "User not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<UserDetailsDTO> getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        UserDetailsDTO userDetailsDTO = new UserDetailsDTO(user);
        return ResponseEntity.status(HttpStatus.OK).body(userDetailsDTO);
    }

    @PutMapping("/{username}")
    @Operation(summary = "Update User by Username", description = "Update a user by its username.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User updated successfully.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDetailsDTO.class))),
            @ApiResponse(responseCode = "404", description = "User not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<UserDetailsDTO> updateUserByUsername(@PathVariable String username, @RequestBody @Valid UpdateUserDTO updateUserDTO) {
        User updatedUser = userService.updateUserByUsername(username, updateUserDTO);
        UserDetailsDTO userDetailsDTO = new UserDetailsDTO(updatedUser);
        return ResponseEntity.status(HttpStatus.OK).body(userDetailsDTO);
    }

    @DeleteMapping("/{username}")
    @Operation(summary = "Delete User by Username", description = "Delete a user by its username.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User deleted successfully.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomDeleteResponse.class))),
            @ApiResponse(responseCode = "404", description = "User not found.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Failed to delete user.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<CustomDeleteResponse> deleteUserByUsername(@PathVariable String username) {
        userService.deleteUserByUsername(username);
        CustomDeleteResponse response = new CustomDeleteResponse(true, "User " + username + " deleted successfully.", HttpStatus.OK.value());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
