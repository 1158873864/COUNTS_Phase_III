package com.example.data;

import com.example.PO.userPO;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

public class search implements search_service{
//    public static void main(String[] arg){
//        mysql mm=new mysql();
//        mm.init();
//        search ss=new search();
////        ArrayList<String>x=ss.getAlreadytask( "mail" );
////        ArrayList<String> ssa=ss.get_mail_of_commenter_of_image( "task","image" );
//        ArrayList<String> ssss=ss.getAlltask("mail");
//
//
//        mm.close();;
//
//    }

    public mysql m=new mysql();
    public aimpath path=new aimpath();
    public alledit edit=new alledit();
//    transform tr=new transform();
    public ArrayList<String> get(String path){
        ArrayList<String> files = new ArrayList<String>();
        File file = new File(path);
        String[] fileNames = file.list();
        File[] tempList = file.listFiles();

        if(tempList!=null) {
            for (int i = 0; i < fileNames.length; i++) {
                if (tempList[i].isDirectory() || tempList[i].isFile()) {
                    files.add( tempList[i].getName() );
                }
            }
        }
            return files;
    }

    @Override
    public ArrayList<String> getAllkinds() {
        String sql="select distinct task_kind from Tasklist ;";
        return  m.getArrString( sql,"task_kind" );
    }

    public  ArrayList<String> getAllTask(String kind){
        String sql="select * from Tasklist where task_kind = '"+kind+
                "'  and task_begin_time +" +
                "  tasklist.task_time_length > current_date  ;";
        return  m.getArrString( sql,"task_name" );
    }

//        String imagepath=path.getimagepath()+"/"+kind;
//        return get( imagepath );
//    public String getkind(String task){
//        ArrayList<String> kind=getAllkinds();
//        for(String i:kind){
//            ArrayList<String> Alltask= new ArrayList<>(  );
//            Alltask = getAllTask( i );
//
//            for(String j:Alltask){
//                    if(j.equals( task)){
//                        return i;
//                    }
//                }
//            }
//        return "FoundNofile";
//    }
//    public String gettask(String image){
//        ArrayList<String> kind=getAllkinds();
//        for(String i:kind){
//            ArrayList<String> task=getAllTask( i );
//            for(String j:task){
//                ArrayList<String> allimage = getimages( i,j );
//                for(String k:allimage){
//                    if(k.equals( image )){
//                        return j;
//                    }
//                }
//            }
//        }
//
//        return "FoundNofile";
//    }
    public  ArrayList<String> getimagesWithoutZero(String kind,String task){
        String sql="select * from Imagelist where task_name = '"+task+
                "' and image_restTime > 0 ;";
        return  m.getArrString( sql,"image_name" );
    }


    public  ArrayList<String> get_mail_of_commenter_of_image(String task,String image) {

        String sql = "select user_email FROM comment WHERE image_name= '"+
                image+"'   and task_name ='"+task+"'     ;";

//        System.out.println( sql );
        return m.getArrString( sql, "user_email" );
    }


    public  ArrayList<String> getimages(String kind,String task){

        String sql="select * from Imagelist where task_name = '"+task+
                "';";
        return  m.getArrString( sql,"image_name" );
//        String imagepath=path.getimagepath()+"/"+kind+"/"+task;
//        ArrayList<String> list=get( imagepath );
//        ArrayList<String> result=new ArrayList<String>();
//        for(String i:list){
//            result.add( i );
//        }
//        return get( imagepath );
    }

    public  ArrayList<String> getduetask(){
        ArrayList<String>all=getAlltask();
        transform tr=new transform();
        for(int i=0;i<all.size();i++){
            if(!tr.taskisFinish( all.get( i ) )){
                all.remove(  i  );
                i--;
            }
        }
        return  all;
    }

    public  ArrayList<String> get_task_in_commentresult(){

        String sql="select DISTINCT task_name FROM comment_result";
        return m.getArrString( sql,"task_name" );

    }




    public  ArrayList<String> getAlltask(){
        String sql="select * from Tasklist  ";
//                + "where task_begin_time +\n" +
//                "  tasklist.task_time_length> current_date ;";
        System.out.println( sql );
        return  m.getArrString( sql,"task_name" );
    }


    public  ArrayList<String> getAllTask(String kind,String id){

        String sql="select * from tasklist\n" +
                "where  DATE_ADD(task_begin_time ,INTERVAL task_time_length DAY ) > current_date\n" +
                "and   task_kind = '"+kind+"' "+
                "and   task_name not IN ( select tasklist.task_name from  " +
                " tasklist,user_task  where tasklist.task_name =  user_task.task_name\n" +
                "and user_task.user_email='"+id+"' );";

        return  m.getArrString( sql,"task_name" );
    }
        //        String sql="select * from tasklist where task_kind ='"+kind+"' ;";
//        return  m.getArrString( sql,"task_name" );

//        String imagepath=path.getimagepath()+"/"+kind;
//        account a=new account();
//        transform t=new transform();
//        userPO u=a.getuserdetailwithid( id );
//        int point=u.getAccumulatepoint();   //目前积分
//
//        ArrayList<String> kinds=getAllkinds();
//        ArrayList<String> files = new ArrayList<String>();
//
//
//        ArrayList<String> tasklist=getAllTask(kind);
//        for(String j:tasklist){
//                int need= t.getRequire(j);
//                if (point>=need){
//                    files.add( j );
//                }
//            }
//
//        return files;
//

//    }


    public  ArrayList<String> getAlltask(String ID)  {

        String sql="select * from tasklist\n" +
                "where  DATE_ADD(task_begin_time ,INTERVAL task_time_length DAY ) > current_date\n" +
                "and   task_name not IN ( select tasklist.task_name from  " +
                " tasklist,user_task  where tasklist.task_name =  user_task.task_name\n" +
                "and user_task.user_email='"+ID+"' );";

        return  m.getArrString( sql,"task_name" );
    }


//    public String getFirstImage(String task){
//        String kind=getkind( task );
//        return getimages( kind,task ).get( 0 );
//
//    }



    public String getFirstImage(String task){
        String sql="select * from Imagelist where task_name = '"+task+"';";

        return  m.searchString( sql,"image_name" );
    }


    public  ArrayList<String> getAlreadytask(String id){
        String sql="SELECT tasklist.task_name as temp " +
                " from user_task ,tasklist" +
                "    where user_task.task_name=tasklist.task_name" +
                " and user_task.user_email =  '"+id+"'"+
                " and user_task.state =  'add'"+
                "        and tasklist.task_time +tasklist.task_time_length  < current_date" +
                "      ;";
//        System.out.println( sql );
        return  m.getArrString( sql,"temp" );
    }

    public String getkind(String task) {
        String sql="select * from Tasklist where task_name = '"+task+"';";
//        System.out.println( sql );
        return  m.searchString(  sql,"task_kind");

    }

//    public boolean taskfinished(String task){
//
//
//        return true;
//    }
//    public  ArrayList<String> getAllimages(){
//        ArrayList<String> kinds=getAllkinds();
//        ArrayList<String> files = new ArrayList<String>();
//        for (int i=0;i<kinds.size();i++){
//            ArrayList<String> task=getTask(kinds.get(i));
//            for(String j:task)
//                files.addAll(getimages(kinds.get( i ),j));
//        }
//        return files;
//    }
//
//    public  ArrayList<String> getUndefinedimages(){
//        ArrayList<String> All=getAllimages();
//        ArrayList<String> Already=getAlreadyimages();
//        for (String i:Already){
//            All.remove( i );
//        }
//        int i=0;
//        return All;
//
//
//    }
//    public  ArrayList<String> getUndefinedimages(String kind){
//        ArrayList<String> All=getimages( kind );
//        ArrayList<String> Already=getAlreadyimages();
//        for (String i:Already){
//            All.remove( i );
//        }
//        int i=0;
//        return All;
//    }
//    public  String getpath(String image){
//        ArrayList<String> kinds=getAllkinds();
////        String presentpath =new File("").getAbsolutePath();
//        String imagepath = path.SRCimagepath();
////        System.out.println(imagepath);
//
//        for (int i=0;i<kinds.size();i++){
//            getimages(kinds.get(i));
//            for(String j:getimages( kinds.get( i ) )){
//
//                if(j.equals( image ))
//                    return imagepath+"/"+kinds.get(i)+"/"+image;
//            }
//        }
//        return "fales";
//    }
//
//

}
