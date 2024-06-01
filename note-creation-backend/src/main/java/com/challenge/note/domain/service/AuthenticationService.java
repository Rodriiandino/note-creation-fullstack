package com.challenge.note.domain.service;


import com.challenge.note.domain.dto.User.CreateUserDTO;
import com.challenge.note.domain.dto.User.UserAuthDTO;
import com.challenge.note.domain.dto.auth.AuthenticationResponse;
import com.challenge.note.domain.model.Role;
import com.challenge.note.domain.model.TokenEmail;
import com.challenge.note.domain.model.User;
import com.challenge.note.domain.repository.RoleRepository;
import com.challenge.note.domain.repository.TokenRepository;
import com.challenge.note.domain.repository.UserRepository;
import com.challenge.note.domain.service.tools.EmailTemplateName;
import com.challenge.note.infra.exceptions.CustomExceptionResponse;
import com.challenge.note.infra.security.JwtService;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final String activationUrl = "http://localhost:5173/activate-account";

    @Transactional
    public User registerUser(CreateUserDTO createUserDTO) {
        try {
            User newUser = new User(createUserDTO);
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            Role role = roleRepository.findByName("ROLE_USER").orElseThrow(() -> new EntityNotFoundException("Role 'ROLE_USER' not found"));
            newUser.setRoles(List.of(role));
            userRepository.save(newUser);
            sendValidationEmail(newUser);
            return newUser;
        } catch (DataIntegrityViolationException e) {
            if (e.getMessage().contains("users_username_key")) {
                throw new CustomExceptionResponse("The username is already in use", HttpStatus.CONFLICT.value());
            } else if (e.getMessage().contains("users_email_key")) {
                throw new CustomExceptionResponse("The email is already in use", HttpStatus.CONFLICT.value());
            } else {
                throw new CustomExceptionResponse("Error while creating the user", HttpStatus.INTERNAL_SERVER_ERROR.value());
            }
        } catch (MessagingException e) {
            throw new CustomExceptionResponse("Error while sending the activation email", HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }


    public AuthenticationResponse authenticate(UserAuthDTO userAuthDTO) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userAuthDTO.username(), userAuthDTO.password())
        );

        User user = ((User) auth.getPrincipal());
        String token = jwtService.getToken(user);
        return new AuthenticationResponse(token);
    }

    @Transactional(noRollbackFor = CustomExceptionResponse.class) // No rollback when token is expired and a new one is sent
    public void activateAccount(String token) throws MessagingException {
        TokenEmail tokenEmail = tokenRepository.findByToken(token)
                .orElseThrow(() -> new CustomExceptionResponse("Invalid token", 400));

        if (LocalDateTime.now().isAfter(tokenEmail.getExpires_at())) {
            sendValidationEmail(tokenEmail.getUser());
            throw new CustomExceptionResponse("Activation token has expired. A new token has been send to the same email address", HttpStatus.BAD_REQUEST.value());
        }

        User user = tokenEmail.getUser();
        user.setEnabled(true);
        tokenEmail.setValidated_at(LocalDateTime.now());
        userRepository.save(user);
        tokenRepository.save(tokenEmail);
    }

    private void sendValidationEmail(User user) throws MessagingException {
        String activationCode = generateAndSaveActivationToken(user);
        emailService.sendEmail(
                user.getEmail(),
                user.getUsername(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                activationCode,
                "Activate your account"
        );
    }

    private String generateAndSaveActivationToken(User user) {
        String generatedToken = generateActivationCode(6);
        TokenEmail token = new TokenEmail(user, generatedToken);
        tokenRepository.save(token);
        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();

        SecureRandom secureRandom = new SecureRandom();

        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }

        return codeBuilder.toString();
    }
}
