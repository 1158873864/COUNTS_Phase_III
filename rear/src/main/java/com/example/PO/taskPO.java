package com.example.PO;

import java.util.ArrayList;

public class taskPO
{

    String id;
    String zippath;
    String kind;
    String taskname;
    int times;
    int reword;
    int require;
    String biaozhutype;
    String[] tag;
    String[]tagelements;
    int tasktime;
//    int begintime;
    int timelength;


    public taskPO(){

    }

    public taskPO(String re){
        String s=re.replace( "\n","").replaceAll( "\r","" );
        String []r=s.split( "," );
        this.id=r[0];
        this.zippath=r[1];
        this.kind=r[2];
        this.taskname=r[3];
        this.times=Integer.valueOf(  r[4]);
        this.reword=Integer.valueOf(  r[5]);
        this.require=Integer.valueOf( r[6]);
        this.biaozhutype=r[7];
        String []r2=s.split( ";" );
        tag=r2[1].split( "\\." );
        tagelements=r2[2].split( "\\." );
    }
    public taskPO(String id,String zippath,String kind,String taskname,int times,int reword,int require,
                  String biaozhutype,
                  String[] tag,
                  String[]tagelements){
        this.id=id;
        this.zippath=zippath;
        this.kind=kind;
        this.taskname=taskname;
        this.times=times;
        this.reword=reword;
        this.require=require;
        this.biaozhutype=biaozhutype;
        this.tag=tag;
        this.tagelements=tagelements;
    }
    public String getId(){
        return id;
    }
    public int getRequire() {
        return require;
    }
    public int getReword() {
        return reword;
    }
    public String getTaskname() {
        return taskname;
    }
    public int getTimes() {
        return times;
    }

    public int getTimelength() {
        return timelength;
    }

    public void setTimelength(int timelength) {
        this.timelength = timelength;
    }

    public void setTimes(int times) {
        this.times = times;
    }

    public String getZippath() {
        return zippath;
    }
    public void setKind(String kind) {
        this.kind = kind;
    }
    public String getKind() {
        return kind;
    }

    public void setId(String id) {
        this.id = id;
    }

//    public int getBegintime() {
//        return begintime;
//    }
//
//    public void setBegintime(int begintime) {
//        this.begintime = begintime;
//    }

    public void setBiaozhutype(String biaozhutype) {
        this.biaozhutype = biaozhutype;
    }

    public void setEndtime(int endtime) {
        this.timelength = endtime;
    }

    public void setRequire(int require) {
        this.require = require;
    }

    public String[] getTag() {
        return tag;
    }

    public int getEndtime() {
        return timelength;
    }

    public void setReword(int reword) {
        this.reword = reword;
    }

    public String[] getTagelements() {
        return tagelements;
    }

    public void setTag(String[] tag) {
        this.tag = tag;
    }

    public void setTagelements(String[] tagelements) {
        this.tagelements = tagelements;
    }

    public void setTaskname(String taskname) {
        this.taskname = taskname;
    }

    public void setZippath(String zippath) {
        this.zippath = zippath;
    }



//    public String toString() {
//        String s=id+","+zippath+","+kind+","+taskname+","
//                +times+","+reword+","+require+","+biaozhutype+",;"+arrtoString( tag )+";"+arrtoString( tagelements );
//        return s;
//    }
    public String arrtoString(String[] a){
        String result="";
        for(int i=0;i<a.length-1;i++){
            result+=a[i]+".";
        }
        result+=a[a.length-1];

        return result;
    }

    public String[] Stringtoarr(String a){
        String result[]=a.split( "." );
//        ArrayList<String> re=new ArrayList<>(  );
//        for(int i=0;i<result.length;i++){
//            re.add( result[i] );
//        }
        return result;
    }

    public String getBiaozhutype(){return biaozhutype;}
    public   String[] gettag(){return tag;}
    public   String[] gettagelements(){return tagelements;}

}
