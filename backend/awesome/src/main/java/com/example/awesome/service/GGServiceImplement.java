package com.example.awesome.service;

import org.springframework.stereotype.Service;
import com.example.awesome.utlis.GGCloudMessaging;

import java.io.IOException;

@Service
public class GGServiceImplement implements GGService {


    @Override
    public void sendOverrideMessage(String token) {
        try {
            GGCloudMessaging.sendOverrideMessage(token);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void sendCommonMessage() {
        try {
            GGCloudMessaging.sendCommonMessage();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
