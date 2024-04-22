package com.challenge.note.domain.model;

import com.challenge.note.domain.dto.User.CreateUserDTO;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@EqualsAndHashCode(of = "id")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true) 
    private String username;
    private String password;

    public User(CreateUserDTO createUserDTO) {
        this.username = createUserDTO.username();
        this.password = createUserDTO.password();
    }
}
