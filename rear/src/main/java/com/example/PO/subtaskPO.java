package com.example.PO;

import java.util.ArrayList;

public class subtaskPO {
    String id;
    ArrayList<String> task;
    public subtaskPO(String s){
        task=new ArrayList<>(  );
        String []re=s.split( "," );
        this.id=re[0];
        for(int i=1;i<re.length;i++){
            this.task.add( re[i] );
        }

    }
    public subtaskPO(String id,ArrayList<String> task){
       this.id=id;
       this.task=task;
    }

    public ArrayList<String> getTask() {
        return task;
    }

    public void setTask(ArrayList<String> task) {
        this.task = task;
    }


    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    @Override
    public String toString() {
        String s=id;
        for(int i=0;i<task.size();i++){
            s+=","+task.get(  i);
        }
        return s;
    }
}
