var workerNum=67;
var bossNum=13;
/* 初始化 工人数量、发起者数量 */

$.ajax(
    {
        url: "http://localhost:8080/getNumOfWorkers",
        async: false,
        success: function (data) {
            workerNum=data;
            $.ajax(
                {
                    url: "http://localhost:8080/getNumOfBosses",
                    async: false,
                    success: function (d) {
                         bossNum=d;
                        document.getElementById("workerNum").innerText=workerNum.toString();
                        document.getElementById("bossNum").innerText=bossNum.toString();
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

document.getElementById("workerNum").innerText=workerNum.toString();
document.getElementById("bossNum").innerText=bossNum.toString();

/* 初始化 进行中任务数、已完成任务数、总任务数 */
var taskING=45;
var taskDone=9;
var taskAll=64;     //也可以直接用taskING+taskDone

$.ajax(
    {
        url: "http://localhost:8080/getNumOfGoingtasks",
        success: function (data) {
            taskING=data;
            $.ajax(
                {
                    url: "http://localhost:8080/getNumOfFinishedtasks",
                    success: function (d) {
                        taskDone=d;
                        $.ajax(
                            {
                                url: "http://localhost:8080/getNumOftasks",
                                success: function (d1) {

                                    taskAll=d1;
                                    document.getElementById("taskInfo").innerText=taskING+":"+taskDone;
                                    document.getElementById("taskNum").innerText=taskAll.toString();
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
        },
        error: function (xhr) {
            //alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)
document.getElementById("taskInfo").innerText=taskING+":"+taskDone;
document.getElementById("taskNum").innerText=taskAll.toString();