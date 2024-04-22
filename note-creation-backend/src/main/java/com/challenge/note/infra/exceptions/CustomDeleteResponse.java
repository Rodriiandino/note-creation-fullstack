package com.challenge.note.infra.exceptions;

public record CustomDeleteResponse(Boolean deleted, String getMessage, int getStatus) implements CustomException {
}
