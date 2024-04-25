package com.challenge.note.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String token;
    private LocalDateTime created_at;
    private LocalDateTime validated_at;
    private LocalDateTime expires_at;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}