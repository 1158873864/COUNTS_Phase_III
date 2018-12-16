package com.example.logic_layer.settlement;

import com.example.PO.SearchResponcePO;
import com.example.PO.commentPO;
import com.example.PO.pointPO;
import com.example.PO.taskPO;
import com.example.data.*;
import com.example.logic_layer.CompressedFileUtil;
import com.example.logic_layer.algorithm.algorithm;
import com.example.logic_layer.algorithm.algorithm_service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;

public class Settlement implements Settlement_service {
    private static String getDiskMax(Map<String, Double> map) {
        List<Double> list = new ArrayList<Double>();
        for (String temp : map.keySet()) {
            double value = map.get(temp);
            list.add(value);
        }
        double max = 0;
        for (int i = 0; i < list.size(); i++) {
            double size = list.get(i);
            max = (max>size)?max:size;
        }
        for (String key : map.keySet()) {
            if (max == map.get(key)) {
                return key;
            }
        }
        return null;
    }
    @Override
    public  ArrayList<Double> TakeFinishedDegree(String taskName) {
        transform_service ts=new transform();
        ArrayList<Integer> list=ts.get_comment_time(taskName);
        int maxLabelNum=ts.gettask(taskName).getTimes();

        ArrayList<Double> result=new ArrayList<>();
        for(int i=0;i<list.size();i++){
           double tem=list.get(i)/maxLabelNum;
           result.add(tem);
        }
        return result;
    }

    @Override
    public void CountResultOfOneTask(String taskName) {
        transform_service ts=new transform();
        account_service as2=new account();
        ArrayList<ArrayList<commentPO>> tem=ts.get_result_of_task(taskName);
        String image="";
        ArrayList<commentPO> result=new ArrayList<commentPO>();
        algorithm_service as=new algorithm();
        for(int i=0;i<tem.size();i++){
            ArrayList<commentPO> cp1=tem.get(i);
            image = cp1.get(0).getImage();


          //  ArrayList<SearchResponcePO> tem2=cp1.getSRPO();
            ArrayList<pointPO> tem3=cp1.get(0).getSRPO().get(0).getList();
            String description=cp1.get(0).getSRPO().get(0).getDescription();
            int num=description.split(",").length;
            String finaldes="";
            for(int u=1;u<cp1.size();u++){
               /* String temdes[]=tem2.get(u).getDescription().split(",");*/

                tem3=as.firstfitting(tem3,cp1.get(u).getSRPO().get(0).getList(),u);

            }
            for(int u=0;u<num;u++){
                HashMap<String,Double> map=new HashMap<>();
                for(int t=0;t<cp1.size();t++){
                    String tem4=cp1.get(t).getSRPO().get(0).getDescription().split(",")[u];
                    if(map.containsKey(tem4)){
                        map.put(tem4,map.get(tem4)+as2.getaccuracy(cp1.get(t).getMail()));
                    }else{
                        map.put(tem4,as2.getaccuracy(cp1.get(t).getMail()));
                    }
                }
                String temresult=getDiskMax(map);
                finaldes=finaldes+temresult+",";
                /*查找map中value最大的key将其加入到finaldes中*/
            }
            commentPO cp2=new commentPO();
            cp2.setImage(image);
            finaldes=finaldes.substring(0,finaldes.length()-1);//去除末尾的,
            SearchResponcePO tttem=new SearchResponcePO(tem3,finaldes);
            ArrayList<SearchResponcePO>  ttem=new ArrayList<SearchResponcePO>();
            ttem.add(tttem);
            cp2.setSRPO(ttem);

            result.add(cp2);
        }
          ts.save_result_of_task(result,taskName);

    }

    @Override
    public void settleForWorkers(String taskName) {
        transform_service ts=new transform();
        algorithm_service as=new algorithm();
        ArrayList<ArrayList<commentPO>> tem=ts.get_result_of_task(taskName);
       ArrayList<commentPO> trueAnswer=ts.get_final_of_task(taskName);//获得整合结果
        File file=new File(taskName+".txt");

        try{
            file.createNewFile();
        }catch(Exception ex){
            System.out.println(ex);
        }
        FileWriter fileWriter;
        try {
            path_service pa=new aimpath();
            File file1=new File(pa.getbasicpath()+"/data_results"+"/"+taskName);
            file1.mkdir();
            fileWriter = new FileWriter(pa.getbasicpath()+"/data_results"+"/"+taskName+"/"+taskName+".txt");
            CompressedFileUtil.fileToZip(pa.getbasicpath()+"/data_results"+"/"+taskName,pa.getbasicpath()+"/data_results",taskName);
            BufferedWriter bufferedWriter=new BufferedWriter(fileWriter);
            for(int i=0;i<trueAnswer.size();i++){
                commentPO cp=trueAnswer.get(i);
                bufferedWriter.write(cp.getImage()+":");
                bufferedWriter.newLine();
                ArrayList<pointPO> list=cp.getSRPO().get(0).getList();
                for(int u=0;u<list.size();u++){
                    bufferedWriter.write("("+list.get(u).x+","+list.get(u).y+")"+" ");
                }
                bufferedWriter.newLine();
                bufferedWriter.write(cp.getSRPO().get(0).getDescription());
                bufferedWriter.newLine();

            }

            bufferedWriter.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }





        for(int i=0;i<tem.size();i++){
            ArrayList<commentPO> tem2=tem.get(i);
            for(int u=0;u<tem2.size();u++){
                commentPO cp1=tem2.get(u);
                String email=cp1.getMail();
                String image=cp1.getImage();
                ArrayList<pointPO> list0=cp1.getSRPO().get(0).getList();
                String description1=cp1.getSRPO().get(0).getDescription();
                boolean istrue=true;
                for(int t=0;t<trueAnswer.size();t++){
                    if(trueAnswer.get(t).getImage().equals(image)){
                        String temresult1=as.isDianEquals(trueAnswer.get(t).getSRPO().get(0).getList(),list0);
                        String temresult2=as.isdescriptionEquals(trueAnswer.get(t).getSRPO().get(0).getDescription(),description1);
                        if((temresult1.equals("0")||(temresult2.equals("0")))){
                            istrue=false;
                            break;
                        }
                    }
                }
                if(istrue){
                    account_service as2=new account();
                    double accuracy=as2.getaccuracy(email);
                    int num=ts.User_image(email);
                    as2.update_accuracy(email,(accuracy*num+1)/(num+1));
                    int points=as2.getpoint(email);
                    taskPO tp2=ts.gettask(taskName);
                    as2.add_point(email,"finish one picture in"+taskName,tp2.getReword());//update_point(email,points+tp2.getReword());
                    int points2=as2.getpoint(tp2.getId());
                   as2.add_point(tp2.getId(),"worker "+email+"finish one picture in  "+taskName,-tp2.getReword());//update_point(tp2.getId(),points2-tp2.getReword());
                    //增加工人准确率
                    //加钱
                }else{
                    //降低工人准确率
                    account_service as2=new account();
                    double accuracy=as2.getaccuracy(email);
                    int num=ts.User_image(email);
                    as2.update_accuracy(email,(accuracy*num-1)/(num+1));
                }



            }




        }
    }
}
