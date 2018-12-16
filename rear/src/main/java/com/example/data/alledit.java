package com.example.data;

import java.io.*;

public class alledit {
    mysql m=new mysql();
    public void creat(){

        creatTableComment();
        creatTable_result_Comment();
        creatTableImage_test_list();;
        creatTableTasklist();
        creatTableUser();
        creatTableUser_time();
        creatTableVerification();
        creatTableTasktag();
        creatTable_accuracy();
        creatTableImagelist();
        creatTableUser_value();
        creatTableuser_task();
        creatTable_point();
        creatview_online_days();
        creatview();
        creatview_finishtask();

    }
    public void creatview_finishtask(){
        String sql="create view finishtask  as " +
                "SELECT  count(task_name) temp from tasklist  " +
                "WHERE date_add(current_date(),interval task_time_length day)<current_date";

//        String sql="select count(image_restTime),task_name FROM imagelist GROUP BY task_name";
        System.out.println( sql );
        m.start( sql );

    }


    public void creatTableUser() {
        String sql="CREATE TABLE IF NOT EXISTS user  (" +
                "  user_email VARCHAR(40) , " +
                "  user_id VARCHAR(40) , " +
                "  user_password VARCHAR(40) , " +
                "  user_phone VARCHAR(40) , " +
                "  user_kind VARCHAR(40) , " +
                //     "  user_accumulatepoint INT , " +
                "  submission_date DATE " +
                //todo " +
                ");     ";
        m.start( sql );
    }
    public void creatTableUser_value() {

    }



    public void creatTableVerification() {      //邮箱验证码
        String sql="CREATE TABLE IF NOT EXISTS verification  (" +
                "  user_email VARCHAR(40) , " +
                "  mail_verification VARCHAR(40)  " +
                ");     ";
        m.start( sql );
    }

    public void creatTableTasklist() {      //任务列表
        String sql="CREATE TABLE IF NOT EXISTS Tasklist  (" +
                "  task_name VARCHAR(40) , " +
                "  task_kind VARCHAR(40) , " +
                "  user_email VARCHAR(40) , " +
                "  task_zippath VARCHAR(100) , " +
                "  task_time INT , " +
                "  task_reword INT , " +
                "  task_require INT , " +
                "  task_biaozhutype VARCHAR(40) , " +
                "  task_tag VARCHAR(40) , " +
                "  task_tagEle VARCHAR(40) , " +
                "  task_begin_time date , " +
                "  task_time_length INT  " +
                ");     ";
        m.start( sql );
    }
//    public void creatTableTaskTest() {      //任务测试
//        String sql="CREATE TABLE IF NOT EXISTS TaskTest  (" +
//                "  task_name VARCHAR(40) ,  +
//                ");     ";
//        m.start( sql );
//    }


    public void creatTableImage_test_list() {   // 图片test
        String sql="CREATE TABLE IF NOT EXISTS Image_test  (" +
                "  image_name VARCHAR(40) , " +
                "  task_name VARCHAR(40)  " +
                ");     ";
        m.start( sql );
    }

    public void creatTableUser_time() {   // shi jian
        String sql="CREATE TABLE IF NOT EXISTS User_time  (" +
                "  user_mail VARCHAR(40)  , " +
                "  online_date  date , " +
                "  time_length  int   " +
                ");     ";
        m.start( sql );
    }



//    public void creatTableUser_time() {   // shi jian
//        String sql="CREATE TABLE IF NOT EXISTS User_time  (" +
//                "  user_name VARCHAR(40) , " +
//
//                "  online_date  date , " +
//                "  state VARCHAR(10) ,  +
//                ");     ";
//        m.start( sql );
//    }

    public void creatTableImagelist() {   // 图片列表
        String sql="CREATE TABLE IF NOT EXISTS Imagelist  (" +
                "  image_name VARCHAR(40) , " +
                "  task_name VARCHAR(40) , " +
                "  image_restTime INT  " +
                ");     ";
        m.start( sql );
    }

    public void creatTableuser_task() {   // 用户和任务的关系
        String sql="CREATE TABLE IF NOT EXISTS user_task (" +
                "  task_name VARCHAR(40) , " +
                "  user_email VARCHAR(40) , " +
                "  state VARCHAR(40)  " +
                ");     ";
        m.start( sql );
    }
    public void creatTableTasktag() {
        String sql="CREATE TABLE IF NOT EXISTS Tasktag  (" +
                "  task_name VARCHAR(40) , " +
                "  task_tag VARCHAR(40) , " +
                "  task_tagelements VARCHAR(40)  " +
                ");     ";
        //todo
        m.start( sql );
    }
    public void creatTableComment() {
        String sql="CREATE TABLE IF NOT EXISTS Comment (" +
                "  user_email VARCHAR(40) , " +
                "  task_name VARCHAR(40) , " +
                "  image_name VARCHAR(40) , " +
                "  comment_point VARCHAR(1000) , " +
                "  comment_description VARCHAR(100) , " +
                "  comment_date date   " +
                ");     ";
        m.start( sql );
    }



    public void creatTable_result_Comment() {
        String sql="CREATE TABLE IF NOT EXISTS Comment_result (" +
                "  task_name VARCHAR(40) , " +
                "  image_name VARCHAR(40) , " +
                "  comment_point VARCHAR(400) , " +
                "  comment_description VARCHAR(100) , " +
                "  comment_date date   " +
                ");     ";

//        System.out.println( sql );

        m.start( sql );
    }

    public void creatview_online_days(){
        String sql="create view online_days  as" +
                " select  COUNT(online_date) as days ,user_mail from User_time GROUP BY (user_mail);";
        m.start( sql );

    }

    public void creatview(){
        String sql="create view c_images  as" +
                " select  COUNT(DISTINCT image_name) as images ,user_email from comment GROUP BY (user_email);";
        m.start( sql );

    }



    public void creatTable_point() {
        String sql="CREATE TABLE IF NOT EXISTS point(" +
                "  user_email VARCHAR(40) , " +
                " point INT ," +
                " time dateTime ," +
                " ap INT ," +

                " reason VARCHAR(40)"+
                ");     ";
        System.out.println( sql );
        m.start( sql );
    }

    public void creatTable_accuracy() {
        String sql="CREATE TABLE IF NOT EXISTS accuracy (" +
                "  user_email VARCHAR(40) , " +
                " accuracy  double " +
                ");     ";
        m.start( sql );
    }



//    public void creatTable_time() {
//        String sql="CREATE TABLE IF NOT EXISTS time (" +
//                "  user_email VARCHAR(40) , " +
//                "  time INT  ,  +
//                ");     ";
//        System.out.println( sql );
//        m.start( sql );
//    }





    public boolean add(String Sql)  {
        m.start( Sql);
        return true;
    }

//    public boolean add(String Str,String path)  {
//        File imagename= new File(path);
//        if (!imagename.exists()) {
//            try {
//                imagename.createNewFile();
//            } catch (IOException e) {
//                System.out.println( "文件创建错误" );
//                e.printStackTrace();
//            }
//        }
//        FileInputStream fis = null;
//        InputStreamReader isr = null;
//        BufferedReader br = null;
//        FileOutputStream fos = null;
//        PrintWriter pw = null;
//        String filein = Str;
//        String temp="";
//        try {
//            fis = new FileInputStream(imagename);
//            isr = new InputStreamReader(fis);
//            br = new BufferedReader(isr);
//            StringBuffer buf = new StringBuffer();
//            for (int j = 1; (temp = br.readLine()) != null; j++) {
//                buf = buf.append(temp);
//                buf = buf.append(System.getProperty("line.separator"));
//            }
//            buf.append(filein);
//            fos = new FileOutputStream(imagename);
//            pw = new PrintWriter(fos);
//            pw.write(buf.toString().toCharArray());
//            pw.flush();
//            if (pw != null) {
//                pw.close();
//            }
//            if (fos != null) {
//                fos.close();
//            }
//            if (br != null) {
//                br.close();
//            }
//            if (isr != null) {
//                isr.close();
//            }
//            if (fis != null) {
//                fis.close();
//            }
//        } catch (IOException e1) {
//            System.out.println( "文件输入错误" );
//            e1.printStackTrace();
//        }
//        return true;
//    }
//    public boolean addDictionary(String path){
//
//        File imagename= new File(path);
//        if (!imagename.exists()) {
//            imagename.mkdir();
//        }
//        return true;
//    }

//    public boolean delete(String path) {
//        File imagename= new File(path);
//        if (imagename.exists()) {
//            imagename.delete();
//            return true;
//        }else{
//            System.out.println( "不存在" );
//            return false;
//        }
//    }
//    public String getStr(String path)  {
//        String encoding = "UTF-8";
//        File file = new File(path);
//        if (!file.exists()) {
//            return "FileNotFound";
//        }
//
//
//        Long filelength = file.length();
//        byte[] filecontent = new byte[filelength.intValue()];
//        try {
//            FileInputStream in = new FileInputStream(file);
//            in.read(filecontent);
//            in.close();
//        } catch (FileNotFoundException e) {
//            return "FileNotFound";
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        try {
//            return new String(filecontent, encoding);
//        } catch (UnsupportedEncodingException e) {
//            System.err.println("The OS does not support " + encoding);
//            e.printStackTrace();
//            return "error";
//        }
//    }
//    public boolean exist(String path)  {
//        File imagename = new File( path );
//        if (imagename.exists()) {
//            return true;
//        }else{
//            return false;
//        }
//    }

}

//package com.example.data;
//
//import java.io.*;
//
//public class alledit {
//    mysql m=new mysql();
//
//
//    public void creat(){
//
//        creatTableComment();
//        creatTableImage_test_list();;
//        creatTableTasklist();
//        creatTableUser();
//        creatTableUser_time();
//        creatTableVerification();
//        creatTableTasktag();
//        creatTable_accuracy();
//        creatTableImagelist();
//        creatTableUser_value();
//        creatTableuser_task();
//        creatTable_point();
//    }
//
//    public void creatTableUser() {
//        String sql="CREATE TABLE IF NOT EXISTS user  (" +
//                "  user_email VARCHAR(40) NOT NULL, " +
//                "  user_id VARCHAR(40) NOT NULL, " +
//                "  user_password VARCHAR(40) NOT NULL, " +
//                "  user_phone VARCHAR(40) NOT NULL, " +
//                "  user_kind VARCHAR(40) NOT NULL, " +
//           //     "  user_accumulatepoint INT NOT NULL, " +
//                "  submission_date DATE," +
//              //todo 是否要加
//                "   PRIMARY KEY ( user_email ) " +
//                ");     ";
//        m.start( sql );
//    }
//    public void creatTableUser_value() {
//
//    }
//
//
//
//        public void creatTableVerification() {      //邮箱验证码
//        String sql="CREATE TABLE IF NOT EXISTS verification  (" +
//                "  user_email VARCHAR(40) NOT NULL, " +
//                "  mail_verification VARCHAR(40) NOT NULL, " +
//                "   PRIMARY KEY ( user_email ) " +
//                ");     ";
//        m.start( sql );
//    }
//
//    public void creatTableTasklist() {      //任务列表
//        String sql="CREATE TABLE IF NOT EXISTS Tasklist  (" +
//                "  task_name VARCHAR(40) NOT NULL, " +
//                "  task_kind VARCHAR(40) NOT NULL, " +
//                "  user_email VARCHAR(40) NOT NULL, " +
//                "  task_zippath VARCHAR(100) NOT NULL, " +
//                "  task_time INT NOT NULL, " +
//                "  task_reword INT NOT NULL, " +
//                "  task_require INT NOT NULL, " +
//                "  task_biaozhutype VARCHAR(40) NOT NULL, " +
//                "  task_tag VARCHAR(40) NOT NULL, " +
//                "  task_tagEle VARCHAR(40) NOT NULL, " +
//                "  task_begin_time INT  , " +
//                "  task_time_length INT NOT NULL, " +
//                "   PRIMARY KEY ( task_name ) " +
//                ");     ";
//        m.start( sql );
//    }
////    public void creatTableTaskTest() {      //任务测试
////        String sql="CREATE TABLE IF NOT EXISTS TaskTest  (" +
////                "  task_name VARCHAR(40) NOT NULL, " +
////                "   PRIMARY KEY ( task_name ) " +
////                ");     ";
////        m.start( sql );
////    }
//
//
//    public void creatTableImage_test_list() {   // 图片test
//        String sql="CREATE TABLE IF NOT EXISTS Image_test  (" +
//                "  image_name VARCHAR(40) NOT NULL, " +
//                "  task_name VARCHAR(40) NOT NULL, " +
//                "   PRIMARY KEY ( image_name,task_name ) " +
//                ");     ";
//        m.start( sql );
//    }
//
//    public void creatTableUser_time() {   // shi jian
//        String sql="CREATE TABLE IF NOT EXISTS User_time  (" +
//                "  user_mail VARCHAR(40) NOT NULL , " +
//                "  online_date  date NOT NULL, " +
//                "  time_length  int  NOT NULL, " +
//                "   PRIMARY KEY ( user_mail ,online_date) " +
//                ");     ";
//        m.start( sql );
//    }
//
//
//
////    public void creatTableUser_time() {   // shi jian
////        String sql="CREATE TABLE IF NOT EXISTS User_time  (" +
////                "  user_name VARCHAR(40) NOT NULL, " +
////
////                "  online_date  date NOT NULL, " +
////                "  state VARCHAR(10) NOT NULL, " +
////                "   PRIMARY KEY ( user_name ,online_time) " +
////                ");     ";
////        m.start( sql );
////    }
//
//    public void creatTableImagelist() {   // 图片列表
//        String sql="CREATE TABLE IF NOT EXISTS Imagelist  (" +
//                "  image_name VARCHAR(40) NOT NULL, " +
//                "  task_name VARCHAR(40) NOT NULL, " +
//                "  image_restTime INT NOT NULL, " +
//                "   PRIMARY KEY ( image_name,task_name ) " +
//                ");     ";
//        m.start( sql );
//    }
//    public void creatTableuser_task() {   // 用户和任务的关系
//        String sql="CREATE TABLE IF NOT EXISTS user_task (" +
//                "  task_name VARCHAR(40) NOT NULL, " +
//                "  user_email VARCHAR(40) NOT NULL, " +
//                "  state VARCHAR(40) NOT NULL, " +
//                "   PRIMARY KEY ( user_email ,task_name ) " +
//                ");     ";
//        m.start( sql );
//    }
//    public void creatTableTasktag() {
//        String sql="CREATE TABLE IF NOT EXISTS Tasktag  (" +
//                "  task_name VARCHAR(40) NOT NULL, " +
//                "  task_tag VARCHAR(40) NOT NULL, " +
//                "  task_tagelements VARCHAR(40) NOT NULL, " +
//                "   PRIMARY KEY ( task_name , task_tag ) " +
//                ");     ";
//        //todo
//        m.start( sql );
//    }
//    public void creatTableComment() {
//        String sql="CREATE TABLE IF NOT EXISTS Comment (" +
//                "  user_email VARCHAR(40) NOT NULL, " +
//                "  task_name VARCHAR(40) NOT NULL, " +
//                "  image_name VARCHAR(40) NOT NULL, " +
//                "  comment_point VARCHAR(100) NOT NULL, " +
//                "  comment_description VARCHAR(100) NOT NULL, " +
//                "  comment_date date  , " +
//                "   PRIMARY KEY ( user_email,task_name , image_name ) " +
//                ");     ";
//        m.start( sql );
//    }
//
//
//    public void creatTable_result_Comment() {
//        String sql="CREATE TABLE IF NOT EXISTS Comment_result (" +
//                "  user_email VARCHAR(40) NOT NULL, " +
//                "  task_name VARCHAR(40) NOT NULL, " +
//                "  image_name VARCHAR(40) NOT NULL, " +
//                "  comment_point VARCHAR(100) NOT NULL, " +
//                "  comment_description VARCHAR(100) NOT NULL, " +
//                "  comment_date date  , " +
//                "   PRIMARY KEY ( user_email,task_name , image_name ) " +
//                ");     ";
//        m.start( sql );
//    }
//
//
//    public void creatTable_point() {
//        String sql="CREATE TABLE IF NOT EXISTS point(" +
//                "  user_email VARCHAR(40) NOT NULL, " +
//                " point INT  ,"+
//                "   PRIMARY KEY ( user_email) " +
//                ");     ";
//        m.start( sql );
//    }
//
//    public void creatTable_accuracy() {
//        String sql="CREATE TABLE IF NOT EXISTS accuracy (" +
//                "  user_email VARCHAR(40) NOT NULL, " +
//                " accuracy  double , "+
//                "   PRIMARY KEY ( user_email ) " +
//                ");     ";
//        m.start( sql );
//    }
//
//
//
////    public void creatTable_time() {
////        String sql="CREATE TABLE IF NOT EXISTS time (" +
////                "  user_email VARCHAR(40) NOT NULL, " +
////                "  time INT  NOT NULL, " +
////                "   PRIMARY KEY ( user_email) " +
////                ");     ";
////        System.out.println( sql );
////        m.start( sql );
////    }
//
//
//
//
//
//    public boolean add(String Sql)  {
//        m.start( Sql);
//        return true;
//    }
//
////    public boolean add(String Str,String path)  {
////        File imagename= new File(path);
////        if (!imagename.exists()) {
////            try {
////                imagename.createNewFile();
////            } catch (IOException e) {
////                System.out.println( "文件创建错误" );
////                e.printStackTrace();
////            }
////        }
////        FileInputStream fis = null;
////        InputStreamReader isr = null;
////        BufferedReader br = null;
////        FileOutputStream fos = null;
////        PrintWriter pw = null;
////        String filein = Str;
////        String temp="";
////        try {
////            fis = new FileInputStream(imagename);
////            isr = new InputStreamReader(fis);
////            br = new BufferedReader(isr);
////            StringBuffer buf = new StringBuffer();
////            for (int j = 1; (temp = br.readLine()) != null; j++) {
////                buf = buf.append(temp);
////                buf = buf.append(System.getProperty("line.separator"));
////            }
////            buf.append(filein);
////            fos = new FileOutputStream(imagename);
////            pw = new PrintWriter(fos);
////            pw.write(buf.toString().toCharArray());
////            pw.flush();
////            if (pw != null) {
////                pw.close();
////            }
////            if (fos != null) {
////                fos.close();
////            }
////            if (br != null) {
////                br.close();
////            }
////            if (isr != null) {
////                isr.close();
////            }
////            if (fis != null) {
////                fis.close();
////            }
////        } catch (IOException e1) {
////            System.out.println( "文件输入错误" );
////            e1.printStackTrace();
////        }
////        return true;
////    }
////    public boolean addDictionary(String path){
////
////        File imagename= new File(path);
////        if (!imagename.exists()) {
////            imagename.mkdir();
////        }
////        return true;
////    }
//
////    public boolean delete(String path) {
////        File imagename= new File(path);
////        if (imagename.exists()) {
////            imagename.delete();
////            return true;
////        }else{
////            System.out.println( "不存在" );
////            return false;
////        }
////    }
////    public String getStr(String path)  {
////        String encoding = "UTF-8";
////        File file = new File(path);
////        if (!file.exists()) {
////            return "FileNotFound";
////        }
////
////
////        Long filelength = file.length();
////        byte[] filecontent = new byte[filelength.intValue()];
////        try {
////            FileInputStream in = new FileInputStream(file);
////            in.read(filecontent);
////            in.close();
////        } catch (FileNotFoundException e) {
////            return "FileNotFound";
////        } catch (IOException e) {
////            e.printStackTrace();
////        }
////        try {
////            return new String(filecontent, encoding);
////        } catch (UnsupportedEncodingException e) {
////            System.err.println("The OS does not support " + encoding);
////            e.printStackTrace();
////            return "error";
////        }
////    }
////    public boolean exist(String path)  {
////        File imagename = new File( path );
////        if (imagename.exists()) {
////            return true;
////        }else{
////            return false;
////        }
////    }
//
//}
