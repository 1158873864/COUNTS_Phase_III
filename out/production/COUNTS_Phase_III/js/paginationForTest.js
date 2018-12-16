function getImagesOfTask(taskID) {
    //$.ajax(
    //    {
     //       url: "http://localhost:8080/getPicOfTheTask",
     //       data: {
    //           taskName: taskID,
    //            email:getUsername()
    //        },
    //        async: false,
    //        success: function (data) {


    $.ajax(
        {
            url: "http://localhost:8080/bossgetTestSet",
            data: {
                taskName:taskID
            },
            async:false,
            success: function (data) {
                var max=data.length;
                var directory=new Array();
                for(var i=0;i<max;i++){
                    directory.push(data[i]);
                }
                //directory=new Array("img/picture/luo.jpg","img/picture/luffy.jpg","img/picture/naruto.jpg","img/picture/moon.jpg","img/picture/swordman.jpg");
                //directory=new Array("../rear/src/main/java/hahaha/image/nature/chanel.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_lights.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg","img/picture/cat.jpg","img/picture/fries.jpg","img/picture/xiaowanzi.jpg","img/picture/princess.jpg","img/picture/horse.jpg","img/picture/catandfish.jpg","img/picture/chopper.jpg","img/picture/luo.jpg","img/picture/luffy.jpg","img/picture/naruto.jpg","img/picture/moon.jpg","img/picture/swordman.jpg");
                //alert(directory[0]);

                //max=directory.size();
                var index = 0, interval = 9, total = Math.ceil(max / interval);	//index为当前页索引，每页inteval张，总页数total=max/inteval上取整
                //图片src数组
                //directory=new Array("../rear/src/main/java/hahaha/image/nature/chanel.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_lights.jpg","http://www.runoob.com/wp-content/uploads/2016/04/img_mountains.jpg","img/picture/cat.jpg","img/picture/fries.jpg","img/picture/xiaowanzi.jpg","img/picture/princess.jpg","img/picture/horse.jpg","img/picture/catandfish.jpg","img/picture/chopper.jpg","img/picture/luo.jpg","img/picture/luffy.jpg","img/picture/naruto.jpg","img/picture/moon.jpg","img/picture/swordman.jpg");
                // 动态创建album
                var row1 = new Array();
                var row2 = new Array();
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
                        if (j == 2 || j == 5) {	//重置row
                            row = document.createElement("div");
                            row.setAttribute("class", "row");
                        }
                    }
                }
                if(row1.length>row2.length){
                    row.setAttribute("id", "r2");
                    row2.push(row.cloneNode(true));
                }
                else{
                    row.setAttribute("id", "r1");
                    row1.push(row.cloneNode(true));
                }

                var parent = document.getElementById("album");
                parent.appendChild(row1[0]);
                parent.appendChild(row2[0]);
            },
            error: function (xhr) {
                alert('动态页有问题噶！\n\n' + xhr.responseText);
            },
            traditional: true,
        }
    )
                /*
                var max = data.length;
                for (var i = 0; i < max; i++) {
                    directory.push(data[i]);
                }
                */




     //       },
      //      error: function (xhr) {
      //          //alert('动态页有问题噶！\n\n' + xhr.responseText);
      //      },
      //      traditional: true,
      //  }
    //)
}