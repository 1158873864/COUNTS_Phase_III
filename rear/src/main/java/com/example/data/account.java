package com.example.data;

import com.example.PO.mailPO;
import com.example.PO.scorePO;
import com.example.PO.subtaskPO;
import com.example.PO.userPO;

import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
//import java.util.Date;

public class account implements account_service{
    alledit edit=new alledit();

    aimpath path=new aimpath();
    mysql m=new mysql();
//    public static void main(String[] arg) throws IOException{
//        account a=new account();
//        mysql sm=new mysql();
////        a.adduser(  );
////        a.getpoint(  );
//        alledit alledit=new alledit();
////        alledit
////        a.adduser(  );
////        sm.init();
//
////        a.adduser(  new userPO( "asxsc","acsa","1@qq.com"
////                ,"1435143","worker" ));
//       int x= a.getpoint( "1@qq.com" );
//       a.addaccuracy( "1@qq.com" );
////       a.add_point( "1@qq.com" );
//       a.get_submission_date( "1@qq.com" );
////       a.getsub()
//
//
//
//
//
//
//    sm.close();;
//
//
////        alledit.creatTableUser_time();
//
////        alledit.creatTableTasklist();
//
////        a.adduser( new userPO( "1,2,3,4,5,6,7,8,9" ) );
//
//    }




    public  double getefficiency(String mail){
        String sql="SELECT (images/days) as cd FROM c_images,online_days WHERE user_email=user_mail " +
                "and user_email  ='"+mail+"' ;";
        return
                m.searchDou( sql,"cd" );

    }//获得效率
    public  double Maxefficiency(){
        String sql="SELECT max(images/days) as cd FROM c_images,online_days WHERE user_email=user_mail " +
                ";";


        return m.searchDou( sql,"cd" );



    } //获得效率最高的值

    public  double Maxefficiencyman(){
        String sql="select User_time.user_mail MAX(COUNT(online_date)/COUNT(distinct image_name))" +
                " cd  from User_time , Comment where User_time.user_mail = " +
                "Comment.user_email  ;";
        return m.searchDou( sql,"User_time.user_mail" );
    } //获得效率最高的值



    public Date get_submission_date(String mail){
        String sql="select * from user " +
                "where user_email='"+mail+"' ;";
        System.out.println( sql );
        return m.getDate(  sql,"submission_date");
    }

    public int get_submission_length(String mail){
        String sql="select CONVERT(submission_date,SIGNED) temp from user where user_email='"+
                mail+"'";
//        String sql="select submission_date from user where user_email='"+mail+"' ;";
        System.out.println( sql );

        String date=new Date( System.currentTimeMillis() ).toString()
                .replaceAll( "-","" );
        int today=Integer.valueOf( date );

        return today-m.searchInt(  sql,"temp");

    }





    public boolean adduser(userPO user){
        Date date=new Date(  System.currentTimeMillis() );
        String a="INSERT INTO user " +
                "( user_email, user_id , user_password ,user_phone ,user_kind ,submission_date )" +
                "  VALUES" +
                "  ( '"+user.getEmail()+"', '"+user.getId()+"', '"+ user.getPassword()+"', '"+
                user.getPhone()+"', '"+user.getKind()+"', '"+date+
                "' );";
        m.start( a );

        addaccuracy( user.getEmail() );
        add_point( user.getEmail() ,"new",0);

        return true;
    }
    public boolean addmail(mailPO mail){
        String a="INSERT INTO verification " +
                "( user_email, mail_verification )" + "  VALUES" +
                "  ( '"+mail.getEmail()+"', '"+mail.getVerification()+ "' );";
        m.start( a );
        return true;
    }

    public boolean add_point(String mail ,String reason,int value){
//        datetime  datetime=new datetime();
        int all=getpoint( mail );

        String a="INSERT INTO point " +
                "( user_email, point , time ,reason ,aP)" + "  VALUES" +
                "  ( '"+mail+"', "+value+","+"now(),'"+reason+ "' ,  "+all +"    );";
        System.out.println( a );
        m.start( a );
        return true;
    }


    public boolean addaccuracy (String mail){

        String a="INSERT INTO accuracy " +
                "( user_email, accuracy )" + "  VALUES" +
                "  ( '"+mail+"', "+0+ " );";
        m.start( a );
        return true;
    }


    public boolean deleteuser(String id){
        String a="DELETE FROM user WHERE user_id = '"+id+"';";
//        String b="DELETE FROM point WHERE user_email = '"+id+"';";
//        String c="DELETE FROM accuracy WHERE user_email = '"+id+"';";

        m.start( a );
        return true;
    }

    public boolean deletemail(String mail){
        String a="DELETE FROM verification WHERE user_email = '"+mail+"';";
        m.start( a );
        return true;
    }

    public boolean edituser(String email,userPO user){
        deleteuser( getdetailwithmail( email ).getId());
        adduser( user );
        return true;
    }

    public userPO getdetailwithmail(String mail){
        String p=path.getuserpath()+"/user";
        ArrayList<userPO > alluser=getuser();
        for(userPO i:alluser){
            if(i.getEmail().equals( mail )) {
                return i;
            }
        }
        System.out.println( "没找到" );
        return null;
    }





//    public boolean addsubtask(subtaskPO sub)  {
////
////        edit.add( sub.toString(),path.getuserpath()+"/sub" );
////
//        return true;
//    }


    public ArrayList<subtaskPO> getsub(){
        ArrayList<subtaskPO> userlist=new ArrayList<>();
//        String p=path.getuserpath()+"/sub";
//        String all="";
//        all=edit.getStr( p );
//        String[] line= all.replaceAll( "\r","" ).split( "\n" );
//        for(String i:line){
//            if(!i.equals( "FileNotFound" )&&!i.equals( "" ))
//                userlist.add( new subtaskPO( i ) );
//        }
        return  userlist;
    }

    public boolean deletesub(String id){
//        String p=path.getuserpath()+"/sub";
//        ArrayList<subtaskPO > alluser=getsub();
//        edit.delete( p );
//        edit.delete( path.getcommentspath()+"/"+ id);
//        for(subtaskPO i:alluser){
//            if(!i.getId().equals( id )) {
//                addsubtask( i );
//            }
//        }
        return true;
    }

//    public String adduser(userPO user){








    public ArrayList<userPO> getuser(){
        String sql="select * from user ;";
        return  m.getuser( sql);
    }
    public ArrayList<userPO> getuseraccumulatepointover(int least){
        ArrayList<userPO> user=getuser();
        ArrayList<userPO> result=new ArrayList<>( );
        for(userPO i:user){
//            if(i.getAccumulatepoint()>=least){

            //todo 上一句做了修改
            if(1>=least){
                result.add( i );
            }
        }
        return result;
    }
    public userPO getuserdetailwithid(String id){
        String p=path.getuserpath()+"/user";
        ArrayList<userPO > alluser=getuser();
        for(userPO i:alluser){
            if(i.getId().equals( id )) {
                return i;
            }
        }
        System.out.println( "没找到" );
        return null;
//        return "查无此账号";
    }

    public boolean edituser(userPO user){
        deleteuser( user.getId() );
        adduser( user );
        return true;
    }




//    public boolean addmail(mailPO mail){
//        String u=mail.toString();
//        String p=path.getuserpath()+"/usermail";
//        ArrayList<mailPO > allmail=getallmailPO();
//        for(mailPO i:allmail){
//            if(i.getEmail().equals( mail.getEmail() ))
//                return false;
//        }
//        edit.add( u,p );
//        return true;
//    }

    public ArrayList<mailPO> getallmailPO(){
        String sql="select * from verification ;";
        return  m.getmailPO( sql);
//        ArrayList<mailPO> maillist=new ArrayList<>();
//        String p=path.getuserpath()+"/usermail";
//        String all="";
//        all=edit.getStr( p );
//        String[] line= all.replaceAll( "\r","" ).split( "\n" );
//        for(String i:line){
//            if(!i.equals( "FileNotFound" )&&!i.equals( "" ))
//                maillist.add( new mailPO( i ) );
//        }
//        return  maillist;

    }


    public mailPO getmailverification(String mail){
        String sql="select * from verification where user_email ='"+mail +"';";
        String v=m.searchString( sql,"mail_verification" );
        return new mailPO( v,mail );
    }
    public int getpoint(String mail){
        String sql="select sum(point) as temp  from point where user_email ='"+mail +"';";
//        System.out.println( sql );
        int v=m.searchInt( sql,"temp" );
        return v;
    }

    public ArrayList<scorePO> getpointArr(String mail){
        String sql="select * from point where user_email ='"+mail +"';";

//        System.out.println( sql );
        return  m.getArrScore( sql );
    }


    public double getaccuracy(String mail){
        String sql="select * from accuracy where user_email ='"+mail +"';";
        return m.searchDou( sql,"accuracy" );
    }
//    public  void update_point(String mail ,int point){
//        String SQL = "update point set point= " +point+" where user_email = '"+
//                mail+"' ;"  ;
//        m.start( SQL );
//    }

    public  void update_accuracy(String mail ,double accuracy){
        String SQL = "update accuracy set accuracy= " +accuracy+" where user_email = '"+
                mail+"' ;"  ;
        m.start( SQL );
    }



    public boolean editmail(mailPO mail){
        deletemail( mail.getEmail());
        addmail( mail );
        return true;
    }





}
