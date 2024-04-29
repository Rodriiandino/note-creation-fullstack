package com.challenge.note.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}