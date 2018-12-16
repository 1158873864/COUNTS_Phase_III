package com.example.Resolve_equation;

import com.example.Function.Euler;

import java.util.ArrayList;

public class AEuler_mod_M {
    public static int getyu(int a,long euler,int m){//若eluer超过int长度，在数字末尾加“L” 例如：9223372036854775807L
        int temEuler= Euler.getm(m);
        euler=euler%temEuler;
          //System.out.println(euler);
        ArrayList yu=new ArrayList();

        yu.add(a%m);
        int i=1;
        while(Math.pow(2,i)<euler){
            long tem=(int)yu.get(i-1);
            long tem2=tem*tem;
            yu.add((int)(tem2%m));
            i++;
        }
        long index=1;
        int t=0;
        ArrayList list=new ArrayList();
        while(index<=euler){
            if((int)(index&euler)!=0){
                list.add(t);
            }
            t++;
            index=index*2;
        }

        long result;
        int tem=(int)list.get(0);
        result=(int)yu.get(tem);
        for(int u=1;u<list.size();u++){
            result=(result*(int)yu.get((int)list.get(u)))%m;

        }
        return (int)result;

    }
}
