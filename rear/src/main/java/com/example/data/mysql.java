
package com.example.data;
import com.example.PO.*;

import javax.validation.constraints.Null;
import java.sql.*;
import java.time.DateTimeException;
import java.util.ArrayList;

public class mysql {

    // JDBC 驱动名及数据库 URL
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost:3306/COUNTS_Phase?useSSL=true";

    //MySQL配置时的用户名

    // 数据库的用户名与密码，需要根据自己的设置
    static final String USER = "root";
    static final String PASS = "123456";
    Connection conn = null;
    Statement stmt = null;
    public mysql(){
//        init();
    }

    //    public static void main(String[] args) {
//        mysql init=new mysql();
//        init.init();
//        init.close();
//    }
    public  void init(){
        try {
            // 注册 JDBC 驱动
            Class.forName( "com.mysql.jdbc.Driver" );
//            System.out.println( "11111111111111111111" );
            // 打开链接
//            System.out.println("连接数据库...");
            conn = DriverManager.getConnection( DB_URL, USER, PASS );
            stmt = conn.createStatement();

        }catch(SQLException se){
            // 处理 JDBC 错误
            se.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

    }
    public void close(){
        try {
            if (conn != null ) conn .close();
            if (stmt != null ) stmt .close();
//            System.out.println( "2" );
        }catch (Exception e){
            e.printStackTrace();
        }
    }
    public  void start(String sql){
        init();
        try{
            stmt.execute(sql);
        }catch(SQLException se){
            se.printStackTrace();
        }catch(Exception e){
            e.printStackTrace();
        }
        close();
    }

    public  int  searchInt(String sql,String  aim){
        init();
        int result=0;
        try{
            ResultSet rs=stmt.executeQuery(sql);//查询
            if (!rs.next()) {
                close();
                return 0;
            }
            result=rs.getInt(aim);
        }catch(SQLException se){
            se.printStackTrace();
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            close();
            return result;
        }

    }

    public  double  searchDou(String sql,String  aim){
        init();
        double result= 0;
        try{
            ResultSet rs=stmt.executeQuery(sql);//查询
            if (!rs.next()) {
                close();
                return 0;
            }
            result=rs.getDouble(aim);
        }catch(SQLException se){
            se.printStackTrace();
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            close();
            return result;
        }

    }
    public  String  searchString(String sql,String  aim){
        init();
        String result="";
        try{
            ResultSet rs=stmt.executeQuery(sql);//查询
            if (!rs.next()) {
                close();
                return "";
            }
            result=rs.getString( aim );
        }catch(SQLException se){
            se.printStackTrace();
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            close();
            return result;
        }
    }


    public ArrayList<SearchResponcePO> getcomments(String sql){
        init();
        ArrayList<SearchResponcePO> result=new ArrayList<>();
        try{
            ResultSet rs=stmt.executeQuery(sql);//查询
            while (rs.next()){
                String line =rs.getString("comment_point");
                String comment_description =rs.getString("comment_description");

                String[] pointstr = line.split( ";" );
                ArrayList<pointPO> points = new ArrayList<>();
                for (int j = 0; j < pointstr.length &&pointstr.length!=1; j++) {
                    String[] point = pointstr[j].split( "," );
                    Double x = Double.parseDouble( point[0] );
                    Double y = Double.parseDouble( point[1] );
                    pointPO finalpoint = new pointPO( x, y );
                    points.add( finalpoint );
                }
                SearchResponcePO tem=new SearchResponcePO( points,comment_description);
                result.add( tem );
//                }
            }


        }catch(SQLException se){
            se.printStackTrace();
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            close();

            return result;
        }


    }
    public taskPO gettask(String sql){
//        ArrayList<mailPO> result=new ArrayList<>();
        init();
        try{
            ResultSet rs=stmt.executeQuery(sql);//查询
            rs.next();
            String task_name=rs.getString("task_name");
            String task_kind =rs.getString("task_kind");
            String user_email =rs.getString("user_email");
            String task_zippath =rs.getString("task_zippath");
            int task_time =rs.getInt("task_time");
            int task_reword =rs.getInt("task_reword");
            int task_require =rs.getInt("task_require");
            int task_time_length =rs.getInt("task_time_length");

            String task_biaozhutype =rs.getString("task_biaozhutype");
            String []task_task_tag=rs.getString("task_tag").split( "\\." );
            String []task_task_tagE=rs.getString("task_tagEle").split( "\\." );

            //todo  没有时间选项
            close();
            taskPO ts=new taskPO( user_email,task_zippath,task_kind,task_name,
                    task_time,task_reword,task_require,task_biaozhutype,task_task_tag,task_task_tagE);
            ts.setTimelength( task_time_length );
            return ts;

        }catch(SQLException se){

            se.printStackTrace();

        }catch(Exception e){

            e.printStackTrace();
        }
        close();
        return null;

    }
    public ArrayList<mailPO> getmailPO(String sql){
        init();
        ArrayList<mailPO> result=new ArrayList<>();
        try{
            ResultSet rs=stmt.executeQuery(sql);//查询
            while (rs.next()){
                String user_email =rs.getString("user_email");
                String mail_verification =rs.getString("mail_verification");
//                userPO u=new userPO( user_id,user_password,user_email,user_phone,user_kind,user_accumulatepoint);
                result.add(  new mailPO( mail_verification,user_email));
            }
        }catch(SQLException se){
            se.printStackTrace();
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            close();
            return result;
        }

    }

    public ArrayList<userPO> getuser(String sql){
        init();
        ArrayList<userPO> result=new ArrayList<>();
        try{
            ResultSet rs=stmt.executeQuery(sql);//查询
            while (rs.next()){
                String user_email=rs.getString("user_email");
                String user_id =rs.getString("user_id");
                String user_password =rs.getString("user_password");
                String user_phone =rs.getString("user_phone");
                String user_kind =rs.getString("user_kind");
//                int user_accumulatepoint =rs.getInt("user_accumulatepoint");
                userPO u=new userPO( user_id,user_password,user_email,user_phone,user_kind);
                result.add(  u);
            }
        }catch(SQLException se){
            se.printStackTrace();
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            close();
            return result;
        }

    }
    public ArrayList<String> getallimage(String sql) {
        init();
        ArrayList<String> result = new ArrayList<>();
        try {
            ResultSet rs = stmt.executeQuery( sql );//查询
            while (rs.next()) {
                String line = rs.getString( "image_name" );
                result.add( line );
            }
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            close();
            return result;
        }
    }
    public ArrayList<String> getArrString(String sql,String aim) {
        init();
        ArrayList<String> result = new ArrayList<>();
        try {
            ResultSet rs = stmt.executeQuery( sql );//查询
//        System.out.println( sql );

            while (rs.next()) {
                String line = rs.getString( aim);
                result.add( line );
            }

        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            close();
            return result;
        }
    }


    public ArrayList<String> getArrDate(String sql,String aim) {
        init();
        ArrayList<String> result = new ArrayList<>();
        try {
            ResultSet rs = stmt.executeQuery( sql );//查询
            while (rs.next()) {
                Date line = rs.getDate( aim);
                java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String currentTime = sdf.format(line);
                result.add( currentTime );
            }
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            close();
            return result;
        }
    }

    public ArrayList<scorePO> getArrScore(String sql) {
        init();
        ArrayList<scorePO> result = new ArrayList<>();
        try {
            ResultSet rs = stmt.executeQuery( sql );//查询
            while (rs.next()) {
//                String sql="select point,time,reason from point where user_email ='"+mail +"';";

                scorePO s=new scorePO();
                Timestamp x=rs.getTimestamp( "time");
                s.setTime( x );
                String r=rs.getString( "reason" );
                s.setReason( r );
                int v=rs.getInt( "point" );
                s.setValue( v );
                int ap=rs.getInt( "ap" );
                s.setTemValue( ap );


                result.add( s );
            }
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            close();
            return result;
        }
    }

    public Date getDate(String sql, String aim) {
        init();
        try {
            ResultSet rs = stmt.executeQuery( sql );//查询
//            System.out.println( sql );
            rs.next();
            Date ss=rs.getDate( aim);
            close();
            return ss;
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        close();
        return null;
    }

    public boolean exist(String sql) {
        init();
        try{
            PreparedStatement ps = conn.prepareStatement( sql);
            ResultSet rs = ps.executeQuery();

            if(rs.next()){
                System.out.println("不为null");
                return true;
            }else{

                System.out.println("null");
                return false;
            }
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        close();
        return false;
    }
    public ArrayList<String> getArrtime(String sql,String aim) {
        init();
        ArrayList<String> result = new ArrayList<>();
        try {
            ResultSet rs = stmt.executeQuery( sql );//查询
            while (rs.next()) {
                Timestamp line = rs.getTimestamp( aim);
                java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("HHmm");
                String currentTime = sdf.format(line);
                result.add( currentTime );
            }
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            close();
            return result;
        }
    }



    public ArrayList<Integer> getArrInt(String sql,String aim) {
        init();
        ArrayList<Integer> result = new ArrayList<>();
        try {
            ResultSet rs = stmt.executeQuery( sql );//查询
            while (rs.next()) {
                int line = rs.getInt( aim);
                result.add( line );
            }
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            close();
            return result;
        }
    }






//    public taskPO searchTask(String sql){
//        int result=0;
//        try{
//            ResultSet rs=stmt.executeQuery(sql);//查询
//
//            stmt.close();
//            conn.close();
//        }catch(SQLException se){
//            se.printStackTrace();
//        }catch(Exception e){
//            e.printStackTrace();
//        }finally{
//
//        }
//
//    }







}