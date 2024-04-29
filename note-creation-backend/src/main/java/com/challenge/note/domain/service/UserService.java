package com.challenge.note.domain.service;

import com.challenge.note.domain.dto.User.CreateUserDTO;
import com.challenge.note.domain.dto.User.UpdateUserDTO;
import com.challenge.note.domain.model.Role;
import com.challenge.note.domain.model.User;
import com.challenge.note.domain.repository.RoleRepository;
import com.challenge.note.domain.repository.UserRepository;
import com.challenge.note.infra.exceptions.CustomExceptionResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public User createUser(CreateUserDTO createUserDTO) {
        try {
            User newUser = new User(createUserDTO);
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            Role role = roleRepository.findByName("USER").orElseThrow(() -> new EntityNotFoundException("Role 'USER' not found"));
            newUser.setRoles(List.of(role));
            return userRepository.save(newUser);
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to create user", 500);
        }
    }

    public List<User> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            if (users.isEmpty()) {
                throw new EntityNotFoundException("Users not found");
            }
            return users;
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to get all users", 500);
        }
    }

    public User getUserByUsername(String username) {
        try {
            if (!userRepository.existsByUsername(username)) {
                throw new EntityNotFoundException("User not found: " + username);
            }
            return userRepository.findByUsername(username);
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to get user by username", 500);
        }
    }

    public User updateUserByUsername(String username, UpdateUserDTO updateUserDTO) {

        try {
            User user = getUserByUsername(username);
            if (user != null) {
                if (updateUserDTO.username() != null) {
                    user.setUsername(updateUserDTO.username());
                }
                if (updateUserDTO.email() != null) {
                    user.setEmail(updateUserDTO.email());
                }
                if (updateUserDTO.password() != null) {
                    user.setPassword(passwordEncoder.encode(updateUserDTO.password()));
                }
                return userRepository.save(user);
            } else {
                throw new EntityNotFoundException("User not found: " + username);
            }
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to update user by username", 500);
        }
    }

    public void deleteUserByUsername(String username) {
        try {
            User user = getUserByUsername(username);
            if (user != null) {
                userRepository.delete(user);
            } else {
                throw new EntityNotFoundException("User not found: " + username);
            }
        } catch (DataAccessException e) {
            throw new CustomExceptionResponse("Error to delete user by username", 500);
        }
    }
}
