package com.challenge.note.domain.service;


import com.challenge.note.domain.dto.User.CreateUserDTO;
import com.challenge.note.domain.model.Role;
import com.challenge.note.domain.model.TokenEmail;
import com.challenge.note.domain.model.User;
import com.challenge.note.domain.repository.RoleRepository;
import com.challenge.note.domain.repository.TokenRepository;
import com.challenge.note.domain.repository.UserRepository;
import com.challenge.note.domain.service.tools.EmailTemplateName;
import com.challenge.note.infra.exceptions.CustomExceptionResponse;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private String activationUrl;

    @Transactional
    public User registerUser(CreateUserDTO createUserDTO) {
        try {
            User newUser = new User(createUserDTO);
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            Role role = roleRepository.findByName("USER").orElseThrow(() -> new EntityNotFoundException("Role 'USER' not found"));
            newUser.setRoles(List.of(role));
            userRepository.save(newUser);
            sendValidationEmail(newUser);
            return newUser;
        } catch (DataAccessException | MessagingException e) {
            throw new CustomExceptionResponse("Error to create user", 500);
        }
    }

    public void authenticate() {}

    @Transactional
    public void activateAccount() {}

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
