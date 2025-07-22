package com.proj.sms.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI smsOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("School Management System API")
                        .description("API documentation for School Management System")
                        .version("v1.0")
                        );
    }
}