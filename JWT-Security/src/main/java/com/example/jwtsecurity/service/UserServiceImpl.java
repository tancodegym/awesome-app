package com.example.jwtsecurity.service;

import com.example.jwtsecurity.entity.Role;
import com.example.jwtsecurity.entity.User;
import com.example.jwtsecurity.repository.RoleRepository;
import com.example.jwtsecurity.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    private final PasswordEncoder PASSWORD_ENCODED;
    @Override
    public User saveUser(User user) {
        user.setPassword(PASSWORD_ENCODED.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public void addToUser(String username, String rolename) {
        User user = userRepository.findByEmail(username).get();
        Role role = roleRepository.findByName(rolename);
        user.getRoles().add(role);
    }
}
