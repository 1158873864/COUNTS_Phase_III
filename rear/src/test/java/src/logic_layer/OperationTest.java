//package src.logic_layer;
//
//
//
//import com.example.PO.pointPO;
//import com.example.logic_layer.Operation.Operation;
//import com.example.logic_layer.Operation.Operation_service;
//
//import java.util.ArrayList;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//class OperationTest {
//    Operation_service operation=new Operation();
//    @org.junit.jupiter.api.Test
//    void dianEquals() {
//        ArrayList<pointPO> list1=new ArrayList<pointPO>();
//        ArrayList<pointPO> list2=new ArrayList<pointPO>();
//        pointPO tem1=new pointPO(1.0,1.0);
//        pointPO tem2=new pointPO(2.0,2.0);
//        pointPO tem3=new pointPO(3.0,3.0);
//        pointPO tem4=new pointPO(4.0,4.0);
//        pointPO tem5=new pointPO(5.0,5.0);
//        list1.add(tem1);
//        list1.add(tem2);
//        list1.add(tem3);
//        list1.add(tem4);
//        list1.add(tem5);
//        list2.add(tem1);
//        list2.add(tem2);
//        list2.add(tem3);
//        list2.add(tem4);
//        list2.add(tem5);
//       assertEquals(operation.dianEquals(list1,list2),true);
//
//
//    }
//
//    @org.junit.jupiter.api.Test
//    void dianEquals2() {
//        ArrayList<pointPO> list1=new ArrayList<pointPO>();
//        ArrayList<pointPO> list2=new ArrayList<pointPO>();
//        pointPO tem1=new pointPO(1.0,1.0);
//        pointPO tem2=new pointPO(2.0,2.0);
//        pointPO tem3=new pointPO(3.0,3.0);
//        pointPO tem4=new pointPO(4.0,4.0);
//        pointPO tem5=new pointPO(5.0,5.0);
//        list1.add(tem1);
//        list1.add(tem2);
//        list1.add(tem3);
//        list1.add(tem4);
//        list1.add(tem5);
//        list2.add(tem1);
//        list2.add(tem2);
//        list2.add(tem3);
//        list2.add(tem4);
//        assertEquals(!operation.dianEquals(list1,list2),true);
//
//    }
//
//    @org.junit.jupiter.api.Test
//    void saveLabel() {
//        ArrayList<pointPO> list1=new ArrayList<pointPO>();
//
//        pointPO tem1=new pointPO(1.0,1.0);
//        pointPO tem2=new pointPO(2.0,2.0);
//        pointPO tem3=new pointPO(3.0,3.0);
//        pointPO tem4=new pointPO(4.0,4.0);
//        pointPO tem5=new pointPO(5.0,5.0);
//        list1.add(tem1);
//        list1.add(tem2);
//        list1.add(tem3);
//        list1.add(tem4);
//        list1.add(tem5);
//        assertEquals(operation.SaveLabel("12345",list1,"这是一只徐磊"),"标记成功");
//    }
//
//    @org.junit.jupiter.api.Test
//    void typeCheck() {
//
//    }
//
//    @org.junit.jupiter.api.Test
//    void changeLabel() {
//        ArrayList<pointPO> list1=new ArrayList<pointPO>();
//
//        pointPO tem1=new pointPO(1.0,1.0);
//        pointPO tem2=new pointPO(2.0,2.0);
//        pointPO tem3=new pointPO(3.0,3.0);
//        pointPO tem4=new pointPO(4.0,4.0);
//        pointPO tem5=new pointPO(5.0,5.0);
//        list1.add(tem1);
//        list1.add(tem2);
//        list1.add(tem3);
//        list1.add(tem4);
//        list1.add(tem5);
//        assertEquals(operation.changeLabel("12345",list1,"这是一只轮滑"),"修改标注成功");
//    }
//
//    @org.junit.jupiter.api.Test
//    void showLabeledPictures() {
//        assertEquals(operation.ShowLabeledPictures().size(),1);
//    }
//
//    @org.junit.jupiter.api.Test
//    void searchPictureDetail() {
//        ArrayList<pointPO> list1=new ArrayList<pointPO>();
//
//        pointPO tem1=new pointPO(1.0,1.0);
//        pointPO tem2=new pointPO(2.0,2.0);
//        pointPO tem3=new pointPO(3.0,3.0);
//        pointPO tem4=new pointPO(4.0,4.0);
//        pointPO tem5=new pointPO(5.0,5.0);
//        list1.add(tem1);
//        list1.add(tem2);
//        list1.add(tem3);
//        list1.add(tem4);
//        list1.add(tem5);
//        assertEquals(operation.SearchPictureDetail("12345").get(0).getDescription(),"这是一只轮滑");
//    }
//}