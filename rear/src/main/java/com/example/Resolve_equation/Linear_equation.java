package com.example.Resolve_equation;

import java.util.ArrayList;

public class Linear_equation {
    public static ArrayList resolve_linear(int a, int b){//a,b均为正值   解方程 ax+by=1的整数解 若有解 x y分别在list的1 和2中 ，若无解 list.get(0)为gcd(a,b)
        int yu;
        int shang;
        int pa;
        int pb;
        int ppa;
        int ppb;
        if(a>b){
            shang=a/b;
            yu=a%b;
            a=yu;
            pa=1;
            pb=0-shang;
            ppb=1;
            ppa=0;

        }
        else{
            shang=b/a;
            yu=b%a;
            b=yu;
            pb=1;
            pa=0-shang;
            ppa=1;
            ppb=0;
        }

        while((a%b!=0)&&(b%a!=0)){
            if(a>b){
                shang=a/b;
                yu=a%b;
                a=yu;

                int tema=ppa;
                int temb=ppb;
                ppa=pa;
                ppb=pb;


                pa=tema-shang*pa;
                pb=temb-shang*pb;

            }
            else{
                shang=b/a;
                yu=b%a;
                b=yu;

                int tema=ppa;
                int temb=ppb;
                ppa=pa;
                ppb=pb;

                pb=temb-shang*pb;
                pa=tema-shang*pa;

            }

            System.out.println(pa+"  "+pb);

        }
        ArrayList list=new ArrayList();

        if(a%b==0){
            list.add(b);
        }
        else{
            list.add(a);
        }
        if((int)list.get(0)>1){
            return list;
        }
        list.add(pa);
        list.add(pb);

        return list;

    }
}
