package com.azazland.uirest.controller;


import com.azazland.uirest.json.unpacker.LoginUnpackerJson;
import com.azazland.uirest.json.unpacker.RegistrationUnpackerJson;
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
                    .uri(new URI("https://auth/users/post"))
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
                    .uri(new URI("https://auth/login/post"))
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
    public @ResponseBody String updateUser(@PathVariable int userId,RegistrationUnpackerJson registrationUnpackerJson,
                                           HttpServletResponse response){
        try {
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(new URI("https://auth/users/{"+ userId +"}/put"))
                    .PUT(HttpRequest.BodyPublishers.ofString(registrationUnpackerJson.toString()))
                    .build();
            HttpServletResponse httpResponse = (HttpServletResponse)httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            response.addCookie(new Cookie("sessionToken",httpResponse.getHeader("Set-Cookie")));//как-то прикрутить куки которые пришли от кожемяки к кукам которые отправляем алексу(вроде сделанно)
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "index";
    }
    @GetMapping(value = "/balancer/users/{userId}")
    public HttpResponse<String> giveInfoAboutUser(@PathVariable int userId){
        try {
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(new URI("https://auth/users/{"+ userId +"}/get"))
                    .GET()
                    .build();
            return httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
