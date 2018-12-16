package com.example.logic_layer.algorithm;

import com.example.PO.pointPO;

import java.util.ArrayList;

public class algorithm implements algorithm_service {
    @Override
    public String isdescriptionEquals(String fd, String sd) {
        if(fd.equals(sd)){
            return "1";
        }else{
            return "0";
        }
    }

    @Override
    public  String isDianEquals(ArrayList<pointPO> list1, ArrayList<pointPO> list2) {
        double area1=getArea(list1);
        double area2=getArea(list2);
        int size1=list1.size();
        int size2=list2.size();
        double piancha=0.6;
        ArrayList<pointPO> tem1=list1;
        ArrayList<pointPO> tem2=list2;
        double zongcha=0.0;
        if(size1>size2){
            tem1=list2;
            tem2=list1;
        }
        for(int i=0;i<tem1.size();i++){
            if(tem2.size()==0){break;}
            else{
                double cha=(tem1.get(i).x-tem2.get(0).x)*(tem1.get(i).x-tem2.get(0).x)+(tem1.get(i).y-tem2.get(0).y)*(tem1.get(i).y-tem2.get(0).y);
                int index=0;
                for(int u=0;u<tem2.size();u++){
                    double temcha=(tem1.get(i).x-tem2.get(0).x)*(tem1.get(i).x-tem2.get(u).x)+(tem1.get(i).y-tem2.get(u).y)*(tem1.get(i).y-tem2.get(u).y);
                    if(Math.abs(temcha)<Math.abs(cha)){
                        cha=temcha;
                        index=u;
                    }

                }
                // System.out.println("cha"+cha);
                // System.out.println("index"+index);
                zongcha=zongcha+cha;

                tem2.remove(index);
            }

        }



        //  System.out.println("zongcha"+zongcha);


        if(size1<size2){
            zongcha=zongcha/size1;
            if(zongcha>=piancha*piancha){
                return "0";
            }
            else{

                // System.out.println(area2);
                double panduan=Math.abs(area1-area2)/Math.sqrt(area1*area2);
                // System.out.println("panduan"+panduan);
                if(panduan>=piancha*piancha){
                    return "0";
                }
                else{
                    return "1";
                }
            }
        }
        else{
            zongcha=zongcha/size2;

            if(zongcha>=piancha*piancha){

                return "0";
            }
            else{


                double panduan=Math.abs(area1-area2)/Math.sqrt(area1*area2);
                // System.out.println("panduan"+panduan);
                if(panduan>=piancha*piancha){
                    return "0";
                }
                else{
                    return "1";
                }
            }



        }


    }

    @Override
    public  ArrayList<pointPO> firstfitting(ArrayList<pointPO> list1, ArrayList<pointPO> list2,int n) {
        int size1=list1.size();
        int size2=list2.size();

        ArrayList<pointPO> tem1=new ArrayList<pointPO>();
        for(int i=0;i<list1.size();i++){
            tem1.add(list1.get(i));
        }
        ArrayList<pointPO> tem2=new ArrayList<pointPO>();
        for(int i=0;i<list2.size();i++){
            tem2.add(list2.get(i));
        }
        ArrayList tem3=new ArrayList<>();
        boolean ischange=false;
        if(size1>size2){
            tem3=tem1;
            tem1=tem2;
            tem2=tem3;
            ischange=true;
        }
        ArrayList list0=new ArrayList<>();
        for(int i=0;i<tem1.size();i++){

            double cha=(tem1.get(i).x-tem2.get(0).x)*(tem1.get(i).x-tem2.get(0).x)+(tem1.get(i).y-tem2.get(0).y)*(tem1.get(i).y-tem2.get(0).y);
            int index=0;
            for(int u=0;u<tem2.size();u++){
                double temcha=(tem1.get(i).x-tem2.get(u).x)*(tem1.get(i).x-tem2.get(u).x)+(tem1.get(i).y-tem2.get(u).y)*(tem1.get(i).y-tem2.get(u).y);
                if(Math.abs(temcha)<Math.abs(cha)){
                    cha=temcha;
                    index=u;
                }

            }
            // System.out.println("cha"+cha);
            // System.out.println("index"+index);
            pointPO pp0=tem1.get(i);
            pointPO pp1=tem2.get(index);
            if(!ischange){
                pointPO pp3=new pointPO(pp0.x*n/(n+1)+pp1.x/(n+1),pp0.y*n/(n+1)+pp1.y/(n+1));
                tem2.set(index, pp3);
            }else{
                pointPO pp3=new pointPO(pp1.x*n/(n+1)+pp0.x/(n+1),pp1.y*n/(n+1)+pp0.y/(n+1));
                tem2.set(index, pp3);
            }
            list0.add(index);
        }
        // System.out.println(tem2.size());
        pointPO temp=getCenterOfGravityPoint(tem2);
        double area1=getArea(list1);
        double area2=getArea(tem2);
        for(int i=0;i<tem2.size();i++){
            if(!list0.contains(i)){
                double temx=temp.x+(tem2.get(i).x-temp.x)*area1/area2;
                double temy=temp.y+(tem2.get(i).y-temp.y)*area1/area2;
                if(temx<0){
                    temx=0;
                }else if(temx>1){
                    temx=1;
                }
                if(temy<0){
                    temy=0;
                }else if(temy>1){
                    temy=1;
                }
                pointPO pp3=new pointPO(/*temp.x+(tem2.get(i).x-temp.x)*area1/area2*/temx,/*temp.y+(tem2.get(i).y-temp.y)*area1/area2*/temy);
                tem2.set(i, pp3);
            }
        }

        return tem2;
    }

    @Override
    public ArrayList<ArrayList<Integer>> Collaborative_filtering(ArrayList<ArrayList<Integer>> ju) {
        /*
            u1  u2  u3
         I1
         I2
         I3
         I4

         result:
             I1 I2 I3 I4
          I1
          I2
          I3
          I4
         */
        ArrayList<ArrayList<Integer>> result=new ArrayList<ArrayList<Integer>>();
        for(int i=0;i<ju.size();i++){
            ArrayList<Integer> tem00=new ArrayList<>();
            for(int u=0;u<ju.get(0).size();u++){
                tem00.add(0);
            }
            result.add(tem00);
        }
        for(int i=0;i<ju.size()-1;i++){
            for(int u=i+1;u<ju.size();u++){
                ArrayList<Integer> list1=ju.get(i);
                ArrayList<Integer> list2=ju.get(u);
                int similarity=0;
                for(int t=0;t<list1.size();t++){
                    similarity+=list1.get(t)*list2.get(t);
                }
                ArrayList<Integer> tem=result.get(i);
                tem.set(u,similarity);
                result.set(i,tem);
            }
        }
        return result;
    }


    public static pointPO getCenterOfGravityPoint(ArrayList<pointPO> mPoints) {
        double area = 0.0;//多边形面积
        double Gx = 0.0, Gy = 0.0;// 重心的x、y
        for (int i = 1; i <= mPoints.size(); i++) {
            double iLat = mPoints.get(i % mPoints.size()).x;
            double iLng = mPoints.get(i % mPoints.size()).y;
            double nextLat = mPoints.get(i - 1).x;
            double nextLng = mPoints.get(i - 1).y;
            double temp = (iLat * nextLng - iLng * nextLat) / 2.0;
            area += temp;
            Gx += temp * (iLat + nextLat) / 3.0;
            Gy += temp * (iLng + nextLng) / 3.0;
        }
        Gx = Gx / area;
        Gy = Gy / area;
        return new pointPO(Gx, Gy);
    }

    public static double getArea(ArrayList<pointPO> list)
    {
        //S = 0.5 * ( (x0*y1-x1*y0) + (x1*y2-x2*y1) + ... + (xn*y0-x0*yn) )

        double area = 0.00;
        for(int i = 0;i<list.size();i++){
            if(i<list.size()-1){
                pointPO p1 = list.get(i);
                pointPO p2 = list.get(i+1);
                area += p1.getx()*p2.gety() - p2.getx()*p1.gety();
            }else{
                pointPO pn = list.get(i);
                pointPO p0 = list.get(0);
                area += pn.getx()*p0.gety()- p0.getx()*pn.gety();
            }

        }
        area = area/2.00;

        return area;
    }


    public static void main(String[] args) {
        pointPO p1 = new pointPO(0.0,0.0);
        pointPO p2 = new pointPO(0.9,0.0);
        pointPO p3 = new pointPO(1.1,1.1);
        pointPO p4 = new pointPO(0.0,0.9);

        ArrayList list = new ArrayList();
        list.add(p1);
        list.add(p2);
        list.add(p3);
        list.add(p4);

        pointPO p5 = new pointPO(0.0,0.0);
        pointPO p6 = new pointPO(1.0,0.0);
        pointPO p7 = new pointPO(1.0,1.0);
        pointPO p8 = new pointPO(0.0,1.0);
        pointPO p9 = new pointPO(0.5,0.1);
        ArrayList list2 = new ArrayList();
        list2.add(p5);
        list2.add(p9);
        list2.add(p6);
        list2.add(p7);
        list2.add(p8);
        algorithm_service as=new algorithm();
        System.out.println((as.isDianEquals(list,list2)));
    }


}