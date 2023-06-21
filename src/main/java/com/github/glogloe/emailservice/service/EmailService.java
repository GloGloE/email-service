package com.github.glogloe.emailservice.service;

import com.github.glogloe.emailservice.api.model.EmailDTO;
import com.github.glogloe.emailservice.repository.EmailRepository;
import com.github.glogloe.emailservice.repository.model.mapper.EmailMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@AllArgsConstructor
@Service
public class EmailService {

    private final EmailRepository emailRepository;

    public Page<EmailDTO> getAll(int page, int size) {
        var pr = PageRequest.of(page, size);
        var pagedResult = emailRepository.findAll(pr);
        var dtoList = pagedResult.stream().map(EmailMapper::fromEntity).toList();
        return new PageImpl<>(dtoList, pagedResult.getPageable(), pagedResult.getTotalElements());
    }

    @Transactional
    public void save(EmailDTO emailDTO) {
        emailRepository.save(EmailMapper.toEntity(emailDTO));
    }
}
