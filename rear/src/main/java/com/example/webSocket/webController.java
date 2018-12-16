package com.example.webSocket;

import com.example.Function.Normal_distribution;
import com.example.LoginAndRegister.LogIn;
import com.example.LoginAndRegister.register;
import com.example.PO.*;
import com.example.data.*;
import com.example.excitation.excitation;
import com.example.excitation.excitation_service;
import com.example.inextricable_cipher_xjh.AsciiAndInt;
import com.example.inextricable_cipher_xjh.Decrypt;
import com.example.inextricable_cipher_xjh.encryption;
import com.example.logic_layer.*;

import com.example.logic_layer.Operation.Operation_service;
import com.example.logic_layer.algorithm.algorithm;
import com.example.logic_layer.algorithm.algorithm_service;
import com.example.logic_layer.recommend.Recommend;
import com.example.logic_layer.recommend.Recommend_service;
import com.example.logic_layer.settlement.Settlement;
import com.example.logic_layer.settlement.Settlement_service;
import com.example.logic_layer.statistics.statistics;
import com.example.logic_layer.statistics.statistics_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class webController {
    @Autowired
    private register re;
    logic_Factory lf=new logic_Factory();
    search_service ss=new search();
    transform_service ts=new transform();
    account_service as= new account();
    Operation_service os=lf.getOperation();//new Operation();
    statistics_service staS=lf.getStatistics();//new statistics();
    private static String path="";
    @RequestMapping(method = RequestMethod.GET, path = "/updateInformation", produces = "application/json")
    @ResponseBody
    public String updateInformation(@RequestParam("mailAddress") String mailAddress,@RequestParam("username") String userName,@RequestParam("password")  String password,@RequestParam("phoneNumber")String phoneNumber,@RequestParam("type")String type){
        account tem=new account();
        userPO up=tem.getdetailwithmail(mailAddress);
        up.setPassword(password);
        up.setPhone(phoneNumber);
        up.setId(userName);
        boolean is=tem.edituser(mailAddress,up);
        if(is){
            return "1";
        }
        else{
            return "更新失败";
        }
    }

    @RequestMapping(method = RequestMethod.GET, path = "/register", produces = "application/json")
    @ResponseBody
    public  String Register(@RequestParam("username")String username,@RequestParam("password")String password,@RequestParam("type")String type,@RequestParam("phoneNumber")String phoneNumber,@RequestParam("mailAddress")String mailAddress){

        return re.register(username,password,type,phoneNumber,mailAddress);

    }

    @RequestMapping(method = RequestMethod.GET, path = "/validate", produces = "application/json")
    @ResponseBody
    public String validate(@RequestParam("mailAddress")String mailAddress ,@RequestParam("key")String key){

        return re.validate(mailAddress,key);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/login", produces = "application/json")
    @ResponseBody
    public String login(@RequestParam("id")ArrayList<Integer> idlist ,@RequestParam("password")ArrayList<Integer> passwordlist){
        // transform_service ts=new transform();
        String id="";
        String password="";
        for(int i=0;i<idlist.size();i++){
            char tem0= AsciiAndInt.IntToAsc(Decrypt.decrypt((int)idlist.get(i)));
            id=id+tem0;
        }
        for(int i=0;i<passwordlist.size();i++){
            char tem0=AsciiAndInt.IntToAsc(Decrypt.decrypt((int)passwordlist.get(i)));
            password=password+tem0;
        }
        System.out.println(id);
        int days=ts.Continuous_landing_time(id);
        excitation_service es=new excitation();
        es.reward_Continuous_login(id,days);
        es.reward_working_time(id);
        LogIn log=new LogIn();
        if(id.contains("@")){

            return log.loginByMail(id,password);
        }
        else{
            return log.loginByUserName(id,password);
        }
    }

//    @RequestMapping(method = RequestMethod.GET, path = "/logout", produces = "application/json")
//    @ResponseBody
//    public void logout(@RequestParam("id")String id ,@RequestParam("password")String password){
//        LogIn log=new LogIn();
//        // transform_service ts=new transform();
//        if(id.contains("@")){
//            ts.new_time(id,"out");
//        }
//        else{
//            // account_service as=new account();
//            userPO up=as.getuserdetailwithid(id);
//            ts.user_time(up.getEmail(),"out");
//        }
//    }




    @RequestMapping(method = RequestMethod.GET, path = "/getVertificationCode", produces = "application/json")
    @ResponseBody
    public void getVertificationCode(@RequestParam("mailAddress") String mailAddress){

        re.getVertificationCode(mailAddress);
    }


    @RequestMapping(method = RequestMethod.GET, path = "/isMailExits", produces = "application/json")
    @ResponseBody
    public String isMailExits(@RequestParam("mailAddress")String mailAddress){

        return re.isMailExits(mailAddress);
    }


    @RequestMapping(method = RequestMethod.GET, path = "/isUserNameExits", produces = "application/json")
    @ResponseBody
    public String isUserNameExits(@RequestParam("userName") String userName){

        return re.isUserNameExits(userName);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getNews", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getNewsByUserName(@RequestParam("clue")  String clue){
        LogIn log=new LogIn();
        if(!clue.contains("@")){
            clue=log.getNewsByUserName(clue).getEmail();
        }
        System.out.println( "clue "+clue);
        userPO p=log.getNewsByMail(clue);
        ArrayList<String> result=new ArrayList<>();
        result.add(p.getId());
        result.add(p.getEmail());
        result.add(p.getPhone());
        result.add(p.getKind());
        result.add(p.getPassword());
        result.add(String.valueOf(as.getpoint(clue)));
        return  result;
//        }
//        else{
//            userPO p=log.getNewsByUserName(clue);
//            ArrayList<String> result=new ArrayList<>();
//            result.add(p.getId());
//            result.add(p.getEmail());
//            result.add(p.getPhone());
//            result.add(p.getKind());
//            result.add(p.getPassword());
//            result.add(String.valueOf(p.getAccumulatepoint()));
//            return  result;
//        }
    }



    @RequestMapping(method = RequestMethod.GET, path = "/getAlltasks", produces = "application/json")
    @ResponseBody
    public  ArrayList<String> getAlltasks(){

        return os.getAlltasks();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getTypeTask", produces = "application/json")
    @ResponseBody
    public  ArrayList<String> getAlltasks(@RequestParam("Type") String type){


        return os.getAlltasks(type);

    }




    @RequestMapping(method = RequestMethod.GET, path = "/changeLabel", produces = "application/json")
    @ResponseBody
    public String changeLabel(@RequestParam("workerEmail") String workerEmail,@RequestParam("url") String url,@RequestParam("list1") double list1[],@RequestParam("list2") double list2[],@RequestParam("description") String description){
        System.out.println(workerEmail);
        System.out.println(url);
        String result="更改失败";
        String[] tems=url.split("/");

        ArrayList<pointPO> list=new ArrayList<>();
        for(int i=0;i<list1.length;i++){
            pointPO pp=new pointPO(list1[i],list2[i]);
            list.add(pp);
        }
        result=os.changeLabel(tems[tems.length-2],workerEmail,url,list,description);
        return result;
    }



    @RequestMapping(method = RequestMethod.GET, path = "/saveLabel", produces = "application/json")
    @ResponseBody
    public String saveLabel(@RequestParam("workerEmail") String workerEmail,@RequestParam("url") String url,@RequestParam("list1") double[] list1,@RequestParam("list2") double[] list2,@RequestParam("description") String description) {
        // System.out.println(workerEmail);
        // System.out.println(url);
        String result="更改失败";

        ArrayList<pointPO> list=new ArrayList<>();
        String[] tems=url.split("/");
        for(int i=0;i<list1.length;i++){
            pointPO pp=new pointPO(list1[i],list2[i]);
            list.add(pp);
        }
        result=os.SaveLabel(tems[tems.length-2],workerEmail,url,list,description);
        return result;

    }

    //返回此任务中此工人未标注过且为达到上限的图片
    @RequestMapping(method = RequestMethod.GET, path = "/getPicOfTheTask", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getPicOfTheTask(@RequestParam("taskName") String taskName,@RequestParam("email") String email){

        ArrayList<String> result=os.getPicOfTheTask(email,taskName);


        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/showLabeled", produces = "application/json")
    @ResponseBody
    public ArrayList<String> showLabeled(@RequestParam("taskName") String taskName,@RequestParam("email") String email){

        ArrayList<String> result=os.showLabeled(email);
        return result;
    }


    @RequestMapping(method = RequestMethod.GET, path = "/showTaskDetail", produces = "application/json")
    @ResponseBody
    public ArrayList<String> showTaskDetail( @RequestParam("taskName") String taskName,@RequestParam("email") String email){

        ArrayList<String> result=os.showTaskDetail(email,taskName);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/showPicOfIntegretedTask", produces = "application/json")
    @ResponseBody
    public ArrayList<String> showPicOfIntegretedTask( @RequestParam("taskName") String taskName,@RequestParam("email") String email){

        ArrayList<String> result=os.showPicOfIntegretedTask(taskName);
        return result;
    }




    @RequestMapping(method = RequestMethod.GET, path = "/showPicDetail", produces = "application/json")
    @ResponseBody
    public ArrayList<String> showPicDetail(@RequestParam("workerEmail") String workerEmail,@RequestParam("imageUrl") String imageUrl){
        String[] tems=imageUrl.split("/");

        ArrayList<SearchResponcePO> list0=os.showPicDetail(tems[tems.length-2],workerEmail,imageUrl);
        ArrayList<String> result=new ArrayList<>();
        for(int i=0;i<list0.size();i++){
            ArrayList<pointPO> plist=list0.get(i).getList();
            for(int t=0;t<plist.size();t++){
                result.add(plist.get(t).x+"");
                result.add(plist.get(t).y+"");
            }
            result.add("#");
            result.add(list0.get(i).getDescription());


        }
        return result;// (1,2) (1,1) (2,2) lalala   ->result=1 2 1 1 2 2 # lalala

    }


    @RequestMapping(method = RequestMethod.GET, path = "/getPicturesOfTask", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getPicturesOfTask(@RequestParam("TaskName") String taskName){

        ArrayList<String> list=os.getpictures(taskName);
        return list;

    }

    @RequestMapping(method = RequestMethod.GET,path="/createTask" ,produces="text/html;charset=utf-8" )
    @ResponseBody
    public  String createTask(@RequestParam("biaozhutype") String biaozhutype,@RequestParam("days") int days,@RequestParam("attributes") ArrayList<String> shuxing,@RequestParam("choices") ArrayList<String> xuanxiang,@RequestParam("SponsorName") String SponsorName,@RequestParam("taskType") String taskType,@RequestParam("taskName") String taskName,@RequestParam("maxlabelNum") int maxlabelNum,@RequestParam("reward") int reward,@RequestParam("minaccumulatepoint") int minaccumulatepoint,@RequestParam("is") int is) throws Exception {
        ArrayList<String> truexuanxiang=new ArrayList<String>();
        String temp="";
        if(is==1){
            for(int i=0;i<xuanxiang.size();i++){
                if(i!=(xuanxiang.size()-1)) {
                    temp = temp + xuanxiang.get(i) + ",";
                }
                else{
                    temp = temp + xuanxiang.get(i);
                }
            }
            truexuanxiang.add(temp);
        }
        else{
            for(int i=0;i<xuanxiang.size();i++){
                truexuanxiang.add(xuanxiang.get(i));
            }
        }

        // transform_service ts=new transform();

        int length1=shuxing.size();
        String[] tag=new String[length1];
        for(int i=0;i<length1;i++){
            tag[i]=shuxing.get(i);
        }
        int length2=truexuanxiang.size();
        String[] tagelements=new String[length2];
        for(int i=0;i<length2;i++){
            tagelements[i]=truexuanxiang.get(i);
        }

        taskPO tp=new taskPO(SponsorName,path,taskType,taskName,maxlabelNum,reward,minaccumulatepoint,biaozhutype,tag,tagelements);
        tp.setTimelength(days);
        ts.addtask(tp);
        return "上传成功";
    }

    @RequestMapping(method = RequestMethod.GET, path = "/bossgetTestSet", produces = "application/json")
    @ResponseBody
    public ArrayList<String> bossgetTestSet(@RequestParam("taskName") String taskName){
        //获得此task里面的随机5张图片
        // transform_service ts=new transform();
       // taskPO tp=ts.gettask(taskName);
//        search_service  ss=new search();
        String kind=ss.getkind(taskName);
        path_service ps=new aimpath();
        ArrayList<String> list=ts.workergettest(taskName);
        int n=list.size();
        ArrayList<String> result=new ArrayList<String>();
        if(n>5){
            result.add(ps.SRCimagepath()+"/"+kind+"/"+taskName+"/"+list.get(0));
            result.add(ps.SRCimagepath()+"/"+kind+"/"+taskName+"/"+list.get(1));
            result.add(ps.SRCimagepath()+"/"+kind+"/"+taskName+"/"+list.get(2));
            result.add(ps.SRCimagepath()+"/"+kind+"/"+taskName+"/"+list.get(3));
            result.add(ps.SRCimagepath()+"/"+kind+"/"+taskName+"/"+list.get(4));
            System.out.println(result);
            return result;
        }else{
            for(int i=0;i<n;i++){
                result.add(ps.SRCimagepath()+"/"+kind+"/"+taskName+"/"+list.get(i));

            }
            System.out.println(result);
            System.out.println(ts.gettask(taskName).gettagelements().length);
            return result;
        }

    }

    @RequestMapping(method = RequestMethod.GET, path = "/getTags", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getTags(@RequestParam("taskName") String taskName){

        // transform_service ts=new transform();
        taskPO tp=ts.gettask(taskName);
        String[] tag=tp.getTag();
        ArrayList<String> result=new ArrayList<>();
        for(int i=0;i<tag.length;i++){
            result.add(tag[i]);
        }
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/gettagelements", produces = "application/json")
    @ResponseBody
    public ArrayList<String> gettagelements(@RequestParam("taskName") String taskName){

        // transform_service ts=new transform();
        taskPO tp=ts.gettask(taskName);
        String[] tagelements=tp.getTagelements();
        ArrayList<String> result=new ArrayList<>();
        for(int i=0;i<tagelements.length;i++){
            result.add(tagelements[i]);
        }
        System.out.println(result);
        System.out.println(result.size());
        return result;
    }


    @RequestMapping(method = RequestMethod.GET, path = "/bosssaveTestSet", produces = "application/json")
    @ResponseBody
    public void bosssaveTestSet(@RequestParam("url") String url,@RequestParam("taskName") String taskName,@RequestParam("list1") ArrayList<String> list1,@RequestParam("list2") ArrayList<String> list2,@RequestParam("description") String descrition){

        //获得1张测试图片的问题答案
        //调用数据库方法保存

        ArrayList<pointPO> l=new ArrayList<>();
        // search_service ss=new search();
        String kind=ss.getkind(taskName);
        for(int i=0;i<list1.size();i++){
            pointPO pp=new pointPO(Double.parseDouble(list1.get(i)),Double.parseDouble(list2.get(i)));
            l.add(pp);
        }
        path_service ps=new aimpath();
        String src=ps.SRCimagepath()+"/"+kind+"/"+taskName+"/"+url;
        os.SaveLabel(taskName,"test",src,l,descrition);

    }


    @RequestMapping(method = RequestMethod.POST,path="/upload" ,produces="text/html;charset=utf-8" )
    @ResponseBody
    public  String upload(@RequestParam("uploadfile") MultipartFile myfile){
        Map<String,Object> map= new HashMap<String,Object>();
        if(myfile.isEmpty()){
            map.put( "result", "error");
            map.put( "msg", "上传文件不能为空" );
        } else {

            // 获取文件名
            String fileName = myfile.getOriginalFilename();
            // 获取文件后缀

            // 用uuid作为文件名，防止生成的临时文件重复
            // MultipartFile to File
            //你的业务逻辑
            int bytesum = 0;
            int byteread = 0;
            InputStream inStream = null;    //读入原文件
            try {
                inStream = myfile.getInputStream();
                path_service tem=new aimpath();
                FileOutputStream fs = new FileOutputStream(tem.getzippath()+"/"+fileName);
                path=tem.getzippath()+"/"+fileName;
                byte[] buffer = new byte[200000000];
                while ( (byteread = inStream.read(buffer)) != -1) {
                    bytesum += byteread;            //字节数 文件大小
                    fs.write(buffer, 0, byteread);
                }
                inStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }


        }

        return path;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/isPhoneNumberExits", produces = "application/json")
    @ResponseBody
    public String isPhoneNumberExits(@RequestParam("SponsorName") String phonenumber){

        String result=os.isPhoneNumberExits(phonenumber);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getFirstNWorker", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getFirstNWorker(@RequestParam("num") int n){

        ArrayList<String> result=os.getFirstNWorker(n);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getTheNum", produces = "application/json")
    @ResponseBody
    public int getTheNum(@RequestParam("id") String id){
        statistics_service ss=new statistics();
        int result=ss.getTheNum(id);
        return result;
    }


    @RequestMapping(method = RequestMethod.GET, path = "/getNumOfWorkers", produces = "application/json")
    @ResponseBody
    public int getNumOfWorkers() {
        // statistics_service ss=new statistics();
        int result=staS.getNumOfWorkers();
        return result;
    }


    @RequestMapping(method = RequestMethod.GET, path = "/getNumOfTheTasks", produces = "application/json")
    @ResponseBody
    public int getNumOfTheTasks(@RequestParam("id") String id)  {
        // statistics_service os=new statistics();
        int result=staS.getNumOfTheTasks(id);
        return result;
    }


    @RequestMapping(method = RequestMethod.GET, path = "/getNumOfTheFinishedTasks", produces = "application/json")
    @ResponseBody
    public int getNumOfTheFinishedTasks(@RequestParam("id") String id) {
        // statistics_service os=new statistics();
        int result=staS.getNumOfTheFinishedTasks(id);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getInvolvedWorkers", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getInvolvedWorkers(@RequestParam("taskName") String taskName)  {


        ArrayList<String> result=os.getInvolvedWorkers(taskName);
        return result;
    }


    @RequestMapping(method = RequestMethod.GET, path = "/getTheNumOfPicsInTheTask", produces = "application/json")
    @ResponseBody
    public int getTheNumOfPicsInTheTask(@RequestParam("taskName") String taskName)  {

        // statistics_service os=new statistics();
        int result=staS.getTheNumOfPicsInTheTask(taskName);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getTheNumOfFinishedPicsInTheTask", produces = "application/json")
    @ResponseBody
    public int getTheNumOfFinishedPicsInTheTask(@RequestParam("taskName") String taskName)  {
        // statistics_service os=new statistics();
        int result=staS.getTheNumOfFinishedPicsInTheTask(taskName);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getNumOfBosses", produces = "application/json")
    @ResponseBody
    public int getNumOfBosses()  {
        // statistics_service os=new statistics();
        int result=staS.getNumOfBosses();

        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getNumOftasks", produces = "application/json")
    @ResponseBody
    public int getNumOftasks()  {
        // statistics_service os=new statistics();
        int result=staS.getNumOftasks();

        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getNumOfFinishedtasks", produces = "application/json")
    @ResponseBody
    public int getNumOfFinishedtasks()  {


        // statistics_service os=new statistics();
        int result=staS.getNumOfFinishedtasks();

        return result;
    }


    @RequestMapping(method = RequestMethod.GET, path = "/getNumOfGoingtasks", produces = "application/json")
    @ResponseBody
    public int getNumOfGoingtasks()  {


        // statistics_service os=new statistics();
        int result=staS.getNumOfGoingtasks();
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getbiaozhutype", produces = "application/json")
    @ResponseBody
    public String getbiaozhutype(@RequestParam("task")String task)  {

        // transform_service ts=new transform();
        taskPO tp=ts.gettask(task);
        return tp.getBiaozhutype();

    }
    @RequestMapping(method = RequestMethod.GET, path = "/gettag", produces = "application/json")
    @ResponseBody
    public String[] gettag(@RequestParam("task")String task)  {

        // transform_service ts=new transform();
        taskPO tp=ts.gettask(task);
        return tp.gettag();

    }

    @RequestMapping(method = RequestMethod.GET, path = "/gettagelement", produces = "application/json")
    @ResponseBody
    public String[] gettagelement(@RequestParam("task")String task)  {

        // transform_service ts=new transform();
        taskPO tp=ts.gettask(task);
        return tp.gettagelements();

    }






    @RequestMapping(method = RequestMethod.GET, path = "/getHintTasks", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getHintTasks(@RequestParam("hint")String hint, @RequestParam("id")String id){



        ArrayList<String>  result=os.getHintTasks(hint,id);

        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getHintMyGoingTasks", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getHintMyGoingTasks(@RequestParam("hint")String hint, @RequestParam("id")String id){


        ArrayList<String>  result=os.getHintMyGoingTasks(hint,id);

        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getHintMyFinishedTasks", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getHintMyFinishedTasks(@RequestParam("hint")String hint, @RequestParam("id")String id){


        ArrayList<String>  result=os.getHintMyFinishedTasks(hint,id);

        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/deleteTask", produces = "application/json")
    @ResponseBody
    public String deleteTask(@RequestParam("taskName")String taskName,@RequestParam("id") String id){

        String  result=os.deleteTask(taskName, id);

        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getUnfinishedTasks", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getUnfinishedTasks( @RequestParam("id")String id){

        ArrayList<String>  result=os.getUnfinishedTasks(id);

        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getFinishedTasks", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getFinishedTasks( @RequestParam("id")String id){


        ArrayList<String>  result=os.getFinishedTasks(id);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getIrrelatedTasks", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getIrrelatedTasks( @RequestParam("id")String id){


        ArrayList<String>  result=os.getIrrelatedTasks(id);

        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getFirstPic", produces = "application/json")
    @ResponseBody
    public String getFirstPic( @RequestParam("taskName")String taskName){


        String  result=os.getFirstPic(taskName);

        return result;
    }


    @RequestMapping(method = RequestMethod.GET, path = "/workerGetTestSet", produces = "application/json")
    @ResponseBody
    public ArrayList<String> workerGetTestSet( @RequestParam("taskName")String taskName){
        //工人获取任务前先获取测试集中的图片
        // transform_service ts=new transform();
        ArrayList<String> list=ts.workergettest(taskName);
        // search_service ss=new search();
        // account_service   as=new account();
        path_service ps=new aimpath();
        String kind=ss.getkind(taskName);
        ArrayList<String> result=new ArrayList<>();
        for(int i=0;i<list.size();i++){
            result.add(ps.SRCimagepath()+"/"+kind+"/"+taskName+"/"+list.get(i));
        }
        return result;
    }
    @RequestMapping(method = RequestMethod.GET, path = "/workerGetTestAnswers", produces = "application/json")
    @ResponseBody
    public ArrayList<String> workerGetTestAnswers( @RequestParam("taskName")String taskName, @RequestParam("image")String image){//image就为图片名
        //获取任务测试集中某张图片的答案
        // transform_service ts=new transform();
        ArrayList<String> result=new ArrayList<>();
        try {
            ArrayList<SearchResponcePO> list=ts.getcomments("test",taskName,image);
            ArrayList<pointPO> list0=list.get(0).getList();
            String description=list.get(0).getDescription();
            for(int i=0;i<list0.size();i++){
                result.add(list0.get(i).x+"");
                result.add(list0.get(i).y+"");
            }
            result.add(",");
            result.add(description);


        } catch (IOException e) {
            e.printStackTrace();
        }
        //注意调用结果的格式,在点集和描述之间用逗号分割！！！！例：点集为（0，1）（2，3）（4，5）描述为“啦啦啦”，则result为["0","1","2","3","4","5",","啦啦啦"]
        return result;
    }




    @RequestMapping(method = RequestMethod.GET, path = "/workerTestReport", produces = "application/json")
    @ResponseBody
    public String workerTestReport( @RequestParam("taskName")String taskName, @RequestParam("image")String image, @RequestParam("list1") ArrayList<String> list1,@RequestParam("list2") ArrayList<String> list2,@RequestParam("description") String descrition){
        //判断工人完成的某一张图片和标准答案是否接近   是返回1 否返回0
        // transform_service ts=new transform();
        String[] imagelist=image.split("/");
        image=imagelist[imagelist.length-1];
        ArrayList<SearchResponcePO> list= null;
        try {
            System.out.println(taskName);
            System.out.println(image);

            list = ts.getcomments("test",taskName,image);
            System.out.println(list);
        } catch (IOException e) {
            e.printStackTrace();
        }
        ArrayList<pointPO> list0=list.get(0).getList();
        ArrayList<pointPO> list3=new ArrayList<>();
        for(int i=0;i<list1.size();i++){
            pointPO tem=new pointPO(Double.parseDouble(list1.get(i)),Double.parseDouble(list2.get(i)));
            list3.add(tem);
        }
        String description1=list.get(0).getDescription();
        algorithm_service as=new algorithm();
        String first=as.isdescriptionEquals(description1,descrition);
        System.out.println(first);
        if(first.equals("0")){return "0";}else{
            String second=as.isDianEquals(list0,list3);
            System.out.println(second);
            if(second.equals("0")){return "0";}
        }
        return "1";
    }


    @RequestMapping(method = RequestMethod.GET, path = "/askForTask", produces = "application/json")
    @ResponseBody
    public String askForTask( @RequestParam("taskName")String taskName, @RequestParam("id")String id){

        String  result=os.askForTask(id,taskName);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getTasksByType", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getTasksByType( @RequestParam("kind")String kind, @RequestParam("id")String id){


        ArrayList<String>  result=os.getTasksByType(id,kind);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getFinishedTasksByType", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getFinishedTasksByType( @RequestParam("kind")String kind, @RequestParam("id")String id){

        ArrayList<String>  result=os.getFinishedTasksByType(id,kind);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getAllTasksByBoss", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getAllTasksByBoss(  @RequestParam("id")String id){

        ArrayList<String>  result=os.getAllTasksByBoss(id);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getAllTasksById", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getAllTasksById(@RequestParam("id") String id){


        ArrayList<String>  result=os.getAllTasksById(id);
        return result;
    }


    @RequestMapping(method = RequestMethod.GET, path = "/AllLoginDays", produces = "application/json")
    @ResponseBody
    public int AllLoginDays(@RequestParam("email") String email){
        //用户总登录天数
        // transform_service ts=new transform();
        int days=ts.search_online_date(email);
        return days;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/AllRegisterDays", produces = "application/json")
    @ResponseBody
    public int AllRegisterDays(@RequestParam("email") String email){
        //用户总注册天数
        // account_service as=new account();
        int days=as.get_submission_length(email);
        return days;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getAccuracyOfOneWorker", produces = "application/json")
    @ResponseBody
    public double getAccuracyOfOneWorker(@RequestParam("email") String email){
        //用户准确率
        // account_service as=new account();
        double accuracy=as.getaccuracy(email);
        return accuracy;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getEfficencyOfOneWorker", produces = "application/json")
    @ResponseBody
    public double getEfficencyOfOneWorker(@RequestParam("email") String email){
        //用户效率
        // account_service as=new account();
        double efficency=as.getefficiency(email);
        return efficency;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getHighestEfficencyWorker", produces = "application/json")
    @ResponseBody
    public double getHighestEfficencyWorker(){
        //效率最高的用户
        // account_service as=new account();
        double efficency=as.Maxefficiency();
        return efficency;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getAverageLoginDays", produces = "application/json")
    @ResponseBody
    public double getAverageLoginDays(){
        //平均登录天数
        // account_service as=new account();
        ArrayList<userPO> list=as.getuser();
        for(int i=0;i<list.size();i++){
            if(list.get(i).getKind().equals("boss")){
                list.remove(i);
                i--;
            }
        }

        // transform_service ts=new transform();
        int num=list.size();
        int sum=0;
        for(int i=0;i<num;i++){
            int days=ts.search_online_date(list.get(i).getEmail());
            sum+=days;
        }
        double result=(double)sum*1.0/sum;


        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getAverageRegisterDays", produces = "application/json")
    @ResponseBody
    public double getAverageRegisterDays(){
        //平均注册天数
        // account_service as=new account();
        ArrayList<userPO> list=as.getuser();
        for(int i=0;i<list.size();i++){
            if(list.get(i).getKind().equals("boss")){
                list.remove(i);
                i--;
            }
        }



        int num=list.size();
        int sum=0;
        for(int i=0;i<num;i++){
            int days=as.get_submission_length(list.get(i).getEmail());
            sum+=days;
        }
        double result=(double)sum*1.0/sum;


        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getAverageAccuracy", produces = "application/json")
    @ResponseBody
    public double getAverageAccuracy(){
        //平均准确率
        // account_service as=new account();
        ArrayList<userPO> list=as.getuser();
        for(int i=0;i<list.size();i++){
            if(list.get(i).getKind().equals("boss")){
                list.remove(i);
                i--;
            }
        }


        double result=0;
        int num=list.size();
        int sum=0;
        for(int i=0;i<num;i++){
            double acc=as.getaccuracy(list.get(i).getEmail());
            sum+=acc;
        }
        if(sum!=0) {
            result = sum * 1.0 / sum;
        }



        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getAverageEfficency", produces = "application/json")
    @ResponseBody
    public double getAverageEfficency(){
        //平均效率
        // account_service as=new account();
        ArrayList<userPO> list=as.getuser();
        for(int i=0;i<list.size();i++){
            if(list.get(i).getKind().equals("boss")){
                list.remove(i);
                i--;
            }
        }

        int num=list.size();
        int sum=0;
        for(int i=0;i<num;i++){
            double eff=as.getefficiency(list.get(i).getEmail());
            sum+=eff;
        }
        double result=sum*1.0/sum;


        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getAverageCategories", produces = "application/json")
    @ResponseBody
    public double getAverageCategories(){
        //平均种类数
        // account_service as=new account();
        // transform_service ts=new transform();
        ArrayList<userPO> list=as.getuser();
        for(int i=0;i<list.size();i++){
            if(list.get(i).getKind().equals("boss")){
                list.remove(i);
                i--;
            }
        }
        int num=list.size();
        int sum=0;
        for(int i=0;i<list.size();i++){
            int tem=ts.num_of_kind(list.get(i).getEmail());
            sum+=tem;
        }
        double result=(double) sum*1.0/num;
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getCategoryNum", produces = "application/json")
    @ResponseBody
    public int getCategoryNum(@RequestParam("email") String email){
        //种类数
        // transform_service ts=new transform();
        int result=ts.num_of_kind(email);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getHighestCategoryNum", produces = "application/json")
    @ResponseBody
    public int getHighestCategoryNum(){
        //最高种类数
        // account_service as=new account();
        // transform_service ts=new transform();
        ArrayList<userPO> list=as.getuser();
        for(int i=0;i<list.size();i++){
            if(list.get(i).getKind().equals("boss")){
                list.remove(i);
                i--;
            }
        }
        int max=ts.num_of_kind(list.get(0).getEmail());
        for(int i=0;i<list.size();i++){
            int tem=ts.num_of_kind(list.get(i).getEmail());
            if(tem>max){
                max=tem;
            }
        }
        return max;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getBiaozhuShendu", produces = "application/json")
    @ResponseBody
    public ArrayList<Double> getBiaozhuShendu(){
        //获得标注深度的平均数和最高数
        // account_service as=new account();
        ArrayList<userPO> list=as.getuser();
        for(int i=0;i<list.size();i++){
            if(list.get(i).getKind().equals("boss")){
                list.remove(i);
                i--;
            }
        }
        // transform_service ts=new transform();
        int num=list.size();
        int max=ts.num_of_Favorite_kind_task(list.get(0).getEmail());
        int sum=0;
        for(int i=0;i<list.size();i++){
            int tem=ts.num_of_Favorite_kind_task(list.get(i).getEmail());
            if(tem>max){
                max=tem;
            }
            sum=sum+tem;
        }
        ArrayList<Double>result=new ArrayList<>();
        double average=(double)sum*1.0/num;
        result.add(average);
        result.add((double)max);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getBiaozhuShenduOfOneWorker", produces = "application/json")
    @ResponseBody
    public int getBiaozhuShenduOfOneWorker(@RequestParam("email") String email){
        //获得该用户的标注深度
        // transform_service ts=new transform();
        int result=ts.num_of_Favorite_kind_task(email);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getNumOfbiaozhuInEachCategoryOfOneWorker", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getNumOfbiaozhuInEachCategoryOfOneWorker(@RequestParam("email") String email){
        //获得该用户每个种类的标注数  返回结果格式list:水果，60，动物，15
        // search_service ss=new search();
        // transform_service ts=new transform();
        ArrayList<String> result=new ArrayList<>();
        ArrayList<String> list=ss.getAllkinds();
        for(int i=0;i<list.size();i++){
            result.add(list.get(i));
            int tem=ts.num_of_task(email,list.get(i));
            result.add(tem+"");
        }

        return result;
    }


    @RequestMapping(method = RequestMethod.GET, path = "/getRecentNDaysPics", produces = "application/json")
    @ResponseBody
    public ArrayList<String> getRecentNDaysPics(@RequestParam("email") String email,@RequestParam("days") int n){
        //返回最近n天标注的图片数
        // transform_service ts=new transform();
        ArrayList<String> result=ts.recent_image(email,n);

        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getNTIAN", produces = "application/json")
    @ResponseBody
    public ArrayList<Integer> getNTIAN(@RequestParam("email") String email,@RequestParam("days") int n){
        // transform_service ts=new transform();
//        System.out
        ArrayList<Integer> result=new ArrayList<>();
        for(int i=n-1;i>0;i--){
            result.add(ts.recent_image(email,i).size()-ts.recent_image(email,i-1).size());
        }
        result.add(ts.recent_image(email,0).size());

        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getAllNTIAN", produces = "application/json")
    @ResponseBody
    public ArrayList<Integer> getAllNTIAN(@RequestParam("days") int n){
        // account_service as=new account() =new accoun       // transform_service ts=new transform();
        System.out.println( n );
        ArrayList<userPO> list=as.getuser();
        ArrayList<Integer> result=new ArrayList<>();
        for(int i=n;i>0;i--){
            int tt=0;

            for(int u=0;u<list.size();u++){
                tt=tt+ts.recent_image(list.get(u).getEmail(),i).size()-ts.recent_image(list.get(u).getEmail(),i-1).size();
            }

            result.add(tt);
        }
        return result;
    }



    @RequestMapping(method = RequestMethod.GET, path = "/getRecentNDaysLoginNums", produces = "application/json")
    @ResponseBody
    public int getRecentNDaysLoginNums(@RequestParam("days") int n){
        //返回最近n天均登录的人数
        // transform_service ts=new transform();
        int num=ts.recent_online(n);
        return num;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getRemainingtime", produces = "application/json")
    @ResponseBody
    public int getRemainingtime(@RequestParam("taskName") String task){
        //返回任务还有多少时间过期
        // transform_service ts=new transform();
        int days=ts.days_left(task);
        return days;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getOnePicReward", produces = "application/json")
    @ResponseBody
    public double getOnePicReward(@RequestParam("taskName") String task){

        // transform_service ts=new transform();

        taskPO tp=ts.gettask(task);
        int reward=tp.getReword();
        return reward;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/AddWorkTime", produces = "application/json")

    @ResponseBody
    public void AddWorkTime(@RequestParam("email") String email,@RequestParam("time") int time){
        // transform_service ts=new transform();
//        Date a=new Date( System.currentTimeMillis() );
//        int onlinetime=ts.search_online_time(email,a.toString());
//        System.out.println();

        if(ts.first_online(email)){
            ts.update_add_time(email,time);
        }else{
            ts.newtime(email,time);
        }

    }

    @RequestMapping(method = RequestMethod.GET, path = "/GetResultOfOnePic", produces = "application/json")
    @ResponseBody
    public ArrayList<String> GetResultOfOnePic(@RequestParam("taskName") String taskName,@RequestParam("picture") String picture){
        // transform_service ts=new transform();
        String[] picList=picture.split("/");
        picture=picList[picList.length-1];
        ArrayList<commentPO> trueAnswer=ts.get_final_of_task(taskName);
        ArrayList<String> result=new ArrayList<>();
        for(int i=0;i<trueAnswer.size();i++){

            if(trueAnswer.get(i).getImage().equals(picture)){
                commentPO temcp=trueAnswer.get(i);
                ArrayList<SearchResponcePO> list=temcp.getSRPO();
                ArrayList<pointPO> list2=list.get(0).getList();
                for(int u=0;u<list2.size();u++){
                    result.add(list2.get(u).x+"");
                    result.add(list2.get(u).y+"");
                }
                result.add(",");
                result.add(list.get(0).getDescription());

            }
        }
System.out.println(result);
        //返回格式  点集（1，2）（3，4） 描述：fads   result:1 2 3 4 , fads //注意逗号是用来分隔点和描述的
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/vagueSearchIntegratedTasks", produces = "application/json")
    @ResponseBody
    public ArrayList<String> vagueSearchIntegratedTasks(@RequestParam("hint") String hint,@RequestParam("email") String email){



        // transform_service ts=new transform();
        ArrayList<String> list2=ts.SearchIntegratedTasks(email);
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

    @RequestMapping(method = RequestMethod.GET, path = "/SearchIntegratedTasks", produces = "application/json")
    @ResponseBody
    public ArrayList<String> SearchIntegratedTasks(@RequestParam("email") String email){
        // transform_service ts=new transform();
        ArrayList<String> result=ts.SearchIntegratedTasks(email);
        System.out.println(result);
        return result;
    }


    @RequestMapping(method=RequestMethod.GET,path = "/getDownload", produces = "application/json")
    @ResponseBody
    public String getDownload(@RequestParam("taskname") String taskName) {

        // Get your file stream from wherever.
        path_service ps=new aimpath();

        String fullPath = ps.SRCdownloadPath()+"/"+taskName+".zip";
        System.out.println(fullPath);
        return fullPath;
    }


    @RequestMapping(method = RequestMethod.GET, path = "/GetNumByType", produces = "application/json")
    @ResponseBody
    public int GetNumByType(@RequestParam("email") String email,@RequestParam("kind") String kind){
//        transform_service ts=new transform();
        ArrayList<String> tasks=ts.gettaskFinsh(email);
        int result=0;
        for(int i=0;i<tasks.size();i++){
            taskPO tp=ts.gettask(tasks.get(i));
            if(tp.getKind().equals(kind)){
                result++;
            }
        }
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/GetPointsChanges", produces = "application/json")
    @ResponseBody
    public ArrayList<String> GetPointsChanges(@RequestParam("email") String email){
        account_service as=new account();
        ArrayList<scorePO> tem=as.getpointArr(email);
        ArrayList<String> result=new ArrayList<>();
        for(int i=0;i<tem.size();i++){
            result.add(tem.get(i).getDate()+"");
            result.add(tem.get(i).getReason());
            result.add(tem.get(i).getValue()+"");
            result.add(tem.get(i).getTemValue()+"");

        }
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getNTIANZong", produces = "application/json")
    @ResponseBody
    public ArrayList<Integer> getNTIANZong(@RequestParam("days") int n){
        transform_service ts=new transform();
        account_service as=new account();
        ArrayList<userPO> list=as.getuser();
        ArrayList<Integer> result=new ArrayList<>();
        for(int i=n;i>0;i--){
            int sum=0;
            for(int u=0;u<list.size();u++){
                if(!list.get(u).getKind().equals("boss")){
                    sum=sum+ts.recent_image(list.get(u).getEmail(),i).size()-ts.recent_image(list.get(u).getEmail(),i-1).size();
                }
            }
            result.add(sum);
        }
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/recommend", produces = "application/json")
    @ResponseBody
    public ArrayList<String> recommend(@RequestParam("email") String email){
        Recommend_service re=new Recommend();
        return re.Collaborative_filter(email);

    }

    @RequestMapping(method = RequestMethod.GET, path = "/HowCanYouBeStrongerWithoutRecharging", produces = "application/json")
    @ResponseBody
    public ArrayList<String> HowCanYouBeStrongerWithoutRecharging(){
        Recommend_service rs=new Recommend();
        ArrayList<String> result=rs.Shallow_recommend();
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/Collaborative_filter", produces = "application/json")
    @ResponseBody
    public ArrayList<String> Collaborative_filter(@RequestParam("email") String email){
        Recommend_service rs=new Recommend();
        ArrayList<String> result=rs.Collaborative_filter(email);
        return result;
    }


    @RequestMapping(method = RequestMethod.GET, path = "/All_recommend", produces = "application/json")
    @ResponseBody
    public ArrayList<String> All_recommend(@RequestParam("email") String email){
        Recommend_service rs=new Recommend();
        ArrayList<String> list2=rs.Collaborative_filter(email);

     //   System.out.println(list2+"kkk");

        ArrayList<String> list1=rs.CB(email);
        for(int i=0;i<list2.size();i++){
            if(!(list1.contains(list2.get(i)))){
                list1.add(list2.get(i));
            }
        }


        //ArrayList<String> list3=rs.Shallow_recommend();
        /*System.out.println(list3);
       System.out.println(list1);
       System.out.println(list2);
        int i=2;
        int index=0;
        while(i<list1.size()&&index<list2.size()&&!(list1.contains(list2.get(index)))){
            list1.add(i,list2.get(index));
            i=i*2;
            index++;
        }
        if(index<list2.size()){
            for(int u=index;u<list2.size();u++){
                list1.add(list2.get(u));
            }
        }
*/
        return list1;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/taskFinishDegree", produces = "application/json")
    @ResponseBody
    public ArrayList<String> taskFinishDegree(@RequestParam("taskName") String taskName){
        Settlement_service ss=new Settlement();
        ArrayList<String> result=new ArrayList<>();
        ArrayList<Double> tem=ss.TakeFinishedDegree(taskName);
        for(int i=0;i<tem.size();i++){
            result.add(tem.get(i)+"");
        }
        return result;
    }


    @RequestMapping(method = RequestMethod.GET, path = "/ TakeFinishedDegree", produces = "application/json")
    @ResponseBody
    public ArrayList<Double>  TakeFinishedDegree(@RequestParam("taskName") String taskName){
        Settlement_service ss=new Settlement();
        ArrayList<Double> result=ss.TakeFinishedDegree(taskName);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/get_mathematical_expection", produces = "application/json")
    @ResponseBody
    public double  get_mathematical_expection(@RequestParam("shuju") ArrayList<String> list){
        Normal_distribution nd=new Normal_distribution(list);
        double result=nd.getMathematical_expection();
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/get_getStandard_deviation", produces = "application/json")
    @ResponseBody
    public double  getgetStandard_deviation(@RequestParam("shuju") ArrayList<String> list){
        Normal_distribution nd=new Normal_distribution(list);
        double result=nd.getStandard_deviation();
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/encoding", produces = "application/json")
    @ResponseBody
    public ArrayList<Integer>  encoding(@RequestParam("s") String s){
        ArrayList list=new ArrayList<>();
        for(int i=0;i<s.length();i++){
            int tem0=AsciiAndInt.AscToInt(s.charAt(i));
            list.add(encryption.encrypt(tem0));
        }
        return list;
    }


    @RequestMapping(method = RequestMethod.GET, path = "/getEfficency", produces = "application/json")
    @ResponseBody
    public ArrayList<Double> getEfficency(){

        account_service as=new account();
        ArrayList<userPO> list=as.getuser();
        for(int i=0;i<list.size();i++){
            if(list.get(i).getKind().equals("boss")||list.get(i).getKind().equals("administer")){
                list.remove(i);
                i--;
            }
        }
        int num=list.size();
        ArrayList<Double> result=new ArrayList<>();
        for(int i=0;i<num;i++){
            double eff=as.getefficiency(list.get(i).getEmail());
            result.add(eff);
        }



        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getAccuracy", produces = "application/json")
    @ResponseBody
    public ArrayList<Double> getAccuracy() {
        //准确率
        account_service as = new account();
        ArrayList<userPO> list = as.getuser();
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getKind().equals("boss")||list.get(i).getKind().equals("administer")) {
                list.remove(i);
                i--;
            }
        }
        int num = list.size();
        int sum = 0;
        ArrayList<Double> result = new ArrayList<>();
        for (int i = 0; i < num; i++) {
            double acc = as.getaccuracy(list.get(i).getEmail());
            result.add(acc);
        }

        return result;

    }

    @RequestMapping(method = RequestMethod.GET, path = "/getLoginDays", produces = "application/json")
    @ResponseBody
    public ArrayList<Integer> getLoginDays(){
        ArrayList<Integer> result=new ArrayList<>();
        // account_service as=new account();
        ArrayList<userPO> list=as.getuser();
        for(int i=0;i<list.size();i++){
            if(list.get(i).getKind().equals("boss")||list.get(i).getKind().equals("administer")){
                list.remove(i);
                i--;
            }
        }

        // transform_service ts=new transform();
        int num=list.size();
        int sum=0;
        for(int i=0;i<num;i++){
            result.add(ts.search_online_date(list.get(i).getEmail()));
        }



        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getRegisterDays", produces = "application/json")
    @ResponseBody
    public ArrayList<Integer> getRegisterDays(){
        // account_service as=new account();
        ArrayList<Integer> result=new ArrayList<>();
        ArrayList<userPO> list=as.getuser();
        for(int i=0;i<list.size();i++){
            if(list.get(i).getKind().equals("boss")||list.get(i).getKind().equals("administer")){
                list.remove(i);
                i--;
            }
        }



        int num=list.size();
        for(int i=0;i<num;i++){
            result.add(as.get_submission_length(list.get(i).getEmail()));
        }



        return result;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getT_distribution", produces = "application/json")
    @ResponseBody
    public double getT_distribution(@RequestParam("list") ArrayList<String> list){
        ArrayList<Double> tem=new ArrayList<>();
        for(int i=0;i<list.size();i++){
            tem.add(Double.parseDouble(list.get(i)));
        }
        System.out.println(tem);
        double result=t_distribution.getT(tem);
        return result;

    }
}