package com.example.PO;
public class zuhePO {
    public String url;
    public String description;
    public zuhePO(String a,String b){
        url=a;
        description=b;
    }
    public String getDescription(){
        return description;
    }
    public String getUrl(){
        return url;
    }
}
