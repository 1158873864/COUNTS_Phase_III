package com.example.data;

import com.example.PO.mailPO;
import com.example.PO.scorePO;
import com.example.PO.subtaskPO;
import com.example.PO.userPO;

import java.sql.Date;
import java.util.ArrayList;

public interface account_service {
    public  void update_accuracy(String mail ,double accuracy);//修改准确率
    public ArrayList<scorePO> getpointArr(String mail);
    public int getpoint(String mail);// 获得积分
    public boolean add_point(String mail ,String reason,int value);





//    public  void update_point(String mail ,int point,String reason);//更新积分
    public double getaccuracy(String mail);//获得准确率
    public Date get_submission_date(String mail); // 注册日期
    public  double Maxefficiency(); //  效率最高的值
    public int get_submission_length(String mail);//注册总时间
    public  double getefficiency(String mail);// 用户的效率





    boolean adduser(userPO user);
    public boolean deleteuser(String id);
    public ArrayList<userPO> getuser();
    public userPO getuserdetailwithid(String id);
    public userPO getdetailwithmail(String mail);
    public boolean edituser(userPO user);
    public boolean addmail(mailPO mail);
    public boolean deletemail(String mail);
    public ArrayList<mailPO> getallmailPO();
    public mailPO getmailverification(String mail);
    public boolean editmail(mailPO mail);
    public boolean edituser(String email,userPO user);
//    public boolean addsubtask(subtaskPO sub);
//    public ArrayList<subtaskPO> getsub();
//    public boolean deletesub(String id);

}
