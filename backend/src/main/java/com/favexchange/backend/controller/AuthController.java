package com.favexchange.backend.controller;

import com.favexchange.backend.entity.User;
import com.favexchange.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public RegisterResponse register(@RequestBody RegisterRequest request) {

        if (request.loginId() == null || request.loginId().isBlank()
                || request.name() == null || request.name().isBlank()
                || request.email() == null || request.email().isBlank()
                || request.password() == null || request.password().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "すべての項目を入力してください"
            );
        }

        if (userRepository.existsByLoginId(request.loginId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "このログインIDはすでに使用されています"
            );
        }

        if (userRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "このメールアドレスはすでに使用されています"
            );
        }

        User user = new User();
        user.setLoginId(request.loginId());
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(request.password());

        User savedUser = userRepository.save(user);

        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getLoginId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        if (request.loginId() == null || request.loginId().isBlank()
                || request.password() == null || request.password().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "ログインIDとパスワードを入力してください"
            );
        }

        User user = userRepository.findByLoginId(request.loginId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "ログインIDまたはパスワードが正しくありません"
                ));

        if (!user.getPassword().equals(request.password())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "ログインIDまたはパスワードが正しくありません"
            );
        }

        return new LoginResponse(
                user.getId(),
                user.getLoginId(),
                user.getName(),
                "ログインに成功しました"
        );
    }

    public record RegisterRequest(
            String loginId,
            String name,
            String email,
            String password
    ) {
    }

    public record RegisterResponse(
            Long id,
            String loginId,
            String name,
            String email
    ) {
    }
    public record LoginRequest(
            String loginId,
            String password
    ) {
    }

    public record LoginResponse(
            Long id,
            String loginId,
            String name,
            String message
    ) {
    }
}
