
/*
 *查当前用户添加且未完成的任务
 */


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
            //alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

function showMyTask(directoryForMyTask,textForMyTask){
    var parent=document.getElementById("myTaskList");
    var child1=document.getElementById("r1ForMyTask");
    var child2=document.getElementById("r2ForMyTask");
    var child3=document.getElementById("r3ForMyTask");
    //ɾ��ԭ��div
    if(child1!=null){
        parent.removeChild(child1);
    }
    if(child2!=null){
        parent.removeChild(child2);
    }
    if(child3!=null){
        parent.removeChild(child3);
    }
    var plForMyTask = document.getElementsByClassName("paginateForMyTask")[0];
    var prForMyTask = document.getElementsByClassName("paginateForMyTask")[1];

    plForMyTask.onclick = slideForMyTask.bind( this, -1 );
    prForMyTask.onclick = slideForMyTask.bind( this, 1 );
    var maxForMyTask=directoryForMyTask.length;
    //var maxForMyTask=15;							//总共max张
    var indexForMyTask = 0, intervalForMyTask=9, totalForMyTask = Math.ceil(maxForMyTask/intervalForMyTask);	//index为当前页索引，每页inteval张，总页数total=max/inteval上取整
//图片src数组

//var directoryForMyTask=new Array("http://www.runoob.com/wp-content/uploads/2016/04/img_fjords.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_lights.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg","img/picture/cat.jpg","img/picture/fries.jpg","img/picture/xiaowanzi.jpg","img/picture/princess.jpg","img/picture/horse.jpg","img/picture/catandfish.jpg","img/picture/chopper.jpg","img/picture/luo.jpg","img/picture/luffy.jpg","img/picture/naruto.jpg","img/picture/moon.jpg","img/picture/swordman.jpg");
//图片alt&description数组

//var textForMyTask=new Array("The Troll's tongue in Hardanger, NorwayThe Troll's tongue in Hardanger, NorwayThe Troll's tongue in Hardanger, NorwayThe Troll's tongue in Hardanger, NorwayThe Troll's tongue in Hardanger, NorwayThe Troll's tongue in Hardanger, Norway","Northern Lights in Norway","壮美山河","布偶猫","French Fries","樱桃小丸子","公主的裙子上有小船","武僧推出一波浪的马","黑猫抱着蓝鱼","乔巴和骷髅男","海贼王-罗","蒙奇·D·路飞","火影忍者-鸣人","月亮上坐着个女孩儿","背着刀剑的男人");
// 动态创建album
//var album=new Array();
    var row1ForMyTask= new Array();
    var row2ForMyTask=new Array();
    var row3ForMyTask=new Array();
    /* 判断查询结果是否为空 */
    if(maxForMyTask==0){
        document.getElementById("noTaskAvailable").setAttribute("style", "display:block");
        totalForMyTask=1;   //没有task也算有1页
        document.querySelector( '.counterForMyTask' ).setAttribute("style", "display:none");    //隐藏页数信息
    }
    else{
        document.getElementById("noTaskAvailable").setAttribute("style", "display:none");
        document.querySelector( '.counterForMyTask' ).setAttribute("style", "display:block");
        loadMyTask();
    }

    function loadMyTask(){
        for(var i=0; i<totalForMyTask; i++){
            var row = document.createElement("div");
            row.setAttribute("class", "row");
            row.setAttribute("id", "r1ForMyTask");
            for(var j=0; j<3&&i*intervalForMyTask+j+1<=maxForMyTask; j++){
                var photo = document.createElement("div");
                photo.setAttribute("class", "task");
                var pic = document.createElement("img");
                //pic.setAttribute("class", "image");
                pic.setAttribute("src", directoryForMyTask[i*intervalForMyTask+j]);
                pic.setAttribute("alt", textForMyTask[i*intervalForMyTask+j]);
                pic.setAttribute("width", "240");
                pic.setAttribute("height", "160");
                //pic.setAttribute("onclick", "showPicture(this)");
                var description = document.createElement("div");
                description.setAttribute("class", "taskTitle");
                description.innerHTML=textForMyTask[i*intervalForMyTask+j];

                photo.appendChild(pic.cloneNode(true));
                photo.appendChild(description.cloneNode(true));

                photo.setAttribute("onclick", "showTask(this,false)");
                row.appendChild(photo.cloneNode(true));
            }
            row1ForMyTask.push(row.cloneNode(true));

            var row = document.createElement("div");
            row.setAttribute("class", "row tworow");
            row.setAttribute("id", "r2ForMyTask");
            for(var j=3; j<6&&i*intervalForMyTask+j+1<=maxForMyTask; j++){
                var photo = document.createElement("div");
                photo.setAttribute("class", "task");
                var pic = document.createElement("img");
                //pic.setAttribute("class", "image");
                pic.setAttribute("src", directoryForMyTask[i*intervalForMyTask+j]);
                pic.setAttribute("alt", textForMyTask[i*intervalForMyTask+j]);
                pic.setAttribute("width", "240");
                pic.setAttribute("height", "160");
                //pic.setAttribute("onclick", "showPicture(this)");
                var description = document.createElement("div");
                description.setAttribute("class", "taskTitle");
                description.innerHTML=textForMyTask[i*intervalForMyTask+j];

                photo.appendChild(pic.cloneNode(true));
                photo.appendChild(description.cloneNode(true));

                photo.setAttribute("onclick", "showTask(this,false)");
                row.appendChild(photo.cloneNode(true));
            }
            row2ForMyTask.push(row.cloneNode(true));

            var row = document.createElement("div");
            row.setAttribute("class", "row tworow");
            row.setAttribute("id", "r3ForMyTask");
            for(var j=6; j<9&&i*intervalForMyTask+j+1<=maxForMyTask; j++){
                var photo = document.createElement("div");
                photo.setAttribute("class", "task");
                var pic = document.createElement("img");
                //pic.setAttribute("class", "image");
                pic.setAttribute("src", directoryForMyTask[i*intervalForMyTask+j]);
                pic.setAttribute("alt", textForMyTask[i*intervalForMyTask+j]);
                pic.setAttribute("width", "240");
                pic.setAttribute("height", "160");
                //pic.setAttribute("onclick", "showPicture(this)");
                var description = document.createElement("div");
                description.setAttribute("class", "taskTitle");
                description.innerHTML=textForMyTask[i*intervalForMyTask+j];

                photo.appendChild(pic.cloneNode(true));
                photo.appendChild(description.cloneNode(true));

                photo.setAttribute("onclick", "showTask(this,false)");
                row.appendChild(photo.cloneNode(true));
            }
            row3ForMyTask.push(row.cloneNode(true));

        }
    }


    function slideForMyTask(offset) {
        indexForMyTask = Math.min( Math.max( indexForMyTask + offset, 0 ), totalForMyTask - 1 );
        document.querySelector( '.counterForMyTask' ).innerHTML = ( indexForMyTask + 1 ) + ' / ' + totalForMyTask;
        plForMyTask.setAttribute( 'data-state', indexForMyTask === 0 ? 'disabled' : '' );
        prForMyTask.setAttribute( 'data-state', indexForMyTask === totalForMyTask - 1 ? 'disabled' : '' );
    }


//初始化
    slideForMyTask(0);
    var parentForMyTask=document.getElementById("myTaskList");
    parentForMyTask.appendChild(row1ForMyTask[0]);	//不需要prepend
    parentForMyTask.appendChild(row2ForMyTask[0]);
    parentForMyTask.appendChild(row3ForMyTask[0]);

    function shiftForMyTask(){
        var parent=document.getElementById("myTaskList");
        var child1=document.getElementById("r1ForMyTask");
        var child2=document.getElementById("r2ForMyTask");
        var child3=document.getElementById("r3ForMyTask");
        //删除原有div
        parent.removeChild(child1);
        parent.removeChild(child2);
        parent.removeChild(child3);
        //添加新页的div
        parent.appendChild(row1ForMyTask[indexForMyTask]);
        parent.appendChild(row2ForMyTask[indexForMyTask]);
        parent.appendChild(row3ForMyTask[indexForMyTask]);


        if($('#finishButton').css("display")!="none"&&shouldAddCross()){    //修改
            removeTask();
        }

        //如果点完finish刷新就不需要！
        if($('#finishButton').css("display")=="none"){ //复原
            clearCover();
        }
    }

    plForMyTask.addEventListener("click",shiftForMyTask);
    prForMyTask.addEventListener("click",shiftForMyTask);

    function shouldAddCross(){
        var should=true;
        var allChosen=false;
        var chosenCount=0;    //页面上的task是否全部被预选为删除，true则不调用

        var tasks=document.querySelector("#myTaskList").getElementsByClassName("task");
        var len=tasks.length;
        for(var i=0;i<len;i++){     //alert(tasks[i].querySelector(".deleteMe"));
            if( tasks[i].children[2]!=null){ //存在叉叉则should标为false
                should=false;
            }
            if(tasks[i].children[3]!=null){ //存在未被预删除的task则allChosen标为false
                chosenCount=chosenCount+1;
            }
        }

        if(chosenCount==len){
            allChosen=true;
        }

        return should&&!allChosen;   //不存在叉且没有都被选为预删除
    }

    function clearCover() {  //如果点完finish刷新就不需要！
        var tasks = document.querySelector("#myTaskList").getElementsByClassName("task"); //只获取myTaskList里面的task！！！！
        var len = tasks.length;
        for (var i = 0; i < len; i++) {
            //remove cover
            if (tasks[i].children[2] != null) {    //移除第三个子节点（即大叉）
                tasks[i].removeChild(tasks[i].children[2]);
            }
            if (tasks[i].children[2] != null) {    //上面remove了第三个子节点，所以这里第四个子节点变成了第三个子节点
                tasks[i].removeChild(tasks[i].children[2]);
            }

            tasks[i].classList.remove("swinging1");//不再抖动,这里其实可以判断是remove哪个swinging
            tasks[i].classList.remove("swinging2");
            tasks[i].classList.remove("swinging3");

            //恢复展示任务的功能
            tasks[i].setAttribute("onclick", "showTask(this,false)");
        }
    }

}
/*
 *查当前用户添加且未完成的任务
 */
/*
var plForMyTask = document.getElementsByClassName("paginateForMyTask")[0];
var prForMyTask = document.getElementsByClassName("paginateForMyTask")[1];

plForMyTask.onclick = slideForMyTask.bind( this, -1 );
prForMyTask.onclick = slideForMyTask.bind( this, 1 );
var maxForMyTask=15;							//总共max张
var indexForMyTask = 0, intervalForMyTask=9, totalForMyTask = Math.ceil(maxForMyTask/intervalForMyTask);	//index为当前页索引，每页inteval张，总页数total=max/inteval上取整
//图片src数组
var directoryForMyTask=new Array("http://www.runoob.com/wp-content/uploads/2016/04/img_fjords.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_lights.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg","img/picture/cat.jpg","img/picture/fries.jpg","img/picture/xiaowanzi.jpg","img/picture/princess.jpg","img/picture/horse.jpg","img/picture/catandfish.jpg","img/picture/chopper.jpg","img/picture/luo.jpg","img/picture/luffy.jpg","img/picture/naruto.jpg","img/picture/moon.jpg","img/picture/swordman.jpg");
//图片alt&description数组
var textForMyTask=new Array("The Troll's tongue in Hardanger, NorwayThe Troll's tongue in Hardanger, NorwayThe Troll's tongue in Hardanger, NorwayThe Troll's tongue in Hardanger, NorwayThe Troll's tongue in Hardanger, NorwayThe Troll's tongue in Hardanger, Norway","Northern Lights in Norway","壮美山河","布偶猫","French Fries","樱桃小丸子","公主的裙子上有小船","武僧推出一波浪的马","黑猫抱着蓝鱼","乔巴和骷髅男","海贼王-罗","蒙奇·D·路飞","火影忍者-鸣人","月亮上坐着个女孩儿","背着刀剑的男人");
// 动态创建album
//var album=new Array();
var row1ForMyTask= new Array();
var row2ForMyTask=new Array();
var row3ForMyTask=new Array();

for(var i=0; i<totalForMyTask; i++){
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    row.setAttribute("id", "r1ForMyTask");
    for(var j=0; j<3&&i*intervalForMyTask+j+1<=maxForMyTask; j++){
        var photo = document.createElement("div");
        photo.setAttribute("class", "task");
        var pic = document.createElement("img");
        //pic.setAttribute("class", "image");
        pic.setAttribute("src", directoryForMyTask[i*intervalForMyTask+j]);
        pic.setAttribute("alt", textForMyTask[i*intervalForMyTask+j]);
        pic.setAttribute("width", "240");
        pic.setAttribute("height", "160");
        //pic.setAttribute("onclick", "showPicture(this)");
        var description = document.createElement("div");
        description.setAttribute("class", "taskTitle");
        description.innerHTML=textForMyTask[i*intervalForMyTask+j];

        photo.appendChild(pic.cloneNode(true));
        photo.appendChild(description.cloneNode(true));

        photo.setAttribute("onclick", "showTask(this,false)");
        row.appendChild(photo.cloneNode(true));
    }
    row1ForMyTask.push(row.cloneNode(true));

    var row = document.createElement("div");
    row.setAttribute("class", "row tworow");
    row.setAttribute("id", "r2ForMyTask");
    for(var j=3; j<6&&i*intervalForMyTask+j+1<=maxForMyTask; j++){
        var photo = document.createElement("div");
        photo.setAttribute("class", "task");
        var pic = document.createElement("img");
        //pic.setAttribute("class", "image");
        pic.setAttribute("src", directoryForMyTask[i*intervalForMyTask+j]);
        pic.setAttribute("alt", textForMyTask[i*intervalForMyTask+j]);
        pic.setAttribute("width", "240");
        pic.setAttribute("height", "160");
        //pic.setAttribute("onclick", "showPicture(this)");
        var description = document.createElement("div");
        description.setAttribute("class", "taskTitle");
        description.innerHTML=textForMyTask[i*intervalForMyTask+j];

        photo.appendChild(pic.cloneNode(true));
        photo.appendChild(description.cloneNode(true));

        photo.setAttribute("onclick", "showTask(this,false)");
        row.appendChild(photo.cloneNode(true));
    }
    row2ForMyTask.push(row.cloneNode(true));

    var row = document.createElement("div");
    row.setAttribute("class", "row tworow");
    row.setAttribute("id", "r3ForMyTask");
    for(var j=6; j<9&&i*intervalForMyTask+j+1<=maxForMyTask; j++){
        var photo = document.createElement("div");
        photo.setAttribute("class", "task");
        var pic = document.createElement("img");
        //pic.setAttribute("class", "image");
        pic.setAttribute("src", directoryForMyTask[i*intervalForMyTask+j]);
        pic.setAttribute("alt", textForMyTask[i*intervalForMyTask+j]);
        pic.setAttribute("width", "240");
        pic.setAttribute("height", "160");
        //pic.setAttribute("onclick", "showPicture(this)");
        var description = document.createElement("div");
        description.setAttribute("class", "taskTitle");
        description.innerHTML=textForMyTask[i*intervalForMyTask+j];

        photo.appendChild(pic.cloneNode(true));
        photo.appendChild(description.cloneNode(true));

        photo.setAttribute("onclick", "showTask(this,false)");
        row.appendChild(photo.cloneNode(true));
    }
    row3ForMyTask.push(row.cloneNode(true));

}

function slideForMyTask(offset) {
    indexForMyTask = Math.min( Math.max( indexForMyTask + offset, 0 ), totalForMyTask - 1 );
    document.querySelector( '.counterForMyTask' ).innerHTML = ( indexForMyTask + 1 ) + ' / ' + totalForMyTask;
    plForMyTask.setAttribute( 'data-state', indexForMyTask === 0 ? 'disabled' : '' );
    prForMyTask.setAttribute( 'data-state', indexForMyTask === totalForMyTask - 1 ? 'disabled' : '' );
}

//初始化
slideForMyTask(0);
var parentForMyTask=document.getElementById("myTaskList");
parentForMyTask.appendChild(row1ForMyTask[0]);	//不需要prepend
parentForMyTask.appendChild(row2ForMyTask[0]);
parentForMyTask.appendChild(row3ForMyTask[0]);

function shiftForMyTask(){
    var parent=document.getElementById("myTaskList");
    var child1=document.getElementById("r1ForMyTask");
    var child2=document.getElementById("r2ForMyTask");
    var child3=document.getElementById("r3ForMyTask");
    //删除原有div
    parent.removeChild(child1);
    parent.removeChild(child2);
    parent.removeChild(child3);
    //添加新页的div
    parent.appendChild(row1ForMyTask[indexForMyTask]);
    parent.appendChild(row2ForMyTask[indexForMyTask]);
    parent.appendChild(row3ForMyTask[indexForMyTask]);


    if($('#finishButton').css("display")!="none"&&shouldAddCross()){    //修改
        removeTask();
    }

    //如果点完finish刷新就不需要！
    if($('#finishButton').css("display")=="none"){ //复原
        clearCover();
    }
}

plForMyTask.addEventListener("click",shiftForMyTask);
prForMyTask.addEventListener("click",shiftForMyTask);

function shouldAddCross(){
    var should=true;
    var allChosen=false;
    var chosenCount=0;    //页面上的task是否全部被预选为删除，true则不调用

    var tasks=document.querySelector("#myTaskList").getElementsByClassName("task");
    var len=tasks.length;
    for(var i=0;i<len;i++){     //alert(tasks[i].querySelector(".deleteMe"));
        if( tasks[i].children[2]!=null){ //存在叉叉则should标为false
            should=false;
        }
        if(tasks[i].children[3]!=null){ //存在未被预删除的task则allChosen标为false
            chosenCount=chosenCount+1;
        }
    }

    if(chosenCount==len){
        allChosen=true;
    }

    return should&&!allChosen;   //不存在叉且没有都被选为预删除
}

function clearCover(){  //如果点完finish刷新就不需要！
    var tasks=document.querySelector("#myTaskList").getElementsByClassName("task"); //只获取myTaskList里面的task！！！！
    var len=tasks.length;
    for(var i=0;i<len;i++){
        //remove cover
        if( tasks[i].children[2]!=null){    //移除第三个子节点（即大叉）
            tasks[i].removeChild(tasks[i].children[2]);
        }
        if( tasks[i].children[2]!=null){    //上面remove了第三个子节点，所以这里第四个子节点变成了第三个子节点
            tasks[i].removeChild(tasks[i].children[2]);
        }

        tasks[i].classList.remove("swinging1");//不再抖动,这里其实可以判断是remove哪个swinging
        tasks[i].classList.remove("swinging2");
        tasks[i].classList.remove("swinging3");

        //恢复展示任务的功能
        tasks[i].setAttribute("onclick", "showTask(this,false)");
    }
}*/
