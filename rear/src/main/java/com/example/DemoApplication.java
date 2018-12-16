package com.example;

import com.example.data.mysql;
import com.example.logic_layer.MyThread;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
        //Operation_service os=new Operation();
        //System.out.println(os.getFinishedTasks("孙知良"));
		//aimpath a=new aimpath();
		//System.out.println(  a.getbasicpath());
//		mysql m=new mysql();
//		m.init();
	    SpringApplication.run(DemoApplication.class, args);

		/*MyThread t=new MyThread();
		Thread thread=new Thread(t);
		thread.start();*/
        //account_service as=new account();
        //userPO up=as.getdetailwithmail("1158873864@qq.com");
        //System.out.println(up.getId());
		/*transform ts=new transform();
        Operation_service os=new Operation();
        search_service ss=new search();
        System.out.println(ss.getAlltask());
        System.out.println(os.getFinishedTasks("jj"));
        System.out.println(os.getUnfinishedTasks("jj"));
        System.out.println(ts.gettaskname("jj"));
        System.out.println(os.getIrrelatedTasks("jj"));*/
        //System.out.println(os.showTaskDetail(,"fr"));//os.getFinishedTasks("1158873864@qq.com").size());

        //ts.addTaskUser("xl","bread");
       // String re=os.askForTask("1158873864@qq.com","bread");
       // System.out.println(re);
        //System.out.println(os.getpictures("cat").get(0));
		//register re=new register();
		//System.out.println(re.validate("1158873864@qq.com","80687"));
/*
		int bytesum = 0;
		int byteread = 0;

		try {
			InputStream inStream =new FileInputStream("C://Users//T5//Desktop//1.rar");    //读入原文件
			path_service tem=new aimpath();
			FileOutputStream fs = new FileOutputStream(tem.getzippath()+"/1.zip");
			byte[] buffer = new byte[1444];
			int length;
			while ( (byteread = inStream.read(buffer)) != -1) {
				bytesum += byteread;            //字节数 文件大小
				System.out.println(bytesum);
				fs.write(buffer, 0, byteread);
			}
			inStream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}*/


	}
}
