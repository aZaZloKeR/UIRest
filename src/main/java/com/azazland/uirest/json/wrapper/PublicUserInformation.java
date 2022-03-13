package com.azazland.uirest.json.wrapper;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PublicUserInformation {
    private String first_name;
    private String last_name;
    private String third_name;
    private Date birthday;
    private String mail;
}
