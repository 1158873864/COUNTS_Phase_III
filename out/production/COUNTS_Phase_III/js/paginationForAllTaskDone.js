
/*
 *查当前用户已完成任务
 */
$.ajax(
    {
        url: "http://localhost:8080/getFinishedTasks",
        data: {
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
            showFinishedTask(directoryForAllTask,textForAllTask);

        },
        error: function (xhr) {
            //alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)



function showFinishedTask(directoryForAllTask,textForAllTask){
    var parent=document.getElementById("allTaskList");
    var child1=document.getElementById("r1ForAllTask");
    var child2=document.getElementById("r2ForAllTask");
    var child3=document.getElementById("r3ForAllTask");
    if(child1!=null){
        parent.removeChild(child1);
    }
    if(child2!=null){
        parent.removeChild(child2);
    }
    if(child3!=null){
        parent.removeChild(child3);
    }
    var plForAllTask = document.getElementsByClassName("paginateForAllTaskDone")[0];
    var prForAllTask = document.getElementsByClassName("paginateForAllTaskDone")[1];

    plForAllTask.onclick = slideForAllTask.bind( this, -1 );
    prForAllTask.onclick = slideForAllTask.bind( this, 1 );
    var maxForAllTask=directoryForAllTask.length;
    var indexForAllTask = 0, intervalForAllTask=9, totalForAllTask = Math.ceil(maxForAllTask/intervalForAllTask);	//index为当前页索引，每页inteval张，总页数total=max/inteval上取整
    //图片src数组
//var directoryForAllTask=new Array("http://www.runoob.com/wp-content/uploads/2016/04/img_fjords.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_lights.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg","img/picture/cat.jpg","img/picture/fries.jpg","img/picture/xiaowanzi.jpg","img/picture/princess.jpg","img/picture/horse.jpg","img/picture/catandfish.jpg","img/picture/chopper.jpg","img/picture/luo.jpg","img/picture/luffy.jpg","img/picture/naruto.jpg","img/picture/moon.jpg","img/picture/swordman.jpg");
//图片alt&description数组
//var textForAllTask=new Array("The Troll's tongue in Hardanger, NorwayThe Troll's tongue in Hardanger, NorwayThe Troll's tongue in Hardanger, NorwayThe Troll's tongue in Hardanger, NorwayThe Troll's tongue in Hardanger, NorwayThe Troll's tongue in Hardanger, Norway","Northern Lights in Norway","壮美山河","布偶猫","French Fries","樱桃小丸子","公主的裙子上有小船","武僧推出一波浪的马","黑猫抱着蓝鱼","乔巴和骷髅男","海贼王-罗","蒙奇·D·路飞","火影忍者-鸣人","月亮上坐着个女孩儿","背着刀剑的男人");
// 动态创建album
//var album=new Array();
    var row1ForAllTask= new Array();
    var row2ForAllTask=new Array();
    var row3ForAllTask=new Array();

    /* 判断查询结果是否为空,这个在category里也要加！！！ */
    if(maxForAllTask==0){
        document.getElementById("noTaskAvailable").setAttribute("style", "display:block");
        totalForAllTask=1;   //没有task也算有1页
        document.querySelector( '.counterForAllTaskDone' ).setAttribute("style", "display:none");    //隐藏页数信息
    }
    else{
        document.getElementById("noTaskAvailable").setAttribute("style", "display:none");
        document.querySelector( '.counterForAllTaskDone' ).setAttribute("style", "display:block");
        loadAllTaskDone();
    }

    function loadAllTaskDone() {
        for (var i = 0; i < totalForAllTask; i++) {
            var row = document.createElement("div");
            row.setAttribute("class", "row");
            row.setAttribute("id", "r1ForAllTask");
            for (var j = 0; j < 3 && i * intervalForAllTask + j + 1 <= maxForAllTask; j++) {
                var photo = document.createElement("div");
                photo.setAttribute("class", "task fadeIn");
                var pic = document.createElement("img");
                //pic.setAttribute("class", "image");
                pic.setAttribute("src", directoryForAllTask[i * intervalForAllTask + j]);
                pic.setAttribute("alt", textForAllTask[i * intervalForAllTask + j]);
                pic.setAttribute("width", "240");
                pic.setAttribute("height", "160");

                var description = document.createElement("div");
                description.setAttribute("class", "taskTitle");
                description.innerHTML = textForAllTask[i * intervalForAllTask + j];

                photo.appendChild(pic.cloneNode(true));
                photo.appendChild(description.cloneNode(true));

                photo.setAttribute("onclick", "showTaskDone(this)");
                row.appendChild(photo.cloneNode(true));
            }
            row1ForAllTask.push(row.cloneNode(true));

            var row = document.createElement("div");
            row.setAttribute("class", "row tworow");
            row.setAttribute("id", "r2ForAllTask");
            for (var j = 3; j < 6 && i * intervalForAllTask + j + 1 <= maxForAllTask; j++) {
                var photo = document.createElement("div");
                photo.setAttribute("class", "task fadeIn");
                var pic = document.createElement("img");
                //pic.setAttribute("class", "image");
                pic.setAttribute("src", directoryForAllTask[i * intervalForAllTask + j]);
                pic.setAttribute("alt", textForAllTask[i * intervalForAllTask + j]);
                pic.setAttribute("width", "240");
                pic.setAttribute("height", "160");

                var description = document.createElement("div");
                description.setAttribute("class", "taskTitle");
                description.innerHTML = textForAllTask[i * intervalForAllTask + j];

                photo.appendChild(pic.cloneNode(true));
                photo.appendChild(description.cloneNode(true));

                photo.setAttribute("onclick", "showTaskDone(this)");
                row.appendChild(photo.cloneNode(true));
            }
            row2ForAllTask.push(row.cloneNode(true));

            var row = document.createElement("div");
            row.setAttribute("class", "row tworow");
            row.setAttribute("id", "r3ForAllTask");
            for (var j = 6; j < 9 && i * intervalForAllTask + j + 1 <= maxForAllTask; j++) {
                var photo = document.createElement("div");
                photo.setAttribute("class", "task fadeIn");
                var pic = document.createElement("img");
                //pic.setAttribute("class", "image");
                pic.setAttribute("src", directoryForAllTask[i * intervalForAllTask + j]);
                pic.setAttribute("alt", textForAllTask[i * intervalForAllTask + j]);
                pic.setAttribute("width", "240");
                pic.setAttribute("height", "160");

                var description = document.createElement("div");
                description.setAttribute("class", "taskTitle");
                description.innerHTML = textForAllTask[i * intervalForAllTask + j];

                photo.appendChild(pic.cloneNode(true));
                photo.appendChild(description.cloneNode(true));

                photo.setAttribute("onclick", "showTaskDone(this)");
                row.appendChild(photo.cloneNode(true));
            }
            row3ForAllTask.push(row.cloneNode(true));

        }
    }

    function slideForAllTask(offset) {
        indexForAllTask = Math.min( Math.max( indexForAllTask + offset, 0 ), totalForAllTask - 1 );
        document.querySelector( '.counterForAllTaskDone' ).innerHTML = ( indexForAllTask + 1 ) + ' / ' + totalForAllTask;
        plForAllTask.setAttribute( 'data-state', indexForAllTask === 0 ? 'disabled' : '' );
        prForAllTask.setAttribute( 'data-state', indexForAllTask === totalForAllTask - 1 ? 'disabled' : '' );
    }

//初始化
    slideForAllTask(0);
    var parentForAllTask=document.getElementById("allTaskList");
    parentForAllTask.appendChild(row1ForAllTask[0]);	//不需要prepend
    parentForAllTask.appendChild(row2ForAllTask[0]);
    parentForAllTask.appendChild(row3ForAllTask[0]);

    function shiftForAllTask(){
        var parent=document.getElementById("allTaskList");
        var child1=document.getElementById("r1ForAllTask");
        var child2=document.getElementById("r2ForAllTask");
        var child3=document.getElementById("r3ForAllTask");
        //删除原有div
        parent.removeChild(child1);
        parent.removeChild(child2);
        parent.removeChild(child3);
        //添加新页的div
        parent.appendChild(row1ForAllTask[indexForAllTask]);
        parent.appendChild(row2ForAllTask[indexForAllTask]);
        parent.appendChild(row3ForAllTask[indexForAllTask]);
    }
    plForAllTask.addEventListener("click",shiftForAllTask);
    prForAllTask.addEventListener("click",shiftForAllTask);

}