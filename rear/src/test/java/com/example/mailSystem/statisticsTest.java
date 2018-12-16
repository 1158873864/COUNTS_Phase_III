package com.example.mailSystem;
import com.example.logic_layer.statistics.statistics;
import com.example.logic_layer.statistics.statistics_service;
import org.junit.Test;

import static org.junit.Assert.*;
public class statisticsTest {
    statistics_service ss=new statistics();


    @Test
    public void getTheNum() {

        assertEquals("0",""+ss.getTheNum("123456789@qq.com"));

    }
    @Test
    public void getNumOfworkers(){

        assertEquals(6,ss.getNumOfWorkers());

    }

    @Test
    public void getNumOfBoss(){

        assertEquals(1,ss.getNumOfBosses());

    }

    @Test
    public void getNumOfTheTasks(){
        assertEquals(1,ss.getNumOfTheTasks("canyangluoye@qq.com"));
        assertEquals(3,ss.getNumOftasks());

    }

    @Test
    public void NumOfFinishedTasks(){

        assertEquals(1,ss.getNumOfFinishedtasks());
    }

    @Test
    public void getTheNumOfPicsInTheTask(){
        assertEquals(10,ss.getTheNumOfPicsInTheTask("fruits"));
        assertEquals(5,ss.getTheNumOfFinishedPicsInTheTask("fruits"));

    }

    @Test
    public void GoingTasks(){
        assertEquals(1,ss.getNumOfGoingtasks());

    }












}
