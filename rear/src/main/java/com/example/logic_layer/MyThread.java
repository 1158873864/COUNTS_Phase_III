package com.example.logic_layer;

import com.example.PO.userPO;
import com.example.data.*;
import com.example.logic_layer.settlement.Settlement;
import com.example.logic_layer.settlement.Settlement_service;

import java.util.ArrayList;

public class MyThread implements Runnable {
    @Override
    public void run() {
        while(true) {

            Settlement_service ss2 = new Settlement();
            search_service ss = new search();
            ArrayList<String> tasks = ss.getduetask();
            ArrayList<String> tasks1=ss.getAlltask();
            ArrayList<String> tasks2=ss.get_task_in_commentresult();
            //ArrayList<String> tasks2=new ArrayList<>();
            for(int i=0;i<tasks.size();i++){
                if(tasks2.contains(tasks.get(i))){
                    tasks.remove(i);
                    i--;
                }
            }
            for(int i=0;i<tasks1.size();i++){
                if(tasks2.contains(tasks1.get(i))){
                    tasks1.remove(i);
                    i--;
                }
            }
            for(int i=0;i<tasks1.size();i++){
                ArrayList<Double> tem=ss2.TakeFinishedDegree(tasks1.get(i));
                boolean is=true;
                for(int u=0;u<tem.size();u++){
                    if(tem.get(u)!=1){
                        is=false;
                        break;
                    }
                }
                if(is){
                    ss2.CountResultOfOneTask(tasks1.get(i));
                    ss2.settleForWorkers(tasks1.get(i));
                }
            }

            for (int i = 0; i < tasks.size(); i++) {

                ss2.CountResultOfOneTask(tasks.get(i));
                ss2.settleForWorkers(tasks.get(i));
            }
            account_service as=new account();
            ArrayList<userPO> list=as.getuser();
            for(int i=0;i<list.size();i++){
                if(list.get(i).getKind().equals("worker")){
                    ArrayList<Double>  tem=new ArrayList<>();
                    transform_service ts=new transform();
                    for(int u=10;u>0;u--){
                        ArrayList<String> tem0=ts.recent_image(list.get(i).getEmail(),u);
                        ArrayList<String> tem1=ts.recent_image(list.get(i).getEmail(),u-1);
                        tem.add((double)tem0.size()-tem1.size());
                    }

                    t_distribution.test(list.get(i).getEmail(),tem);
                }
            }




            try
            {
                Thread.sleep(1000*3600*24);
            }
            catch (InterruptedException e)
            {
            }
        }
    }
}