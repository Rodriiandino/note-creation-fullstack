package com.challenge.note;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
@EnableJpaAuditing
public class NoteCreationBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(NoteCreationBackendApplication.class, args);
    }

}
