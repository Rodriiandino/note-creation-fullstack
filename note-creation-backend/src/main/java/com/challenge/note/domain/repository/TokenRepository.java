package com.challenge.note.domain.repository;

import com.challenge.note.domain.model.TokenEmail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<TokenEmail, Long> {
    Optional<TokenEmail> findByToken(String token);
}
