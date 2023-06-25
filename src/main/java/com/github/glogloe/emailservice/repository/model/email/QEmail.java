package com.github.glogloe.emailservice.repository.model.email;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Optional;
import java.util.Set;

@Entity(name = "QEmail")
@Table(name = "qemail")
@NoArgsConstructor
@AllArgsConstructor
public class QEmail {

    @Id
    @SequenceGenerator(name = "email_id_sequence", sequenceName = "email_id_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "email_id_sequence")
    private Long id;

    @Email
    @NotBlank
    private String toEmail;

    @Email
    @NotBlank
    private String fromEmail;

    @ElementCollection
    private Set<@Email String> cc;

    @NotBlank
    private String subject;

    @Enumerated(EnumType.ORDINAL)
    private Importance importance;

    @Size(min=1, max=2048)
    private String content;

    public QEmail(String toEmail, String fromEmail, Set<String> cc, String subject, Importance importance, String content) {
        this.toEmail = toEmail;
        this.fromEmail = fromEmail;
        this.cc = cc;
        this.subject = subject;
        this.importance = importance;
        this.content = content;
    }

    public String getToEmail() {
        return toEmail;
    }

    public void setToEmail(String to) {
        this.toEmail = to;
    }

    public String getFromEmail() {
        return fromEmail;
    }

    public void setFromEmail(String from) {
        this.fromEmail = from;
    }

    public Optional<Set<String>> getCc() {
        return Optional.ofNullable(cc);
    }

    public void setCc(Set<String> cc) {
        this.cc = cc;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Importance getImportance() {
        return importance;
    }

    public void setImportance(Importance importance) {
        this.importance = importance;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
