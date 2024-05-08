package com.challenge.note.infra.exceptions;

public record FieldError(
    String field,
    String message
) {
}
