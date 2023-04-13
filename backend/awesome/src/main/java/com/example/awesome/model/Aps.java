package com.example.awesome.model;

public class Aps {
    private int badge;
    private String sound;

    public Aps() {
    }

    public Aps(int badge, String sound) {

        this.badge = badge;
        this.sound = sound;
    }

    public int getBadge() {
        return badge;
    }

    public void setBadge(int badge) {
        this.badge = badge;
    }

    public String getSound() {
        return sound;
    }

    public void setSound(String sound) {
        this.sound = sound;
    }
}
