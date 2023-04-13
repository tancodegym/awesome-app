package com.example.awesome.model;

public class AndroidDTO {
    private boolean direct_boot_ok;
    private String collapse_key;
    private Notification notification;

    public AndroidDTO() {
    }

    public AndroidDTO(boolean direct_boot_ok, String collapse_key, Notification notification) {
        this.direct_boot_ok = direct_boot_ok;
        this.collapse_key = collapse_key;
        this.notification = notification;
    }

    public boolean isDirect_boot_ok() {
        return direct_boot_ok;
    }

    public void setDirect_boot_ok(boolean direct_boot_ok) {
        this.direct_boot_ok = direct_boot_ok;
    }

    public String getCollapse_key() {
        return collapse_key;
    }

    public void setCollapse_key(String collapse_key) {
        this.collapse_key = collapse_key;
    }

    public Notification getNotification() {
        return notification;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }
}
