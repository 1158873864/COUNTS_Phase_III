package com.example.logic_layer.Operation;

import com.example.PO.SearchResponcePO;
import com.example.PO.pointPO;

import java.util.ArrayList;

/**
 * @author xu jiehui
 * @version 1.0
 */
public interface Operation_service  {




    /**
     * @param  url:the location of the hahaha.image
     * @param  list:some points which pictures the labeled part
     * @param  description: some brief description which describes the labeled part
     * @param    email:the email of the worker
     * @return  the result of the action
     */
    public String SaveLabel(String task,String email,String url, ArrayList<pointPO> list, String description);




    /**
     * @return  a list which contains all the tasks
     */
    public  ArrayList<String> getAlltasks();

    /**
     * @phonenumber    phoneNumber
     * @return  whether phone exits
     */
    public  String  isPhoneNumberExits(String phonenumber);

    /**
     * @n    the number of the workers
     * @return  a list which contains the first nth workers whose point is high
     */
    public  ArrayList<String>  getFirstNWorker(int n);


    /**
     * @param  id:the name of the boss
     * @return  the list which contains tasks which belong to the boss
     */
    public ArrayList<String> getAllTasksByBoss(String id);



    public ArrayList<String> getUnfinishedTasks(String id);
    public ArrayList<String> getFinishedTasks(String id);
    public ArrayList<String> getIrrelatedTasks(String id);
    public ArrayList<String>  getpictures(String taskName);
    /**
     * @param taskName     the name of the task
     * @return  the Num of the all the workers who are involved in the task
     */
    public ArrayList<String> getInvolvedWorkers(String taskName);


    /**
     *@param hint
     * @return  a list which contains all the  data which satisfied the hint
     */
    public ArrayList<String> getHintTasks(String hint,String id);

    /**
     *@param hint
     * @return  a list which contains all the  data which satisfied the hint
     */
    public ArrayList<String> getHintMyGoingTasks(String hint,String id);

    /**
     *@param hint
     * @return  a list which contains all the  data which satisfied the hint
     */
    public ArrayList<String> getHintMyFinishedTasks(String hint,String id);


    /**
     *@param id the representation of the worker
     * @return  a list which contains all the  data which satisfied the hint
     */
    public String deleteTask(String taskName,String id);

    /**
     * @return  a list which contains all the  tasks which is of the kind
     */
    public  ArrayList<String> getAlltasks(String kind);


    /**
     * @param  email:the email of the worker
     * @param   taskName:the name of the task
     * @return  the list of all unlabeled pic
     */
    public ArrayList<String> getPicOfTheTask(String email,String taskName);

    /**
     * @param  url:the location of the hahaha.image
     * @param  list:some points which pictures the labeled part
     * @param  description: some brief description which describes the labeled part
     * @param    email:the email of the worker
     * @return  the result of the action
     */
    public String changeLabel(String task,String email,String url, ArrayList<pointPO> list, String description);

    /**
     * @param  email:the email of the worker
     * @param  src: the url of the image
     * @return  a list which contains all the descriptions and the points
     */
    public  ArrayList<SearchResponcePO> showPicDetail(String task,String email,String src);

    /**
     * @param  email:the email of the worker
     * @return  a list which contains all the tasks that have been labeled
     */
    public  ArrayList<String> showLabeled(String email);


    /**
     * @param  email:the email of the worker
     * @param  taskName: the name of the task
     * @return  a list which contains all the pictures thich have been labeled
     */
    public  ArrayList<String> showTaskDetail(String email,String taskName);
    public ArrayList<String> showPicOfIntegretedTask(String taskName);


    /**
     *  @param  id:the name of the sponsor
     *  @param  taskName:the name of the  task
     * @return  whether ask for success
     */
    public String askForTask(String id,String taskName);


    /**
     * @param  url:the location of the hahaha.image
     * @return  the responce which contains the points and description of the goal iamge
     */
    //  public ArrayList<SearchResponcePO> SearchPictureDetail(String url);


    /**
     * @param  list1:the first collection of points
     * @param  list2:the second collection of points
     * @return  boolean which depends on the equality of these two collections
     */
    public boolean dianEquals(ArrayList<pointPO> list1, ArrayList<pointPO> list2);
    /**
     * @param  task:the name of the task
     * @return  the src of the first picture in the task
     */
    public String getFirstPic(String task);

    /**
     * @param  id:the name of the worker
     * @param  kind:the kind of the worker
     * @return  the list which contains tasknames that he has never touched before
     */
    public ArrayList<String> getTasksByType(String id,String kind);

    /**
     * @param  id:the name of the worker
     * @param  kind:the kind of the worker
     * @return  the list which contains tasknames that he has finished before
     */
    public ArrayList<String> getFinishedTasksByType(String id,String kind);


    public ArrayList<String> getAllTasksById(String id);
}