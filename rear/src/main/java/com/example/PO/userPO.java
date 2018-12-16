package com.example.PO;

public class userPO {
    String id;
    String password;
    String email;
    String phone;
    String kind;
//    int accumulatepoint;
    public userPO(String id, String password, String email, String phone, String kind){
        this.id=id;
        this.password=password;
        this.email=email;
        this.phone=phone;
        this.kind=kind;
//        this.accumulatepoint=accumulatepoint;
    }

//    public void setAccumulatepoint(int accumulatepoint) {
//        this.accumulatepoint = accumulatepoint;
//    }


    public userPO(String record){
        String []re=record.split( "," );
        this.id=re[0];
        this.password=re[1];
        this.email=re[2];
        this.phone=re[3];
        this.kind=re[4];
//        this.accumulatepoint=Integer.valueOf( re[5]);
    }
//    public int getAccumulatepoint(){
//        return 0;
//    }
    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public String getEmail() {
        return email;
    }

    public String getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public String getPhone() {
        return phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String toString() {
        return id+","+password+","+email+","
                +phone+","+kind;
    }

}
