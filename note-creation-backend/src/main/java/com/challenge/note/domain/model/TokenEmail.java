package com.challenge.note.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "token")
public class TokenEmail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String token;
    private LocalDateTime created_at;
    private LocalDateTime validated_at;
    private LocalDateTime expires_at;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public TokenEmail(User user, String generatedToken) {
        this.user = user;
        this.token = generatedToken;
        this.created_at = LocalDateTime.now();
        this.expires_at = LocalDateTime.now().plusMinutes(15);
    }
}