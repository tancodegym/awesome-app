package com.example.jwtsecurity.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DemoController {
    @GetMapping("/test")
    public ResponseEntity<String> testLogin(){
        System.out.println("123123");
        return ResponseEntity.ok("TEST LOGIN OK !");
    }
}
