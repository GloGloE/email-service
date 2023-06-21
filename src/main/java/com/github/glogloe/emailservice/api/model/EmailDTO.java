package com.github.glogloe.emailservice.api.model;

import com.github.glogloe.emailservice.repository.model.email.Importance;
import lombok.NonNull;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Optional;
import java.util.Set;

public record EmailDTO(
        @Email String from,
        @Email String to,
        Optional<Set<@Email String>> cc,
        @NotBlank String subject,
        @NonNull Importance importance,
        @NotBlank String content) {
}
