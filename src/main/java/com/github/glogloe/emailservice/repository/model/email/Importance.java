package com.github.glogloe.emailservice.repository.model.email;

public enum Importance {
    LOW(0),
    NORMAL(1),
    HIGH(2);

    public final Integer id;

    Importance(Integer id) {
        this.id = id;
    }
}
