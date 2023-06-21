package com.github.glogloe.emailservice.repository.model.address;

import javax.persistence.*;

@Entity(name="address")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="type", discriminatorType = DiscriminatorType.STRING)
public class Address {

    @Id
    @SequenceGenerator(name = "address_id_sequence", sequenceName = "address_id_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "address_id_sequence")
    private Long id;
}
