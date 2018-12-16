package com.example.data;
import com.example.PO.*;
import com.example.webSocket.webController;
import java.io.*;
import java.sql.Date;
import java.util.ArrayList;
public class transform  implements  transform_service{
    private aimpath path = new aimpath();
    //    private alledit edit = new alledit();
    private ZipUtil zip = new ZipUtil();
    private search search = new search();
    public mysql m=new mysql();
    account account=new account();
    public static void main(String[] arg) {
        transform tran=new transform();
//        String []a="ss".split( "," );

        System.out.print( tran.task_begin_time( "task") );

//        tran.addtask( new taskPO( "1@qq.com","C:\\Users\\Administrator\\Desktop\\animal2.zip","Fcod","taskname"
//                ,100,10,0,"0"
//                ,a,a) );
//        tran.getta

//        com.example.data.search search=new search();
//        ArrayList<String>xsxs=search.getAlltask( "37482907@qq.com" );
//        webController web=new webController();
//        tran.
//       ArrayList<String>xss=web.getFinishedTasks( "" );

//        ArrayList<String>x=search.getAllTask( "Food","a@qq.com" );
//            com.example.data.account
        //        tran.gettaskUnFinsh(  )

//        tran.addTaskUser( "37482907@qq.com","t222" );
//        String []a="ss".split( ",");
//        taskPO t=new taskPO( "testid","C:\\Users\\Administrator\\IdeaProjects\\COUNTS_Phase_III\\rear\\src\\main\\java\\com\\example\\record\\zip\\aa.zip"
//                ,"Food","t222"
//                ,10,1,0,"0",a,a);
//        t.setTimelength( 10 );
//         tran.addtask(  t);
//

//        webController web=new webController();
//        System.out.println( web.getHintTasks("t", "37482907@qq.com" ));
//
//        com.example.data.account account=new account() ;
//        account.add_point( "testmail","中文" ,1);
//        account.adduser( new userPO( "ids","123",
//                "2@qq.com","12345677891","worker" ) );
//
//        transform t=new transform();
//        search_service search_service=new search();
//        t.getallimage(  )
//        System.out.println( search_service.getduetask());
//        ArrayList<commentPO>scs=t.get_final_of_task( "t" );

//        int a=0;
        int ac=0;
    }
    public Date task_begin_time(String task){
        String sql="select task_begin_time from Tasklist where task_name='"+task+"';";

        return  m.getDate( sql,"task_begin_time" );
    }

    public int num_of_all_task_related(String mail){

        String sql="select count(task_name) as temp from user_task WHERE user_email='"+
                mail+"'";
        return m.searchInt( sql,"temp" );
    }


    public boolean first_online(String mail){

        String sql="select * from user_time WHERE online_date=current_date and user_mail='"+
                mail+"'";
        return m.exist( sql );
    }

    public boolean day_online(String mail,Date day){

        String sql="select * from user_time WHERE online_date='"+day+"' and user_mail='"+
                mail+"'";

        // System.out.println( sql );


        return m.exist( sql );
    }


    public void save_result_of_task(ArrayList<commentPO> save ,String task){
        save_final_of_task(  save,task);
    }

    public     ArrayList<ArrayList<commentPO>> get_result_of_task(String task){
        ArrayList<ArrayList<commentPO>> result=new ArrayList<>(  );;
        ArrayList<String> x=search.getimages( "",task );


        for(String i:x){
            ArrayList<String>  mail=search.get_mail_of_commenter_of_image( task,i );
            ArrayList<commentPO> re1=new ArrayList<>(  );

            for(String j:mail){
                String sql="Select * from comment where user_email = '"+
                        j+"' and task_name = '"+task+"'  and image_name = '"+
                        i+"' ";
                ArrayList<SearchResponcePO> xxxx=m.getcomments( sql );
                commentPO c=new commentPO();
                c.setImage( i );
                c.setMail( j );
                c.setSRPO( xxxx );
                re1.add( c );
            }
            result.add( re1 );
        }

//        for(int i=0)
        return result;

    }


    public ArrayList<commentPO> get_result_of_image(String task,String image){
//        String s="select ta";
        // TODO  好像是弃掉的方法
        return  null;
    }
    public     ArrayList<commentPO> get_final_of_task(String task){
//        getcomments(  )
        ArrayList<commentPO> re=new ArrayList<>(  );

        ArrayList<String>a=search.getimages("",task  );
//        ArrayList<String>a=new ArrayList<>(  );
//        a.add( "image" );
        for(String i:a){
//            ArrayList<SearchResponcePO> finalresult = new ArrayList<SearchResponcePO>();
            String sql="select * from Comment_result where  task_name='"+
                    task+"' and image_name='" +i+"';";
            ArrayList<SearchResponcePO> finalresult=m.getcomments( sql );
            m.close();
            commentPO c=new commentPO();
            c.setImage( i );
            c.setSRPO( finalresult );
            re.add( c );

        }

        return re;


    }
    public void save_final_of_task(ArrayList<commentPO> save ,String task){
        Date date=new Date( System.currentTimeMillis() );
        for(commentPO c:save){
//            m.
//        edit.creatTableComment();;
            for (SearchResponcePO i :c.getSRPO()){
                String Dian="";
                for (pointPO j : i.getList()) {
                    Dian+= "" + j.getx().toString() + "," + j.gety().toString() + ";";
                }
                String a="INSERT INTO Comment_result " +
                        "( task_name , image_name , comment_point ,comment_description , comment_date )" +
                        "  VALUES" +
                        "  (  '"+task+"', '"+c.getImage()
                        +"', '"+Dian+"', '"+i.getDescription()+"' , '"+date+"' );";

                // System.out.println( a );
                m.start( a );
                m.close();

            }
        }
    }





    public ArrayList<Integer> get_comment_time(String task){

        String sql="select count(user_email)as temp  from comment where task_name ='"+task +"'group by image_name  ;";
//
//        "select count( user_email) as temp" +
//                "from comment where task_name ='task2s' group by image_name"
        System.out.println( sql );
        ArrayList<Integer >s=m.getArrInt( sql,"temp");
        m.close();
        return s;


    }

    @Override
    public int num_of_kind_boss(String mail) {
        // todo

        return 0;
    }

    public commentPO get_comment_of_all_task(String task){

        String sql="select count (user_email)as temp  from comments where task_name ='"+task +"'group by image  ;";


        // todo  这个方法好像用不到
        return new commentPO();

    }


    public ArrayList<String> recent_image(String mail, int day) {
        String sql="select DISTINCT image_name ,task_name    from comment where user_email='"+mail +"' and  comment_date >= "+
                "  DATE_SUB(CURDATE(),INTERVAL "+day+" DAY)       ;";

        ArrayList<String>  a=m.getArrString( sql,"image_name" );
//        m.close();
        ArrayList<String>   b=m.getArrString( sql,"task_name" );
//        m.close();
        ArrayList<String> re=new ArrayList<>(  );
//        search.getkind(  )
        for(int i=0;i<a.size();i++){
            re.add( path.SRCimagepath()+"/"
                    +search.getkind( b.get( i ) )+"/"+b.get( i )+"/"+a.get( i ) );
        }
        return re;

//                m.getArrString( sql,"image_name" );


    }
    public int recent_online(int day) {
        String sql="select COUNT(DISTINCT online_date) temp from User_time where  online_date >= "+
                "  DATE_SUB(CURDATE(),INTERVAL "+day+" DAY)    ;";
        int a=m.searchInt( sql,"temp" );
        m.close();

        return a;

    }

    @Override
    public int days_left(String task) {
        String sql="select  " +" DATEDIFF(CURDATE(),task_begin_time ) as temp , task_time_length      "+
                "from Tasklist where  task_name = '"+task+"'  ;";

        int x=m.searchInt( sql ,"temp" );
//        m.close();

        int r=m.searchInt( sql ,"task_time_length" );

        m.close();


        return r-x;
    }

    @Override
    public int num_of_Favorite_kind_task(String mail) {

        search.getAllkinds();
        int x=0;
        String sql="select  COUNT(*)  temp ,task_kind    from tasklist , user_task\n" +
                "where tasklist.task_name =  user_task.task_name\n" +
                "      and  user_task.user_email= '"+mail +
                " ' GROUP BY task_kind";
//            System.out.println( sql );
        ArrayList<Integer>s=m.getArrInt( sql,"temp");
        m.close();

        for(int i:s){
            if(x<i)
                x=i;
        }
        return x;
//        return 1;
    }

    @Override
    public int num_of_task(String mail, String taskkind) {
        String sql="select  COUNT(*) as temp    from Tasklist user_task where  " +
                "Tasklist.task_name =  user_task.task_name  and  user_task.user_email= "+mail
                +"' and task_kind = '"+taskkind+ "' ;";
        int a=m.searchInt( sql,"temp" );
        m.close();

        return a;

    }



    public ArrayList<String>SearchIntegratedTasks(String mail){

        String s="select *  from tasklist ,(select distinct task_name from comment_result) as temp" +
                " WHERE  tasklist.task_name=temp.task_name and user_email='"+
                mail+"' ;";
        System.out.println( s );
        ArrayList<String>a=m.getArrString( s,"task_name" );
        return a;
    }

    public  void update_time(String mail ,int time){  //di yi ci tian jia shi jian

        Date a=new Date( System.currentTimeMillis() );

        String SQL = "update User_time set time_length = " +time +" where user_mail = '"+
                mail+"' and online_date = '"+a+"' ;"  ;
//        System.out.println( SQL );
        m.start( SQL );
        m.close();

    }

    public  void newtime(String mail ,int time){

        Date a=new Date( System.currentTimeMillis() );

        String SQL = "INSERT INTO User_time" +
                "( user_mail , online_date ,time_length  )" + "  VALUES" +
                "  ( '" + mail +"' , '"+a+ "' , " + time+ ");";
        m.start( SQL );
        m.close();

    }


    public  void update_add_time(String mail ,int time){  //di yi ci tian jia shi jian
        Date a=new Date( System.currentTimeMillis() );
        String SQL = "update User_time set time_length =time_length + " +time +" where user_mail = '"+
                mail+"' and online_date = '"+a+"' ;"  ;
        // System.out.println( SQL );
        m.start( SQL );
        m.close();

    }
    //    public ArrayList<String> SearchIntegratedTasks(String email){
//
//        return null;
//    }
    public  int search_online_time(String mail ,String date ){
        String sql="select time_length cd  from User_time where user_mail='"+mail
                +"'  and  online_date  = '"+date+"' ;";
//        System.out.println( sql );
        int a=m.searchInt( sql,"cd" );
        m.close();

        return a;

        //        int aaa=2;
    }



    public  int search_online_date(String mail ){  //di yi ci tian jia shi jian
//        Date a=new Date( System.currentTimeMillis() );
        String sql="select COUNT(online_date) cd  from User_time where user_mail='"+mail+"' ;";

        // System.out.println( sql );
        int a=m.searchInt( sql,"cd" );

        m.close();
        return a;
//        m.start(  );
//        int aaa=2;
    }

    public  int User_image(String mail ){

        String sql="select COUNT(distinct image_name) temp  from Comment where user_email='"+mail+"' ;";

//        System.out.println( sql );
        int a=m.searchInt( sql,"temp" );
        m.close();

        return a;
    }


    public int Continuous_landing_time(String mail){
        Date day=new Date( System.currentTimeMillis() );
        int i=0;
        while (true){
            if(day_online(mail,day))
                i++;
            else
                break;
            String sql="SELECT date_sub('"+day+"',INTERVAL 1 DAY)as cd";

            day=m.getDate( sql,"cd" );

        }
        return i;

//        return Integer.valueOf(  x.replaceAll( "-","" ))-sxx;
    }

    public boolean addtasktest(taskPO t  ,String imagename )  {
//        ArrayList<String> imagelist = search.get( tpath );
        String a = "INSERT INTO Image_test" +
                "( image_name , task_name  )" + "  VALUES" +
                "  ( '" + imagename + "', '" + t.getTaskname() + "');";
        m.start( a );
//        m.close();
        return true;
    }




//    public boolean updateUserpoint(String user,int point,String reason){
//        String a="update point set  point  = "+point +" where user_email = '"+user+"' ;" ;
//        m.start( a );
////        m.close();
//
//        return true;
//    }
//    public boolean getUserpoint(String user,int point){
//        String a="select * from  user_accumulatepoint  where user_name ='"+user+"'" ;
//        m.searchInt(  a,"user_accumulatepoint" );
//        return true;
//    }


//    public boolean AddUserpoint(String mail,int point,String reason){
//        account a=new account();
//        ;
////        userPO u=a.getdetailwithmail( mail );
////        updateUserpoint( mail,point+u.getAccumulatepoint() );
//        updateUserpoint( mail,a.getpoint( mail )+point );
//
//        return true;

//    }


//    public boolean addtask_test(taskPO t)  {
//
//        String zippath = t.getZippath();
//        //
//        String kind = t.getKind();
//        String aimpath = path.getimagetestpath()+"/"+ kind+"/";
//        zip.unZipFiles( zippath, aimpath,t.getTaskname());
//
////        addtasktest(  aimpath + "/" + t.getTaskname(), t );
//        return true;
//    }



    public boolean addtask(taskPO t)  {

        Date d =new Date( System.currentTimeMillis() );

//        t.setBegintime( Integer.valueOf( d.toString().replaceAll( "-","" ) ));

        String a="INSERT INTO Tasklist " +
                "( task_name , task_kind , user_email,task_zippath ,task_time," +
                " task_reword , task_require , task_biaozhutype ,task_tag ,task_tagEle ,task_begin_time , task_time_length )" +
                "  VALUES" +
                "  ( '"+t.getTaskname()+"', '"+t.getKind()+"', '"+t.getId()+"', '"+
                t.getZippath()+"', "+t.getTimes()+", "+t.getReword()+" , "+
                t.getRequire()+" , '"+t.getBiaozhutype()+"' , '"+t.arrtoString( t.gettag() ) +
                " ', '"+t.arrtoString( t.gettagelements() )+ "' ,'"+d+"' , "+

                //
                t.getTimelength() +" );";
        // System.out.println( a );
        m.start( a );
        m.close();

        String zippath = t.getZippath();
        String kind = t.getKind();
        String aimpath = path.getimagepath()+"/"+ kind+"/";
        zip.unZipFiles( zippath, aimpath,t.getTaskname());
        addtaskrecord( aimpath + "/" + t.getTaskname(), t );
        return true;

    }

//    public taskPO gettaskPO(String task,String image)  {   //图片的用户记录
//        String reP = path.getimagerecordspath( task, image );
//        System.out.println( reP );
//        String aaa = edit.getStr( reP);
//        taskPO aim = new taskPO( aaa );
//        return aim;
//    }
//    public boolean deltaskPO(String task,String image) {
////        String task = search.gettask( image );
//        String reP = path.getimagerecordspath( task, image );
//        boolean aaa = edit.delete( reP );
//        return aaa;
//    }
//
//    public boolean addtaskPO(taskPO t, String image)  {
//        String task = t.getTaskname();
//        String reP = path.getimagerecordspath( task, image );
//        boolean aaa = edit.add( t.toString(), reP );
//        return aaa;
//    }

    public boolean addtaskrecord(String tpath, taskPO t) {
        ArrayList<String> imagelist = search.get( tpath );
//        edit.addDictionary( path.getimageRecordDictionaryspath( t.getTaskname() ) );
        for (int i=0;i<5;i++){
            addtasktest( t,imagelist.get( i ));
        }
        for (int i=5;i<imagelist.size();i++) {
            String a="INSERT INTO Imagelist " +
                    "( image_name , task_name , image_restTime )" + "  VALUES" +
                    "  ( '"+imagelist.get( i)+"', '"+t.getTaskname()+"', "+t.getTimes()+" );";
//            System.out.println( a );
            m.start( a );
//            m.close();

        }
        return true;
    }


    public boolean addcomments(String id ,  String task, String image, SearchResponcePO SRPO)  {
        addcommentsWithoutReword(id,task,image,SRPO);
//        taskPO t = gettask( task );
//        t.setTimes( t.getTimes() - 1 );
//        int reword = t.getReword();
//        account a = new account();
//        userPO u = a.getuserdetailwithid( id );
//        u.setAccumulatepoint( u.getAccumulatepoint() + reword );
//        a.edituser( u );
//        return addcommentsStr( id,task, image, save );
        return true;
    }


    public boolean addTaskUser(String id, String task) {
        String a="INSERT INTO user_task " +
                "( task_name, user_email ,state )" + "  VALUES" +
                "  ( '"+task+"', '"+id+"', '"+"add "+ "' );";

//        System.out.println( a );
        m.start( a );
//        m.close();

        return true;
    }


    public boolean user_time(String id, String state) {
        Date time=new  Date(System.currentTimeMillis());

        String a="INSERT INTO user_task " +
                "( online_time, user_email ,state )" + "  VALUES" +
                "  ( "+time+" , '"+id+"', '"+" add "+ "' );";
        m.start( a );
//        m.close();

        return true;
    }



    public boolean addcommentsWithoutReword(String id,String task, String image, SearchResponcePO SRPO) {
        String save = "";
        for (pointPO i : SRPO.getList()) {
            save +=String.format("%.8f", i.getx()) + "," + String.format("%.8f", i.gety()) + ";";
        }


        Date date=new Date( System.currentTimeMillis() );
//        edit.creatTableComment();;
        String a="INSERT INTO Comment " +
                "( user_email ,task_name , image_name , comment_point ,comment_description , comment_date )" +
                "  VALUES" +
                "  ( '"+id+"', '"+task+"', '"+image+"', '"+save+"', '"+SRPO.getDescription()+"' , '"+date+"'     );";
        // System.out.println( a );
        m.start( a );
        System.out.println( "test   "+save );
        String b="UPDATE imagelist SET  image_restTime=image_restTime-1 " +
                "WHERE image_name ='"+image+"' and task_name='"+task+"'";
        m.start( b );
//        m.close();

        return  true;

    }

    public boolean deltask(String task, String id) {
        String a="UPDATE  user_task " +
                "SET state='del' where " +
                "  task_name= '"+task+"' and user_email = '"+id+"' ;";
//        System.out.println( a );
//        System.out.println( a );
        m.start( a );
//        m.close();

        return true;
    }

    public int getRequire(String task) {
        String sql="select * from Tasklist where task_name ='"+task +"';";
        int r=m.searchInt( sql,"task_require");
//        System.out.println( r );
//        m.close();

        return r;
    }

    public ArrayList<SearchResponcePO>  getcomments(String id,String task, String image)  {
        ArrayList<SearchResponcePO> finalresult = new ArrayList<SearchResponcePO>();
        String sql="select * from Comment where user_email='"+id+"' and task_name='"+
                task+"' and image_name='" +image+"';";

        ArrayList<SearchResponcePO> a=m.getcomments( sql );
        m.close();
        return a;
//        String comments = "";
//        comments = getcommentsStr( id,task, image );
//        if(comments.length()==0){
//            return finalresult;
//        }
//        String[] line = comments.split( "\n" );
//
//        for (int i = 0; i < line.length; i++) {
//            ArrayList<pointPO> points = new ArrayList<>();
//            String[] pointstr = line[i].split( ";" );
//            for (int j = 0; j < pointstr.length - 1; j++) {
//                String[] point = pointstr[j].split( "," );
//                Double x = Double.parseDouble( point[0] );
//                Double y = Double.parseDouble( point[1] );
//                pointPO finalpoint = new pointPO( x, y );
//                points.add( finalpoint );
//            }
//            int a = points.size();
//            finalresult.add( new SearchResponcePO( points, pointstr[pointstr.length - 1] ) );
//            points.clear();
//        }
    }

//    public boolean addcommentsStr(String id ,String task, String image, String comment) {
//        String userpath = path.getcommentspath();
//        String imagepath = userpath+"/"+id + "/" + task;
//        edit.addDictionary( imagepath );
//        imagepath = userpath+"/"+id + "/" + task+ "/" + image + ".txt";
////        edit.add( comment, path.getimagerecordspath( task, image ) );
//        return edit.add( comment, imagepath );
//    }

    //    public String getcommentsStr(String id ,String task, String image) {
//        String commentpath = path.getcommentspath();
//        String imagepath = commentpath +"/"+id+"/"+task+ "/" + image + ".txt";
//
//        if(!edit.exist( imagepath)){
//            return "";
//        }else{
//            return edit.getStr( imagepath );
//        }
//    }
//    public taskPO gettask(String task){
//        String sql="select * from tasklist where task_name= '"+task+"';";
//        return  m.gettask( sql );
//
//    }
    public boolean deletecomments(String id,String task, String image) {

        String a="DELETE FROM Comment WHERE user_email = '"+id+"' and task_name = '"
                +task+"'  and image_name = '"+image+"'   ;";
        m.start( a );
        m.close();
        return true;


    }
    public boolean deleteonecomments(String id,String task, String image, SearchResponcePO aimpoints) throws IOException {
        String a="DELETE FROM Comment WHERE user_email = '"+id+"' and task_name = '"
                +task+"'  and image_name = '"+image+"'    ;";
        m.start( a );
        m.close();
        return true;
    }
//    public ArrayList<SearchResponcePO> aaaaaaa(String image) {
//        account accou = new account();
//        String upath = path.getcommentspath();
//        ArrayList<String> list = search.get( upath );
//        ArrayList<SearchResponcePO> result
//                = new ArrayList<>();
//        for (String i : list) {
//            ArrayList<String> list1 = search.get( upath + "/" + i );
//            for (String j : list1) {
//                if (j.split( "," )[0].equals( image )) {
//                    result.addAll( getcomments( i,j, image ) );
//
//                }
//            }
//        }
//        return result;
//    }


    public int getallimagenum(String mail){
        String sql="select * from Comment where user_email='"+mail+"' ;";

        return m.getArrString( sql ,"image_name").size();

    }


    public ArrayList<String> getallimage(String id, String task) {

        String sql="select * from Comment where user_email='"+id+"' and task_name='"+
                task+"';";

        return m.getArrString( sql ,"image_name");
//        String tpath = path.getcommentspath() + "/" + id+"/"+task;
//        ArrayList<String> list = search.get( tpath );
//        ArrayList<String> need = new ArrayList<>();
//        for (String i : list) {
//            need.add( i.replace( ".txt", "" ) );
//        }
//
//        return need;


    }

    //
    public ArrayList<String> gettaskname(String id) {
        String sql="select * from user_task where user_email='"+id+"' and state = 'add'  ;";
        return m.getArrString( sql ,"task_name");

        //        String p=path.getcommentspath()+"/"+id;
//        return search.get( p );
    }

    public ArrayList<String> gettaskFinsh(String id) {
        return subArr( gettaskname( id ),gettaskUnFinsh( id ) );
    }
    public ArrayList<String> gettaskUnFinsh(String id) {
//        ArrayList<String> s=new ArrayList<String>();
//        String compath=path.getcommentspath()+"/"+id;
//        ArrayList<String> alltask=search.get(compath);
//        for(String i:alltask){
//            ArrayList<String> tasktest= getUnAlreadyImage( i );
//            ArrayList<String> idUNFINISHimages
//                    =subArr(getAlLImage( i ), search.get( compath+"/"+i ));
//            for(String j:tasktest ){
//                int flag=0;
//                for(String k:idUNFINISHimages){
//                    if(j.equals( k ))
//                        flag=1;
//                }
//                if(flag==1){
//                    s.add( i );
//                    break;
//                }
//            }
//        }

        String sql="select * from user_task where user_email='"
                +id+"' and state = 'add'  ;";
        ArrayList<String> task=m.getArrString( sql ,"task_name");
        ArrayList<String> result=new ArrayList<>(  );
        for(String i:task){
            String sql2="select count(image_name) as temp " +
                    "from comment where comment.user_email='"
                    +id+"' and task_name = '"+i+"'       ;";
            int x=m.searchInt( sql2 ,"temp");
            String sql3="select count(image_name) as temp " +
                    "from imagelist where task_name = '"+i+"' ";
            int y=m.searchInt( sql3 ,"temp");
            if(x!=y)
                result.add( i );

        }

        return result;

//        return s;
    }
//    public ArrayList<String> getALLtask(String id){
//        return gettaskname( id );
//
//
//    }

    //    public ArrayList<String> getworkname(String taskname) {
//        ArrayList<String> users=search.get(  path.getcommentspath());
//        ArrayList<String> result=new ArrayList<>();
//        for(String i:users){
//            ArrayList<String> tasks  =  search.get(  path.getcommentspath()
//                    +"/"+i);
//            for(String j:tasks){
//                if (j.equals(  taskname)){
//                    result.add( i );
//                }
//            }
//        }
//        return result;
//    }
    public ArrayList<String> getAlreadyImage(String taskname) {

        String sql="select * from Imagelist where task_name='"+taskname+
                "' and image_restTime <=0 ;";

        ArrayList<String> times=m.getArrString( sql ,"image_name");

        return times;
    }

    public ArrayList<String> workergettest(String task) {

        String sql="select * from Image_test where task_name='"+task+ "' ;";

        ArrayList<String> times=m.getArrString( sql ,"image_name");

        return times;
    }

    public ArrayList<String> getAlLImage(String taskname) {
        String sql="select * from Imagelist where task_name='"+taskname+
                "' ;";

        ArrayList<String> times=m.getArrString( sql ,"image_name");
        System.out.println(times);
        return times;
    }


    public ArrayList<String> getUnAlreadyImage(String taskname) {
        String sql="select * from Imagelist where task_name='"+taskname+
                "' and image_restTime >0 ;";

        ArrayList<String> times=m.getArrString( sql ,"image_name");

        return times;
    }

    public ArrayList<String> subArr(ArrayList<String> a,ArrayList<String> b){
        ArrayList<String> result=new ArrayList<>(  );
        result.addAll( a );

        for(String i:a){
            for(String j:b){
                if(i.equals( j )){
                    result.remove( j );
                    break;
                }
            }
        }
        return  result;
    }
    public boolean imageFinish(String task,String image) {
        //todo
        String sql="select * from Imagelist where image_name='"+image
                +"' and task_name='"+task+"';";

        int times=m.searchInt( sql ,"image_restTime");
        if(times<=0){
            return true;
        }else{
            return false;
        }
    }
    public ArrayList<String>  getReleasedtasks(String id)  {

        String sql="select * from Tasklist where user_email = '"+id +"';";
        // System.out.println( sql );
        ArrayList<String> result=m.getArrString( sql,"task_name" );

        return result;
    }
    public taskPO gettask(String task){
        String sql="select * from Tasklist where task_name='"+task+"';";

        return  m.gettask( sql );
    }



    public int getYesterdayOnlinetime(String user){
//        Date today = new Date( System.currentTimeMillis() );
//        Calendar c = Calendar.getInstance();
//        c.setTime(today);

//        c.add(Calendar.DAY_OF_MONTH, -1);// 今天+1天
//        Date yester= (Date) c.getTime();

        String sql="select * from user_time where user_mail='"+user
                +"'  and  online_date = date_sub(current_date(),interval 1 day)   ;";
        try {
            int x=m.searchInt( sql,"time_length" );
            return x;
        }catch (Exception e){
            return  0;
        }

    }

    @Override
    public int num_of_kind(String mail) {
        // todo 两种不同的mail
        String sql;
        userPO u=account.getdetailwithmail( mail );
        System.out.println( u.getKind() );
        if(u.getKind().equals( "worker")) {
            sql = "SELECT  count(DISTINCT task_kind) temp  from comment ,tasklist " +
                    " WHERE comment.user_email='" + mail + "' and comment.task_name=tasklist.task_name   ;";
        }else{
            sql = "SELECT  count(DISTINCT task_kind) temp  from tasklist " +
                    " WHERE  user_email= '"+mail+"'";
        }
        System.out.println( m.searchInt( sql,"temp" ) );
        return m.searchInt( sql,"temp" );
    }

    public int getonlinetime(String user,String date){

        String sql="select * from User_time where user_name='"+user+"'  and online_time like "+
                date +"%  ORDER BY column_name online_time;";

        ArrayList<String> list=m.getArrDate( sql,"online_time" );
        int x=0;
        for(int i=0;i<list.size();i+=2){
            x+=Integer.valueOf( list.get( i ) )-Integer.valueOf( list.get( i+1 ) );
        }
        return  x;
    }







    public ArrayList<String> gettime(String user){

        String sql="select * from User_time where user_name='"+user+"'  ;";
        return  m.getArrDate( sql,"online_time" );


    }





    public boolean taskisFinish(String task){
//        String p=path.getimagerecordspath()+"/"+task;

        String sql1="SELECT  count(task_name) temp from tasklist " +
                "WHERE date_add(current_date(),interval task_time_length day)<current_date" +
                " AND task_name ='"+task+"'";
//        int x=0;
        if(m.searchInt( sql1,"temp" )>0)
            return true;

        ArrayList<String> imlist= getAlLImage( task );
        for(String i:imlist){
            String sql="select * from Imagelist where image_name='"+i
                    +"' and task_name='"+task+"';";

            int times=m.searchInt( sql ,"image_restTime");
            if(times>0){
                return false;
            }
        }



        return true;
    }






}