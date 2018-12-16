package com.example.Function;

public class sigmoid {

    public static double  getsigmoid(double k,double offset,double x){
        double result=1.0/(k*Math.pow(Math.E,-(x-offset))+1);
        return result;
    }
    public static void main(String args[]){

    }



}
