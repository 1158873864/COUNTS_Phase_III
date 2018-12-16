
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
    var isLine=false;
    var hasLines=false;     //标记图片上是否加载了原有曲线

    var attributeArray;    //属性数组
    var alternativeArray;   //备选项数组
    var descriptionArray;   //存放split后的标注信息

    //imgTag为获取的img标签
    function showPicture(imgTag,taskID){

        modal = document.getElementById('myModal');
        // 获取图片模态框数据
        modalImg = document.getElementById("modalImg");

        modal.style.display = "block";
        modalImg.src = imgTag.src;
        modalImg.alt = imgTag.alt;

        /*
         * 获取标注属性及备选项，获取标注方式
         */
        //attributeArray = new Array("颜色","尺寸","品种");    //属性数组
        //alternativeArray = new Array("黄色,白色,黑色","小,中,大","吐司,法式长棍,金砖,羊角面包,菠萝包,热狗面包,咖喱面包,巧克力面包");   //备选项数组
        descriptionArray = modalImg.alt.split("<br>");

        tagMethod="1";
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
            selectedAlternative.innerHTML=getSelectedAttribute(attributeArray[i]);  //获取对应的标注记录

            attribute.appendChild(attributeName.cloneNode(true));
            attribute.appendChild(selectedAlternative.cloneNode(true));

            document.getElementById("attributeArea").appendChild(attribute.cloneNode(true));
        }
        //默认加载第一个属性的备选项
        showAlternatives(document.getElementById("attributeArea").getElementsByClassName("attributeBox")[0]);

        $.ajax(
            {
                url:"http://localhost:8080/showPicDetail",
                data:{workerEmail:getUsername(),imageUrl:imgTag.src},
                async: false,
                success:function(data){
                    for(var i=0;i<data.length;i+=2){
                        if(data[i]=="#"){
                            break;
                        }
                        else{
                            /*
                            pointList1.push(parseInt(data[i]));
                            pointList2.push(parseInt(data[i+1]));
                            */
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
        //每次点进去默认为纯描述
        document.getElementById("rec").src="img/icon/square-grey.png";
        document.getElementById("line").src="img/icon/line-grey.png";

        /***获取position列表，画线，其中第一个点用setStartAndEndPoint函数画***/
        /***For Example***/
        //1.获取列表
        //pointList1.push(652,466,524,687);
        //pointList2.push(210,282,362,257);
        //2.判断是否是整体描述
        alert(pointList1);
        if(pointList1[0]!=pointList1[1]||pointList2[0]!=pointList2[1]){ //前两个点x,y坐标完全相同则说明是整体描述
            hasLines=true;
            //3.画线
            setStartAndEndPoint(pointList1[0]-2.5,pointList2[0]-2.5);   //起始点从中心减去圆的半径的位置开始画
            for(var i=0;i<pointList1.length-1;i++){
                line(pointList1[i],pointList2[i],pointList1[i+1],pointList2[i+1]);
            }
            line(pointList1[pointList1.length-1],pointList2[pointList1.length-1],pointList1[0],pointList2[0]);
        }
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
        //pointDiv.setAttribute("onclick","isStart()");
        var container = document.getElementById("con");
        container.innerHTML += pointDiv;
    }

    function isCircle() {
        isStartPoint=true;  //设置成为闭合
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
        if(hasLines){   //如果存在原有的曲线，表明要进行修改，先把原有曲线擦除
            clearLine();
            hasLines=false;
        }

        var point = mousePosition(ev);
        pointList1.push(point.x);
        pointList2.push(point.y);

        if(oldPoint != null){   //后续点
            if(isStartPoint!=true){
                line(oldPoint.x, oldPoint.y, point.x, point.y);
            }
            else{                   //*****可以连成闭合曲线******//
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
        //防止用户没点过矩形选框而产生bug，所以要判断非空
        if(jcrop!=null){jcrop.destroy();}
        //isLine=true;
        document.getElementById("con").addEventListener("click",recordP);
        //改图标颜色
        document.getElementById("rec").src="img/icon/square-grey.png";
        document.getElementById("line").src="img/icon/line-black.png";
    }

    function recordP(ev){recordPoint(ev);}

    function startRec(){
        //删除原有div con
        var s=modalImg.src;//先保存图片信息，因为之后会删除img标签
        refresh();
        document.getElementById("modalImg").src=s;//重新赋值src
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

    function clearLine(){ //擦除曲线
        var s=modalImg.src; //先保存图片信息，因为之后会删除img标签
        refresh();
        document.getElementById("modalImg").src=s;  //重新赋值src

        if(tagMethod==1){    //之前是矩形标注,现在还是跳回矩形标注(这里不能用tool是否为black，因为默认都是灰的）
            document.getElementById("rec").click();
        }
        else{   //曲线标注
            document.getElementById("con").addEventListener("click",recordP);
        }
    }

    //保存图片调用方法，将图片的alt改为需要保存的描述，以供用户再次点击时查看
    function reviseDescription(){
        var attributes=document.getElementById("attributeArea").getElementsByClassName("attributeBox");
        var newDescription="";      //标注信息
        for(var i=0;i<attributes.length;i++){
            newDescription=newDescription+","+attributes[i].getElementsByClassName("attributeNameBox")[0].innerText+":"+attributes[i].getElementsByClassName("selectedAlternativeBox")[0].innerText;
        }
        newDescription=newDescription.substring(1);   //去除第一个无用的分号

        if(tagMethod==1&&!hasLines&&x1==x2&&x1==0){    //清除原曲线后未框选
            alert("请框选有效区域！");
        }
        else if(tagMethod==1&&x1==x2&&x1==0){   //选了框后release了
            alert("请进行有效框选！");
        }
        else if(tagMethod==2&&!hasLines&&!isStartPoint){    //原来是!hasLines&&isLine&&!isStartPoint,应该是无论isLine是否为true（有没有点第一个点）
            alert("请画出完整的闭合曲线！");
        }
        else{
            //获取photo单元的总数	
            var len = document.getElementsByClassName('photo').length;
	
            for(var i=0; i<len; i++){
                //获取photo单元，每个photo单元包含image和description单元
                var p = document.getElementsByClassName('photo')[i];
                //匹配图片
                if(p.getElementsByClassName('image')[0].src===modalImg.src){   //如果src不能判定可以换alt
                    p.getElementsByClassName('image')[0].alt=newDescription.replace(/,/g,'<br>');   //分行显示
                    p.getElementsByClassName('description')[0].innerHTML = newDescription.replace(/,/g,'<br>');   //分行显示
                    //将储存alt的变量也修改，防止多次修改无响应
                    modalImg.alt=newDescription.replace(/,/g,'<br>');

                    /*在这里写后台修改方法*/

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

                    var width=document.getElementById("con").offsetWidth;
                    var height=document.getElementById("con").offsetHeight;
                    for(var i=0;i<pointList1.length;i++){
                        pointList1[i]=pointList1[i]/width;
                        pointList2[i]=pointList2[i]/height;
                    }
                    /*在这里写后台修改方法*/
                    $.ajax(
                        {
                            url:"http://localhost:8080/changeLabel",
                            data:{workerEmail:getUsername(),url:modalImg.src,list1:pointList1,list2:pointList2,description:newDescription},
                            success:function(data){

                            },
                            error: function (xhr) {
                                //alert(xhr.responseText);
                            },
                            traditional: true,
                        }
                    )
                    document.getElementsByClassName("close")[0].click();//自动关闭modal
                }
            }
        }
    }

    document.getElementsByClassName("btn-revise")[0].addEventListener("click",reviseDescription); 

	
    // 获取关闭模态框按钮
    var closeModal = document.getElementsByClassName("close")[0];

    // 关闭模态框事件
    closeModal.onclick = function() { 
        modal.style.display = "none";

        if(jcrop!=null){jcrop.destroy();}    //移除上一个图片的Jcrop
        refresh();
    }


    function initTools(tagMethod){
        switch(tagMethod) {
            case "0":
                document.getElementById("rec").setAttribute("style", "display:none");   //隐藏工具栏
                document.getElementById("line").setAttribute("style", "display:none");
                document.getElementById("rubber").setAttribute("style", "display:none");
                break;
            case "1":
                document.getElementById("rec").setAttribute("style", "display:block ; cursor:pointer");  //复原case 0
                document.getElementById("line").setAttribute("style", "display:block ; cursor:not-allowed");
                document.getElementById("rubber").setAttribute("style", "display:block");

                document.getElementById("line").setAttribute("onclick", "");            //禁用line

                document.getElementById("rec").setAttribute("onclick", "startRec()");   //复原case 2
                break;
            case "2":
                document.getElementById("rec").setAttribute("onclick", "");                 //禁用rec

                document.getElementById("rec").setAttribute("style", "display:block ; cursor:not-allowed");      //复原case 0
                document.getElementById("line").setAttribute("style", "display:block ; cursor:pointer");
                document.getElementById("rubber").setAttribute("style", "display:block");

                document.getElementById("line").setAttribute("onclick", "startLine()");      //复原case 1
                break;
        }

        if(tagMethod=="2"){   //原曲线必为闭合曲线
            isLine=true;
            isStartPoint=true;
        }
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
                alt.classList.remove("altBox");
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

