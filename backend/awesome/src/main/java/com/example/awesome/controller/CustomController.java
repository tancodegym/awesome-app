package com.example.awesome.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.graphql.server.GraphQlRSocketHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/error")
public class CustomController implements ErrorController {
    private GraphQlRSocketHandler graphQlRSocketHandler;
}
