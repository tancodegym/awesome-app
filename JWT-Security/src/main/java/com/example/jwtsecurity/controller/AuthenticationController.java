package com.example.jwtsecurity.controller;

import com.example.jwtsecurity.auth.AuthenticationRequest;
import com.example.jwtsecurity.auth.AuthenticationResponse;
import com.example.jwtsecurity.service.AuthenticateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticateService authenticateService;
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest){
    return ResponseEntity.ok(authenticateService.authenticate(authenticationRequest));
    }


}
