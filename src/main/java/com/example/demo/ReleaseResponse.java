package com.example.demo;

public class ReleaseResponse {
    public boolean isExists() {
        return exists;
    }

    public void setExists(boolean exists) {
        this.exists = exists;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private boolean exists;

    public ReleaseResponse(boolean exists, String name) {
        this.exists = exists;
        this.name = name;
    }

    private String name; // Имя
}
