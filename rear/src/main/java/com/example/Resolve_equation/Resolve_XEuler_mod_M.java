package com.example.Resolve_equation;

import com.example.Function.Euler;

import java.util.ArrayList;

public class Resolve_XEuler_mod_M {

    public static int decode(int k,int b,int m,int tem){

        //  System.out.println("tem    "+tem);
        ArrayList list=Linear_equation.resolve_linear(k,tem);//注意：实际方程为 ku-θ（m）*v=1 故返回值中 k=x, v=-y
        int u;
        int v;
        if(list.size()!=1){
            u=(int)list.get(1);
            v=-(int)list.get(2);
            while(u<0){
                u=u+tem;
                v=v+k;
            }
        }
        else{
            return 0;
        }
        //  System.out.println("u    "+u);
        // System.out.println("u k m    "+u+"  "+k+"  "+m);
        int result=AEuler_mod_M.getyu(b,u,m);
        return result;

    }






     static int getX(int k,int b,int m){
        int tem=Euler.getm(m);
        //  System.out.println("tem    "+tem);
        ArrayList list=Linear_equation.resolve_linear(k,tem);//注意：实际方程为 ku-θ（m）*v=1 故返回值中 k=x, v=-y
        int u;
        int v;
        if(list.size()!=1){
            u=(int)list.get(1);
            v=-(int)list.get(2);
            while(u<0){
                u=u+tem;
                v=v+k;
            }
        }
        else{
            return 0;
        }
        //  System.out.println("u    "+u);
        // System.out.println("u k m    "+u+"  "+k+"  "+m);
        int result=AEuler_mod_M.getyu(b,u,m);
        return result;

    }
}
