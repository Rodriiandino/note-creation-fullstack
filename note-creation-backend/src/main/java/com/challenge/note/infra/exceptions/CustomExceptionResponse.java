package com.challenge.note.infra.exceptions;

public class CustomExceptionResponse extends RuntimeException implements CustomException {
    private final int getStatus;

    public CustomExceptionResponse(String getMessage, int getStatus) {
        super(getMessage);
        this.getStatus = getStatus;
    }

    @Override
    public int getStatus() {
        return getStatus;
    }
}
