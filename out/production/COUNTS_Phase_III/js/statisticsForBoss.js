
/* 初始化 任务总数、整体完成进度 */


var taskNum=11;
var taskDone=6;
var progressOverall=0; //计算百分比，保留两位小数


$.ajax(
    {
        url: "http://localhost:8080/getNumOfTheTasks",
        data:{
            id:getUsername()
        },
        async: false,
        success: function (data) {
            taskNum=data;
            $.ajax(
                {
                    url: "http://localhost:8080/getNumOfTheFinishedTasks",
                    data: {
                        id:getUsername()
                    },
                    async: false,
                    success: function (d) {
                        taskDone=d;
                        progressOverall=((taskDone/taskNum)*100).toFixed(2);
                        document.getElementById("taskNum").innerText=taskNum.toString();
                        if(taskNum!=0){
                            document.getElementById("progressOverall").innerText=progressOverall.toString()+"%";  //可以不用toString
                        }
                        else{
                            document.getElementById("progressOverall").innerText="0%";  //防止除数为0
                        }
                    },
                    error: function (xhr) {
                        //alert('动态页有问题噶！\n\n' + xhr.responseText);
                    },
                    traditional: true,
                }
            )
        },
        error: function (xhr) {
            //alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)
progressOverall=((taskDone/taskNum)*100).toFixed(2);
document.getElementById("taskNum").innerText=taskNum.toString();
if(taskNum!=0){
    document.getElementById("progressOverall").innerText=progressOverall.toString()+"%";  //可以不用toString
}
else{
    document.getElementById("progressOverall").innerText="0%";  //防止除数为0
}


var directoryForTaskName=new Array();   //任务名数组
var directoryForUsername=new Array();   //参与者用户名数组
var progressForTheTask;     //单个任务的完成进度


/* 初始化 任务名数组 */
//directoryForTaskName=new Array("武僧推出一波浪的马","布偶猫","樱桃小丸子","French Fries","蒙奇D路飞","罗","North Pole","2018","这是一个非常非常非常长的标题不信你自己看再不信我也没办法了");

$.ajax(
    {
        url: "http://localhost:8080/getAllTasksByBoss",
        data: {
            id:getUsername()
        },
        async: false,
        success: function (data) {
            for(var i=0;i<data.length;i++){
                directoryForTaskName.push(data[i]); 
            }
        },
        error: function (xhr) {
            //alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)
//加载任务列表
if(directoryForTaskName.length==0){     //显示暂无任务,暂时不需要,备用！
    //document.getElementById("taskNameList").innerHTML="";       //清空
    //var listItem = document.createElement("div");
    //listItem.setAttribute("class", "noTask");
    //listItem.innerHTML="暂无任务!";
    //document.getElementById("taskNameList").appendChild(listItem.cloneNode(true));
}
else{
    document.getElementById("taskNameList").innerHTML="";       //清空（清除原有的“暂无任务”提示）

    for(var i=0;i<directoryForTaskName.length;i++){
        var listItem = document.createElement("div");
        listItem.setAttribute("class", "taskItem");
        listItem.setAttribute("onclick", "showParticipants(this)");
        listItem.innerHTML=directoryForTaskName[i];

        document.getElementById("taskNameList").appendChild(listItem.cloneNode(true));
    }

    /* 加载 第一个任务的 参与者用户名数组 和 完成进度 */
    showParticipants(document.getElementById("taskNameList").children[0]);
}


function showParticipants(taskItem){
    $('#taskNameList div').removeClass("taskItemActive");
    $('#taskNameList div').addClass("taskItem");
    $(taskItem).removeClass("taskItem");
    $(taskItem).addClass("taskItemActive");

    //alert(taskItem.innerText);  //用innerText获取文字信息
    var taskID=taskItem.innerText;      //当前任务名
    /* 初始化 第一个任务的参与者用户名数组(参数为taskID) */
    //directoryForUsername=new Array("骑着蜗牛赶太阳","会飞的猪","小红qq6849240","LadyGuaGua","小明","小白","小绿帽子","小灰灰","小王八蛋","小呆瓜");
    directoryForUsername=new Array();
    /* 初始化 第一个任务的完成进度 */
    var picNum=35;
    var picDone=18;
    $.ajax(
        {
            url: "http://localhost:8080/getInvolvedWorkers",
            data: {
                taskName:taskID
            },
            async: false,
            success: function (data) {
                for(var i=0;i<data.length;i++){
                    directoryForUsername.push(data[i]);
                }
            },
            error: function (xhr) {
                //alert('动态页有问题噶！\n\n' + xhr.responseText);
            },
            traditional: true,
        }
    )
    $.ajax(
        {
            url: "http://localhost:8080/getTheNumOfPicsInTheTask",
            data: {
                taskName:taskID
            },
            async: false,
            success: function (data) {
                picNum=data;
            },
            error: function (xhr) {
                //alert('动态页有问题噶！\n\n' + xhr.responseText);
            },
            traditional: true,
        }
    )
    $.ajax(
        {
            url: "http://localhost:8080/getTheNumOfFinishedPicsInTheTask",
            data: {
                taskName:taskID
            },
            async: false,
            success: function (data) {
                picDone=data;
            },
            error: function (xhr) {
                //alert('动态页有问题噶！\n\n' + xhr.responseText);
            },
            traditional: true,
        }
    )
    progressForTheTask=((picDone/picNum)*100).toFixed(2); //计算百分比，保留两位小数
    document.getElementById("progressToBeSet").innerText=progressForTheTask.toString()+"%";

    document.getElementById("participantList").innerHTML="";       //清空

    if(directoryForUsername.length==0){     //显示暂无参与者
        var listItem = document.createElement("div");
        listItem.setAttribute("class", "noParticipant");
        listItem.innerHTML="暂无参与者!";
        document.getElementById("participantList").appendChild(listItem.cloneNode(true));

        document.getElementById("progressToBeSet").innerText="0%";  //还原任务进度
    }

    else{
        for(var i=0;i<directoryForUsername.length;i++){
            var listItem = document.createElement("div");
            listItem.setAttribute("class", "participantItem");
            var mark = document.createElement("i");
            mark.setAttribute("class", "fa fa-circle-o circleBeforeName");

            var textSpan = document.createElement("span");
            textSpan.innerText=directoryForUsername[i];

            listItem.appendChild(mark.cloneNode(true));
            listItem.appendChild(textSpan.cloneNode(true));

            document.getElementById("participantList").appendChild(listItem.cloneNode(true));
        }
    }
}

function showOrHideProfile(){
    if(document.getElementById("showProfile").classList.toString().indexOf("down")!=-1){    //show Profile
        $("#showProfile").removeClass("fa-caret-down");
        $("#showProfile").addClass("fa-caret-right");
        $("#profile-container").slideUp(800);
    }
    else{   //hide Profile
        $("#showProfile").removeClass("fa-caret-right");
        $("#showProfile").addClass("fa-caret-down");
        $("#profile-container").slideDown(800);
    }
}

function showOrHideStatistics(){
    if(document.getElementById("showStatistics").classList.toString().indexOf("down")!=-1){    //show Statistics
        $("#showStatistics").removeClass("fa-caret-down");
        $("#showStatistics").addClass("fa-caret-right");
        $("#statistics").slideUp(800);
    }
    else{   //hide Statistics
        $("#showStatistics").removeClass("fa-caret-right");
        $("#showStatistics").addClass("fa-caret-down");
        $("#statistics").slideDown(800);
    }
}