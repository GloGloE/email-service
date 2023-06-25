package com.github.glogloe.emailservice.api;

import com.github.glogloe.emailservice.api.model.EmailDTO;
import com.github.glogloe.emailservice.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("api/v1/email")
public class EmailController {

    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<?> save(@Validated @RequestBody EmailDTO emailDTO) {
        var savedEmail = emailService.saveEmail(emailDTO);
        return ResponseEntity.ok().body(savedEmail);
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(emailService.getAll());
    }
}
