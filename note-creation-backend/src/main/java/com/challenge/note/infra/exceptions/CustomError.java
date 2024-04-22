package com.challenge.note.infra.exceptions;

public record CustomError(String getMessage, int getStatus) implements CustomException{}
