package com.azazland.uirest.controller;

import com.azazland.uirest.json.unpacker.RegistrationUnpackerJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Controller
public class TestController {

    @PostMapping(value = "/test/balancer/registration",consumes = "application/json", produces = "application/json")
    public @ResponseBody String registrationNewUser(@RequestBody RegistrationUnpackerJson registrationUnpackerJson){
            return registrationUnpackerJson.toString();
    }

    @GetMapping(value = "/test/test")
    public @ResponseBody String dadada(){
        return "TRATATATA";
    }
}
