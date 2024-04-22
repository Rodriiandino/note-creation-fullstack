package com.challenge.note.infra.exceptions;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlerController {
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<CustomError> handleEntityNotFoundException(EntityNotFoundException ex) {
        String errorMessage = ex.getMessage();
        CustomError error = new CustomError(errorMessage, HttpStatus.NOT_FOUND.value());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(CustomExceptionResponse.class)
    public ResponseEntity<CustomError> handleCustomExceptionResponse(CustomExceptionResponse ex) {
        String errorMessage = ex.getMessage();
        CustomError error = new CustomError(errorMessage, ex.getStatus());
        return ResponseEntity.status(ex.getStatus()).body(error);
    }
}