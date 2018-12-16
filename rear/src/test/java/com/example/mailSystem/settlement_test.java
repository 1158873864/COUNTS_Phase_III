package com.example.mailSystem;
import com.example.logic_layer.settlement.Settlement;
import com.example.logic_layer.settlement.Settlement_service;
import org.junit.Test;

import java.util.ArrayList;

import static org.junit.Assert.*;
public class settlement_test {
    Settlement_service ss=new Settlement();
    @Test
    public void test() {
        ArrayList<Double> result=ss.TakeFinishedDegree("fruits");
        for(int i=0;i<result.size();i++){
            assertEquals(1.0,(double)result.get(i));
        }
    }
}