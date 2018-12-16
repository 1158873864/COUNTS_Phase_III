package com.example.logic_layer.algorithm;

import com.example.PO.pointPO;

import java.util.ArrayList;

public interface algorithm_service {
    public String isdescriptionEquals(String fd, String sd);
    public String isDianEquals(ArrayList<pointPO> list1, ArrayList<pointPO> list2);
    public ArrayList<pointPO> firstfitting(ArrayList<pointPO> list1, ArrayList<pointPO> list2, int n);
    public ArrayList<ArrayList<Integer>> Collaborative_filtering(ArrayList<ArrayList<Integer>> ju);

}