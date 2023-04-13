package com.example.awesome.model;

public class Notification {
    private String channel_id;
    private String color;
    private String sound;
    private String click_action;
    private String notificataion_priority;
    private boolean default_sound;
    private boolean default_light_settings;
    private String visibility;
    private int notification_count;
    private LightSettings lightSettings;

    public Notification() {
    }

    public Notification(String channel_id, String color, String sound, String click_action, String notificataion_priority, boolean default_sound, boolean default_light_settings, String visibility, int notification_count, LightSettings lightSettings) {
        this.channel_id = channel_id;
        this.color = color;
        this.sound = sound;
        this.click_action = click_action;
        this.notificataion_priority = notificataion_priority;
        this.default_sound = default_sound;
        this.default_light_settings = default_light_settings;
        this.visibility = visibility;
        this.notification_count = notification_count;
        this.lightSettings = lightSettings;
    }

    public String getChannel_id() {
        return channel_id;
    }

    public void setChannel_id(String channel_id) {
        this.channel_id = channel_id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSound() {
        return sound;
    }

    public void setSound(String sound) {
        this.sound = sound;
    }

    public String getClick_action() {
        return click_action;
    }

    public void setClick_action(String click_action) {
        this.click_action = click_action;
    }

    public String getNotificataion_priority() {
        return notificataion_priority;
    }

    public void setNotificataion_priority(String notificataion_priority) {
        this.notificataion_priority = notificataion_priority;
    }

    public boolean isDefault_sound() {
        return default_sound;
    }

    public void setDefault_sound(boolean default_sound) {
        this.default_sound = default_sound;
    }

    public boolean isDefault_light_settings() {
        return default_light_settings;
    }

    public void setDefault_light_settings(boolean default_light_settings) {
        this.default_light_settings = default_light_settings;
    }

    public String getVisibility() {
        return visibility;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    public int getNotification_count() {
        return notification_count;
    }

    public void setNotification_count(int notification_count) {
        this.notification_count = notification_count;
    }

    public LightSettings getLightSettings() {
        return lightSettings;
    }

    public void setLightSettings(LightSettings lightSettings) {
        this.lightSettings = lightSettings;
    }
}
