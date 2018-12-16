
/** 修改为从已自动化整合的任务集中查找名字为taskID的任务 **/

function getImagesOfIntegratedTask(taskID) {
    $.ajax(
        {
            url: "http://localhost:8080/showPicOfIntegretedTask",
            data:{
                taskName:taskID,
                email:getUsername()
            },
            async: false,
            success: function (data) {

                var parent = document.getElementById("album");
                var child1 = document.getElementById("r1");
                var child2 = document.getElementById("r2");
                var child3 = document.getElementById("r3");

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

                var pl = document.querySelector( '.paginate.left' );
                var pr = document.querySelector( '.paginate.right' );
                pl.onclick = slide.bind( this, -1 );
                pr.onclick = slide.bind( this, 1 );
                var directory = new Array();
                var text = new Array();
                var max;
                max = data.length;

                for (var i = 0; i < max; i++) {
                    directory.push(data[i]);
                    $.ajax(
                        {
                            url: "http://localhost:8080/GetResultOfOnePic",
                            data: {
                                taskName:taskID,
                                picture:data[i]
                            },
                            async: false,
                            success: function (d) {
                                for(var j=0;j<d.length;j++){
                                    if(d[j]==","){
                                        var desc="";
                                        for(var t=j+1;t<d.length;t++){
                                            if(t!=(d.length-1)){
                                                desc=desc+d[t]+'<br>';
                                            }else{
                                                desc=desc+d[t];
                                            }
                                        }
                                        desc=d[j+1].replace(/,/g,'<br>');
                                        text.push(desc);
                                        break;

                                    }
                                }

                            },
                            error: function (xhr) {
                                alert('动态页有问题噶！\n\n' + xhr.responseText);
                            },
                            traditional: true,
                        }
                    )

                }

                var index = 0, interval = 6, total = Math.ceil(max / interval);	//index为当前页索引，每页inteval张，总页数total=max/inteval上取整

                /****test***/
                //图片src数组
                //directory=new Array("img/picture/cat.jpg","img/picture/fries.jpg","img/picture/xiaowanzi.jpg","img/picture/princess.jpg","img/picture/horse.jpg","img/picture/catandfish.jpg","img/picture/chopper.jpg","img/picture/luo.jpg","img/picture/luffy.jpg","img/picture/naruto.jpg","img/picture/moon.jpg","img/picture/swordman.jpg");
                //图片alt&description数组
                //text=new Array("颜色:白色<br>尺寸:小<br>品种:金砖","French Fries","樱桃小丸子","公主的裙子上有小船","武僧推出一波浪的马","黑猫抱着蓝鱼","乔巴和骷髅男","海贼王-罗","蒙奇·D·路飞","火影忍者-鸣人","月亮上坐着个女孩儿","背着刀剑的男人");
                //max=12;
                //total=2;
                /****test***/

                var row1= new Array();
                var row2=new Array();
                var row;

                for(var i=0;i<total;i++){
                    row = document.createElement("div");
                    row.setAttribute("class", "row");
                    row.setAttribute("id", "r1");
                    for(var j=0;j<3&&i*interval+j+1<=max;j++){
                        var photo = document.createElement("div");
                        photo.setAttribute("class", "photo fadeIn");
                        var pic = document.createElement("img");
                        pic.setAttribute("class", "image");
                        pic.setAttribute("src", directory[i*interval+j]);
                        pic.setAttribute("alt", text[i*interval+j]);
                        pic.setAttribute("width", "300");
                        pic.setAttribute("height", "200");
                        pic.setAttribute("onclick", "showPicture(this,'"+taskID+"')");
                        var description = document.createElement("div");
                        description.setAttribute("class", "description");
                        description.innerHTML=text[i*interval+j];

                        photo.appendChild(pic.cloneNode(true));
                        photo.appendChild(description.cloneNode(true));
                        row.appendChild(photo.cloneNode(true));
                    }

                    row1.push(row.cloneNode(true));

                    var row = document.createElement("div");
                    row.setAttribute("class", "row tworow");
                    row.setAttribute("id", "r2");
                    for(var j=3;j<6&&i*interval+j+1<=max;j++){
                        var photo = document.createElement("div");
                        photo.setAttribute("class", "photo fadeIn");
                        var pic = document.createElement("img");
                        pic.setAttribute("class", "image");
                        pic.setAttribute("src", directory[i*interval+j]);
                        pic.setAttribute("alt", text[i*interval+j]);
                        pic.setAttribute("width", "300");
                        pic.setAttribute("height", "200");
                        pic.setAttribute("onclick", "showPicture(this,'"+taskID+"')");
                        var description = document.createElement("div");
                        description.setAttribute("class", "description");
                        description.innerHTML=text[i*interval+j];

                        photo.appendChild(pic.cloneNode(true));
                        photo.appendChild(description.cloneNode(true));
                        row.appendChild(photo.cloneNode(true));
                    }
                    row2.push(row.cloneNode(true));

                }

                function slide(offset) {
                    index = Math.min( Math.max( index + offset, 0 ), total - 1 );
                    document.querySelector( '.counterForMyWorks' ).innerHTML = ( index + 1 ) + ' / ' + total;
                    pl.setAttribute( 'data-state', index === 0 ? 'disabled' : '' );
                    pr.setAttribute( 'data-state', index === total - 1 ? 'disabled' : '' );
                }

                //初始化
                slide(0);
                var parent=document.getElementById("album");
                parent.appendChild(row1[0]);	//不需要prepend
                parent.appendChild(row2[0]);

                function shift(){
                    var parent=document.getElementById("album");
                    var child1=document.getElementById("r1");
                    var child2=document.getElementById("r2");
                    //删除原有div
                    parent.removeChild(child1);
                    parent.removeChild(child2);
                    //添加新页的div
                    parent.appendChild(row1[index]);
                    parent.appendChild(row2[index]);
                }

                pl.addEventListener("click",shift);
                pr.addEventListener("click",shift);

            },
            error: function (xhr) {
                alert("1");

            },
            traditional: true,
        }
    )
}