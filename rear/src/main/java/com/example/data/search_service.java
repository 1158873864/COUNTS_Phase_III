package com.example.data;

import java.util.ArrayList;

public interface search_service {
//    public ArrayList<String> get(String path);
    public ArrayList<String> getAllkinds();
    public  ArrayList<String> getAllTask(String kind);
//    public String getimage(String image);
    public  ArrayList<String> getimages(String kind,String task);
    public  ArrayList<String> getAlltask();
    public  ArrayList<String> getduetask();
    public  ArrayList<String> get_task_in_commentresult();
    public  ArrayList<String> getAlreadytask(String id);
//    public boolean taskfinished(String task);
    public String getFirstImage(String task);
    public String getkind(String task);
    public  ArrayList<String> getimagesWithoutZero(String kind,String task);
    public  ArrayList<String> getAlltask(String ID);

    ArrayList<String> getAllTask(String kind, String id);
}
