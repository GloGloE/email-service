package com.github.glogloe.emailservice.service;

import com.github.glogloe.emailservice.api.model.EmailDTO;
import com.github.glogloe.emailservice.repository.EmailRepository;
import com.github.glogloe.emailservice.repository.model.mapper.EmailMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@AllArgsConstructor
@Service
public class EmailService {

    private final EmailRepository emailRepository;
    public List<EmailDTO> getAll() {
        return emailRepository.findAll().stream().map(EmailMapper::fromEntity).toList();
    }

    @Transactional
    public EmailDTO saveEmail(EmailDTO emailDTO) {
        var savedEmail = emailRepository.save(EmailMapper.toEntity(emailDTO));
        return EmailMapper.fromEntity(savedEmail);
    }
}
