package com.challenge.note.infra.exceptions;

import lombok.Getter;

import java.util.List;

@Getter
public class CustomError {
    private final String message;
    private final int status;
    private final List<FieldError> fieldErrors;

    public CustomError(String message, int status) {
        this.message = message;
        this.status = status;
        this.fieldErrors = null;
    }

    public CustomError(List<FieldError> fieldErrors, int status) {
        this.message = "Validation error";
        this.status = status;
        this.fieldErrors = fieldErrors;
    }
}