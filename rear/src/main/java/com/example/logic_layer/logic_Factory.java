package com.example.logic_layer;

import com.example.logic_layer.Operation.Operation;
import com.example.logic_layer.algorithm.algorithm;
import com.example.logic_layer.recommend.Recommend;
import com.example.logic_layer.settlement.Settlement;
import com.example.logic_layer.statistics.statistics;

public class logic_Factory {
    public Operation getOperation(){
        Operation os=new Operation();
        return os;
    }
    public Recommend getRecommend(){
        Recommend r=new Recommend();
        return r;
    }
    public Settlement getSettlement(){
        Settlement s=new Settlement();
        return s;
    }
    public statistics getStatistics(){
        statistics s=new statistics();
        return s;
    }
    public algorithm getalgorithm(){
        algorithm a=new algorithm();
        return a;
    }
}
