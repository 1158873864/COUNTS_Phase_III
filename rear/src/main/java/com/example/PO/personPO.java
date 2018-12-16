package com.example.PO;

public class personPO {
    String verification;
    String email;

    public personPO(String verification,String email){
        this.verification=verification;
        this.email=email;
    }

    @Override
    public String toString() {
        return verification+","+email;
    }

    public void setVerification(String verification) {
        this.verification = verification;
    }

    public String getVerification() {
        return verification;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }


}
