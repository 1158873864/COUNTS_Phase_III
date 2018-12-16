package com.example.excitation;

import com.example.Function.sigmoid;
import com.example.data.account;
import com.example.data.account_service;
import com.example.data.transform;
import com.example.data.transform_service;

public class excitation implements excitation_service {
    @Override
    public void reward_Continuous_login(String id, int days) {
        double result= sigmoid.getsigmoid(1.0,5,days);
        transform_service ts=new transform();
        account_service as=new account();
        result=result*10;
        if(result<1) {
            as.add_point(id,"reward_Continuous_login "+days+" days",1);
//            ts.AddUserpoint(id, 1);
        }else{
            as.add_point(id,"reward_Continuous_login "+days+" days",(int)result);
//            ts.AddUserpoint(id,(int)result);
        }
    }

    @Override
    public void reward_working_time(String id) {
        transform_service ts=new transform();
        double times=ts.getYesterdayOnlinetime(id);
        double result= sigmoid.getsigmoid(1.0,2,times);
//        ts.AddUserpoint(id,(int)result);

    }

    @Override
    public void invite(String id) {

    }
}
