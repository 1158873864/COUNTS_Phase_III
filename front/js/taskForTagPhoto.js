//我的任务 -> 添加任务
function toAddTask(){
    document.getElementById("tabsForMyTask").setAttribute("style", "display:none");
    document.getElementById("tabsForAllTask").setAttribute("style", "display:block");
    $("#toolsForMyTask").fadeOut(100);
    window.setTimeout(function(){$("#toolsForAllTask").fadeIn()},100);
    $("#myTaskList").fadeOut(100);
    $("#allTaskList").fadeIn();

}

//添加任务 -> 我的任务
function toMyTask(){
    document.getElementById("tabsForAllTask").setAttribute("style", "display:none");
    document.getElementById("tabsForMyTask").setAttribute("style", "display:block");
    $("#toolsForAllTask").fadeOut(100);
    window.setTimeout(function(){$("#toolsForMyTask").fadeIn()},100);
    $("#allTaskList").fadeOut(100);
    $("#myTaskList").fadeIn();

}

//点击任务展示具体图片集，我的任务 -> 具体图片集
function showTask(task,readOnlyOrNot){  //readOnlyOrNot表示是否是通过预览模式进入任务查看图片
    var taskID=task.children[1].innerHTML;  //用来查找具体任务的任务描述

    /* 根据taskID加载album,根据readOnlyOrNot判断是否给Photo添加showPicture函数 */
    getImagesOfTask(taskID,readOnlyOrNot);
    loading();  //加载动画

    if(readOnlyOrNot==false){   //从mytask进入,可标注
        $("#myTaskList").fadeOut(100);
        $("#toolsForMyTask").fadeOut(100);
        $("#tabsForMyTask").fadeOut(100);
        $("#addTaskButton").fadeOut(100);
        window.setTimeout(function(){$("#deleteTaskButton").fadeIn()},100);
        window.setTimeout(function(){$("#album").fadeIn()},100);

        //开始计时工作时间
        startCount();
    }
    else{    //从addTask进入,预览模式，不可标注
        $("#allTaskList").fadeOut(100);
        $("#toolsForAllTask").fadeOut(100);
        $("#tabsForAllTask").fadeOut(100);
        $("#deleteTaskButton").fadeOut(100);
        window.setTimeout(function(){$("#addTaskButton").fadeIn()},100);
        window.setTimeout(function(){$("#album").fadeIn()},100);
    }

    document.getElementById("albumTitle").innerHTML=taskID; //设置标题
    document.getElementById("marker").innerText=taskID.charAt(0);
    document.getElementById('down').click(); //通过点击下拉箭头获得SmoothScroll效果,因为tempItem出现的时候down必定与#tagPhoto连接，所以很OK

    /*** 根据taskID获得任务的 单张积分奖励 和 剩余时间（单位：天）***/

    var scorePerPic=10;
    var leftTime=28;

    $.ajax(
        {
            url: "http://localhost:8080/getRemainingtime",
            data: {
                taskName: taskID
            },
            async: false,
            success: function (d) {
                leftTime=d;
            },
            error: function (xhr) {


            },
            traditional: true,
        }
    )

    $.ajax(
        {
            url: "http://localhost:8080/getOnePicReward",
            data: {
                taskName: taskID
            },
            async: false,
            success: function (d) {
                scorePerPic=d;
            },
            error: function (xhr) {


            },
            traditional: true,
        }
    )



    document.getElementById("scorePerPic").innerText=scorePerPic.toString();
    document.getElementById("leftTime").innerText=leftTime.toString();
}

//显示任务详细信息
function showTaskInfo(){
    $("#detailInfo").fadeIn();
}

//隐藏任务信息
function hideTaskInfo(){
    $("#detailInfo").fadeOut();
}

//具体图片集 ->(返回) 我的任务
function backToTaskList(){
    /*刷新 MyTask 和 AddTask页面*/

    loading();  //加载动画

    $("#album").fadeOut();
    if($("#addTaskButton").css("display")=="none"){     //通过判断添加按钮是否显示来判断应该返回哪个tab选项卡
        window.setTimeout(function(){$("#myTaskList").fadeIn(100)},100);
        window.setTimeout(function(){$("#toolsForMyTask").fadeIn(100)},100);
        window.setTimeout(function(){$("#tabsForMyTask").fadeIn(100)},100);

        stopCount();
    }
    else{
        window.setTimeout(function(){$("#allTaskList").fadeIn(100)},100);
        window.setTimeout(function(){$("#toolsForAllTask").fadeIn(100)},100);
        window.setTimeout(function(){$("#tabsForAllTask").fadeIn(100)},100);
    }
    document.getElementById('down').click(); //通过点击下拉箭头获得SmoothScroll效果,因为tempItem出现的时候down必定与#tagPhoto连接，所以很OK
}

function backToPreviewTask(){
    //重新加载预览任务
    var taskID=document.getElementById("albumTitle").innerHTML;
    getImagesOfTask(taskID,true);
    loading();  //加载动画

    $("#submitButton").fadeOut(100);
    window.setTimeout(function(){$("#addTaskButton").fadeIn()},100);

    //重置返回按钮的事件
    $("#back").attr("onclick","backToTaskList()");
    $("#testSetPrompt").fadeOut(100);

    //重置标注提交按钮
    $("#submitTestButton").fadeOut(100);
    window.setTimeout(function(){$("#submitTagButton").fadeIn()},100);

    //把标注准确个数清零（调用modalForPicOnly的方法）
    resetCorrectAnswerNumber();
}

//loading动画
function loading(){
    $('.intro-header').css('z-index',100);  //首页背景置于preloader上,以防背景消失
    $('#preloader').fadeIn(0);
    $('#status').fadeIn(0);
    $('#status').delay(400).fadeOut();
    $('#preloader').delay(400).fadeOut('slow');
}

//添加任务
function addTask(){

    var taskID=document.getElementById("albumTitle").innerHTML;

    /** 先加载测试集 **/
    getImagesOfTest(taskID);    //在paginationForPicOnly.js最下面
    loading();  //加载动画

    $("#allTaskList").fadeOut(100);
    $("#toolsForAllTask").fadeOut(100);
    $("#tabsForAllTask").fadeOut(100);
    $("#deleteTaskButton").fadeOut(100);
    $("#addTaskButton").fadeOut(100);
    window.setTimeout(function(){$("#submitButton").fadeIn()},100);
    window.setTimeout(function(){$("#album").fadeIn()},100);

    //修改返回按钮的事件
    $("#back").attr("onclick","backToPreviewTask()");
    $("#testSetPrompt").fadeIn(100);

    //修改标注提交按钮
    $("#submitTagButton").fadeOut(100);
    window.setTimeout(function(){$("#submitTestButton").fadeIn()},100);

    /* 添加任务操作 现在挪动到 modalForPicOnly.js 的submitTest函数！！！！*/
}

//批量删除我的任务按钮
function removeTask(){

    $('#removeTaskButton').fadeOut(0);
    $('#finishButton').fadeIn(0);

    var tasks=document.querySelector("#myTaskList").getElementsByClassName("task"); //只获取myTaskList里面的task！！！！
    var len=tasks.length;

    var deleteButton=document.getElementById("coverForDelete");

    for(var i=0;i<len;i++){
        var temp=deleteButton.cloneNode(true);
        temp.style.display="";
        tasks[i].appendChild(temp);
        tasks[i].setAttribute("onclick", "");
        tasks[i].classList.add("swinging"+((i%3)+1));   //根据i设置延迟，分别添加类swinging1，swinging2，swinging3
    }
}

var taskToDelete=new Array();

//（批量删除中）标记为待删除，添加revert按钮
function readyToDelete(buttonToConceal){
    buttonToConceal.parentNode.style.display="none";       //隐藏删除按钮,这里整个div

    var revertButton=document.getElementById("coverForRevert");
    var temp=revertButton.cloneNode(true);
    temp.style.display="";
    buttonToConceal.parentNode.parentNode.appendChild(temp);//添加撤销按钮.parentNode是删除当前任务按钮的div,再parentNode才是task

    buttonToConceal.parentNode.parentNode.classList.remove("swinging1");//不再抖动,无法判断是哪个抖动，所以都删一遍
    buttonToConceal.parentNode.parentNode.classList.remove("swinging2");
    buttonToConceal.parentNode.parentNode.classList.remove("swinging3");

    taskToDelete.push(buttonToConceal.parentNode.parentNode.children[1].innerHTML); //加入数组
}

//撤销预删除
function revertDeletion(buttonToRevert){
    var parentTask=buttonToRevert.parentNode.parentNode;   //同理两个parentNode才能获取到选中的task

    parentTask.removeChild(parentTask.children[3]);    //移除撤销按钮

    parentTask.children[2].style.display="";    //恢复删除按钮,如果readyToDelete里是让buttonToConceal不见，则这里就要用children[2]的子节点

    parentTask.classList.add("swinging1");  //添加不延迟的动画swinging1

    taskToDelete.remove(taskToDelete.indexOf(parentTask.children[1].innerHTML));    //移除数组
}

//数组删除算法，index为需要删除元素的下标
Array.prototype.remove=function(index){

    if(isNaN(index)||index>this.length){return false;}

    for(var i=0,n=0;i<this.length;i++) {
        if(this[i]!=this[index]) {
            this[n++]=this[i]
        }
    }
    this.length-=1
}

//删除任务
function deleteTask(taskID){
    if(confirm("确认删除此任务？（删除后将不可在添加）"+taskID)) {
        $.ajax(
            {
                url: "http://localhost:8080/deleteTask",
                data: {taskName: taskID, id: getUsername()},
                async: false,
                success: function (data) {

                },
                error: function (xhr) {
                },
                traditional: true,
            }
        )
    }
    /* 删除任务操作，参数taskID为任务标题 */

}

//删除当前打开的任务（添加自动返回操作）
function deleteTaskInView(taskID){
    deleteTask(taskID);

    document.getElementById('back').click();
    $.ajax(
        {
            url: "http://localhost:8080/getUnfinishedTasks",
            data: {
                id:getUsername(),
            },
            async: false,
            success: function (data) {

                var directoryForMyTask=new Array();
                var textForMyTask=new Array();
                for(var i=0;i<data.length;i++){
                    textForMyTask.push(data[i]);
                    $.ajax(
                        {
                            url: "http://localhost:8080/getFirstPic",
                            data: {
                                taskName:data[i]
                            },
                            async: false,
                            success: function (d) {
                                directoryForMyTask.push(d);

                            },
                            error: function (xhr) {
                                directoryForMyTask.push(xhr.responseText);

                            },
                            traditional: true,
                        }
                    )
                }
                showMyTask(directoryForMyTask,textForMyTask);
            },
            error: function (xhr) {
            },
            traditional: true,
        }
    )
    $.ajax(
        {
            url: "http://localhost:8080/getIrrelatedTasks",
            data: {
                id:getUsername()
            },
            async: false,
            success: function (data) {
                var directoryForAllTask=new Array();
                var textForAllTask=new Array();
                for(var i=0;i<data.length;i++) {

                    textForAllTask.push(data[i]);
                    $.ajax(
                        {
                            url: "http://localhost:8080/getFirstPic",
                            data: {
                                taskName: data[i]
                            },
                            async: false,
                            success: function (d) {
                                directoryForAllTask.push(d);
                            },
                            error: function (xhr) {
                                directoryForAllTask.push(xhr.responseText);

                            },
                            traditional: true,
                        }
                    )
                }
                showAllTask(directoryForAllTask, textForAllTask);
            },
            error: function (xhr) {
            },
            traditional: true,
        }
    )
}

//批量删除
function finishRemove(){

    var len=taskToDelete.length;

    for(var i=0;i<len;i++){

        //remove task
        deleteTask(taskToDelete[i]);
    }

    loading();


    /*这段代码如果有刷新的话就不需要了*/
    var tasks=document.querySelector("#myTaskList").getElementsByClassName("task"); //只获取myTaskList里面的task！！！！
    var len=tasks.length;
    for(var i=0;i<len;i++){
        //remove cover
        tasks[i].removeChild(tasks[i].children[2]);
        if( tasks[i].children[2]!=null){    //上面remove了第三个子节点，所以这里第四个子节点变成了第三个子节点
            tasks[i].removeChild(tasks[i].children[2]);
        }
        tasks[i].classList.remove("swinging1");//不再抖动,这里其实可以判断是remove哪个swinging
        tasks[i].classList.remove("swinging2");
        tasks[i].classList.remove("swinging3");

        //恢复展示任务的功能
        tasks[i].setAttribute("onclick", "showTask(this,false)");
    }
    /*这段代码如果有刷新的话就不需要了*/


    $('#finishButton').fadeOut(0);
    $('#removeTaskButton').fadeIn(0);
    taskToDelete.length=0;  //清空数组

    /* 刷新MyTask界面 */
    $.ajax(
        {
            url: "http://localhost:8080/getUnfinishedTasks",
            data: {
                id:getUsername(),
            },
            async: false,
            success: function (data) {

                var directoryForMyTask=new Array();
                var textForMyTask=new Array();
                for(var i=0;i<data.length;i++){
                    textForMyTask.push(data[i]);
                    $.ajax(
                        {
                            url: "http://localhost:8080/getFirstPic",
                            data: {
                                taskName:data[i]
                            },
                            async: false,
                            success: function (d) {
                                directoryForMyTask.push(d);

                            },
                            error: function (xhr) {
                                directoryForMyTask.push(xhr.responseText);

                            },
                            traditional: true,
                        }
                    )
                }
                showMyTask(directoryForMyTask,textForMyTask);
            },
            error: function (xhr) {
            },
            traditional: true,
        }
    )
    $.ajax(
        {
            url: "http://localhost:8080/getIrrelatedTasks",
            data: {
                id:getUsername()
            },
            async: false,
            success: function (data) {
                var directoryForAllTask=new Array();
                var textForAllTask=new Array();
                for(var i=0;i<data.length;i++) {

                    textForAllTask.push(data[i]);
                    $.ajax(
                        {
                            url: "http://localhost:8080/getFirstPic",
                            data: {
                                taskName: data[i]
                            },
                            async: false,
                            success: function (d) {
                                directoryForAllTask.push(d);
                            },
                            error: function (xhr) {
                                directoryForAllTask.push(xhr.responseText);

                            },
                            traditional: true,
                        }
                    )
                }
                showAllTask(directoryForAllTask, textForAllTask);
            },
            error: function (xhr) {
            },
            traditional: true,
        }
    )

}

//模糊查找我的任务
function searchFuzzilyMyTask(thisInput){
    $.ajax(
        {
            url: "http://localhost:8080/getHintMyGoingTasks",
            data: {
                hint:thisInput.value,
                id:getUsername()
            },
            async: false,
            success: function (data) {
                var directoryForMyTask=new Array();
                var textForMyTask=new Array();
                for(var i=0;i<data.length;i++){
                    textForMyTask.push(data[i]);
                    $.ajax(
                        {
                            url: "http://localhost:8080/getFirstPic",
                            data: {
                                taskName:data[i]
                            },
                            async: false,
                            success: function (d) {
                                directoryForMyTask.push(d);

                            },
                            error: function (xhr) {
                                directoryForMyTask.push(xhr.responseText);

                            },
                            traditional: true,
                        }
                    )
                }
                /* my task 如果没有搜索结果 */
                /*if(directoryForMyTask.length==0){
                    document.getElementById("noTaskSearched").setAttribute("style", "display:block");
                    document.querySelector( '.counterForMyTask' ).setAttribute("style", "display:none");    //隐藏页数信息
                }
                else{
                    document.getElementById("noTaskSearched").setAttribute("style", "display:none");
                    document.querySelector( '.counterForMyTask' ).setAttribute("style", "display:block");
                    /* 加载task

                }*/
                showMyTask(directoryForMyTask,textForMyTask);


            },
            error: function (xhr) {
            },
            traditional: true,
        }
    )

}

//模糊查找所有任务
function searchFuzzilyAllTask(thisInput){
    $.ajax(
        {
            url: "http://localhost:8080/getHintTasks",
            data: {
                hint:thisInput.value,
                id:getUsername()
            },
            async: false,
            success: function (data) {
                var directoryForAllTask=new Array();
                var textForAllTask=new Array();
                for(var i=0;i<data.length;i++) {

                    textForAllTask.push(data[i]);
                    $.ajax(
                        {
                            url: "http://localhost:8080/getFirstPic",
                            data: {
                                taskName: data[i]
                            },
                            async: false,
                            success: function (d) {
                                directoryForAllTask.push(d);
                            },
                            error: function (xhr) {
                                directoryForAllTask.push(xhr.responseText);

                            },
                            traditional: true,
                        }
                    )
                }
                /* all task 如果没有搜索结果 */
                /*if(directoryForAllTask.length==0){
                    alert("0");
                    document.getElementById("noTaskSearched2").setAttribute("style", "display:block");
                    document.querySelector( '.counterForAllTask' ).setAttribute("style", "display:none");    //隐藏页数信息
                }
                else{
                    document.getElementById("noTaskSearched2").setAttribute("style", "display:none");
                    document.querySelector( '.counterForAllTask' ).setAttribute("style", "display:block");
                    /* 加载task

                }*/
            showAllTask(directoryForAllTask, textForAllTask);
            },
            error: function (xhr) {
            },
            traditional: true,
        }
    )

}



/** 计时功能 **/
var workingTime=0;
var timer;

function startCount(){      //调用的方法有：showTask；shiftPage.js中的$("#photo").click
    workingTime=workingTime+1
    timer=setTimeout("startCount()",1000)
}

function stopCount() {      //调用的方法有：backToTaskList；beforunload；shiftPage.js中的$("#changeableItem").click
    /** 后台调用方法累加计时器 **/
    //alert(workingTime);
    $.ajax(
        {
            url: "http://localhost:8080/AddWorkTime",
            data: {
                email:getUsername(),
                time:workingTime
            },
            async:false,
            success: function (data) {
            },
            error: function (xhr) {
                alert('动态页有问题噶！\n\n' + xhr.responseText);
            },
            traditional: true,
        }
    )
    //重置计时器
    workingTime=0;
    clearTimeout(timer);
}

function judgeShouldStartCount(){   //判断下一次点击photo图标是否需要计时
    if($("#tabsForMyTask").css("display")!="none"){  //在mytask界面不在具体的任务界面,说明不是直接从具体任务界面返回Start界面的
        return false;
    }
    else{
        return true;
    }
}

//页面离开或者浏览器关闭、刷新的时候给予提示
window.onbeforeunload = function(event) {
   return beforunload(event);
};
function beforunload(event) {
    event = event ? event : (window.event ? window.event : null);
    var myIE = myBrowser();
    if (myIE=="IE") { // IE
        var cy = event.clientY || event.target.event.clientY;
        var ak = event.altKey || event.target.event.altKey;
        if (cy < 0 || ak) {
            stopCount();
            return "确定要离开本页面吗？";
        }
    }
    else {  // Firefox、Chrome
        stopCount();                        //onbeforeunload中规定不显示alert、confirm等，但其它代码是会执行的
        return "确定要离开本页面吗？";    //Chrome等浏览器无法自定义提示字段
   }
}

//获取当前浏览器类型
function myBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) { //判断是否Opera浏览器
        return "Opera"
    };
    if (userAgent.indexOf("Firefox") > -1) { //判断是否Firefox浏览器
        return "FF";
    };
    if (userAgent.indexOf("Chrome") > -1){
        return "Chrome";
    };
    if (userAgent.indexOf("Safari") > -1) { //判断是否Safari浏览器
        return "Safari";
    };
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) { //判断是否IE浏览器
        return "IE";
    };
}



