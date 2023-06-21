package com.github.glogloe.emailservice.repository.model.address;

import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.validation.constraints.Email;


@Entity
@DiscriminatorValue(value = "TO")
@NoArgsConstructor
public class ToAddress extends Address {

    @Email
    @Column(nullable = false)
    private String address;

    public ToAddress(String address) {
        this.address = address;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
