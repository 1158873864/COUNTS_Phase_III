
package com.example.logic_layer.recommend;

import java.util.ArrayList;

public interface Recommend_service {
    public ArrayList<String>  Collaborative_filter(String workerEmail);
    public ArrayList<String>  Shallow_recommend();
    public ArrayList<String> CB(String email);

}