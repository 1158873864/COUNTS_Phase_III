package com.example.mailSystem;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EmailServiceImplTest {
    @Autowired
    private EmailService emailService;
    @Test
    public void sendSimpleMail() {
        emailService.sendSimpleMail("1158873864@qq.com","好","321");
    }
}