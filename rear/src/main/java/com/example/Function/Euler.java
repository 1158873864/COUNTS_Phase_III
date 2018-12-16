package com.example.Function;

public class Euler {
    public static int getm(int m){
        int result=1;
        int sushu=2;
        while(sushu<=m){
            boolean issushu=true;
            if(sushu>2){
                for(int t=2;t<sushu;t++){
                    if(sushu%t==0){
                        issushu=false;
                        break;
                    }
                }
            }
            if(issushu){
                	//System.out.println("sushu:  "+sushu);
                int k=0;
                while(m%sushu==0){
                    m=m/sushu;
                    k++;
                }
                if(k>0){
                    //System.out.println(k+"  "+sushu);
                    result=result*((int)Math.pow(sushu,k)-(int)Math.pow(sushu,k-1));
                }
            }
            sushu++;
        }
        return result;
    }
}
