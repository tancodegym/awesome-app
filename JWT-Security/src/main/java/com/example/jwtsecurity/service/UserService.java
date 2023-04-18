package com.example.jwtsecurity.service;

import com.example.jwtsecurity.entity.Role;
import com.example.jwtsecurity.entity.User;

public interface UserService {
    User saveUser( User user);
    Role saveRole(Role role);
    void addToUser(String username, String rolename);
}
