package com.azazland.uirest.json.unpacker;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import net.minidev.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;

@Getter
@Setter
@ToString
public class RegistrationUnpackerJson {
    private String firstName;
    private String lastName;
    private String thirdName;
    private Date birthday;
    private String phoneNumber;
    private Address address;
    private String mail;
    private String password;

}
