package com.example.PO;

import java.util.ArrayList;

public class SearchResponcePO {
    ArrayList<pointPO> list;
    String description;

    public SearchResponcePO(    ArrayList<pointPO> list,String description){
        this.list=new ArrayList<>();
        this.list.addAll( list );
        this.description=description;
    }
    public ArrayList<pointPO> getList(){
        return list;
    }

    public String getDescription() {
        return description;
    }

    public boolean dianEquals(SearchResponcePO SRPO2){
        ArrayList<pointPO> list1 =new ArrayList<>(  );
        ArrayList<pointPO> list2 =new ArrayList<>(  );
        list1.addAll(this.list);
        list2.addAll(SRPO2.getList());

        boolean result=true;
        if(list1.size()!=list2.size()){
            return false;
        }
        for(int i=0;i<list1.size();i++ ){
            boolean tem=false;
            for(int u=0;u<list2.size();u++){
                if((list1.get(i).x==list2.get(u).x)&&(list1.get(i).y==list2.get(u).y)){
                    tem=true;
                    break;
                }
            }
            if(!tem){
                return false;
            }
        }
        return true;
    }


}