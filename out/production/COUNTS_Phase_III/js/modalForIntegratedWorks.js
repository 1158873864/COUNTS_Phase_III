
    // 获取模态窗口
    var modal = document.getElementById('myModal');
    // 获取图片模态框数据
    var modalImg = document.getElementById("modalImg");

    var pointList1=new Array();
    var pointList2=new Array();
    var src;

    var attributeArray;    //属性数组
    var alternativeArray;   //备选项数组
    var descriptionArray;   //存放split后的标注信息

    //imgTag为获取的img标签
    function showPicture(imgTag,taskID){
        refresh();
        modal = document.getElementById('myModal');
        // 获取图片模态框数据
        modalImg = document.getElementById("modalImg");

        modal.style.display = "block";
        modalImg.src = imgTag.src;
        modalImg.alt = imgTag.alt;

        /*
         * 不需要标注方式！！！！
         */
        //attributeArray = new Array("颜色","尺寸","品种");    //属性数组
        //alternativeArray = new Array("黄色,白色,黑色","小,中,大","吐司,法式长棍,金砖,羊角面包,菠萝包,热狗面包,咖喱面包,巧克力面包");   //备选项数组
        attributeArray = new Array();
        alternativeArray = new Array();
        descriptionArray = modalImg.alt.split("<br>");

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
            selectedAlternative.innerHTML=getSelectedAttribute(attributeArray[i]);  //获取对应的标注记录

            attribute.appendChild(attributeName.cloneNode(true));
            attribute.appendChild(selectedAlternative.cloneNode(true));

            document.getElementById("attributeArea").appendChild(attribute.cloneNode(true));
        }
        //默认加载第一个属性的备选项
        showAlternatives(document.getElementById("attributeArea").getElementsByClassName("attributeBox")[0]);

        $.ajax(
            {
                url:"http://localhost:8080/GetResultOfOnePic",
                data:{taskName:taskID,
                    picture:imgTag.src},
                async: false,
                success:function(data){
                    for(var i=0;i<data.length;i+=2){
                        if(data[i]==","){
                            break;
                        }
                        else{
                            //转化为距离屏幕左和顶的距离！！！！！
                            pointList1.push(Math.round(parseFloat(data[i])*document.getElementById("con").offsetWidth)+document.getElementById("con").offsetLeft);
                            pointList2.push(Math.round(parseFloat(data[i+1])*document.getElementById("con").offsetHeight)+document.getElementById("con").offsetTop);
                        }

                    }

                },
                error: function (xhr) {
                    //alert(xhr.responseText);
                },
                traditional: true,
            }
        )

        /***获取position列表，画线，其中第一个点用setStartAndEndPoint函数画***/
        //1.获取列表
        //pointList1.push(652,466,524,687);
        //pointList2.push(210,282,362,257);
        //2.判断是否是整体描述
        if(pointList1[0]!=pointList1[1]||pointList2[0]!=pointList2[1]){ //前两个点x,y坐标完全相同则说明是整体描述
            //3.画线
            setStartAndEndPoint(pointList1[0]-2.5,pointList2[0]-2.5);   //起始点从中心减去圆的半径的位置开始画
            for(var i=0;i<pointList1.length-1;i++){
                line(pointList1[i],pointList2[i],pointList1[i+1],pointList2[i+1]);
            }
            line(pointList1[pointList1.length-1],pointList2[pointList1.length-1],pointList1[0],pointList2[0]);
        }
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

        oldPoint = null;//重置oldPoint
        pointList1.length=0;    //清空点集
        pointList2.length=0;
        isStartPoint=false;
        isLine=false;   //没有画第一个点之前不能认为是曲线标注
        hasLines=false;

        x1=0;   //还原
        x2=0;
        y1=0;
        y2=0;
    }

function makedot(x, y){
    pointDiv = "<div class='redPoint' style='left:" + x + "px;top:" + y + "px'></div>";
    return pointDiv;
}

function setStartAndEndPoint(x, y){
    isLine=true;    //确定开始曲线标注，需要满足闭合曲线的条件
    pointDiv = "<div class='startPoint' style='left:" + x + "px;top:" + y + "px;'></div>";
    //pointDiv.setAttribute("onclick","isStart()");
    var container = document.getElementById("con");
    container.innerHTML += pointDiv;
}

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

    // 获取关闭模态框按钮
    var closeModal = document.getElementsByClassName("close")[0];

    // 关闭模态框事件
    closeModal.onclick = function() { 
        modal.style.display = "none";

        if(jcrop!=null){jcrop.destroy();}    //移除上一个图片的Jcrop
        refresh();
    }


    //获取某个属性被选中的备选项
    function getSelectedAttribute(attrName){
        for(var i=0;i<descriptionArray.length;i++){
            if(attrName==descriptionArray[i].split(":")[0]){
                return descriptionArray[i].split(":")[1];
            }
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

            //添加掉落字体动画所需要的span
            var array=alternatives[i].split("");
            for(var j=0;j<array.length;j++){
                var span = document.createElement("span");
                span.innerText=array[j];
                alt.appendChild(span.cloneNode(true));
            }


            //若存在已选择的备选项则标出
            if(attribute.getElementsByClassName("selectedAlternativeBox")[0].innerText==alternatives[i]){
                alt.classList.remove("altBox");
                alt.classList.add("selected");
            }

            document.getElementById("alternativeArea").appendChild(alt.cloneNode(true));
        }
    }

    /*** 下载任务 ***/
    function downloadTask(){
        var $eleForm = $("<form method='get'></form>");

        $eleForm.attr("target",'');
        var path="";

        /*根据任务名获取对应的整合完毕的数据集并打包成zip*/
        var taskID=document.getElementById("albumTitle").innerHTML;
        alert(taskID)
        $.ajax(
            {
                url: "http://localhost:8080/getDownload",
                data: {
                    taskname:taskID
                },
                async: false,
                success: function (data) {
                    alert("1")
                    path=data;

                },
                error: function (xhr) {
                   alert(xhr.responseText)
                    path=data;
                },
                traditional: true,
            }
        )
        //$eleForm.attr("action","/COUNTS_Phase_III/rear/src/main/java/com/example/record/zip/test.zip");
        alert(path)
        $eleForm.attr("action",path);
        $(document.body).append($eleForm);
        $eleForm.submit();   //提交表单，实现下载
    }



