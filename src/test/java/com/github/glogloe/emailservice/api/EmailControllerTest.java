package com.github.glogloe.emailservice.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.glogloe.emailservice.api.model.EmailDTO;
import com.github.glogloe.emailservice.repository.model.email.Importance;
import com.github.glogloe.emailservice.service.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(EmailController.class)
class EmailControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    private EmailService emailService;

    @Test
    public void getAllShouldReturnCorrectDataInDto() throws Exception {
        // given
        var mockEmail = mockEmail();

        // when
        when(emailService.getAll()).thenReturn(List.of(mockEmail));

        // then
        this.mockMvc.perform(get("/api/v1/email").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].to", is(mockEmail.to())))
                .andExpect(jsonPath("$[0].importance", is(mockEmail.importance().toString())));
    }

    @Test
    public void saveShouldReturnCorrectDataInDto() throws Exception {
        // given
        var mockEmail = mockEmail();

        // when
        when(emailService.saveEmail(mockEmail)).thenReturn(mockEmail);

        // then
        this.mockMvc.perform(post("/api/v1/email").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(mockEmail)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.to", is(mockEmail.to())))
                .andExpect(jsonPath("$.importance", is(mockEmail.importance().toString())));
    }

    private EmailDTO mockEmail() {
        var to = "test1@mail.com";
        var from = "test2@mail.com";
        var subject = "subject test";
        var importance = Importance.NORMAL;
        var content = "Content of this email";
        return new EmailDTO(to, from, Optional.empty(),  subject, importance, content);
    }
}