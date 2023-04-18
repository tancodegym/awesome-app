package com.example.jwtsecurity.service;

import com.example.jwtsecurity.auth.AuthenticationRequest;
import com.example.jwtsecurity.auth.AuthenticationResponse;
import com.example.jwtsecurity.entity.Role;
import com.example.jwtsecurity.entity.User;
import com.example.jwtsecurity.repository.RoleCustomRepo;
import com.example.jwtsecurity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticateService {
    private  final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    private final RoleCustomRepo roleCustomRepo;
    private final JwtService jwtService;
    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),authenticationRequest.getPassword()));
        User user = userRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow();
        List<Role> roles = null;
        if(user != null){
            roles = roleCustomRepo.getRoles(user);
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        Set<Role> roleSet = new HashSet<>();
        roles.stream().forEach(role -> roleSet.add(new Role(role.getName())));
        user.setRoles(roleSet);
        roleSet.stream().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));
        var jwtToken = jwtService.generateToken(user,authorities);
        var refreshToken = jwtService.generateRefreshToken(user,authorities);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

}
