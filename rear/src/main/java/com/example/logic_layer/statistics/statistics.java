package com.example.logic_layer.statistics;

import com.example.PO.userPO;
import com.example.data.*;
import com.example.logic_layer.Operation.Operation;
import com.example.logic_layer.Operation.Operation_service;

import java.util.ArrayList;

public class statistics implements statistics_service {


    account_service as=new account();
    transform_service ts=new transform();
    Operation_service os=new Operation();
    search_service ss=new search();
    @Override
    public int getTheNum(String id) {




//        if(id.contains("@")){
//            userPO up=as.getdetailwithmail(id) ;
//            id=up.getId();
//        }

        ArrayList<userPO> list=as.getuser();

        int point=0;
        for(int i=0;i<list.size();i++){
            if(list.get(i).getEmail().equals(id)){
                point=as.getpoint( id );
            }
        }
        int num=0;
        for(int i=0;i<list.size();i++){
            if(as.getpoint( list.get(i).getEmail())>point){
                num++;
            }
        }
        return num+1;
    }

    @Override
    public int getNumOfWorkers() {

        ArrayList<userPO> list=as.getuser();
        int n=0;
        for(int i=0;i<list.size();i++){
            if(list.get(i).getKind().equals("worker")){
                n++;
            }
        }
        return n;
    }

    @Override
    public int getNumOfTheTasks(String id) {



        ArrayList<String> list=os.getAllTasksByBoss( id );
        return list.size();
    }




    @Override
    public int getNumOfTheFinishedTasks(String id) {



        ArrayList<String> task=os.getAllTasksByBoss(id);
        ArrayList<String> result=new ArrayList<>(  );
        for(String i: task){
            if (ts.taskisFinish( i ))
                result.add( i );
        }

        return result.size();
    }

    @Override
    public int getTheNumOfPicsInTheTask(String taskName) {

        ArrayList<String> list1=ts.getAlreadyImage(taskName);
        ArrayList<String> list2=ts.getUnAlreadyImage(taskName);

        return list1.size()+list2.size();
    }

    @Override
    public int getTheNumOfFinishedPicsInTheTask(String taskName) {

        ArrayList<String> list1=ts.getAlreadyImage(taskName);


        return list1.size();
    }

    @Override
    public int getNumOfBosses() {

        ArrayList<userPO> list=as.getuser();
        int n=0;
        for(int i=0;i<list.size();i++){
            if(list.get(i).getKind().equals("boss")){
                n++;
            }
        }
        return n;
    }


    @Override
    public int getNumOftasks() {

        ArrayList<String> list=ss.getAlltask();
        return list.size();
    }


    @Override
    public int getNumOfGoingtasks() {


        ArrayList<userPO> list=as.getuser();
        // System.out.println(list);
        int result=0;
        for(int i=0;i<list.size();i++){
            if(list.get(i).getKind().equals("boss")){
                // System.out.println(list.get(i).getId());

                ArrayList<String> tem2=os.getAllTasksByBoss(list.get(i).getEmail());
                //  System.out.println(tem2+" "+"123");
                for(int u=0;u<tem2.size();u++){
                    if(ts.taskisFinish(tem2.get(u))){

                        tem2.remove(u);
                        u--;
                    }
                }
                //    System.out.println(tem2+" "+"233");
                result=result+tem2.size();
            }
        }
        return result;
    }

    @Override
    public int getNumOfFinishedtasks() {

        ArrayList<userPO> list=as.getuser();
        int result=0;
        for(int i=0;i<list.size();i++){
            if(list.get(i).getKind().equals("boss")){
                ArrayList<String> tem=os.getAllTasksByBoss(list.get(i).getEmail());
                for(int u=0;u<tem.size();u++){
                    if(ts.taskisFinish(tem.get(u))){
                        result++;
                    }
                }

            }
        }
        return result;
    }
}
