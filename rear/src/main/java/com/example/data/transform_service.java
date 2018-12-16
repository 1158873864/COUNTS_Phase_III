package com.example.data;

import com.example.PO.SearchResponcePO;
import com.example.PO.commentPO;
import com.example.PO.taskPO;

import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;

public interface transform_service {
    public boolean day_online(String mail,Date day);
    public Date task_begin_time(String task);
    public boolean first_online(String mail);
    public ArrayList<String> recent_image(String mail ,int day); // 最近几天标注的图片
    public int recent_online(int day);
    public int days_left(String task);
    public int num_of_Favorite_kind_task(String mail);
    public int num_of_task(String mail,String taskkind);
    public  int search_online_time(String mail ,String date );
    public void save_result_of_task(ArrayList<commentPO> save , String task);
    public     ArrayList<ArrayList<commentPO>> get_result_of_task(String task);
    public int getYesterdayOnlinetime(String user);
    //    public ArrayList<commentPO> get_result_of_image(String task,String image);
    public void save_final_of_task(ArrayList<commentPO> save ,String task);
    public     ArrayList<commentPO> get_final_of_task(String task);
    public ArrayList<Integer> get_comment_time(String task);

    public int  num_of_kind_boss(String mail);
    public int  num_of_kind(String mail);
    public  int search_online_date(String mail );//总登录天数
    public ArrayList<String>SearchIntegratedTasks(String mail);
    public commentPO get_comment_of_all_task(String task);

    public  void newtime(String mail ,int time);//第一次登陆记录时间
    public  void update_time(String mail ,int time); //更新登陆时间
    public  void update_add_time(String mail ,int time);//更新登陆时间(+)


    public  int User_image(String mail );  // 用户标注图片数目


    //    public int getonlinetime(String user,String date);
    public ArrayList<String> workergettest(String task);
    //    public boolean user_time(String id, String state);
    public int Continuous_landing_time(String mail);
//    public boolean AddUserpoint(String mail,int point,String reason);  // 增加积分


    //    public boolean addtask_test(taskPO t);
//    public boolean addtasktest(String tpath,taskPO t);
//    public boolean updateUserpoint(String user,int point,String reason);   //修改积分
    public ArrayList<String> getAlLImage(String taskname);
    //    public ArrayList<String> gettime(String user,String date);
    public boolean addtask(taskPO t) throws Exception;
    public boolean addcomments(String id,String task,String image,SearchResponcePO SRPO)throws IOException;
    public ArrayList<SearchResponcePO> getcomments(String id,String task,String image) throws IOException;
    public boolean deletecomments(String id,String task,String image);
    public boolean deleteonecomments(String id,String task,String image,SearchResponcePO aimpoints)throws IOException;
    //    public String getRequire(String task,String image) throws IOException;
    public boolean addTaskUser(String id,String task);
    public ArrayList<String> getallimage(String id,String task);
    public int getallimagenum(String mail);
    public ArrayList<String>  gettaskname(String id);


    public ArrayList<String>  getReleasedtasks(String id) ;
    public ArrayList<String>  gettaskFinsh(String id);
    public ArrayList<String>  gettaskUnFinsh(String id);
    //    public ArrayList<String>  getworkname(String taskname);
    public ArrayList<String>  getAlreadyImage(String taskname);
    public ArrayList<String>  getUnAlreadyImage(String taskname);
    public boolean addcommentsWithoutReword
            (String id,String task, String image, SearchResponcePO SRPO) ;
    public boolean deltask(String task,String id);
    public taskPO gettask(String task);
    public boolean taskisFinish(String task);
}