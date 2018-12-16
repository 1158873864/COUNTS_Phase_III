package com.example.Function;

import java.util.ArrayList;

public class Normal_distribution {
    double mathematical_expection;
    double standard_deviation;
    public double getMathematical_expection(){
        return mathematical_expection;
    }

    public double getStandard_deviation() {
        return standard_deviation;
    }
    public Normal_distribution(double me,double sd){
        mathematical_expection=me;
        standard_deviation=sd;
    }
    public Normal_distribution(ArrayList<String> list){
        double sum=0;

        for(int i=0;i<list.size();i++){
            sum=sum+Double.parseDouble(list.get(i));
        }
        double eql=sum/list.size();

        double s=0;
        for(int i=0;i<list.size();i++){
            s=s+(eql-Double.parseDouble(list.get(i)))*(eql-Double.parseDouble(list.get(i)));
        }
        s=s/list.size();
        mathematical_expection=eql;
        standard_deviation=Math.sqrt(s);
    }

    public Normal_distribution(){
        mathematical_expection=0;
        standard_deviation=1;
    }


 public static void main(String[]args){
        ArrayList<String> list=new ArrayList<String>();
        list.add("1.0");
        list.add("2.0");
        list.add("3.0");
        Normal_distribution n=new Normal_distribution(list);
        System.out.println(n.getMathematical_expection());
        System.out.println(n.getStandard_deviation());

 }


}
