function getImagesOfTask(taskID,readOnlyOrnot) {
    if(readOnlyOrnot==true) {
        $.ajax(
            {
                url: "http://localhost:8080/getPicturesOfTask",
                data: {
                    TaskName:taskID
                },
                async: false,
                success: function (data) {
                    //document.getElementById("album").innerHTML="";
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
                    var pl = document.querySelector('.paginate.left');
                    var pr = document.querySelector('.paginate.right');
                    pl.onclick = slide.bind(this, -1);
                    pr.onclick = slide.bind(this, 1);
                    var directory = new Array();
                    var max = data.length;
                    for (var i = 0; i < max; i++) {
                        directory.push(data[i]);
                    }
                    //directory=new Array("http://www.runoob.com/wp-content/uploads/2016/04/img_fjords.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_lights.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg","img/picture/cat.jpg","img/picture/fries.jpg","img/picture/xiaowanzi.jpg","img/picture/princess.jpg","img/picture/horse.jpg","img/picture/catandfish.jpg","img/picture/chopper.jpg","img/picture/luo.jpg","img/picture/luffy.jpg","img/picture/naruto.jpg","img/picture/moon.jpg","img/picture/swordman.jpg");
                    //directory=new Array("../rear/src/main/java/hahaha/image/nature/chanel.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_lights.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg","img/picture/cat.jpg","img/picture/fries.jpg","img/picture/xiaowanzi.jpg","img/picture/princess.jpg","img/picture/horse.jpg","img/picture/catandfish.jpg","img/picture/chopper.jpg","img/picture/luo.jpg","img/picture/luffy.jpg","img/picture/naruto.jpg","img/picture/moon.jpg","img/picture/swordman.jpg");
                    //alert(directory[0]);


                    //max=directory.size();
                    var index = 0, interval = 9, total = Math.ceil(max / interval);	//index为当前页索引，每页inteval张，总页数total=max/inteval上取整
                    //图片src数组
                    //directory=new Array("../rear/src/main/java/hahaha/image/nature/chanel.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_lights.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg","img/picture/cat.jpg","img/picture/fries.jpg","img/picture/xiaowanzi.jpg","img/picture/princess.jpg","img/picture/horse.jpg","img/picture/catandfish.jpg","img/picture/chopper.jpg","img/picture/luo.jpg","img/picture/luffy.jpg","img/picture/naruto.jpg","img/picture/moon.jpg","img/picture/swordman.jpg");
                    // 动态创建album
                    var row1 = new Array();
                    var row2 = new Array();
                    var row3 = new Array();
                    var row;
                    for (var i = 0; i < total; i++) {
                        row = document.createElement("div");
                        row.setAttribute("class", "row");
                        //row.setAttribute("id", "r1");
                        for (var j = 0; j < interval && i * interval + j + 1 <= max; j++) {
                            var photo = document.createElement("div");
                            photo.setAttribute("class", "photo fadeIn");
                            var pic = document.createElement("img");
                            pic.setAttribute("class", "image");
                            pic.setAttribute("src", directory[i * interval + j]);
                            pic.setAttribute("alt", "");
                            pic.setAttribute("width", "300");
                            pic.setAttribute("height", "200");
                            //pic.setAttribute("onclick", "showPicture(this)");

                            photo.appendChild(pic.cloneNode(true));
                            row.appendChild(photo.cloneNode(true));
                            //push行到相应的行数组
                            if (j == 2) {
                                row.setAttribute("id", "r1");
                                row1.push(row.cloneNode(true));
                            }
                            else if (j == 5) {
                                row.setAttribute("id", "r2");
                                row2.push(row.cloneNode(true));
                            }
                            else if (j == 8) {
                                row.setAttribute("id", "r3");
                                row3.push(row.cloneNode(true));
                            }
                            if (j == 2 || j == 5) {	//重置row
                                row = document.createElement("div");
                                row.setAttribute("class", "row");
                            }
                        }
                    }
                    if(row2.length>row3.length){
                        row.setAttribute("id", "r3");
                        row3.push(row.cloneNode(true));
                    }
                    else if(row1.length>row2.length){
                        row.setAttribute("id", "r2");
                        row2.push(row.cloneNode(true));
                    }
                    else{
                        row.setAttribute("id", "r1");
                        row1.push(row.cloneNode(true));
                    }
                    //防止remove的时候数组越界找不到对象，加一个空对象，使得row1,row2,row3等长或者row2，row3比row1长1
                    row = document.createElement("div");
                    row.setAttribute("class", "row");
                    row.setAttribute("id", "r2");
                    row2.push(row.cloneNode(true));
                    row.setAttribute("id", "r3");
                    row3.push(row.cloneNode(true));

                    function slide(offset) {
                        index = Math.min(Math.max(index + offset, 0), total - 1);
                        document.querySelector('.counterForAlbum').innerHTML = (index + 1) + ' / ' + total;
                        pl.setAttribute('data-state', index === 0 ? 'disabled' : '');
                        pr.setAttribute('data-state', index === total - 1 ? 'disabled' : '');
                    }

                    //初始化
                    slide(0);
                    var parent = document.getElementById("album");
                    parent.appendChild(row1[0]);
                    parent.appendChild(row2[0]);
                    parent.appendChild(row3[0]);

                    function shift() {
                        var parent = document.getElementById("album");
                        var child1 = document.getElementById("r1");
                        var child2 = document.getElementById("r2");
                        var child3 = document.getElementById("r3");

                        parent.removeChild(child1);
                        parent.removeChild(child2);
                        parent.removeChild(child3);

                        parent.appendChild(row1[index]);
                        parent.appendChild(row2[index]);
                        parent.appendChild(row3[index]);
                    }

                    pl.addEventListener("click", shift);
                    pr.addEventListener("click", shift);

                },
                error: function (xhr) {
                    //alert(taskID);
                    //alert('动态页有问题噶！\n\n' + xhr.responseText);
                },
                traditional: true,
            }
        )
    }
    else{
        $.ajax(
            {
                url: "http://localhost:8080/getPicOfTheTask",
                data: {
                    taskName: taskID,
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
                    var pl = document.querySelector('.paginate.left');
                    var pr = document.querySelector('.paginate.right');
                    pl.onclick = slide.bind(this, -1);
                    pr.onclick = slide.bind(this, 1);
                    var directory = new Array();
                    var max = data.length;
                    for (var i = 0; i < max; i++) {
                        directory.push(data[i]);
                    }
                    //directory=new Array("http://www.runoob.com/wp-content/uploads/2016/04/img_fjords.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_lights.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg","img/picture/cat.jpg","img/picture/fries.jpg","img/picture/xiaowanzi.jpg","img/picture/princess.jpg","img/picture/horse.jpg","img/picture/catandfish.jpg","img/picture/chopper.jpg","img/picture/luo.jpg","img/picture/luffy.jpg","img/picture/naruto.jpg","img/picture/moon.jpg","img/picture/swordman.jpg");
                    //directory=new Array("../rear/src/main/java/hahaha/image/nature/chanel.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_lights.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg","img/picture/cat.jpg","img/picture/fries.jpg","img/picture/xiaowanzi.jpg","img/picture/princess.jpg","img/picture/horse.jpg","img/picture/catandfish.jpg","img/picture/chopper.jpg","img/picture/luo.jpg","img/picture/luffy.jpg","img/picture/naruto.jpg","img/picture/moon.jpg","img/picture/swordman.jpg");
                    //alert(directory[0]);


                    //max=directory.size();
                    var index = 0, interval = 9, total = Math.ceil(max / interval);	//index为当前页索引，每页inteval张，总页数total=max/inteval上取整
                    //图片src数组
                    //directory=new Array("../rear/src/main/java/hahaha/image/nature/chanel.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_lights.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg","img/picture/cat.jpg","img/picture/fries.jpg","img/picture/xiaowanzi.jpg","img/picture/princess.jpg","img/picture/horse.jpg","img/picture/catandfish.jpg","img/picture/chopper.jpg","img/picture/luo.jpg","img/picture/luffy.jpg","img/picture/naruto.jpg","img/picture/moon.jpg","img/picture/swordman.jpg");
                    // 动态创建album
                    var row1 = new Array();
                    var row2 = new Array();
                    var row3 = new Array();
                    var row;
                    for (var i = 0; i < total; i++) {
                        row = document.createElement("div")
                        row.setAttribute("class", "row");
                        //row.setAttribute("id", "r1");
                        for (var j = 0; j < interval && i * interval + j + 1 <= max; j++) {
                            var photo = document.createElement("div");
                            photo.setAttribute("class", "photo fadeIn");
                            var pic = document.createElement("img");
                            pic.setAttribute("class", "image");
                            pic.setAttribute("src", directory[i * interval + j]);
                            pic.setAttribute("alt", "");
                            pic.setAttribute("width", "300");
                            pic.setAttribute("height", "200");
                            pic.setAttribute("onclick", "showPicture(this,'"+taskID+"')");

                            photo.appendChild(pic.cloneNode(true));
                            row.appendChild(photo.cloneNode(true));
                            //push行到相应的行数组
                            if (j == 2) {
                                row.setAttribute("id", "r1");
                                row1.push(row.cloneNode(true));
                            }
                            else if (j == 5) {
                                row.setAttribute("id", "r2");
                                row2.push(row.cloneNode(true));
                            }
                            else if (j == 8) {
                                row.setAttribute("id", "r3");
                                row3.push(row.cloneNode(true));
                            }
                            if (j == 2 || j == 5) {	//重置row
                                row = document.createElement("div");
                                row.setAttribute("class", "row");
                            }
                        }
                    }
                    if(row2.length>row3.length){
                        row.setAttribute("id", "r3");
                        row3.push(row.cloneNode(true));
                    }
                    else if(row1.length>row2.length){
                        row.setAttribute("id", "r2");
                        row2.push(row.cloneNode(true));
                    }
                    else{
                        row.setAttribute("id", "r1");
                        row1.push(row.cloneNode(true));
                    }

                    //防止remove的时候数组越界找不到对象，加一个空对象，使得row1,row2,row3等长或者row2，row3比row1长1
                    row = document.createElement("div");
                    row.setAttribute("class", "row");
                    row.setAttribute("id", "r2");
                    row2.push(row.cloneNode(true));
                    row.setAttribute("id", "r3");
                    row3.push(row.cloneNode(true));

                    function slide(offset) {
                        index = Math.min(Math.max(index + offset, 0), total - 1);
                        document.querySelector('.counterForAlbum').innerHTML = (index + 1) + ' / ' + total;
                        pl.setAttribute('data-state', index === 0 ? 'disabled' : '');
                        pr.setAttribute('data-state', index === total - 1 ? 'disabled' : '');
                    }

                    //初始化
                    slide(0);
                    var parent = document.getElementById("album");
                    parent.appendChild(row1[0]);
                    parent.appendChild(row2[0]);
                    parent.appendChild(row3[0]);

                    function shift() {
                        var parent = document.getElementById("album");
                        var child1 = document.getElementById("r1");
                        var child2 = document.getElementById("r2");
                        var child3 = document.getElementById("r3");

                        parent.removeChild(child1);
                        parent.removeChild(child2);
                        parent.removeChild(child3);

                        parent.appendChild(row1[index]);
                        parent.appendChild(row2[index]);
                        parent.appendChild(row3[index]);
                    }

                    pl.addEventListener("click", shift);
                    pr.addEventListener("click", shift);

                },
                error: function (xhr) {
                    //alert('动态页有问题噶！\n\n' + xhr.responseText);
                },
                traditional: true,
            }
        )
    }
}

/** 替换成相应的 加载测试集图片 的方法 **/
function getImagesOfTest(taskID) {
        $.ajax(
            {
                url: "http://localhost:8080/workerGetTestSet",
                data: {
                    taskName: taskID

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
                        parent.removeChild(child2);
                        parent.removeChild(child3);
                    }
                    var pl = document.querySelector('.paginate.left');
                    var pr = document.querySelector('.paginate.right');
                    pl.onclick = slide.bind(this, -1);
                    pr.onclick = slide.bind(this, 1);
                    var directory = new Array();
                    var max = data.length;
                    for (var i = 0; i < max; i++) {
                        directory.push(data[i]);
                    }
                    //directory=new Array("http://www.runoob.com/wp-content/uploads/2016/04/img_fjords.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_lights.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg","img/picture/cat.jpg","img/picture/fries.jpg","img/picture/xiaowanzi.jpg","img/picture/princess.jpg","img/picture/horse.jpg","img/picture/catandfish.jpg","img/picture/chopper.jpg","img/picture/luo.jpg","img/picture/luffy.jpg","img/picture/naruto.jpg","img/picture/moon.jpg","img/picture/swordman.jpg");
                    //directory=new Array("../rear/src/main/java/hahaha/image/nature/chanel.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_lights.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg","img/picture/cat.jpg","img/picture/fries.jpg","img/picture/xiaowanzi.jpg","img/picture/princess.jpg","img/picture/horse.jpg","img/picture/catandfish.jpg","img/picture/chopper.jpg","img/picture/luo.jpg","img/picture/luffy.jpg","img/picture/naruto.jpg","img/picture/moon.jpg","img/picture/swordman.jpg");
                    //alert(directory[0]);


                    //max=directory.size();
                    var index = 0, interval = 9, total = Math.ceil(max / interval);	//index为当前页索引，每页inteval张，总页数total=max/inteval上取整
                    //图片src数组
                    //directory=new Array("../rear/src/main/java/hahaha/image/nature/chanel.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_lights.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg","img/picture/cat.jpg","img/picture/fries.jpg","img/picture/xiaowanzi.jpg","img/picture/princess.jpg","img/picture/horse.jpg","img/picture/catandfish.jpg","img/picture/chopper.jpg","img/picture/luo.jpg","img/picture/luffy.jpg","img/picture/naruto.jpg","img/picture/moon.jpg","img/picture/swordman.jpg");
                    // 动态创建album
                    var row1 = new Array();
                    var row2 = new Array();
                    var row3 = new Array();
                    var row;
                    for (var i = 0; i < total; i++) {
                        row = document.createElement("div")
                        row.setAttribute("class", "row");
                        //row.setAttribute("id", "r1");
                        for (var j = 0; j < interval && i * interval + j + 1 <= max; j++) {
                            var photo = document.createElement("div");
                            photo.setAttribute("class", "photo fadeIn");
                            var pic = document.createElement("img");
                            pic.setAttribute("class", "image");
                            pic.setAttribute("src", directory[i * interval + j]);
                            pic.setAttribute("alt", "");
                            pic.setAttribute("width", "300");
                            pic.setAttribute("height", "200");
                            pic.setAttribute("onclick", "showPicture(this,'"+taskID+"')");

                            photo.appendChild(pic.cloneNode(true));
                            row.appendChild(photo.cloneNode(true));
                            //push行到相应的行数组
                            if (j == 2) {
                                row.setAttribute("id", "r1");
                                row1.push(row.cloneNode(true));
                            }
                            else if (j == 5) {
                                row.setAttribute("id", "r2");
                                row2.push(row.cloneNode(true));
                            }
                            else if (j == 8) {
                                row.setAttribute("id", "r3");
                                row3.push(row.cloneNode(true));
                            }
                            if (j == 2 || j == 5) {	//重置row
                                row = document.createElement("div");
                                row.setAttribute("class", "row");
                            }
                        }
                    }
                    if(row2.length>row3.length){
                        row.setAttribute("id", "r3");
                        row3.push(row.cloneNode(true));
                    }
                    else if(row1.length>row2.length){
                        row.setAttribute("id", "r2");
                        row2.push(row.cloneNode(true));
                    }
                    else{
                        row.setAttribute("id", "r1");
                        row1.push(row.cloneNode(true));
                    }

                    //防止remove的时候数组越界找不到对象，加一个空对象，使得row1,row2,row3等长或者row2，row3比row1长1
                    row = document.createElement("div");
                    row.setAttribute("class", "row");
                    row.setAttribute("id", "r2");
                    row2.push(row.cloneNode(true));
                    row.setAttribute("id", "r3");
                    row3.push(row.cloneNode(true));

                    function slide(offset) {
                        index = Math.min(Math.max(index + offset, 0), total - 1);
                        document.querySelector('.counterForAlbum').innerHTML = (index + 1) + ' / ' + total;
                        pl.setAttribute('data-state', index === 0 ? 'disabled' : '');
                        pr.setAttribute('data-state', index === total - 1 ? 'disabled' : '');
                    }

                    //初始化
                    slide(0);
                    var parent = document.getElementById("album");
                    parent.appendChild(row1[0]);
                    parent.appendChild(row2[0]);
                    parent.appendChild(row3[0]);

                    function shift() {
                        var parent = document.getElementById("album");
                        var child1 = document.getElementById("r1");
                        var child2 = document.getElementById("r2");
                        var child3 = document.getElementById("r3");

                        parent.removeChild(child1);
                        parent.removeChild(child2);
                        parent.removeChild(child3);

                        parent.appendChild(row1[index]);
                        parent.appendChild(row2[index]);
                        parent.appendChild(row3[index]);
                    }

                    pl.addEventListener("click", shift);
                    pr.addEventListener("click", shift);

                },
                error: function (xhr) {
                    //alert('动态页有问题噶！\n\n' + xhr.responseText);
                },
                traditional: true,
            }
        )
}


