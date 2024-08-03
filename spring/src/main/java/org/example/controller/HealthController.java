package org.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/health")
public class HealthController {

    @GetMapping({"","/"})
    public String health() {
        return "OK";
    }
}
