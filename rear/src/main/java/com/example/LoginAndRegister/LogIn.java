package com.example.LoginAndRegister;

import com.example.PO.personPO;
import com.example.PO.userPO;
import com.example.data.account;
import com.example.data.aimpath;
import com.example.data.alledit;

public class LogIn {
    public String loginByUserName(String username,String password){
        account tem=new account();
        userPO po=tem.getuserdetailwithid(username);
        if(po==null){
            return "用户名不存在";
        }
        else if(po.getPassword().equals(password)){
            alledit e=new alledit();
            aimpath path=new aimpath();
//            e.addDictionary( path.getcommentspath()+"/"+ po.getId());
            return "登录成功";
        }
        else{
            return "密码错误";
        }
    }
    public String loginByMail(String mail,String password){

        account tem=new account();
        userPO po=tem.getdetailwithmail(mail);
        if(po==null){
            return "邮箱不存在";
        }
        else if(po.getPassword().equals(password)){
            alledit e=new alledit();
            aimpath path=new aimpath();
//            e.addDictionary( path.getcommentspath()+"/"+ po.getId());
            return "登录成功";
        }
        else{
            return "密码错误";
        }
    }
    public userPO getNewsByUserName(String name){
        account tem=new account();
        userPO po=tem.getuserdetailwithid(name);
        return po;

    }
    public userPO getNewsByMail(String mailAddress){
        account tem=new account();
        userPO po=tem.getdetailwithmail(mailAddress);
        return po;

    }



}
