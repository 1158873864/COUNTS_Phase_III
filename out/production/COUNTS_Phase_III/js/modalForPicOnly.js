
// 获取模态窗口
var modal = document.getElementById('myModal');
// 获取图片模态框数据
var modalImg = document.getElementById("modalImg");

var jcrop;  //用于保存jcrop变量
var pointList1=new Array();
var pointList2=new Array();
var x1=0;
var x2=0;
var y1=0;
var y2=0;
var src;

var oldPoint = null;
var isStartPoint=false; //判断有没有连成闭合曲线
var isLine=false;   //是否开始曲线标注

var attributeArray;    //属性数组
var alternativeArray;   //备选项数组
var tagMethod;      //标注方式

var correctAnswer=0;
var taskName;
//imgTag为获取的img标签
function showPicture(imgTag,taskID){
    taskName=taskID;
    modal = document.getElementById('myModal');
    // 获取图片模态框数据
    modalImg = document.getElementById("modalImg");

    modal.style.display = "block";
    modalImg.src = imgTag.src;

    /*
     * 获取标注属性及备选项，获取标注方式
     */

    //attributeArray = new Array("颜色","尺寸","品种");    //属性数组
    //alternativeArray =new Array("黄色,白色,黑色","小,中,大","吐司,法式长棍,金砖,羊角面包,菠萝包,热狗面包,咖喱面包,巧克力面包");   //备选项数组
    tagMethod=1;
    attributeArray = new Array();
    alternativeArray =new Array();

    $.ajax(
        {
            url: "http://localhost:8080/getbiaozhutype",
            data: {
                task:taskID
            },
            async:false,
            success: function (data) {
                tagMethod=data;
            },
            error: function (xhr) {
                alert('动态页有问题噶！\n\n' + xhr.responseText);
            },
            traditional: true,
        }
    )
    $.ajax(
        {
            url: "http://localhost:8080/gettag",
            data: {
                task:taskID
            },
            async:false,
            success: function (data) {
                for(var i=0;i<data.length;i++){
                    attributeArray.push(data[i]);
                }
            },
            error: function (xhr) {
                alert('动态页有问题噶！\n\n' + xhr.responseText);
            },
            traditional: true,
        }
    )
    $.ajax(
        {
            url: "http://localhost:8080/gettagelement",
            data: {
                task:taskID
            },
            async:false,
            success: function (data) {
                for(var i=0;i<data.length;i++){
                    alternativeArray.push(data[i]);
                }
            },
            error: function (xhr) {
                alert('动态页有问题噶！\n\n' + xhr.responseText);
            },
            traditional: true,
        }
    )

    /****要删掉啊
    //tagMethod=1;
    ***/

    initTools(tagMethod);

    //清空上一次的属性名
    document.getElementById("attributeArea").innerHTML="";

    //加载属性名
    for(var i=0;i<attributeArray.length;i++){
        var attribute = document.createElement("div");
        attribute.setAttribute("class", "attributeBox");
        attribute.setAttribute("onmouseover", "lightUp(this)");
        attribute.setAttribute("onmouseout", "dim(this)");
        attribute.setAttribute("onclick", "showAlternatives(this)");

        var attributeName = document.createElement("div");
        attributeName.setAttribute("class", "attributeNameBox");
        attributeName.innerHTML=attributeArray[i];
        var selectedAlternative = document.createElement("div");
        selectedAlternative.setAttribute("class", "selectedAlternativeBox");
        selectedAlternative.innerHTML="请选择";

        attribute.appendChild(attributeName.cloneNode(true));
        attribute.appendChild(selectedAlternative.cloneNode(true));

        document.getElementById("attributeArea").appendChild(attribute.cloneNode(true));
    }
    //默认加载第一个属性的备选项
    showAlternatives(document.getElementById("attributeArea").getElementsByClassName("attributeBox")[0]);
}

function showCoords(c)
{
    x1=c.x;
    y1=c.y;
    x2=c.x2;
    y2=c.y2;

};

function clearCoords()
{
    $('#coords input').val('');
    x1=0;
    y1=0;
    x2=0;
    y2=0;
};


function makedot(x, y){
    pointDiv = "<div class='redPoint' style='left:" + x + "px;top:" + y + "px'></div>";
    return pointDiv;
}

function setStartAndEndPoint(x, y){
    isLine=true;    //确定开始曲线标注，需要满足闭合曲线的条件
    pointDiv = "<div class='startPoint' style='left:" + x + "px;top:" + y + "px;' onclick='isCircle()'></div>";
    var container = document.getElementById("con");
    container.innerHTML += pointDiv;
}

function isCircle() {
    isStartPoint=true;  //设置成为闭合,画最后一条线的line方法也可以写在这里
}

/**
  根据两点坐标画直线。
 */

function line(x1,y1,x2,y2){
    var slope; //斜率
    var direction;//坐标运动方向
    var tx = x2 - x1;
    var ty = y2 - y1;
    if(tx == 0 && ty == 0)return;
    var points = "";
    var axis;//坐标轴上的坐标
    if(Math.abs(tx) >= Math.abs(ty)){//在x轴上移动
        direction = tx > 0 ? 1 : -1;
        tx = Math.abs(tx);
        slope = ty / tx;
        axis = x1;
        for(i = 0; i < tx; i ++){
            points += makedot(axis, y1 + i * slope);
            axis += direction;
        }

    }else{//在y轴上移动
        direction = ty > 0 ? 1 : -1;
        ty = Math.abs(ty);
        slope = tx / ty;
        axis = y1;
        for(i = 0; i < ty; i ++){
            points += makedot(x1 + i * slope, axis);
            axis += direction;
        }
    }
    var container = document.getElementById("con");
    container.innerHTML += points;
}
//var oldPoint = null;
//获取鼠标位置
function mousePosition(ev){
    ev = ev || window.event;
    if(ev.pageX || ev.pageY){
        return {x:ev.pageX, y:event.clientY};
    }
    var doc = document.documentElement, body = document.body;
    var pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
    var pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
    return {x:pageX, y:pageY};
}

function recordPoint(ev){

    var point = mousePosition(ev);

    /*****要删掉啊啊啊啊啊啊
    alert(point.x+" "+point.y); ******/
    //改为在图片内的偏移！！！！！！！！
    pointList1.push(point.x-document.getElementById("con").offsetLeft);
    pointList2.push(point.y-document.getElementById("con").offsetTop);
    if(oldPoint != null){   //后续点
        if(isStartPoint!=true){
            line(oldPoint.x, oldPoint.y, point.x, point.y);
        }
        else{                  //*****可以连成闭合曲线******//
            line(oldPoint.x, oldPoint.y, pointList1[0], pointList2[0]);

            //锁定区域
            document.getElementById("con").removeEventListener("click",recordP);    //不再能画点
            var list=document.getElementsByClassName("redPoint");
            var l=list.length;
            for(var k=0;k<l;k++){
                //list[k].classList.remove("redPoint");     //不能remove，remove就会有bug
                list[k].classList.add("orangePoint");
            }

            //下一个区域
            //isStartPoint=false;
            //oldPoint=null;
            //pointList1.push(-1);
            // pointList2.push(-1);
        }
    }
    else{   //画第一个点,push的是圆的中心，画的起点是左上角（原始鼠标点的位置）
        pointList1[0]=pointList1[0]+document.getElementById("con").offsetLeft;   //加上startPoint的边长的一半,右移
        pointList2[0]=pointList2[0]+document.getElementById("con").offsetTop;    //加上startPoint的边长的一半,下移
        setStartAndEndPoint(point.x,point.y);   //画起始点
        oldPoint={x:pointList1[0], y:pointList2[0]};  //记录为圆的中心
        return; //跳出函数，防止再次赋值oldPoint
    }

    oldPoint = point;
}

function startLine(){
    jcrop.destroy();
    //isLine=true;      没有画第一个点之前不能认为是曲线标注
    document.getElementById("con").addEventListener("click",recordP);
    //改图标颜色
    document.getElementById("rec").src="img/icon/square-grey.png";
    document.getElementById("line").src="img/icon/line-black.png";
}

function recordP(ev){recordPoint(ev);}

function startRec(){
    //删除原有div con
    var s=modalImg.src; //先保存图片信息，因为之后会删除img标签
    refresh();
    document.getElementById("modalImg").src=s;  //重新赋值src
    //改图标颜色
    document.getElementById("rec").src="img/icon/square-black.png";
    document.getElementById("line").src="img/icon/line-grey.png";

    $('#modalImg').Jcrop({
            bgColor:(0,0,0,1),//先设置画布背景透明
            bgFade:true,//选框反应的敏感属性
            fadeTime:300,
            addClass:"beauty",//.css文件中，设置了动画延迟和背景透明，还有radius
            onChange:   showCoords,
            onSelect:   showCoords,
            onRelease:  clearCoords
        },
        function(){
            jcrop = this;
            isLine=false;
            pointList1.length=0;
            pointList2.length=0;
            this.setOptions({bgColor:"black"});//等图片缩放动画结束换回黑色背景
        });
}

function refresh(){ //在由曲线切换为框选或关闭modal时调用，效果：擦除原曲线，重置Jcrop大小
    var parent=document.getElementById("myModal");
    var child=document.getElementById("con");
    parent.removeChild(child);

    var img = document.createElement("img");
    img.setAttribute("class", "modal-content");
    img.setAttribute("id", "modalImg");
    var con = document.createElement("div");
    con.setAttribute("id", "con");
    con.appendChild(img);

    var thirdChild=document.getElementById("rec");  //每次改第三个元素的时候这里都要改！！！
    parent.insertBefore(con,thirdChild);

    oldPoint = null;        //重置oldPoint
    pointList1.length=0;    //清空点集
    pointList2.length=0;
    isStartPoint=false;
    isLine=false;   //没有画第一个点之前不能认为是曲线标注

    x1=0;   //还原
    x2=0;
    y1=0;
    y2=0;
}

function clearLine(){ //擦除曲线
    var s=modalImg.src; //先保存图片信息，因为之后会删除img标签
    refresh();
    document.getElementById("modalImg").src=s;  //重新赋值src

    if(document.getElementById("rec").src.indexOf("img/icon/square-black.png")>0){    //之前是矩形标注,现在还是跳回矩形标注
        document.getElementById("rec").click();
    }
    else{   //曲线标注
        document.getElementById("con").addEventListener("click",recordP);
    }
}

//保存图片调用方法，将图片的alt改为需要保存的描述，以供用户再次点击时查看
saveDescription=()=>{
    var attributes=document.getElementById("attributeArea").getElementsByClassName("attributeBox");
    var hasChosenAll=true;  //是否已为所有属性选择备选项
    var description="";      //标注信息
    for(var i=0;i<attributes.length;i++){
        if(attributes[i].getElementsByClassName("selectedAlternativeBox")[0].innerText=="请选择"){
            hasChosenAll=false;
            break;
        }
        else{
            description=description+","+attributes[i].getElementsByClassName("attributeNameBox")[0].innerText+":"+attributes[i].getElementsByClassName("selectedAlternativeBox")[0].innerText;
        }
    }
    description=description.substring(1);   //去除第一个无用的分号

    /*****要删掉啊啊啊啊啊啊
    if(true){
        alert(x1+" "+y1);
        alert("width:"+document.getElementById("con").offsetWidth+" height:"+document.getElementById("con").offsetHeight);
        var a=x1/document.getElementById("con").offsetWidth;
        var b=y1/document.getElementById("con").offsetHeight;
        alert(a+' '+ b);
        alert(a*document.getElementById("con").offsetWidth+" "+b*document.getElementById("con").offsetHeight)
    }
    ***/

    if(!hasChosenAll){
        alert("请为图片右侧所有属性选择备选项！");
    }
    else if(x1==x2&&x1==0&&tagMethod==1){
        alert("请进行有效框选！");
    }
    else if(isLine&&!isStartPoint){
        alert("请画出完整的闭合曲线！");
    }
    else{
        //获取photo单元的总数
        var len = document.getElementsByClassName('photo').length;

        for(var i=0; i<len; i++){
            //获取photo单元，每个photo单元包含image和description单元
            var p = document.getElementsByClassName('photo')[i];
            //匹配图片
            if(p.getElementsByClassName('image')[0].src===modalImg.src){
                //获取标注图片的src
                src=modalImg.src;

                //标为完成
                var tag = document.createElement("div");
                tag.setAttribute("class", "hasFinished");
                p.appendChild(tag.cloneNode(true));
                /*if(!isLine) {
                    var offsetL=document.getElementById("con").offsetLeft;
                    var offsetT=document.getElementById("con").offsetTop;
                    pointList1.push(x1+offsetL);    //350
                    pointList1.push(x2+offsetL);
                    pointList1.push(x2+offsetL);
                    pointList1.push(x1+offsetL);
                    pointList2.push(y1+offsetT);     //65
                    pointList2.push(y1+offsetT);
                    pointList2.push(y2+offsetT);
                    pointList2.push(y2+offsetT);
                }*/

                if(!isLine) {       //矩形选框的位置信息(图片内偏移)
                    pointList1.push(x1);
                    pointList1.push(x2);
                    pointList1.push(x2);
                    pointList1.push(x1);
                    pointList2.push(y1);
                    pointList2.push(y1);
                    pointList2.push(y2);
                    pointList2.push(y2);
                }

                //统一转化为图片内的百分比
                var width=document.getElementById("con").offsetWidth;
                var height=document.getElementById("con").offsetHeight;
                for(var i=0;i<pointList1.length;i++){
                    pointList1[i]=pointList1[i]/width;
                    if(pointList1[i]>1){
                        pointList1[i]=pointList1[i]-0.2;
                    }
                    pointList2[i]=pointList2[i]/height;
                    if(pointList2[i]>1){
                        pointList2[i]=pointList2[i]-0.2;
                    }

                }

                /*在这里写后台保存方法*/
                $.ajax(
                    {
                        url:"http://localhost:8080/saveLabel",
                        data:{workerEmail:getUsername(),url:src,list1:pointList1,list2:pointList2,description:description},
                        async: false,
                        success:function(data){

                        },
                        error: function (xhr) {
                            //alert(xhr.responseText);
                        },
                        traditional: true,
                    }
                )

                p.getElementsByClassName('image')[0].removeAttribute("onclick");//标注完成的图片不再能在这个界面显示
                document.getElementsByClassName("close")[0].click();//自动关闭modal
            }
        }
    }
}

document.getElementsByClassName("btn-save")[0].addEventListener("click",saveDescription);
document.getElementsByClassName("btn-save")[1].addEventListener("click",checkAnswer);

/* 判断这一次的标注是否正确，正确则正确数+1 */
function checkAnswer(){
    var attributes=document.getElementById("attributeArea").getElementsByClassName("attributeBox");
    var hasChosenAll=true;  //是否已为所有属性选择备选项
    var description="";      //标注信息
    for(var i=0;i<attributes.length;i++){
        if(attributes[i].getElementsByClassName("selectedAlternativeBox")[0].innerText=="请选择"){
            hasChosenAll=false;
            break;
        }
        else{
            description=description+","+attributes[i].getElementsByClassName("attributeNameBox")[0].innerText+":"+attributes[i].getElementsByClassName("selectedAlternativeBox")[0].innerText;
        }
    }
    description=description.substring(1);   //去除第一个无用的分号

    if(!hasChosenAll){
        alert("请为图片右侧所有属性选择备选项！");
    }
    else if(x1==x2&&x1==0&&tagMethod==1){
        alert("请进行有效框选！");
    }
    else if(isLine&&!isStartPoint){
        alert("请画出完整的闭合曲线！");
    }
    else{
        //获取photo单元的总数
        var len = document.getElementsByClassName('photo').length;

        for(var i=0; i<len; i++){
            //获取photo单元，每个photo单元包含image和description单元
            var p = document.getElementsByClassName('photo')[i];
            //匹配图片
            if(p.getElementsByClassName('image')[0].src===modalImg.src){
                //获取标注图片的src
                src=modalImg.src;

                //标为完成
                var tag = document.createElement("div");
                tag.setAttribute("class", "hasFinished");
                p.appendChild(tag.cloneNode(true));

                if(!isLine) {       //矩形选框的位置信息(图片内偏移)
                    pointList1.push(x1);
                    pointList1.push(x2);
                    pointList1.push(x2);
                    pointList1.push(x1);
                    pointList2.push(y1);
                    pointList2.push(y1);
                    pointList2.push(y2);
                    pointList2.push(y2);
                }

                //统一转化为图片内的百分比
                var width=document.getElementById("con").offsetWidth;
                var height=document.getElementById("con").offsetHeight;
                for(var i=0;i<pointList1.length;i++){
                    pointList1[i]=pointList1[i]/width;
                    pointList2[i]=pointList2[i]/height;
                }

                /*后台验证正确性的方法*/
                $.ajax(
                    {
                        url:"http://localhost:8080/workerTestReport",
                        data:{taskName:taskName,image:src,list1:pointList1,list2:pointList2,description:description},
                        async: false,
                        success:function(data){
                            if(data=="1") {
                                correctAnswer = correctAnswer + 1;
                            }
                        },
                        error: function (xhr) {
                            //alert(xhr.responseText);
                        },
                        traditional: true,
                    }
                )




                p.getElementsByClassName('image')[0].removeAttribute("onclick");//标注完成的图片不再能在这个界面显示
                document.getElementsByClassName("close")[0].click();//自动关闭modal
            }
        }
    }
}

/*提交测试集*/
function submitTest() {

    //判断是否全部标注
    tests=document.getElementsByClassName("image");
    len=tests.length;
    var canSubmit=true;
    for(var i=0;i<len;i++){
        if(tests[i].getAttribute("onclick")!=null){
            alert("请对所有测试集进行标注后提交！");
            canSubmit=false;
            break;
        }
    }
    if(canSubmit){
        /** test
        correctAnswer=correctAnswer-2;**/

        if(correctAnswer>=3){   //判断是否达到准确率要求
            var taskID=document.getElementById("albumTitle").innerHTML;
            $.ajax(
                {
                    url: "http://localhost:8080/askForTask",
                    data: {
                        taskName:taskID,
                        id:getUsername()
                    },
                    async: false,
                    success: function (data) {
                    },
                    error: function (xhr) {
                        alert('动态页有问题噶！\n\n' + xhr.responseText);
                    },
                    traditional: true,
                }
            )
            alert("任务添加成功,可前往MyTask界面查看！");
            document.getElementById('back').click();    //返回preview
            //document.getElementById('back').click();    //返回mytask，为避免两次loading，第二次back不调用click函数
            $("#album").fadeOut();
            window.setTimeout(function(){$("#myTaskList").fadeIn(100)},100);
            window.setTimeout(function(){$("#toolsForMyTask").fadeIn(100)},100);
            window.setTimeout(function(){$("#tabsForMyTask").fadeIn(100)},100);

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
            //清零,其实前面back按钮的click已经清零了
            resetCorrectAnswerNumber();
        }
        else{
            alert("添加任务失败！（测试集准确率未达标准，进行相关知识的学习后可再次参与测试）");
            document.getElementById('back').click();
        }
    }
}

//清零正确测试集个数
function resetCorrectAnswerNumber(){
    correctAnswer=0;
}

// 获取关闭模态框按钮
var closeModal = document.getElementsByClassName("close")[0];

// 关闭模态框事件
closeModal.onclick = function() {
    modal.style.display = "none";

    jcrop.destroy();    //移除上一个图片的Jcrop
    refresh();
}


//判断标注方式并加载
function initTools(tagMethod){
    switch(tagMethod) {
        case 0:
            document.getElementById("rec").setAttribute("style", "display:none");   //隐藏工具栏
            document.getElementById("line").setAttribute("style", "display:none");
            document.getElementById("rubber").setAttribute("style", "display:none");
            break;
        case 1:
            document.getElementById("rec").setAttribute("style", "display:block ; cursor:pointer");  //复原case 0
            document.getElementById("line").setAttribute("style", "display:block ; cursor:not-allowed");
            document.getElementById("rubber").setAttribute("style", "display:block");

            document.getElementById("line").setAttribute("onclick", "");            //禁用line

            document.getElementById("rec").setAttribute("onclick", "startRec()");   //复原case 2
            break;
        case 2:
            document.getElementById("rec").setAttribute("onclick", "");                 //禁用rec

            document.getElementById("rec").setAttribute("style", "display:block ; cursor:not-allowed");      //复原case 0
            document.getElementById("line").setAttribute("style", "display:block ; cursor:pointer");
            document.getElementById("rubber").setAttribute("style", "display:block");

            document.getElementById("line").setAttribute("onclick", "startLine()");      //复原case 1
            break;
    }

    if(tagMethod==1){
        //初始化为框选
        document.getElementById("rec").src="img/icon/square-black.png";
        document.getElementById("line").src="img/icon/line-grey.png";
        $('#modalImg').Jcrop({
                bgColor:(0,0,0,1),//先设置画布背景透明
                bgFade:true,//选框反应的敏感属性
                fadeTime:300,
                addClass:"beauty",//.css文件中，设置了动画延迟和背景透明，还有radius
                onChange:   showCoords,
                onSelect:   showCoords,
                onRelease:  clearCoords
            },
            function(){
                jcrop = this;
                this.setOptions({bgColor:"black"});//等图片缩放动画结束换回黑色背景
            });
    }
    else if(tagMethod==2){
        //初始化为不规则曲线
        clearLine();  //清楚上一张图片的曲线
        document.getElementById("rec").src="img/icon/square-grey.png";
        document.getElementById("line").src="img/icon/line-black.png";
        //startLine();      //不存在jcrop不能destroy
        document.getElementById("con").addEventListener("click",recordP);
        isLine=true;       //因为规定是曲线标注，所以强制isLine=true
    }
}

//hover高亮
function lightUp(attribute){
    attribute.getElementsByClassName("attributeNameBox")[0].classList.add("lightUp");
    attribute.getElementsByClassName("selectedAlternativeBox")[0].classList.add("lightUp");
}

function dim(attribute){
    attribute.getElementsByClassName("attributeNameBox")[0].classList.remove("lightUp");
    attribute.getElementsByClassName("selectedAlternativeBox")[0].classList.remove("lightUp");
}

function showAlternatives(attribute){
    //属性项添加选中样式
    $('#attributeArea div .attributeNameBox').removeClass("lightUpAlways");
    $('#attributeArea div .selectedAlternativeBox').removeClass("lightUpAlways");
    attribute.getElementsByClassName("attributeNameBox")[0].classList.add("lightUpAlways");
    attribute.getElementsByClassName("selectedAlternativeBox")[0].classList.add("lightUpAlways");

    //清空上一次的备选项池
    document.getElementById("alternativeArea").innerHTML="";

    //加载备选项
    var attrName=attribute.getElementsByClassName("attributeNameBox")[0].innerText;
    var index=attributeArray.indexOf(attrName);
    var alternatives=alternativeArray[index].split(",");
    for(var i=0;i<alternatives.length;i++){
        var alt = document.createElement("button");
        alt.setAttribute("class", "altBox");
        alt.setAttribute("data-text", alternatives[i]);
        alt.setAttribute("name", attribute.getElementsByClassName("attributeNameBox")[0].innerText);    //用name字段来存放对应的属性名
        alt.setAttribute("onclick", "changeSelectedAlternative(this)");

        //添加掉落字体动画所需要的span
        var array=alternatives[i].split("");
        for(var j=0;j<array.length;j++){
            var span = document.createElement("span");
            span.innerText=array[j];
            alt.appendChild(span.cloneNode(true));
        }
        //若存在已选择的备选项则标出
        if(attribute.getElementsByClassName("selectedAlternativeBox")[0].innerText==alternatives[i]){
            alt.classList.add("selected");
        }

        document.getElementById("alternativeArea").appendChild(alt.cloneNode(true));
    }

}

function changeSelectedAlternative(alt){
    $('#alternativeArea button').removeClass("selected");
    $('#alternativeArea button').addClass("altBox");
    alt.classList.remove("altBox");
    alt.classList.add("selected");

    var attributes=document.getElementById("attributeArea").getElementsByClassName("attributeBox");
    var relativeAttr;       //与选中的备选项对应的属性Box
    for(var i=0;i<attributes.length;i++){
        if(attributes[i].getElementsByClassName("attributeNameBox")[0].innerText==alt.getAttribute("name")){
            relativeAttr=attributes[i];
            break;
        }
    }
    relativeAttr.getElementsByClassName("selectedAlternativeBox")[0].innerText=alt.getAttribute("data-text");
}
