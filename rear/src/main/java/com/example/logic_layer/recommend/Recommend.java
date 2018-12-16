package com.example.logic_layer.recommend;

import com.example.PO.taskPO;
import com.example.PO.userPO;
import com.example.data.*;
import com.example.logic_layer.Operation.Operation_service;
import com.example.logic_layer.algorithm.algorithm;
import com.example.logic_layer.algorithm.algorithm_service;
import com.example.logic_layer.logic_Factory;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;

public class Recommend implements Recommend_service {

    private int u = 0;//用户的个数
    private int m = 0;//资料的个数
    private int n = 0;//特征的个数
    private double[][] x = new double[u][n];//用户-特征矩阵
    private double[][] thate = new double[m][n];//资料-特征矩阵
    private double[][] x_partial = new double[u][n];//用来存储参数的梯度
    private double[][] thate_partial = new double[m][n];//用来存储参数的梯度
    private double lambda = 1;//正则化参数
    private double alpha = 0.007;//步长

    public static Vector<String> indata = new Vector<>();  //存储从文件中读取的原始数据
    public static Vector<double[]> data = new Vector<>();  //存储经过处理后的每一个样本的各个属性值和所属分类
    public static Vector<double[]> init_kernal = new Vector<>();//存储每次迭代产生的聚类核心的每个属性值的均值
    public static  int count;
    public static boolean loadData(String url) {//加载测试的数据文件
        try {
            Scanner in = new Scanner(new File(url));//读入文件
            while (in.hasNextLine()) {
                String str = in.nextLine();//将文件的每一行存到str的临时变量中
                indata.add(str);//将每一个样本点的数据追加到Vector 中
            }
            return true;
        } catch (Exception e) { //如果出错返回false
            return false;
        }
    }


    public static void pretreatment(Vector<String> indata) {   //数据预处理，将原始数据中的每一个属性值提取出来存放到Vector<double[]>  data中
        int i = 0;
        String t;
        while (i < indata.size()) {//取出indata中的每一行值
            double[] tem = new double[5];
            t = indata.get(i);
            String[] sourceStrArray = t.split(",", 5);//使用字符串分割函数提取出各属性值

            for (int j = 0; j < 4; j++) {
                tem[j] = Double.parseDouble(sourceStrArray[j]);//将每一个的样本的各属性值类型转换后依次存入到double[]数组中
            }
            tem[4] = 0;//tem的第五个值表示所属类别，1.0表示第一类，2.0表示第二类，3.0表示第三类，初始化为0不属于任何类
            data.add(tem);//将每一个样本加入到data中
            i++;
        }

    }
    public static void ini(ArrayList<String> taskName){
        data.clear();
        init_kernal.clear();
        indata.clear();
        for(int i=0;i<taskName.size();i++){
            double[] tem = new double[5];
            logic_Factory lf=new logic_Factory();
            Operation_service os=lf.getOperation();
            transform_service ts=new transform();
            taskPO task=ts.gettask(taskName.get(i));
            String type=task.getKind();
            if(type.equals("Animal")){
                tem[0]=1;
            }
            else if(type.equals("Nature")){
                tem[0]=2;
            }
            else if(type.equals("Food")){
                tem[0]=3;
            }
            else if(type.equals("Human")){
                tem[0]=4;
            }
            else if(type.equals("Cartoon")){
                tem[0]=5;
            }
            else if(type.equals("other")){
                tem[0]=6;
            }
            else{
                tem[0]=0;
            }
            int reward=task.getReword();
            tem[1]=reward;
            String biaozhu=task.getBiaozhutype();
            tem[2]=Double.valueOf(biaozhu);
            tem[3]=task.getRequire();
            tem[4]=0;
            data.add(tem);
        }
    }

    public static Vector<double[]> set_kernal(Vector<double[]> data, int a, int b, int c) {//设置初始的聚类核心，a，b，c分别表示一个类的核心在data中的编号
        init_kernal.add(data.get(a));
        init_kernal.add(data.get(b));
        init_kernal.add(data.get(c));
        return init_kernal;

    }

    public static int choose(double[] data, double[] a, double[] b, double[] c) {//判断一个样本属于哪一个类，返回值1表示第一类，2表示第二类，3表示第三类
        double ta, tb, tc;
        //ta，tb，tc分别表示一个样本点到三个聚类核心的欧式距离的平方
        ta = (data[0] - a[0]) * (data[0] - a[0]) + (data[1] - a[1]) * (data[1] - a[1]) + (data[2] - a[2]) * (data[2] - a[2]) + (data[3] - a[3]) * (data[3] - a[3]);
        tb = (data[0] - b[0]) * (data[0] - b[0]) + (data[1] - b[1]) * (data[1] - b[1]) + (data[2] - b[2]) * (data[2] - b[2]) + (data[3] - b[3]) * (data[3] - b[3]);
        tc = (data[0] - c[0]) * (data[0] - c[0]) + (data[1] - c[1]) * (data[1] - c[1]) + (data[2] - c[2]) * (data[2] - c[2]) + (data[3] - c[3]) * (data[3] - c[3]);

        if (ta == Math.min(Math.min(ta, tb), tc))   //如果到第一类的距离最小返回1
            return 1;
        else if (tb == Math.min(Math.min(ta, tb), tc))//如果到第二类的距离最小返回2
            return 2;
        else if (tc == Math.min(Math.min(ta, tb), tc))//如果到第三类的距离最小返回3
            return 3;
        return 0;
    }




    public static Vector<double[]> onestep(Vector<double[]> data, Vector<double[]> kernal) {//函数执行一次表示kmeans的一次迭代
        Vector<double[]> newkernal = new Vector<>();//用于存放一次迭代后新的类的核心的各属性值
        int i = 0;
        double[] a = kernal.get(0); //a赋值为当前第一个类的核心
        double[] b = kernal.get(1); //b赋值为当前第二类的核心
        double[] c = kernal.get(2); //c赋值为当前第三类的核心
        double[] temp;

        while (i < data.size()) {//取出data中的每一个样本存放在temp中
            temp = data.get(i);
            temp[4] = (double) choose(temp, a, b, c);//调用choose函数判断当前样本属于哪一个类
            i++;
        }


        double[] suma = {0, 0, 0, 0};
        int al = 0;//表示当前第一类的样本个数
        double[] sumb = {0, 0, 0, 0};
        int bl = 0;//当前第二类的样本个数
        double[] sumc = {0, 0, 0, 0};
        int cl = 0;//当前第三类的样本个数
        i = 0;
        while (i < data.size()) {
            double[] t = data.get(i);
            if (t[4] == 1.0) {     //如果当前样本属于第一类
                for (int j = 0; j < 4; j++) {
                    suma[j] = suma[j] + t[j];
                }
                al++;             //该类的样本个数加一
            } else if (t[4] == 2.0) {
                for (int j = 0; j < 4; j++) {
                    sumb[j] = sumb[j] + t[j];

                }
                bl++;
            } else if (t[4] == 3.0) {
                for (int j = 0; j < 4; j++) {
                    sumc[j] = sumc[j] + t[j];

                }
                cl++;
            }
            i++;//指向下一个样本继续循环
        }

        for (int j = 0; j < 4; j++) {//计算出本次迭代后的每个类的核心的坐标
            suma[j] = suma[j] / al;
            sumb[j] = sumb[j] / bl;
            sumc[j] = sumc[j] / cl;

        }
        //将新的类的核心添加入到newkernal中
        newkernal.add(suma);
        newkernal.add(sumb);
        newkernal.add(sumc);
        return newkernal;//返回本次迭代后的新的类的核心
    }


    public static void k_means() {//k_means算法的实现

        while (true) {
            boolean con = true;
            Vector<double[]> t = onestep(data, init_kernal);//将 data和当前的init_kernal传入onestep函数进行一次迭代，返回值为迭代后的类的核心

            //判断本次迭代后返回的类的核心是不是和迭代之前的类的核心相同，如果不相同con被设为false，继续迭代。
            for (int i = 0; i < t.size(); i++) {
                for (int j = 0; j < 4; j++) {
                    if (t.get(i)[j] != init_kernal.get(i)[j])
                        con = false;
                }
            }
            if (con)//如果con为true说明本次迭代的核心和迭代之前的核心相同，说明聚类完成，退出循环
                break;
            else
                init_kernal = t;//如果本次迭代返回的新的核心和迭代之前的不同，则当前核心设置为返回的新的核心，继续循环迭代
        }

    }

    public static void show_category() {//打印出所有的样本的属性和所属类别
        for (int i = 0; i < data.size(); i++) {
            System.out.print((i + 1) + "  ");
            for (int j = 0; j < 5; j++) {
                System.out.print(data.get(i)[j] + "  ");
            }
            System.out.println();
        }

    }
    @Override
    public ArrayList<String> Collaborative_filter(String workerEmail) {
        transform_service ts=new transform();
        algorithm_service ass=new algorithm();
        search_service ss=new search();
        account_service as=new account();
        ArrayList<String> tasks=ss.getAlltask();
        ArrayList<userPO>  users=as.getuser();
        ArrayList<ArrayList<Integer>> ju=new ArrayList<ArrayList<Integer>>();
        for(int i=0;i<tasks.size();i++){
            ArrayList<Integer> tem00=new ArrayList<>();
            for(int u=0;u<users.size();u++){
                tem00.add(0);
            }
            ju.add(tem00);
        }
        for(int i=0;i<tasks.size();i++){
            for(int u=0;u<users.size();u++){
                int temInt=ts.getallimage(users.get(u).getEmail(),tasks.get(i)).size();
                ArrayList<Integer> tem=ju.get(i);
                tem.set(u,temInt);
                ju.set(i,tem);
            }
        }
        ArrayList<ArrayList<Integer>> similarity=ass.Collaborative_filtering(ju);
        ArrayList<String> tasksOfTheWorker=ts.gettaskname(workerEmail);
        ArrayList<String> result=new ArrayList<>();
        for(int i=0;i<tasksOfTheWorker.size();i++){
            int index=0;
            for(int u=0;u<tasks.size();u++){
                if(tasks.get(u).equals(tasksOfTheWorker.get(i))){
                    index=u;
                    break;
                }
            }
            ArrayList<Integer> tem2=similarity.get(index);
            int max=tem2.get(0);
            int maxindex=0;
            for(int u=0;u<tem2.size();u++){
                if(tem2.get(u)>max){
                    max=tem2.get(u);
                    maxindex=u;
                }
            }
            String task3=tasks.get(maxindex);
            if(!result.contains(tasks.get(maxindex))){
                result.add(tasks.get(maxindex));
            }


        }

        return result;
    }

    @Override
    public ArrayList<String> Shallow_recommend() {
        account_service as=new account();
        ArrayList<userPO> tem=as.getuser();
        ArrayList<String> result=new ArrayList<>();
        int t=0;
        int max=as.getpoint(tem.get(0).getEmail());
        for(int u=0;u<tem.size();u++) {
            for (int i = 1; i < tem.size(); i++) {
                if (tem.get(i).getKind().equals("boss")) {
                    if (as.getpoint(tem.get(i).getEmail()) > max) {
                        max = as.getpoint(tem.get(i).getEmail());
                        t = i;
                    }
                }
            }
            userPO user=tem.get(t);
            transform_service ts=new transform();
            ArrayList<String> tem2=ts.gettaskUnFinsh(user.getEmail());
            //添加入result中
            if(tem2.size()>tem.size()){
                for(int y=0;y<tem.size();y++){
                    result.add(tem2.get(y));
                }
            }else{
                for(int y=0;y<tem2.size();y++){
                    result.add(tem2.get(y));
                }
            }

            tem.remove(t);
        }



        return result;
    }
//基于内容的推荐
    public ArrayList<String> CB(String email){

        ArrayList<String> result=new ArrayList<>();
        logic_Factory lf=new logic_Factory();
        Operation_service os=lf.getOperation();
        ArrayList<String> alltask=os.getAlltasks();
        ArrayList<String> irtask=os.getIrrelatedTasks(email);
        ArrayList<String> retask=new ArrayList<>();
        for(String i:alltask){
            if(!irtask.contains(i)){
                retask.add(i);
            }
        }

        ini(alltask);
        set_kernal(data, 2, 4, 6);//设置初始核心

        k_means();
        ArrayList<Integer> s=new ArrayList<>();
        for(int i=0;i<data.size();i++){
            s.add(0);
        }
        for(int i=0;i<retask.size();i++){
            for(int j=0;j<alltask.size();j++){
                if(retask.get(i).equals(alltask.get(j))){
                    double temp=data.get(j)[4];
                    s.set((int)temp,s.get((int)temp)+1);
                    break;
                }
            }
        }

            int max = Collections.max(s);
            for (int i = 0; i < s.size(); i++) {
                if (max == s.get(i)) {
                    s.set(i, 0);
                    for (int j = 0; j < data.size(); j++) {
                        System.out.println(data.get(j));
                        if (i == (int) data.get(j)[4] && (irtask.contains(alltask.get(j)))&&!(result.contains(alltask.get(j)))) {
                            result.add(alltask.get(j));
                        }
                    }
                }
            }



        System.out.println(irtask);
        System.out.println(result);
        return result;
    }

    public ArrayList<String>  SVD_recommend() throws IOException {
        double[][] user_material = new double[u][m];//用户资料评分矩阵
        //init(user_material);
        search_service ss = new search();
        ArrayList<String> tasks = ss.getAlltask();
        if(tasks.size()>0) {
            return tasks;
        }
        else{
        int time = 0;

        while (time++ < 200) {
            setThate_partial(user_material);
            setX_partial(user_material);
            update();
            double[][] matrixProduct = matrixProduct(x, thate);
            double lossPre = lossFunction(user_material, matrixProduct);
            System.out.println("第" + time + "次的损失函数值：" + lossPre);
        }
        showMatrix(matrixProduct(x, thate));
        double[][] matrixProduct = matrixProduct(x, thate);
        List users = new ArrayList<userPO>();
        path_service pa = new aimpath();
        File fileName = new File(pa.getbasicpath() + "/re" + "/out.txt");
        fileName.createNewFile();
        BufferedWriter out = new BufferedWriter(new FileWriter(fileName));
        for (int i = 0; i < matrixProduct.length; i++) {
            for (int k = 0; k < matrixProduct[0].length; k++) {
                //userPO user = new userPO(i + 1, k + 1, matrixProduct[i][k]);
                //users.add(user);
                out.write(matrixProduct[i][k] + " ");
            }
            out.write("\r\n");
        }
        sortGradeMethod(users);
        for (int q = 1; q <= u; q++) {
            System.out.print("第" + q + "个用户输出：");
            int p = 1;
            Iterator iterator = users.iterator();
            while (iterator.hasNext()) {
                userPO user1 = (userPO) iterator.next();
                /*if (user1.getUserId() == q) {
                    System.out.print("(" + user1.getMaterialId() + "," + ")");
                    p++;
                    if (p == 11) {
                        System.out.println();
                        break;
                    }
                }*/
            }
        }
        return tasks;
        }

    }


    //输出矩阵
    private void showMatrix(double[][] a) {
        for (int i = 0; i < a.length; i++) {
            for (int k = 0; k < a[0].length; k++)
                if (k == 0) {
                    System.out.print(a[i][k]);
                } else if (k == a[0].length - 1) {
                    System.out.println("," + a[i][k]);
                } else System.out.print("," + a[i][k]);
        }
    }

    private void initPQ(){
        for (int i=0;i<u;i++) {
            for (int k = 0; k < n; k++) {
                x[i][k] = Math.random();//随机产生数据
            }
        }
        for (int p=0;p<m;p++){
            for (int q=0;q<n;q++){
                thate[p][q]=Math.random();
            }

        }
    }

    private double[][] matrixProduct(double[][] a,double[][] b){
        double[][] matrixProduct=new double[a.length][b.length];
        for (int i=0;i<a.length;i++){
            for (int k=0;k<b.length;k++){
                double matrix=0;
                for (int q=0;q<n;q++){
                    matrix+=a[i][q]*b[k][q];
                }
                matrixProduct[i][k]=matrix;

            }
        }
        return matrixProduct;
    }
    //求X矩阵中参数的梯度
    private void setX_partial(double[][] user_material){
        for (int i=0;i<u;i++) {
            for (int j = 0; j < n; j++) {
                x_partial[i][j] = 0;
                for (int k = 0; k < m; k++) {
                    if (user_material[i][k] != -1) {
                        x_partial[i][j] += (getPredict(i, k) - user_material[i][k]) * thate[k][j]+lambda * thate[k][j];
                    }
                }
            }
        }
    }


//初始化分解后的两个矩阵

    //求Thate矩阵中各参数的偏导数
    private void setThate_partial(double[][] user_material){
        for (int i=0;i<m;i++){
            for (int j=0;j<n;j++){
                thate_partial[i][j]=0;
                for (int k=0;k<u;k++){
                    if (user_material[k][i]!=-1){
                        thate_partial[i][j]+=(getPredict(k,i)-user_material[k][i])*x[k][j]+lambda*x[k][j];
                    }
                }
            }
        }
    }
    //求偏导数要用的
    private double getPredict(int i,int k){
        double pre=0;
        for (int p=0;p<n;p++){
            pre+=x[i][p]*thate[k][p];
        }
        return pre;
    }
    //优化分解后的两个矩阵
    private void update() {
        for (int i = 0; i < x.length; i++){
            for (int j = 0; j < x[0].length; j++) {
                x[i][j] -= alpha * x_partial[i][j];
            }
        }
        for (int p=0;p<thate.length;p++){
            for (int q=0;q<thate[0].length;q++){
                thate[p][q]-=alpha*thate_partial[p][q];
            }
        }
    }
    //采用平方损失函数
    private double lossFunction(double[][] a,double[][] b){
        double lossPre=0.0;
        for (int i=0;i<a.length;i++){
            for (int j=0;j<a[0].length;j++){
                if (a[i][j]!=-1){
                    lossPre+=(a[i][j]-b[i][j])*(a[i][j]-b[i][j]);
                }
            }
        }
        return lossPre;
    }

    //根据预测的评分大小将数据排序
    private void sortGradeMethod(List list){
        Collections.sort(list, new Comparator() {
            @Override
            public int compare(Object o1, Object o2) {
                return 0;
            }
            /*public int compare(Object o1, Object o2) {
                userPO user1= (userPO) o2;
                userPO user2= (userPO) o1;
                if (user1.getGrade()>user2.getGrade())return 1;
                else if (user1.getGrade()==user2.getGrade())return 0;
                else return -1;
            }*/
        });
    }
}