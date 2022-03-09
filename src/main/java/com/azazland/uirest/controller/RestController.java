package com.azazland.uirest.controller;


import com.azazland.uirest.json.unpacker.RegistrationUnpackerJson;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Controller
public class RestController {
    @PostMapping(value = "ui/registration",consumes = "application/json", produces = "application/json")
    public String registrationNewUser(@RequestBody RegistrationUnpackerJson registrationUnpackerJson){
        try {
            if (registrationUnpackerJson == null){
                throw new Exception("httpEntity is null -> This is custom exception");
            }
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(new URI("https://kozh/registration/post"))
                    .POST(HttpRequest.BodyPublishers.ofString(registrationUnpackerJson.getLogin() + registrationUnpackerJson.getPassword()))
                    .build();
            httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "login";
    }
    @PostMapping(value = "ui/authentication",consumes = "application/json", produces = "application/json")
    public void getLogin(@RequestBody HttpEntity<String> httpEntity){
        try {
            if (httpEntity.getBody() == null){
                throw new Exception("httpEntity is null -> This is custom exception");
            }
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(new URI("https://kozh/authentication/post"))
                    .POST(HttpRequest.BodyPublishers.ofString(httpEntity.getBody()))
                    .build();
            httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    @GetMapping(value = "ui/login")
    public String loginPage(){
        return "login";
    }
    @PostMapping(value = "kozh/authentication",consumes = "application/json", produces = "application/json")
    public String getAuthPage(@CookieValue("sessionToken") String cookie, HttpServletResponse response) {
        Cookie cookieForFront = new Cookie("sessionToken", cookie);
        response.addCookie(cookieForFront);
        return "index";
    }
}
