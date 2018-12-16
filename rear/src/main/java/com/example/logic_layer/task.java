//package com.example.logic_layer;
//
//import com.example.PO.userPO;
//import com.example.data.account;
//
//import java.util.ArrayList;
//
//public class task {
//    String SponsorName;
//    String taskType;
//    String taskName;
//   int maxlabelNum;
//   int minaccumulatepoint;
//   ArrayList<String> list;  //图片的src
//    ArrayList num;//图片标注的次数
//   private task(String a,String b,String c,int d,int e,ArrayList<String> f,ArrayList g){
//       SponsorName=a;
//       taskType=b;
//       taskName=c;
//       maxlabelNum=d;
//       minaccumulatepoint=e;
//       list=f;
//       num=g;
//   }
//   public ArrayList<String> searchworkersTask(String workerName){
//       return null;
//   }
//   public String createTask(String a,String b,String c,int d,int e,ArrayList<String> f){
//
//       //将新建的任务保存
//       //将任务推荐给合适的工人
//      account tem=new account();
//      ArrayList<userPO> list=tem.getuser();
//      for(int i=0;i<10;i++){
//         int num=list.size();
//         int t=(int)Math.random()*num;
//         while(list.get(t).getKind()!="boss"){
//             task.getTask(list.get(i).getId(),c);
//             t=(int)Math.random()*num;
//         }
//      }
//       return null;
//
//   }
//   public static String getTask(String id,String taskName){
//       return null;
//   }
//   public task SearchTaskByName(task name){
//       return null;
//   }
//   public ArrayList<String> getTasksByType(String type){
//       return null;//返回此类型下的taskname
//   }
//   public void changenum(String src ,int i){
//
//   }
//   public ArrayList<String> getsrcs(){return list;}
//   public ArrayList getNum(){return num;}
//   public String getSponsorName(){
//       return SponsorName;
//   }
//   public String getTaskType(){
//       return taskType;
//    }
//    public String getTaskName(){
//       return taskName;
//    }
//    public int getMaxlabelNum(){
//       return maxlabelNum;
//    }
//    public int getMinaccumulatepoint(){
//       return minaccumulatepoint;
//    }
//}
