package com.example.awesome.model;

public class Apns {
    private Payload payload;

    public Apns() {
    }

    public Apns(Payload payload) {
        this.payload = payload;
    }


    public Payload getPayload() {
        return payload;
    }

    public void setPayload(Payload payload) {
        this.payload = payload;
    }
}
