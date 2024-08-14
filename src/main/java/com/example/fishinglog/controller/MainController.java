package com.example.fishinglog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping(value = "/{path:^(?!.*\\.).]*}")
    public String redirect() {
        return "forward:/index.html";
    }
}
