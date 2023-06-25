package com.github.glogloe.emailservice.exception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        return buildErrorResponseEntity(new ApiError(status, LocalDateTime.now(), "Request error", ex.getMostSpecificCause().getLocalizedMessage()));
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        return buildErrorResponseEntity(new ApiError(status, LocalDateTime.now(), "Request error", ex.getFieldError().getField() + " field " + ex.getFieldError().getDefaultMessage()));
    }

    private ResponseEntity<Object> buildErrorResponseEntity(ApiError apiError) {
        return new ResponseEntity<>(apiError, apiError.status());
    }
}
