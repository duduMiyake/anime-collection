package com.miyake.animecollection.controller;

import com.miyake.animecollection.dto.LoginDTO;
import com.miyake.animecollection.dto.UserDTO;
import com.miyake.animecollection.dto.UserResponseDTO;
import com.miyake.animecollection.model.User;
import com.miyake.animecollection.security.JwtUtil;
import com.miyake.animecollection.service.UserService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserDTO userDTO) {
        User newUser = userService.createUser(userDTO);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginDTO loginDTO) {
        User user = userService.getByEmail(loginDTO.getEmail());
        if (user != null && user.getPassword().equals(loginDTO.getPassword())) {
            String token = JwtUtil.generateToken(user.getEmail());

            UserResponseDTO safeUser = new UserResponseDTO(user.getEmail(), user.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("user", safeUser);
            response.put("token", token);
            System.out.println("Response: " + response);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }

}
