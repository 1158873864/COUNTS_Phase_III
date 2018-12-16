/*package com.example.data;

import java.io.*;
import java.util.ArrayList;

public class aimpath implements path_service{

    public String getbasicpath(){
//        String presentpath =this.getClass().getResource("/").getPath();
        String presentpath =new File("").getAbsolutePath();
        String s=presentpath+"/record";

        return  s;
    }
    public String getimagepath(){
        String presentpath =getbasicpath();
        String s=presentpath+"/image";
        return  s;
    }
    public String getimagerecordspath(){
//        String presentpath =new File("").getAbsolutePath();
        String presentpath =getbasicpath();
        String s=presentpath+"/imagerecords";
        return  s;
    }
    public String getimagerecordspath(String  task){
//        String presentpath =new File("").getAbsolutePath();
        String presentpath =getbasicpath();
        String s=presentpath+"/imagerecords"+"/"+task;
        return  s;
    }
    public String getimagerecordspath(String  task,String imagename){
//        String presentpath =new File("").getAbsolutePath();
        String presentpath =getbasicpath();
        String s=presentpath+"/imagerecords"
                +"/"+task+"/"+imagename+".txt";
        return  s;
    }

    public String getimageRecordDictionaryspath(String  task){
//        String presentpath =new File("").getAbsolutePath();
        String presentpath =getbasicpath();
        String s=presentpath+"/imagerecords"
                +"/"+task;
        return  s;
    }
    public String getcommentspath(){
//        String presentpath =new File("").getAbsolutePath();
        String presentpath =getbasicpath();
        String s=presentpath+"/comments";
        return  s;
    }
    public String getuserpath(){
        //String presentpath =new File("").getAbsolutePath();
        String presentpath =getbasicpath();
        String s=presentpath+"/user";
        return  s;
    }
    public String getzippath(){
        // TODO: 2018/4/9
//        String presentpath =new File("").getAbsolutePath();
        String presentpath =getbasicpath();
        String s=presentpath+"/zip";
        return  s;
    }
    public String SRCimagepath(){

        return "../out/artifacts/COUNTS_Phase_III_jar/record/image";
    }

}
*/

package com.example.data;

import java.io.*;
import java.util.ArrayList;

public class aimpath implements path_service{

    public String getbasicpath(){
//        String presentpath =this.getClass().getResource("/").getPath();
        String presentpath =new File("").getAbsolutePath();
        //String s=presentpath+"/rear/src/main/java/com/example/record";     //    原来版本
        // 用来在idea里面运行
        String s=presentpath+"/record";     //    新版本

        return  s;
    }
    public String getimagepath(){
        String presentpath =getbasicpath();
        String s=presentpath+"/image";
        return  s;
    }
    public String getimagetestpath(){
        String presentpath =getbasicpath();
        String s=presentpath+"/imagetest";
        return  s;
    }

    public String getimagerecordspath(){
//        String presentpath =new File("").getAbsolutePath();
        String presentpath =getbasicpath();
        String s=presentpath+"/imagerecords";
        return  s;
    }
    public String getimagerecordspath(String  task){
//        String presentpath =new File("").getAbsolutePath();
        String presentpath =getbasicpath();
        String s=presentpath+"/imagerecords"+"/"+task;
        return  s;
    }
    public String getimagerecordspath(String  task,String imagename){
//        String presentpath =new File("").getAbsolutePath();
        String presentpath =getbasicpath();
        String s=presentpath+"/imagerecords"
                +"/"+task+"/"+imagename+".txt";
        return  s;
    }

    public String getimageRecordDictionaryspath(String  task){
//        String presentpath =new File("").getAbsolutePath();
        String presentpath =getbasicpath();
        String s=presentpath+"/imagerecords"
                +"/"+task;
        return  s;
    }
    public String getcommentspath(){
//        String presentpath =new File("").getAbsolutePath();
        String presentpath =getbasicpath();
        String s=presentpath+"/comments";
        return  s;
    }
    public String getuserpath(){
        // String presentpath =new File("").getAbsolutePath();
        String presentpath =getbasicpath();
        String s=presentpath+"/user";
        return  s;
    }
    public String getzippath(){
        // TODO: 2018/4/9
//        String presentpath =new File("").getAbsolutePath();
        String presentpath =getbasicpath();
        String s=presentpath+"/zip";
        return  s;
    }
    public String SRCimagepath(){

       //return "../rear/src/main/java/com/example/record/image";
        return "../out/artifacts/COUNTS_Phase_III_jar/record/image";
    }

    public String SRCdownloadPath(){
        //return "../rear/src/main/java/com/example/record/data_results";
        return "../out/artifacts/COUNTS_Phase_III_jar/record/data_results";
    }

}
