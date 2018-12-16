package com.example.logic_layer.Operation;

import com.example.PO.*;
import com.example.data.*;

import java.io.IOException;
import java.util.ArrayList;

/**
 finish
 * @author xu jiehui
 * @version 1.0
 * @date 2018-3-17
 */
public class Operation implements Operation_service {


    account_service as=new account();
    search_service ss=new search();
    transform_service ts=new transform();

    public boolean dianEquals(ArrayList<pointPO> list1,ArrayList<pointPO> list2){
        boolean result=true;
        if(list1.size()!=list2.size()){
            return false;
        }
        for(int i=0;i<list1.size();i++ ){
            boolean tem=false;
            for(int u=0;u<list2.size();u++){
                if((list1.get(i).x==list2.get(u).x)&&(list1.get(i).y==list2.get(u).y)){
                    tem=true;
                    break;
                }
            }
            if(!tem){
                return false;
            }
        }
        return true;
    }

    @Override
    public  String askForTask(String id,String taskName){

//        if(id.contains("@")){
//            userPO up=as.getdetailwithmail(id) ;
//            id=up.getId();
//        }
        // transform_service tem=new transform();
        boolean ok=ts.addTaskUser(id,taskName);
        if(ok){
            return "1";
        }
        else{
            return "失败";
        }

    }

    //   @Override
    public  ArrayList<String> getAlltasks(String kind){
        // search transform=new search();
        ArrayList<String> tem= null;
        tem = ss.getAllTask( kind );
//        tem = transform.getAlltask(kind);

        return tem;
    }

    @Override
    public  ArrayList<String> getAlltasks(){

        // search transform=new search();
        ArrayList<String> tem=ss.getAlltask();

        return tem;

    }

    @Override
    public String isPhoneNumberExits(String phonenumber) {

        ArrayList<userPO> list=as.getuser();

        for(int i=0;i<list.size();i++){
            if(phonenumber.equals(list.get(i).getPhone())){
                return "1";
            }
        }
        return "已存在";
    }

    @Override
    public ArrayList<String> getFirstNWorker(int n) {

        ArrayList<userPO> list=as.getuser();
        ArrayList<userPO> l=new ArrayList<>();
        //  System.out.println(list);
        for(int i=0;i<list.size();i++){





            if(list.get(i).getKind().equals("boss")){

                list.remove(i);
                i--;
            }
        }

      /*  for(int i=0;i<list.size();i++){



            System.out.println(list.get(i).getId());


        }*/



        ArrayList<String> list1=new ArrayList<>();
        for(int  i=0;i<list.size();i++){

            int max=0;
            for(int u=0;u<list.size();u++){
                if(as.getpoint( list.get(u).getEmail())
                        >as.getpoint(  list.get(max).getEmail())){
                    max=u;
                }
            }
            list1.add(list.get(max).getId());
            list.remove(max);
            i--;
        }
        ArrayList<String> result=new ArrayList<>();
        if(list1.size()<n){
            for(int i=0;i<list1.size();i++){
                result.add(list1.get(i));
            }
        }else{
            for(int i=0;i<n;i++){
                result.add(list1.get(i));
            }
        }
        return result;
    }
    @Override
    public ArrayList<String> getUnfinishedTasks(String id) {

//        if(id.contains("@")){
//            userPO up=as.getdetailwithmail(id) ;
//            id=up.getId();
//        }
        // transform_service ts=new transform();

        ArrayList<String> result=ts.gettaskUnFinsh(id);

//        ArrayList<String>  ta=new ArrayList<>();
//        for(subtaskPO i:as.getsub()){
//            if(i.getId().equals(id)){
//                ta.addAll(i.getTask());
//            }
//        }

        for(int i=0;i<result.size();i++){
            if(getPicOfTheTask(id,result.get( i )).size()<1){
                result.remove(i);
            }
        }
//            for(int u=0;u<ta.size();u++){
//                if(result.get(i).equals(ta.get(u))){
//                    result.remove(i);
//                    i--;
//                    break;
//                }
//        }
        return result;
    }

    @Override
    public ArrayList<String> getFinishedTasks(String id) {
//        ArrayList<String> list=ts.gettaskname(id);
//

////        for(int i=0;i<list.size();i++){
////            ArrayList<String> tem=ss.getimages("",list.get(i));
////            if(tem.size()==0){
////                list.remove(i);
////                i--;
////            }
////        }
//      ArrayList<String> tem=getUnfinishedTasks(id);
//
////        ArrayList<String> result=new ArrayList<>();
//        for(int i=0;i<list.size();i++){
//            if(tem.contains(list.get(i))){
//                list.remove(i);
//                i--;
//            }
//        }
        ArrayList<String> list=ts.gettaskname(id);


        ArrayList<String> list2=new ArrayList<>();
        for(int i=0;i<list.size();i++){
            ArrayList<String> images=ts.getallimage(id,list.get(i));
            if(images.size()!=0){
                list2.add(list.get(i));
            }
        }
        return list2;
    }

    @Override
    public ArrayList<String> getIrrelatedTasks(String id) {


        ArrayList<String> all=ss.getAlltask(id);
//        System.out.println( all.size() );

        for(int i=0;i<all.size();i++){
            if(ts.taskisFinish(all.get(i))){
                all.remove(i);
                i--;
            }
        }
        ArrayList<String> un=getUnfinishedTasks(id);
        ArrayList<String>  fin=getFinishedTasks(id);
//        ArrayList<String> result=ts.gettaskUnFinsh(id);
//        ArrayList<String>  ta=new ArrayList<>();
//        for(subtaskPO i:as.getsub()){
//            if(i.getId().equals(id)){
//                ta.addAll(i.getTask());
//            }
//        }

//        for(int u=0;u<ta.size();u++){
//            if(all.contains(ta.get(u))){
//                all.remove(ta.get(u));
//
//            }
//        }
//
        for(int u=0;u<un.size();u++){
            if(all.contains(un.get(u))){
                all.remove(un.get(u));

            }
        }
        for(int u=0;u<fin.size();u++){
            if(all.contains(fin.get(u))){
                all.remove(fin.get(u));
            }
        }
//        System.out.println( all );

        for(int u=0;u<all.size();u++){
            if(ts.taskisFinish( all.get( u ) )){
                all.remove(all.get( u ));
            }
        }
//        System.out.println( all );
        return all;
    }



    @Override
    public ArrayList<String> getpictures(String taskName) {
        path_service ps=new aimpath();
        String kind=ss.getkind(taskName);
        ArrayList<String> list=ss.getimages(kind,taskName);
        ArrayList<String> result=new ArrayList<>();
        for(int i=0;i<list.size();i++){
            String src=ps.SRCimagepath()+"/"+kind+"/"+taskName+"/"+list.get(i);
            result.add(src);
        }
        return result;
    }

    @Override
    public ArrayList<String> getInvolvedWorkers(String taskName) {
        mysql m=new mysql();
        String sql="select * from user_task where task_name='"+taskName+"';";

        return  m.getArrString( sql,"user_email" );
//        return list;
    }

    @Override
    public ArrayList<String> getHintTasks(String hint, String id) {

//        ArrayList<String> all=ss.getAlltask(id);
//        getIrrelatedTasks(  )
//        ArrayList<String> list1=ts.gettaskFinsh(id);
//        ArrayList<String> list2=ts.gettaskUnFinsh(id);
//
//        ArrayList<String> result=ts.gettaskname(id);
////   /
//        for(int i=0;i<list1.size();i++){
//            if(all.contains(list1.get(i))){
//                all.remove(list1.get(i));
//            }
//        }
//
//        for(int i=0;i<list2.size();i++){
//            if(all.contains(list2.get(i))){
//                all.remove(list2.get(i));
//            }
//        }
//
        ArrayList<String>all=getIrrelatedTasks( id );
        ArrayList<String > result=new ArrayList<>();
        for(int i=0;i<all.size();i++){
            boolean has=true;
            for(int u=0;u<hint.length();u++){
                if(!all.get(i).contains(hint.substring(u,u+1))){
                    has=false;
                    break;
                }
            }
            if(has){
                result.add(all.get(i));
            }
        }


        return result;


    }

    @Override
    public ArrayList<String> getHintMyGoingTasks(String hint, String id) {

        ArrayList<String> list2=ts.gettaskUnFinsh(id);

        ArrayList<String > result=new ArrayList<>();
        for(int i=0;i<list2.size();i++){
            boolean has=true;
            for(int u=0;u<hint.length();u++){
                if(!list2.get(i).contains(hint.substring(u,u+1))){
                    has=false;
                    break;
                }
            }
            if(has){
                result.add(list2.get(i));
            }
        }
        return result;
    }

    @Override
    public ArrayList<String> getHintMyFinishedTasks(String hint, String id) {
        ArrayList<String> list=ts.gettaskname(id);

//
        ArrayList<String> list2=new ArrayList<>();
        for(int i=0;i<list.size();i++){
            ArrayList<String> images=ts.getallimage(id,list.get(i));
            if(images.size()!=0){
                list2.add(list.get(i));
            }
        }

        ArrayList<String > result=new ArrayList<>();
        for(int i=0;i<list2.size();i++){
            boolean has=true;
            for(int u=0;u<hint.length();u++){
                if(!list2.get(i).contains(hint.substring(u,u+1))){
                    has=false;
                    break;
                }
            }
            if(has){
                result.add(list2.get(i));
            }
        }
        return result;
    }

    @Override
    public String deleteTask(String taskName, String id) {
//
//
//        if(id.contains("@")){
//            userPO up=as.getdetailwithmail(id) ;
//            id=up.getId();
//        }
        // transform_service ts=new transform();

//        ArrayList<subtaskPO> tem1=as.getsub();
//        boolean has=false;
//        ArrayList<String>ta=new ArrayList<>();
//        ta.add(taskName);
//
//        for(int i=0;i<tem1.size();i++){
//            if(tem1.get(i).getId().equals(id)){
//                as.deletesub(id);
//                ta.addAll(tem1.get(i).getTask());
//            }
//        }
//        as.addsubtask(new subtaskPO(id,ta));
        boolean tem=ts.deltask(taskName,id);
        if(tem){
            return "1";
        }else{
            return "删除失败";
        }
    }

    @Override
    public String SaveLabel(String task,String email,String url, ArrayList<pointPO> list, String description) {
        // account_service tem0=new account();
//        System.out.println(email);
//        userPO up=as.getdetailwithmail(email);
//        String id=up.getId();
//        transform transform=new transform();

        SearchResponcePO tem=new SearchResponcePO(list,description);
        boolean result;
        try {
            String names[]=url.split("/");
            result = ts.addcomments(email,task,names[names.length-1],tem);

        }catch(Exception ex){
            return "标记失败";
        }
        if(result){
            return "标记成功";

        }
        else{
            return "标记失败";
        }
    }

    @Override
    public  ArrayList<SearchResponcePO> showPicDetail(String task,String email,String src){
        // transform_service ts=new transform();


//        userPO up=as.getdetailwithmail(email);
//        String id=up.getId();
        ArrayList<SearchResponcePO> result=null;
        String names[]=src.split("/");
        try {
            result=ts.getcomments(email,task,names[names.length-1]);
        } catch (IOException e) {
            e.printStackTrace();
        }


        return result;

    }

    @Override
    public ArrayList<String> showLabeled(String email) {


//        userPO up=as.getdetailwithmail(email);
//        String id=up.getId();
        ArrayList<String> list1=ss.getAlreadytask(email);
        ArrayList<String> result=new ArrayList<>();
        for(int i=0;i<list1.size();i++){
            result.add(list1.get(i));
            result.add(ss.getFirstImage(list1.get(i)));
        }
        return result;
    }

    @Override
    public ArrayList<String> showTaskDetail(String email, String taskName) {

        // transform_service ts=new transform();

        // account_service   as=new account();
        userPO up=as.getdetailwithmail(email);
//        String id=up.getId();
        path_service ps=new aimpath();
        String kind=ss.getkind(taskName);
        //ArrayList<String> list=ts.getAlLImage(taskName);
        ArrayList<String> list=ts.getallimage(email,taskName);
        ArrayList<String> result=new ArrayList<>();
        for(int i=0;i<list.size();i++){
            String src=ps.SRCimagepath()+"/"+kind+"/"+taskName+"/"+list.get(i);
            result.add(src);
        }

        return result;
    }

    @Override
    public ArrayList<String> showPicOfIntegretedTask(String taskName) {

        // transform_service ts=new transform();

        // account_service   as=new account();
        
//        String id=up.getId();
        path_service ps=new aimpath();
        String kind=ss.getkind(taskName);
        ArrayList<String> list=ts.getAlLImage(taskName);
        //ArrayList<String> list=ts.getallimage(email,taskName);
        ArrayList<String> result=new ArrayList<>();
        for(int i=0;i<list.size();i++){
            String src=ps.SRCimagepath()+"/"+kind+"/"+taskName+"/"+list.get(i);
            result.add(src);
        }

        return result;
    }

    @Override
    public ArrayList<String> getPicOfTheTask(String email,String taskName){

        // transform_service ts=new transform();

        // account_service   as=new account();
        userPO up=as.getdetailwithmail(email);
//        String id=up.getId();
        String kind=ss.getkind(taskName);
        ArrayList<String> list=ss.getimagesWithoutZero(kind,taskName);
//        System.out.println("list.size() "+ list.size() );

        ArrayList<String> list2=ts.getallimage(email,taskName);
        System.out.println( list2.size() );

        for(int i=0;i<list.size();i++){
            if(list2.contains(list.get(i))){
                list.remove(i);
                i--;
            }
        }
        path_service ps=new aimpath();

        ArrayList<String> result=new ArrayList<>();
        for(int i=0;i<list.size();i++){
            String src=ps.SRCimagepath()+"/"+kind+"/"+taskName+"/"+list.get(i);
            result.add(src);
        }
        return result;

    }

    @Override
    public String changeLabel(String task,String email,String url, ArrayList<pointPO> list, String description) {
        // account_service tem0=new account();
//        userPO up=as.getdetailwithmail(email);
//        String id=up.getId();
//        transform transform=new transform();
        String result;
        String names[]=url.split("/");
        SearchResponcePO tem=new SearchResponcePO(list,description);
        try {
            if(ts.deletecomments(email,task,names[names.length-1])){

                if(  ts.addcommentsWithoutReword(email,task,names[names.length-1],tem)){
                    return "修改标注成功";
                }
                else{
                    return "修改标注失败";
                }
            }
            else{
                return "修改标注失败";
            }

        }catch(Exception ex){
            System.out.print(ex);
            return "修改标注失败";
        }


    }

    @Override
    public String getFirstPic(String task) {

        String result=ss.getFirstImage(task);
//        System.out.println( "!!!!!!!!!!!!"+task );
        path_service ps=new aimpath();
        String src=ps.SRCimagepath();
        String kind=ss.getkind(task);
        String r=src+"/"+kind+"/"+task+"/"+result;



        return r;
    }

    @Override
    public ArrayList<String> getTasksByType(String id, String kind) {

        ArrayList<String> list2=ss.getAllTask(kind,id);
        ArrayList<String> all=ss.getAllTask(kind,id);
//        System.out.println( all.size() );

        for(int i=0;i<all.size();i++){
            if(ts.taskisFinish(all.get(i))){
                all.remove(i);
                i--;
            }
        }
        ArrayList<String> un=getUnfinishedTasks(id);
        ArrayList<String>  fin=getFinishedTasks(id);
//        ArrayList<String> result=ts.gettaskUnFinsh(id);
//        ArrayList<String>  ta=new ArrayList<>();
//        for(subtaskPO i:as.getsub()){
//            if(i.getId().equals(id)){
//                ta.addAll(i.getTask());
//            }
//        }

//        for(int u=0;u<ta.size();u++){
//            if(all.contains(ta.get(u))){
//                all.remove(ta.get(u));
//
//            }
//        }
//
        for(int u=0;u<un.size();u++){
            if(all.contains(un.get(u))){
                all.remove(un.get(u));

            }
        }
        for(int u=0;u<fin.size();u++){
            if(all.contains(fin.get(u))){
                all.remove(fin.get(u));
            }
        }
//        System.out.println( all );

        for(int u=0;u<all.size();u++){
            if(ts.taskisFinish( all.get( u ) )){
                all.remove(all.get( u ));
            }
        }
//        System.out.println( all );
        return all;
    }
//    }
//
//
////        transform_service ts=new transform();
//
////        if(id.contains("@")){
////            userPO up=as.getdetailwithmail(id);
////            id=up.getId();
////        }
//
//        getIrrelatedTasks(  )
//        ArrayList<String> list1=ss.getAlreadytask(id);
//        ArrayList<String> list2=ss.getAllTask(kind,id);
//        for(int i=0;i<list2.size();i++){
//            if(list1.contains(list2.get(i))){
//                list2.remove(i);
//                i--;
//            }
//        }
//
//        for(int i=0;i<list2.size();i++){
//            if(ts.taskisFinish(list2.get(i))){
//                list2.remove(i);
//                i--;
//            }
//        }

//        ArrayList<subtaskPO> tem1=as.getsub();
//        System.out.println(tem1);
//        for(int i=0;i<list2.size();i++){
//            for(int u=0;u<tem1.size();u++){
//                if(tem1.get(u).getId().equals(id)){
//                    if(tem1.get(u).getTask().contains(list2.get(i))){
//                        list2.remove(i);
//                        i--;
//                        break;
//                    }
//                }
//
//
//
//            }
//        }


//        return list2;
//    }

    @Override
    public ArrayList<String> getFinishedTasksByType(String id, String kind) {


//        if(id.contains("@")){
//            userPO up=as.getdetailwithmail(id) ;
//            id=up.getId();
//        }
        // transform_service ts=new transform();
        ArrayList<String> list=ts.gettaskname(id);
        ArrayList<String> result=new ArrayList<>();
        for(int i=0;i<list.size();i++){
            ArrayList<String> images=ts.getallimage(id,list.get(i));
            if(images.size()!=0){
                result.add(list.get(i));
            }
        }
        for(int i=0;i<result.size();i++){
            String k=ss.getkind(result.get(i));
//            kind=kind.toLowerCase();
            if(!k.equals(kind)){
                result.remove(i);
                i--;
            }
        }

        return  result;
    }

    @Override
    public ArrayList<String> getAllTasksByBoss(String email) {


        ArrayList<String> list=ss.getAlltask();
        ArrayList<String> result=new ArrayList<>();
        // transform_service ts=new transform();

        for(int i=0;i<list.size();i++){
            taskPO tp=ts.gettask(list.get(i));
            if(tp.getId().equals(email)){
                result.add(list.get(i));
            }
        }
        return result;
    }

    @Override
    public ArrayList<String> getAllTasksById(String id) {
//        Operation_service op=new Operation();
//        ArrayList<String> list1=getFinishedTasks(id);
//        ArrayList<String> list2=getUnfinishedTasks(id);
//        for(int i=0;i<list1.size();i++){
//            boolean ishas=false;
//            for(int u=0;u<list2.size();u++){
//                if(list1.get(i).equals(list2.get(u))){
//                    ishas=true;
//                    break;
//                }
//            }
//            if(!ishas){
//                list2.add(list1.get(i));
//            }
//        }


        return ts.gettaskname( id );
    }


}