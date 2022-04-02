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
    private String first_name;
    private String last_name;
    private String third_name;
    private Date birthday;
    private String phone_number;
    private Address address;
    private String mail;
    private String password;

}
