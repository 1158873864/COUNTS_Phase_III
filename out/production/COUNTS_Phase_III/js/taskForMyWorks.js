//点击任务展示具体图片集，我的任务 -> 具体图片集
function showTaskDone(task){
    var taskID=task.children[1].innerHTML;  //用来查找具体任务的任务描述

    /* 根据taskID加载album */
    getImagesOfFinishedTask(taskID);

    loading();  //加载动画

    $("#allTaskList").fadeOut(100);
    $("#toolsForAllTask").fadeOut(100);
    window.setTimeout(function(){$("#album").fadeIn()},100);
    document.getElementById("albumTitle").innerHTML=taskID; //设置标题
    document.getElementById("marker").innerText=taskID.charAt(0);
    document.getElementById('down').click();
}

//具体图片集 ->(返回) 我的任务
function backToTaskList(){

    /*刷新 MyTask 和 AddTask页面*/

    loading();  //加载动画

    $("#album").fadeOut();
    window.setTimeout(function(){$("#allTaskList").fadeIn(100)},100);
    window.setTimeout(function(){$("#toolsForAllTask").fadeIn(100)},100)
    document.getElementById('down').click();
}

//loading动画
function loading(){
    $('.intro-header').css('z-index',100);  //首页背景置于preloader上,以防背景消失
    $('#preloader').fadeIn(0);
    $('#status').fadeIn(0);
    $('#status').delay(400).fadeOut();
    $('#preloader').delay(400).fadeOut('slow');
}

//模糊查找
function searchFuzzily(thisInput){
    $.ajax(
        {
            url: "http://localhost:8080/getHintMyFinishedTasks",
            data: {
                hint:thisInput.value,
                id:getUsername()
            },
            async: false,
            success: function (data) {
                var directoryForAllTask=new Array();//总共max张
                var textForAllTask=new Array();
                for(var i=0;i<data.length;i++){
                    textForAllTask.push(data[i]);
                    $.ajax(
                        {
                            url: "http://localhost:8080/getFirstPic",
                            data: {
                                taskName:data[i]
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
                /* 如果没有搜索结果 */
                /*
                if(directoryForAllTask.length==0){
                    document.getElementById("noTaskSearched").setAttribute("style", "display:block");
                    document.querySelector( '.counterForAllTaskDone' ).setAttribute("style", "display:none");    //隐藏页数信息
                }
                else{
                    document.getElementById("noTaskSearched").setAttribute("style", "display:none");
                    document.querySelector( '.counterForAllTaskDone' ).setAttribute("style", "display:block");
                    /* 加载task
                    showFinishedTask(directoryForAllTask,textForAllTask);
                }*/
                showFinishedTask(directoryForAllTask,textForAllTask);
            },
            error: function (xhr) {
            },
            traditional: true,
        }
    )
}