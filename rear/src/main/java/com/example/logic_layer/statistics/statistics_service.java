package com.example.logic_layer.statistics;

public interface statistics_service {
    /**
     * @author xu jiehui
     * @version 1.0
     * @id    the representation of the worker
     * @return  the Num
     * @date 2018-4-17
     */
    public  int   getTheNum(String id);

    /**
     * @author xu jiehui
     * @version 1.0
     * @return  the Num of the workers
     * @date 2018-4-17
     */
    public int getNumOfWorkers();

    /**
     * @author xu jiehui
     * @version 1.0
     * @id    the representation of the boss
     * @return  the Num of the all the tasks
     * @date 2018-4-17
     */
    public int getNumOfTheTasks(String id);

    /**
     * @author xu jiehui
     * @version 1.0
     * @id    the representation of the boss
     * @return  the Num of the all the finished tasks
     * @date 2018-4-17
     */
    public int getNumOfTheFinishedTasks(String id);

    /**
     * @author xu jiehui
     * @version 1.0
     *@param taskName     the name of the task
     * @return  the num of the pictures in the task
     * @date 2018-4-17
     */
    public int  getTheNumOfPicsInTheTask(String taskName);

    /**
     * @author xu jiehui
     * @version 1.0
     *@param taskName     the name of the task
     * @return  the num of the pictures which are finished  in the task
     * @date 2018-4-17
     */
    public int  getTheNumOfFinishedPicsInTheTask(String taskName);

    /**
     * @author xu jiehui
     * @version 1.0
     * @return  the Num of the bosses
     * @date 2018-4-17
     */
    public int getNumOfBosses();


    /**
     * @author xu jiehui
     * @version 1.0
     * @return  the Num of the all the tasks
     * @date 2018-4-17
     */
    public int getNumOftasks();

    /**
     * @author xu jiehui
     * @version 1.0
     * @return  the Num of the all the finshed tasks
     * @date 2018-4-17
     */
    public int getNumOfFinishedtasks();

    /**
     * @author xu jiehui
     * @version 1.0
     * @return  the Num of the all the going tasks
     * @date 2018-4-17
     */
    public int getNumOfGoingtasks();
}
