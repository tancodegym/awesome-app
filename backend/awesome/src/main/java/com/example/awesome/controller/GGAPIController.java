package com.example.awesome.controller;

import com.example.awesome.service.GGService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api")
@CrossOrigin
public class GGAPIController {
    @Autowired
    private GGService ggService;
    @GetMapping("push/notifications/{token}")
    public String pushNotification(@PathVariable String token){
        ggService.sendOverrideMessage(token);
        return token;
    }

}
