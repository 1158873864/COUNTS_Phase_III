package com.example.PO;

import java.util.ArrayList;

public class commentPO {
    ArrayList<SearchResponcePO> SRPO;
    String image;
    String mail;

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public ArrayList<SearchResponcePO> getSRPO() {
        return SRPO;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImage() {
        return image;
    }

    public void setSRPO(ArrayList<SearchResponcePO> SRPO) {
        this.SRPO = SRPO;
    }
}
