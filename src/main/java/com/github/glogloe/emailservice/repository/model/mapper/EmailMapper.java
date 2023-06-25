package com.github.glogloe.emailservice.repository.model.mapper;

import com.github.glogloe.emailservice.api.model.EmailDTO;
import com.github.glogloe.emailservice.repository.model.email.QEmail;

public final class EmailMapper {

    public static QEmail toEntity(EmailDTO emailDTO) {

        return new QEmail(
                emailDTO.to(),
                emailDTO.from(),
                emailDTO.cc().orElse(null),
                emailDTO.subject(),
                emailDTO.importance(),
                emailDTO.content());
    }

    public static EmailDTO fromEntity(QEmail email) {
        return new EmailDTO(
                email.getToEmail(),
                email.getFromEmail(),
                email.getCc(),
                email.getSubject(),
                email.getImportance(),
                email.getContent());
    }
}
