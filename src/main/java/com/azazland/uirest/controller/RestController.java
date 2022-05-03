package com.azazland.uirest.controller;


import com.azazland.uirest.json.unpacker.Initiative;
import com.azazland.uirest.json.unpacker.LoginUnpackerJson;
import com.azazland.uirest.json.unpacker.RegistrationUnpackerJson;
import com.netflix.discovery.EurekaClientNames;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Controller
public class RestController {
    @PostMapping(value = "/balancer/registration",consumes = "application/json", produces = "application/json")
    public String registrationNewUser(@RequestBody RegistrationUnpackerJson registrationUnpackerJson){
        try {
            if (registrationUnpackerJson == null){
                throw new Exception("httpEntity is null -> This is custom exception");
            }
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(new URI("http://79.120.10.217:1500/auth/users/post"))
                    .POST(HttpRequest.BodyPublishers.ofString(registrationUnpackerJson.toString()))
                    .build();
            httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "login";
    }
    @PostMapping(value = "/balancer/login",consumes = "application/json", produces = "application/json")
    public void getLogin(@RequestBody LoginUnpackerJson loginUnpackerJson){
        try {
            if (loginUnpackerJson == null){
                throw new Exception("httpEntity is null -> This is custom exception");
            }
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(new URI("http://79.120.10.217:1500/auth/login"))
                    .POST(HttpRequest.BodyPublishers.ofString(loginUnpackerJson.toString()))
                    .build();
            httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
/*    @GetMapping(value = "auth/login")
    public String getAuthPage(@CookieValue("sessionToken") String cookie, HttpServletResponse response) {
        Cookie cookieForFront = new Cookie("sessionToken", cookie);
        response.addCookie(cookieForFront);
        return "index";
    }*/
    @PutMapping(value = "/balancer/users/{userId}")
    public String updateUser(@PathVariable int userId,@RequestBody RegistrationUnpackerJson registrationUnpackerJson,
                                           HttpServletResponse response){
        try {
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(new URI("http://79.120.10.217:1500/auth/users/{"+ userId +"}/put"))
                    .PUT(HttpRequest.BodyPublishers.ofString(registrationUnpackerJson.toString()))
                    .build();
            HttpServletResponse httpResponse = (HttpServletResponse)httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            response.addCookie(new Cookie("sessionToken",httpResponse.getHeader("Set-Cookie")));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "index";
    }
    // test
    @GetMapping(value = "/balancer/users/{userId}")
    public @ResponseBody HttpResponse<String> giveInfoAboutUser(@PathVariable int userId){
        try {
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(new URI("http://79.120.10.217:1500/auth/users/"+ userId))
                    .GET()
                    .build();
            HttpResponse<String> dad = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            System.err.println( dad.body().toString());
            return dad;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping(value = "/balancer/deeds/{deedId}")
    public HttpResponse<String> getInitiative(@PathVariable String deedId){
        try {
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(new URI("http://79.120.10.217:1500/deeds/{"+ deedId +"}"))
                    .GET()
                    .build();
            return httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    @GetMapping(value = "/balancer/deeds/user/{userId}")
    public HttpResponse<String> getAllInitiativeByUserId(@PathVariable int userId){
        try {
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(new URI("http://79.120.10.217:1500/deeds/user/{"+ userId +"}"))
                    .GET()
                    .build();
            return httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    @GetMapping(value = "/balancer/deeds")
    public HttpResponse<String> getAllInitiative(){
        try {
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(new URI("http://79.120.10.217:1500/deeds"))
                    .GET()
                    .build();
            return httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    @PostMapping(value = "/balancer/deeds")
    public void addNewInitiative(@RequestBody Initiative initiative){
        try {
            if (initiative == null){
                throw new Exception("httpEntity is null -> This is custom exception");
            }
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(new URI("http://79.120.10.217:1500/deeds"))
                    .POST(HttpRequest.BodyPublishers.ofString(initiative.toString()))
                    .build();
            httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
