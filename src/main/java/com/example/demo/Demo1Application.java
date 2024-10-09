package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@SpringBootApplication
public class Demo1Application {

    public static void main(String[] args) {
        Map<String, String> env = new HashMap<>();
        env.put("SPRING_PROFILES_ACTIVE", "prod");
        System.out.println(env.keySet().stream().toList().toString());

        SpringApplication.run(Demo1Application.class, args);
    }

}
