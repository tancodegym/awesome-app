package com.example.jwtsecurity;

import com.example.jwtsecurity.entity.Role;
import com.example.jwtsecurity.entity.User;
import com.example.jwtsecurity.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;

@SpringBootApplication
@EnableWebSecurity
@EnableJpaRepositories
public class JwtSecurityApplication {

    public static void main(String[] args) {
        SpringApplication.run(JwtSecurityApplication.class, args);
    }
//    @Bean
//    BCryptPasswordEncoder bCryptPasswordEncoder(){
//        return new BCryptPasswordEncoder();
//    }
//    @Bean
//    CommandLineRunner run(UserService userService){
//        return args -> {
//            userService.saveRole(new Role(null,"ROLE_USER"));
//            userService.saveRole(new Role(null,"ROLE_MANAGER"));
//            userService.saveRole(new Role(null,"ROLE_ADMIN"));
//            userService.saveRole(new Role(null,"ROLE_SUPER_ADMIN"));
//
//            userService.saveUser(new User(null,"TanTN","tantn","tantn@gmail.com","123456", new HashSet<>()));
//            userService.saveUser(new User(null,"LanTT","lantt","lantt@gmail.com","123456", new HashSet<>()));
//
//            userService.addToUser("tantn@gmail.com", "ROLE_USER");
//            userService.addToUser("lantt@gmail.com", "ROLE_MANAGER");
//
//        };

//    }


}
