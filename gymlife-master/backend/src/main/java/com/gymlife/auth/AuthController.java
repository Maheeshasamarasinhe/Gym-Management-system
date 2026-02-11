package com.gymlife.auth;

import com.gymlife.auth.dto.AuthResponse;
import com.gymlife.auth.dto.LoginRequest;
import com.gymlife.auth.dto.RegisterRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // ── Register endpoints (separate for Admin and Client/Trainer) ──

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/register/admin")
    public ResponseEntity<AuthResponse> registerAdmin(@Valid @RequestBody RegisterRequest request) {
        request.setRole("ADMIN");
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/register/client")
    public ResponseEntity<AuthResponse> registerClient(@Valid @RequestBody RegisterRequest request) {
        request.setRole("CLIENT");
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/register/trainer")
    public ResponseEntity<AuthResponse> registerTrainer(@Valid @RequestBody RegisterRequest request) {
        request.setRole("TRAINER");
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // ── Login endpoints (separate for Admin and Client) ──

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login/admin")
    public ResponseEntity<AuthResponse> loginAdmin(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        // Verify the user is actually an admin
        if (!"ADMIN".equals(response.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(AuthResponse.builder().token(null).email(request.getEmail()).role(response.getRole()).build());
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login/client")
    public ResponseEntity<AuthResponse> loginClient(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        if (!"CLIENT".equals(response.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(AuthResponse.builder().token(null).email(request.getEmail()).role(response.getRole()).build());
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login/trainer")
    public ResponseEntity<AuthResponse> loginTrainer(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        if (!"TRAINER".equals(response.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(AuthResponse.builder().token(null).email(request.getEmail()).role(response.getRole()).build());
        }
        return ResponseEntity.ok(response);
    }
}
