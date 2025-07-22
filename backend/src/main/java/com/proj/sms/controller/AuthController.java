package com.proj.sms.controller;

import com.proj.sms.models.User;
import com.proj.sms.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // A simple DTO for the login request
    public record LoginRequest(String username, String password) {}

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        Optional<User> userOptional = userService.validateUser(loginRequest.username(), loginRequest.password());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            HttpSession session = request.getSession(true); // Create session if not exists
            session.setAttribute("user", user);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/status")
    public ResponseEntity<User> getStatus(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            // Re-fetch user to get the latest state
            return userService.getUserById(user.getId())
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}