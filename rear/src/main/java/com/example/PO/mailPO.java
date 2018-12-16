package com.example.PO;

public class mailPO {
    String verification;
    String email;

    public mailPO(String verification, String email){
        this.verification=verification;
        this.email=email;
    }
    public mailPO(String record){
        String []re=record.split( "," );
        this.verification=re[0];
        this.email=re[1];
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
