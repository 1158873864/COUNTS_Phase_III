
/* 初始化 用户积分、进行中任务数、总任务数 */

var score=2012;
var taskING=6;
var taskAll=15;

$.ajax(
    {
        url: "http://localhost:8080/getNews",
        data: {
            clue:getUsername()
        },
        async: false,
        success: function (data) {
            score=data[5];
        },
        error: function (xhr) {
            //alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)
$.ajax(
    {
        url: "http://localhost:8080/getUnfinishedTasks",
        data: {
            id:getUsername()
        },
        async: false,
        success: function (data) {
            taskING=data.length;
        },
        error: function (xhr) {
            //alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)
$.ajax(
    {
        url: "http://localhost:8080/getAllTasksById",
        data: {
            id:getUsername()
        },
        async: false,
        success: function (data) {
            taskAll=data.length;
        },
        error: function (xhr) {
            //alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)
document.getElementById("score").innerText=score.toString();
document.getElementById("taskInfo").innerText=taskING+"/"+taskAll;

/* 初始化 我的排名、排名上标、排名百分比 */
var myRank=1;

$.ajax(
    {
        url: "http://localhost:8080/getTheNum",
        data: {
            id:getUsername()
        },
        async: false,
        success: function (data) {
            myRank=data;
        },
        error: function (xhr) {
            //alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

var superior;   //根据排名确定上标
if(myRank.toString()=="1"){
    superior="st";
}
else if(myRank.toString()=="2"){
    superior="nd";
}
else if(myRank.toString()=="3"){
    superior="rd";
}
else{
    superior="th";
}
var workerNum=80;

$.ajax(
    {
        url: "http://localhost:8080/getNumOfWorkers",
        data: {
            id:getUsername()
        },
        async: false,
        success: function (data) {
            workerNum=data;
        },
        error: function (xhr) {
            //alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

var myPercentage=((myRank/workerNum)*100).toFixed(2); //计算百分比，保留两位小数
document.getElementById("myRank").innerText=myRank.toString();
document.getElementById("superior").innerText=superior;
document.getElementById("myPercentage").innerText=myPercentage.toString()+"%";  //可以不用toString


var itemNum=15; //预设的排行榜显示数量
var directoryForUsername=new Array();   //排行榜用户名数组
var directoryForScore=new Array();  //排行榜积分数组

function loadRankList(){
    /* 初始化 排行榜用户名数组(参数为itemNum) */
    directoryForUsername.length=0;
    directoryForScore.length=0;

    $.ajax(
        {
            url: "http://localhost:8080/getFirstNWorker",
            data: {
                num:itemNum
            },
            async: false,
            success: function (data) {
                for(var i=0;i<data.length;i++){
                    directoryForUsername.push(data[i]);
                    $.ajax(
                        {
                            url: "http://localhost:8080/getNews",
                            data: {
                                clue:data[i]
                            },
                            async: false,
                            success: function (d) {
                                directoryForScore.push(d[5]);
                            },
                            error: function (xhr) {
                                //alert('动态页有问题噶！\n\n' + xhr.responseText);
                            },
                            traditional: true,
                        }
                    )
                }
            },
            error: function (xhr) {
                //alert('动态页有问题噶！\n\n' + xhr.responseText);
            },
            traditional: true,
        }
    )
    //directoryForUsername=new Array("xulei","会飞的猪","LadyGuaGua","小明","小红qq6849240","骑着蜗牛赶太阳","小白","小绿帽子","小灰灰","小王八蛋","小呆瓜");
    /* 初始化 排行榜积分数组(参数为itemNum) */
    //directoryForScore=new Array("2012","1200","1053","942","898","531","242","24","5","0","0");

    document.getElementById("rankList").innerHTML="";       //清空

    for(var i=0;i<directoryForUsername.length;i++){     //防止总用户数小于itemNum
        var listItem = document.createElement("div");
        if(listItem!=null){
            listItem.clear;
        }
        listItem.setAttribute("class", "rankItem");
        var name;
        $.ajax(
            {
                url: "http://localhost:8080/getNews",
                data: {
                    clue:getUsername()
                },
                async: false,
                success: function (d) {
                    name=d[0];
                },
                error: function (xhr) {
                    //alert('动态页有问题噶！\n\n' + xhr.responseText);
                },
                traditional: true,
            }
        )
        /* 如果排行榜中存在当前用户，当前用户的表项高亮 */
        if(name==directoryForUsername[i]){
            listItem.classList.add("rankItemActive");
        }

        var rankNum = document.createElement("label");
        rankNum.setAttribute("class", "rankNum");
        rankNum.innerHTML=(i+1).toString();
        //第一二三名样式
        if(i==0){
            rankNum.classList.add("theFirst");
        }
        else if(i==1){
            rankNum.classList.add("theSecond");
        }
        else if(i==2){
            rankNum.classList.add("theThird");
        }
        var rankUsername = document.createElement("label");
        rankUsername.setAttribute("class", "rankUsername");
        rankUsername.innerHTML=directoryForUsername[i];
        var rankScore = document.createElement("label");
        rankScore.setAttribute("class", "rankScore");
        rankScore.innerHTML=directoryForScore[i];

        listItem.appendChild(rankNum.cloneNode(true));
        listItem.appendChild(rankUsername.cloneNode(true));
        listItem.appendChild(rankScore.cloneNode(true));

        document.getElementById("rankList").appendChild(listItem.cloneNode(true));
    }
}


function goToRankList(){
    loadRankList();         //加载列表

    $("#rank").fadeOut(300);//设置行为
    window.setTimeout(function(){$("#ranking").fadeIn();},300);
    document.getElementById("rankTitle").innerText="Ranking List";
    //document.getElementById("rankInfoFormat").innerHTML="";
    document.getElementById("rankInfoFormat").setAttribute("style", "display:none");
}

function backToMyRank(){
    $("#ranking").fadeOut(300);//设置行为
    window.setTimeout(function(){$("#rank").fadeIn();},300);
    document.getElementById("rankTitle").innerText="My Rank";
    //document.getElementById("rankInfoFormat").innerHTML="(ranking/percentage)";
    document.getElementById("rankInfoFormat").setAttribute("style", "display:inline-block");
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




/** 积分明细 **/
/** 加载积分detail **/
function loadScoreDetail(){
    /* 获取积分detail数组,最好按时间降序！！！！
     * 积分项描述简洁，无逗号！！！
     */
    //var directoryForScoreDetail=new Array("2018.12.17,任务<布偶猫>结算,150","2018.5.17,COUNTS网站成立一周年普天同庆,1000","2018.5.16,登录,5","2018.5.16,累计工作时间超过1h,20","2018.5.16,邀请好友提成,20","2018.5.15,登录,5","2018.5.15,累计工作时间超过1h,12");
    var directoryForScoreDetail=new Array();
    $.ajax(
        {
            url: "http://localhost:8080/GetPointsChanges",
            data: {
                email:getUsername()
            },
            async: false,
            success: function (d) {
                for(var i=0;i<d.length;i+=4){
                    var result=d[i]+","+d[i+1]+","+d[i+2];
                    directoryForScoreDetail.push(result);
                }
            },
            error: function (xhr) {
                //alert('动态页有问题噶！\n\n' + xhr.responseText);
            },
            traditional: true,
        }
    )
    if(directoryForScoreDetail.length!=0){      //不等于0则清空，等于0则仍旧显示暂无积分记录
        document.getElementById("scoreList").innerHTML="";  //清空
    }

    for(var i=0;i<directoryForScoreDetail.length;i++){
        directoryForScoreDetail[i]=directoryForScoreDetail[i].replace(/，/g,",");//统一为英文逗号
        var scoreDetail=directoryForScoreDetail[i].split(",");

        var listItem = document.createElement("div");
        listItem.setAttribute("class", "scoreItem");

        var scoreDate = document.createElement("label");
        scoreDate.setAttribute("class", "scoreDate");
        scoreDate.innerHTML=scoreDetail[0];

        var scoreName = document.createElement("label");
        scoreName.setAttribute("class", "scoreName");
        scoreName.innerHTML=scoreDetail[1];

        var scoreNum = document.createElement("label");
        scoreNum.setAttribute("class", "scoreNum");
        scoreNum.innerHTML=scoreDetail[2];

        listItem.appendChild(scoreDate.cloneNode(true));
        listItem.appendChild(scoreName.cloneNode(true));
        listItem.appendChild(scoreNum.cloneNode(true));

        document.getElementById("scoreList").appendChild(listItem.cloneNode(true));
    }
}

var shouldShow=false;

function showScoreList(){
    loadScoreDetail();  //加载积分清单

    $("#scoreListWrapper").css("display","block");
    shouldShow=true;
}

function hideScoreList(){
    shouldShow=false;
    window.setTimeout(function(){

            if(shouldShow==true){       //说明鼠标移到了scoreList上
                //do nothing
            }
            else{
                $("#scoreListWrapper").fadeOut(500);
                shouldShow=false;
            }
        },1000);

}

function stillShowScoreList(){
    $("#scoreListWrapper").attr("display","block");
    shouldShow=true;
}
