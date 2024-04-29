package com.challenge.note.controller;

import com.challenge.note.domain.dto.User.CreateUserDTO;
import com.challenge.note.domain.dto.User.UserDetailsDTO;
import com.challenge.note.domain.model.User;
import com.challenge.note.domain.service.UserService;
import com.challenge.note.infra.exceptions.CustomError;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication management")
public class AuthenticationController {

    private final UserService userService;

    @PostMapping("/register")
    @Operation(summary = "Create a new user", description = "Create a new user with name, email and password.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User created successfully.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDetailsDTO.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomError.class)))
    })
    public ResponseEntity<UserDetailsDTO> register(@RequestBody @Valid CreateUserDTO createUserDTO) {
        User newUser = userService.createUser(createUserDTO);
        UserDetailsDTO userDetailsDTO = new UserDetailsDTO(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDetailsDTO);
    }


}