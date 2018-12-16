package com.example.LoginAndRegister;

import com.example.PO.mailPO;
import com.example.PO.userPO;
import com.example.data.account;
import com.example.mailSystem.EmailService;
import com.example.mailSystem.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.ws.ServiceMode;

@Service
public class register {
    @Autowired
    private EmailService email;

    public String register(String username, String password, String type, String phoneNumber, String mailAddress) {
        userPO up = new userPO(username, password, mailAddress, phoneNumber, type);
        account tem = new account();
        tem.deletemail(mailAddress);//删除其在注册时留下的验证码信息
        boolean ok = tem.adduser(up);
        if (ok) {
            return "1";
        } else {
            return "注册失败";
        }
    }

    public void getVertificationCode(String mailAddress) {
        int ran = (int) ((Math.random() * 9 + 1) * 10000);//随机生成一个5位验证码
        String content = "欢迎您注册COUNTS众包标注系统账号，您的验证码为" + ran + "，请尽快完成注册。";
        email.sendSimpleMail(mailAddress, "COUNTS众包标注系统注册", content);
        /*
         *保存信息至服务器
         */
        account tem = new account();
        mailPO mp = new mailPO(ran+"", mailAddress);
        tem.addmail(mp);


    }

    /*
    check if the key corresponds to the one which belongs to the mail
     */
    public String validate(String mailAddress, String key) {
        account tem = new account();
        String ver = tem.getmailverification(mailAddress).getVerification();
        if (ver.equals(key)) {
            return "1";
        } else {
            return "验证码错误";
        }

    }

    public String isMailExits(String mailAddress) {
        account tem = new account();
        userPO up = tem.getdetailwithmail(mailAddress);
        if (up == null) {
            return "1";
        } else {
            return "该邮箱已注册";
        }

    }


    public String isUserNameExits(String Username) {

        account tem = new account();
        userPO up = tem.getuserdetailwithid(Username);
        if (up == null) {
            return "1";
        } else {
            return "该用户名已注册";
        }
    }
}
