package com.example.awesome.model;

public class LightSettings {
    private Color color;
    private String light_on_duration;
    private String light_off_duration;

    public LightSettings() {
    }

    public LightSettings(Color color, String light_on_duration, String light_off_duration) {
        this.color = color;
        this.light_on_duration = light_on_duration;
        this.light_off_duration = light_off_duration;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public String getLight_on_duration() {
        return light_on_duration;
    }

    public void setLight_on_duration(String light_on_duration) {
        this.light_on_duration = light_on_duration;
    }

    public String getLight_off_duration() {
        return light_off_duration;
    }

    public void setLight_off_duration(String light_off_duration) {
        this.light_off_duration = light_off_duration;
    }
}
