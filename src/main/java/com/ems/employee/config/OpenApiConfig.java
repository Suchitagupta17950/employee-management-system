package com.ems.employee.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI employeeManagementOpenAPI() {

        return new OpenAPI()
                .info(
                        new Info()
                                .title("Employee Management System API")
                                .version("1.0.0")
                                .description(
                                        "REST API for managing employees, " +
                                        "authentication, authorization, " +
                                        "and employee operations."
                                )
                                .contact(
                                        new Contact()
                                                .name("Employee Management System")
                                )
                                .license(
                                        new License()
                                                .name("MIT License")
                                )
                )
                .components(
                        new Components()
                                .addSecuritySchemes(
                                        "Bearer Authentication",
                                        new SecurityScheme()
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                                .description(
                                                        "Enter your JWT token. " +
                                                        "Example: Bearer <token>"
                                                )
                                )
                );
    }
}