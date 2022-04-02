package com.azazland.uirest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MvcController {

    @GetMapping(value = "ui/login")
    public String loginPage(){
        return "login";
    }
    @GetMapping(value = "ui/registration")
    public String registrationPage(){
        return "registration";
    }
    @GetMapping(value = "ui/index")
    public String indexPAge(){
        return "index";
    }
}
