package com.example.PO;

import java.sql.Timestamp;
import java.util.Date;

public class scorePO {
//    String mail;
    Timestamp time;

    int value;
    String reason;
    int temValue;

    public int getTemValue() {
        return temValue;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTemValue(int temValue) {
        this.temValue = temValue;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }
    //    public String getMail() {
//        return mail;
//    }
//
//    public void setMail(String mail) {
//        this.mail = mail;
//    }

    public Date getDate() {
        return time;
    }

    public int getValue() {
        return value;
    }

    public void setDate(Timestamp time) {
        this.time = time;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public void setValue(int value) {
        this.value = value;
    }

}
