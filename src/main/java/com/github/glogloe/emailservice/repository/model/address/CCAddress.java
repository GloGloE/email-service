package com.github.glogloe.emailservice.repository.model.address;

import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.validation.constraints.Email;


@Entity
@DiscriminatorValue(value = "CC")
@NoArgsConstructor
public class CCAddress extends Address {

    @Email
    private String address;

    public CCAddress(String address) {
        this.address = address;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
