package src.logic_layer;//package src.logic_layer;



import com.example.PO.*;
import com.example.data.*;

import java.sql.Date;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class DateTest {
    transform tran =new transform();
    account acc=new account();
    search search=new search();
    @org.junit.jupiter.api.Test
    void addusers() {
        userPO u=new userPO( "testid","testpassword"
                ,"testmail","testphone","testkind" );
        acc.adduser( u);
        userPO u2=acc.getdetailwithmail( "testmail" );
//        acc.deleteuser( "testmail" );
        assertEquals( u.getPassword(), u2.getPassword());

    }
    @org.junit.jupiter.api.Test
    void addpoint() {
        acc.add_point( "testmail","test",1);
        int x=acc.getpoint( "testmail" );
        acc.add_point( "testmail","test",-1);

        assertEquals( 1,x);

    }

    @org.junit.jupiter.api.Test
    void accuracytest() {
        acc.addaccuracy( "testmail" );
        acc.update_accuracy( "testmail",0.5 );
        double x=acc.getaccuracy( "testmail" );
//        acc.add_point( "testmail","test",-1);

        assertEquals( 0.5,x);
    }
    @org.junit.jupiter.api.Test
    void edituesrtest() {
        userPO u=new userPO( "testid","testpassword2"
                ,"testmail","testphone","testkind" );
//        acc.adduser( u);
        acc.edituser( "testmail",u );
        userPO u2=acc.getdetailwithmail( "testmail" );
        acc.deleteuser( "testid" );

        assertEquals( u.getPassword(), u2.getPassword());
//        acc.update_accuracy( "testmail",0.5 );
//        double x=acc.getaccuracy( "testmail" );
//        acc.add_point( "testmail","test",-1);

//        assertEquals( 0.5,x);
    }

    @org.junit.jupiter.api.Test
    void get_submission_date_test() {
        String c=acc.get_submission_date("testmail"  ).toString();
        assertEquals( c,(new Date(System.currentTimeMillis())).toString() );

    }
    @org.junit.jupiter.api.Test
    void mailPO_test() {
        acc.addmail( new mailPO( "test","testmail" ) );
        mailPO c=acc.getmailverification(  "testmail");
        acc.deletemail( "testmail" );
        assertEquals( c.getVerification(),"test");

    }
    @org.junit.jupiter.api.Test
    void comment_test() {
        ArrayList<pointPO>p=new ArrayList<>(  );
        SearchResponcePO s=new SearchResponcePO( p,"testdes" );
        tran.addcommentsWithoutReword( "testmail","testtask",
                "testimage",s);
        ArrayList<SearchResponcePO>sxs=tran.getcomments( "testmail","testtask","testimage" );
        tran.deletecomments(  "testmail","testtask","testimage" );
        assertEquals( sxs.get( 0 ).getDescription(),"testdes");

    }
    @org.junit.jupiter.api.Test
    void task_test() {
//        ArrayList<pointPO>p=new ArrayList<>(  );
//        SearchResponcePO s=new SearchResponcePO( p,"testdes" );
        String []a="ss".split( ",");
        taskPO t=new taskPO( "testid","C:\\Users\\Administrator\\IdeaProjects\\COUNTS_Phase_III\\rear\\src\\main\\java\\com\\example\\record\\zip\\aa.zip"
                ,"testkind","testtask"
                ,10,1,0,"0",a,a);
        t.setTimelength( 10 );
        tran.addtask(  t);
        ArrayList<String>scs=tran.getAlLImage( "testtask" );
        assertEquals( scs.size()==0,false);

    }



    @org.junit.jupiter.api.Test
    void Searchtask_test() {
        assertEquals( search.getAlltask( "testmail" ).get( 0 ),"testtask" );
    }

    @org.junit.jupiter.api.Test
    void addtask_test() {
        tran.addTaskUser( "testmail","testtask" );
        assertEquals( tran.gettaskUnFinsh("testmail").get( 0 ),"testtask" );
    }

    @org.junit.jupiter.api.Test
    void image_test() {
        ;
        assertEquals( tran.getAlLImage( "testtask" ).size()==0,
                false);
    }



//
//    void addusers() {
//        userPO u=new userPO( "testid","testpassword"
//                ,"testmail","testphone","testkind" );
//        acc.adduser( u);
//        userPO u2=acc.getdetailwithmail( "testmail" );
//        acc.deleteuser( "testmail" );
//        assertEquals( u.getPassword(), u2.getPassword());
//
//    }

//    @org.junit.jupiter.api.Test
//    void dianEquals2() {
//        ArrayList<pointPO> list1 = new ArrayList<pointPO>();
//        ArrayList<pointPO> list2 = new ArrayList<pointPO>();
//        pointPO tem1 = new pointPO( 1.0, 1.0 );
//        pointPO tem2 = new pointPO( 2.0, 2.0 );
//        pointPO tem3 = new pointPO( 3.0, 3.0 );
//        pointPO tem4 = new pointPO( 4.0, 4.0 );
//        pointPO tem5 = new pointPO( 5.0, 5.0 );
//        list1.add( tem1 );
//        list1.add( tem2 );
//        list1.add( tem3 );
//        list1.add( tem4 );
//        list1.add( tem5 );
//        list2.add( tem1 );
//        list2.add( tem2 );
//        list2.add( tem3 );
//        list2.add( tem4 );
//        assertEquals( !operation.dianEquals( list1, list2 ), true );
//
//    }
//
//    @org.junit.jupiter.api.Test
//    void saveLabel() {
//        ArrayList<pointPO> list1 = new ArrayList<pointPO>();
//
//        pointPO tem1 = new pointPO( 1.0, 1.0 );
//        pointPO tem2 = new pointPO( 2.0, 2.0 );
//        pointPO tem3 = new pointPO( 3.0, 3.0 );
//        pointPO tem4 = new pointPO( 4.0, 4.0 );
//        pointPO tem5 = new pointPO( 5.0, 5.0 );
//        list1.add( tem1 );
//        list1.add( tem2 );
//        list1.add( tem3 );
//        list1.add( tem4 );
//        list1.add( tem5 );
//        assertEquals( operation.SaveLabel( "12345", "", "", list1, "这是一只徐磊" ), "标记成功" );
//    }
}