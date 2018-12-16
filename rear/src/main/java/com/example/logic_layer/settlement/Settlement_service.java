package com.example.logic_layer.settlement;

import java.util.ArrayList;

public interface Settlement_service {
    public ArrayList<Double> TakeFinishedDegree(String taskName);
    public void CountResultOfOneTask(String taskName);
    public void settleForWorkers(String taskName);
}
