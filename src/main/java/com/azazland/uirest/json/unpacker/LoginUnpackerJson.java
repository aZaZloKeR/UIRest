package com.azazland.uirest.json.unpacker;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginUnpackerJson {
    private String login;
    private String password;
}
