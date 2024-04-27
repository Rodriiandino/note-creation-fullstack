package com.challenge.note.domain.repository;

import com.challenge.note.domain.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, Long> {

    Token findByToken(String token);
}
