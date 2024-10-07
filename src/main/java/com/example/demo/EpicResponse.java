package com.example.demo;

public class EpicResponse {
    public EpicResponse(boolean exists, String name) {
        this.exists = exists;
        this.name = name;
    }

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
    private String name; // Имя Эпика

    // Getters and Setters
}
