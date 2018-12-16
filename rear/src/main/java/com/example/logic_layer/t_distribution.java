package com.example.logic_layer;

import com.example.mailSystem.EmailServiceImpl;

import java.util.ArrayList;

public class t_distribution {
    static Double t[]={12.7062,4.3207,3.1824,2.7764,2.5706,     2.4469,2.3646,2.3060,2.2622,2.2281,2.2010,2.1788,2.1604,2.1448,2.1315,2.1199,2.1098,2.1009,2.0930,2.0860,2.0796,2.0739,2.0687,2.0639,2.0595,2.0555,2.0518,2.0484,2.0452,2.0423};
    public static double getT(ArrayList<Double> list){
        double sum=0;
        for(int i=0;i<list.size();i++){
            sum+=list.get(i);
        }
        double mean=sum/list.size();
        double s=0;
        for(int i=0;i<list.size();i++){
            s+=(mean-list.get(i))*(mean-list.get(i));
        }
        s=s/(list.size()-1);
        if(list.size()<=29){
            double result=t[list.size()-1]*Math.sqrt(s)/Math.sqrt(list.size());
            return  result;
        }
        else{
            double result=t[29]*Math.sqrt(s)/Math.sqrt(30);
            return  result;
        }

    }
    public static void test(String email,ArrayList<Double> list){
        double sum=0;
        for(int i=0;i<list.size()-1;i++){
            sum+=list.get(i);
        }
        double mean0=sum/list.size();

        sum=0;
        for(int i=0;i<list.size();i++){
            sum+=list.get(i);
        }

        double mean1=sum/list.size();

        double s=0;
        for(int i=0;i<list.size();i++){
            s+=(mean0-list.get(i))*(mean0-list.get(i));
        }
        s=s/(list.size()-1);
        if(mean1<mean0){
            double result=Math.sqrt(list.size())*(mean1-mean0)/Math.sqrt(s);
            double t=getT(list);
            if(result<=-t){
                //拒绝
                EmailServiceImpl esi=new EmailServiceImpl();
                esi.sendSimpleMail(email,"来自COUNTS的问候","积极参与COUNTS的标注工作可以获得额外奖励哦");
            }
        }

    }

}
