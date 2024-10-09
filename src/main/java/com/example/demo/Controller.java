package com.example.demo;

import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@org.springframework.stereotype.Controller
public class Controller {

    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("user", null);
        return "login";
    }

    @PostMapping("/login-success")
    public String loginSuc(Model model) {
        model.addAttribute("error", true);
        return "login";
    }
}
