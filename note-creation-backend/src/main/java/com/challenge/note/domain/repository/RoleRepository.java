package com.challenge.note.domain.repository;

import com.challenge.note.domain.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String roleUser);
}