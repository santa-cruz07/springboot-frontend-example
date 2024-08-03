package org.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/count")
public class CountController {

    @GetMapping({"","/"})
    public String health() {
        return "OK";
    }
}
