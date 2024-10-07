package com.example.demo;

public class ChangeRequestResponse {
    public boolean isExists() {
        return exists;
    }

    public void setExists(boolean exists) {
        this.exists = exists;
    }

    public ChangeRequestResponse(boolean exists) {
        this.exists = exists;
    }

    private boolean exists;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ChangeRequestResponse(boolean exists, String name) {
        this.exists = exists;
        this.name = name;
    }

    private String name;
}
