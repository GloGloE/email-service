package com.github.glogloe.emailservice.repository.model.email;

import java.util.NoSuchElementException;

public enum Importance {
    LOW(0),
    NORMAL(1),
    HIGH(2);

    public final Integer id;

    Importance(Integer id) {
        this.id = id;
    }

    public static Importance byId(Integer id) {
        for (var importance : values()) {
            if (importance.id.equals(id)) {
                return importance;
            }
        }
        throw new NoSuchElementException();
    }
}
