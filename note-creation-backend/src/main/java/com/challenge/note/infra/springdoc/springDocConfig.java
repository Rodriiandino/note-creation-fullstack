package com.challenge.note.infra.springdoc;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class springDocConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(
                        new Info()
                                .title("Note Creation API")
                                .version("1.0")
                                .description("Note Creation API with Spring Boot 3 - RESTful service using springdoc-openapi")
                                .contact(new Contact()
                                                .name("Rodrigo Andino")
                                                .email("andinorodrigo.job@gmail.com")
                                                .url("https://portafolio-andino-rodrigo.vercel.app/")
                                ))
                .components(new Components()
                        .addSecuritySchemes("bearer-key",
                                new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")));
    }
}