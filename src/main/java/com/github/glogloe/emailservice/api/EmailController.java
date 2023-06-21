package com.github.glogloe.emailservice.api;

import com.github.glogloe.emailservice.api.model.EmailDTO;
import com.github.glogloe.emailservice.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;

@AllArgsConstructor
@RestController
@RequestMapping("api/v1/email")
public class EmailController {

    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<?> save(@Valid @RequestBody EmailDTO emailDTO) {
        emailService.save(emailDTO);
        return ResponseEntity.ok().body(emailDTO);
    }

    @GetMapping
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        var k = emailService.getAll(page, size);
        var objM = new HashMap<String, Object>();
        objM.put("emails", k.getContent());
        objM.put("currentPage", k.getNumber());
        objM.put("totalItems", k.getTotalElements());
        objM.put("totalPages", k.getTotalPages());
        return ResponseEntity.ok(objM);
    }
}
