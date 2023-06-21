package com.github.glogloe.emailservice.repository.model.email;

import com.github.glogloe.emailservice.repository.model.address.Address;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Table(name = "email")
@NoArgsConstructor
@AllArgsConstructor
public class Email {

    @Id
    @SequenceGenerator(name = "email_id_sequence", sequenceName = "email_id_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "email_id_sequence")
    private Long id;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "email_id", referencedColumnName = "id")
    private Set<Address> addresses;

    @Column(nullable = false)
    private String subject;

    @Enumerated(EnumType.ORDINAL)
    @Column(nullable = false)
    private Importance importance;

    @Column(nullable = false)
    @Size(min=1, max=2048)
    private String content;

    public Email(Set<Address> addresses, String subject, Importance importance, String content) {
        this.addresses = addresses;
        this.subject = subject;
        this.importance = importance;
        this.content = content;
    }

    public Set<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(Set<Address> address) {
        this.addresses = address;
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
