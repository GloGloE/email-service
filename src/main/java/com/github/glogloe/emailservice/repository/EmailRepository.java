package com.github.glogloe.emailservice.repository;

import com.github.glogloe.emailservice.repository.model.email.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {

}
