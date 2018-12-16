
    var name = "";
    var email = getUsername();
    var phone = "";
    $.ajax(
        {
            url: "http://localhost:8080/getNews",
            data: {
                clue: email
            },
            async: false,
            success: function (data) {
                name = data[0];
                phone = data[2];
                //加载label内容
                document.getElementById("name").innerText = name;
                document.getElementById("email").innerText = email;
                document.getElementById("telephone").innerText = phone;
            },
            error: function (xhr) {
                //alert('动态页有问题噶！\n\n' + xhr.responseText);
            },
            traditional: true,
        }
    )

//worker和boss的profile的公同方法
function toRevisePassword(){
    $("#faceIDRegisterPart").fadeOut();
    //内容替换
    $("#profilePart").fadeOut();
    window.setTimeout(function(){$("#passwordPart").fadeIn();},500);
    //操作栏替换
    $("#reviseFaceID").fadeOut();
    $("#revisePassword").fadeOut();
    $("#revise").fadeOut();
    window.setTimeout(function(){$("#cancelForPassword").fadeIn();},500);       //取消修改密码的按钮
    window.setTimeout(function(){$("#submitPassword").fadeIn();},500);
}
    function faceRegister() {
        $("#profilePart").fadeOut();
        $("#reviseFaceID").fadeOut();
        $("#revisePassword").fadeOut();
        $("#revise").fadeOut();
        window.setTimeout(function(){$("#faceIDRegisterPart").fadeIn();},500);
        window.setTimeout(function(){$("#cancel").fadeIn();},500);
        function canvasToImage(canvas) {
            var image = new Image();
            image.src = canvas.toDataURL("image/png");
            return image;
        }

        function getImageBase64(img, ext) {
            var canva = document.createElement("canvas");   //创建canvas DOM元素，并设置其宽高和图片一样
            canva.width = img.width;
            canva.height = img.height;
            var ctx = canva.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height); //使用画布画图
            var dataURL = canva.toDataURL("image/" + ext);  //返回的是一串Base64编码的URL并指定格式
            canva = null; //释放
            return dataURL;
        }

        function hasUserMedia() {//判断是否支持调用设备api，因为浏览器不同所以判断方式不同哦
            return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        }

        if (hasUserMedia()) {
            //alert(navigator.mozGetUserMedia)
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            var video = document.querySelector("video");
            var canvas = document.querySelector("canvas");
            var streaming = false;
            navigator.getUserMedia({
                video: true,//开启视频
                audio: false//先关闭音频，因为会有回响，以后两台电脑通信不会有响声
            }, function (stream) {//将视频流交给video
                video.src = window.URL.createObjectURL(stream);
                streaming = true;
            }, function (err) {
                console.log("capturing", err);
            });
            document.querySelector("#capture").addEventListener("click", function (event) {
                if (streaming) {
                    //alert(video.clientHeight)
                    //canvas.width = video.clientWidth;
                    //canvas.height= video.clientHeight;
                    var face_token = "";
                    canvas.width = 800;
                    canvas.height = 800;
                    var context = canvas.getContext('2d');

                    context.drawImage(video, 20, 20);
                    //var dataUrl;
                    var image = canvasToImage(canvas);
                    /*image.onload = function() { //image.onload是等待图片加载完毕，等待图片加载完毕之后，才能对图片进行操作
                        dataUrl=getImageBase64(image,"png");
                        alert(dataUrl);



                    }*/

                    var imgSrc = image.src.replace("data:image/png;base64,", "");
                    $.ajax(
                        {
                            url: "https://api-cn.faceplusplus.com/facepp/v3/detect",
                            type: 'POST',
                            data: {
                                api_key: "aHpzPgyzDOlEYVYuJ_VsQpxWsvxJOikm",
                                api_secret: "gqZsmpof97Vws-qgn6MRAO3mltrLm8Az",
                                image_base64: imgSrc,
                            },
                            dataType: 'JSON',
                            async: false,
                            success: function (data) {
                                face_token = data.faces[0].face_token;
                                //alert(face_token);
                            },
                            error: function (xhr) {
                                //alert('动态页有问题噶！\n\n' + xhr.responseText);
                            },
                            traditional: true,
                        }
                    )
/*
                                    $.ajax(
                                        {
                                            url: "https://api-cn.faceplusplus.com/facepp/v3/faceset/create",
                                            type: 'POST',
                                            data: {
                                                api_key:"aHpzPgyzDOlEYVYuJ_VsQpxWsvxJOikm",
                                                api_secret:"gqZsmpof97Vws-qgn6MRAO3mltrLm8Az",
                                                outer_id:"set"
                                            },
                                            dataType: 'JSON',
                                            async:false,
                                            success: function (data) {
                                                alert(data.faceset_token);

                                            },
                                            error: function (xhr) {
                                                alert('动态页有问题噶！\n\n' + xhr.responseText);
                                            },
                                            traditional: true,
                                        }
                                    )*/
                    var name=getUsername().replace("@","#");

                    $.ajax(
                        {
                            url: "https://api-cn.faceplusplus.com/facepp/v3/faceset/addface",
                            type: 'POST',
                            data: {
                                api_key: "aHpzPgyzDOlEYVYuJ_VsQpxWsvxJOikm",
                                api_secret: "gqZsmpof97Vws-qgn6MRAO3mltrLm8Az",
                                outer_id: "set",
                                face_tokens: face_token
                            },
                            dataType: 'JSON',
                            async: false,
                            success: function (data) {
                                alert(data.face_added);
                            },
                            error: function (xhr) {
                                alert('动态页有问题噶！\n\n' + xhr.responseText);
                            },
                            traditional: true,
                        }
                    )
                    //alert(face_token);
                    $.ajax(
                        {
                            url: "https://api-cn.faceplusplus.com/facepp/v3/face/setuserid",
                            type: 'POST',
                            data: {
                                api_key: "aHpzPgyzDOlEYVYuJ_VsQpxWsvxJOikm",
                                api_secret: "gqZsmpof97Vws-qgn6MRAO3mltrLm8Az",
                                face_token: face_token,
                                user_id: name
                            },
                            dataType: 'JSON',
                            async: false,
                            success: function (data) {
                                //alert("1");
                                //alert(data.user_id);
                            },
                            error: function (xhr) {
                                alert('动态页有问题噶！\n\n' + xhr.responseText);
                            },
                            traditional: true,
                        }
                    )
                    alert("faceID注册成功！");


                }
            })
        } else {
            alert("浏览器暂不支持");
        }
    }
function cancelRevisePassword(){
    //错误信息提示栏清除
    $("#errorTips").html("");
    //内容复原
    $("#passwordPart").fadeOut();
    window.setTimeout(function(){$("#profilePart").fadeIn();},500);
    //操作栏复原
    $("#cancelForPassword").fadeOut();
    $("#submitPassword").fadeOut();
    window.setTimeout(function(){$("#reviseFaceID").fadeIn();},500);
    window.setTimeout(function(){$("#revisePassword").fadeIn();},500);       //取消修改密码的按钮
    window.setTimeout(function(){$("#revise").fadeIn();},500);
    //清空密码栏
    document.getElementById("passwordOld").value="";
    document.getElementById("passwordNew").value="";
    document.getElementById("passwordAgain").value="";
}

function submitRevisePassword(){
    if(document.getElementById("passwordOld").value==""||document.getElementById("passwordNew").value==""|| document.getElementById("passwordAgain").value==""){
        $("#errorTips").html('<i class="icon-login icon-login-error"></i>'+"请填写完整信息！");
    }
    else if(document.getElementById("passwordNew").value!=document.getElementById("passwordAgain").value){
        $("#errorTips").html('<i class="icon-login icon-login-error"></i>'+"两次密码输入不一致！");
    }
    else{

        //**后台验证原密码是否正确**//
        $.ajax(
            {
                url: "http://localhost:8080/getNews",
                data: {
                    clue:getUsername(),
                },
                async:false,
                success: function (data) {

                    if(document.getElementById("passwordOld").value!=data[4]){
                        $("#errorTips").html('<i class="icon-login icon-login-error"></i>'+"原密码输入错误！");
                    }
                    else{
                        //保存新密码
                        $.ajax(
                            {
                                url: "http://localhost:8080/updateInformation",
                                data: {
                                    username:data[0],
                                    password:document.getElementById("passwordNew").value.toString(),
                                    type:data[3],
                                    phoneNumber:data[2],
                                    mailAddress:getUsername(),
                                },
                                async:false,
                                success: function (data) {
                                    window.setTimeout(function(){$("#errorTips").html('<i class="fa fa-check" style="color:limegreen"></i>'+" 密码修改成功！");},500);
                                },
                                error: function (xhr) {
                                    //alert('动态页有问题噶！\n\n' + xhr.responseText);
                                },
                                traditional: true,
                            }
                        )
                        //内容复原
                        $("#passwordPart").fadeOut();
                        $("#errorTips").fadeOut();  //防止原有错误提示产生位移，先fadeOut，再跟profilePart一起fadeIn
                        window.setTimeout(function(){$("#profilePart").fadeIn();},500);
                        window.setTimeout(function(){$("#errorTips").fadeIn();},500);

                        $("#submitPassword").fadeOut(); //先fadeOut,下面html设置延迟,防止tips出来submit出现位移


                        window.setTimeout(function(){$("#errorTips").html("");},3000);   //3秒后提示自动消失
                        $("#cancelForPassword").fadeOut();
                        window.setTimeout(function(){$("#revisePassword").fadeIn();},500);
                        window.setTimeout(function(){$("#revise").fadeIn();},500);

                        //清空密码栏
                        document.getElementById("passwordOld").value="";
                        document.getElementById("passwordNew").value="";
                        document.getElementById("passwordAgain").value="";
                    }
                },
                error: function (xhr) {
                    //alert('动态页有问题噶！\n\n' + xhr.responseText);
                },
                traditional: true,
            }
        )


    }
}

function toReviseProfile(){   //把Label换为input供修改
    document.getElementById("nameEdit").value=document.getElementById("name").innerText;
    document.getElementById("telephoneEdit").value=document.getElementById("telephone").innerText;

    document.getElementById("name").setAttribute("style", "display:none");
    document.getElementById("nameEdit").setAttribute("style", "display:inline");
    document.getElementById("telephone").setAttribute("style", "display:none");
    document.getElementById("telephoneEdit").setAttribute("style", "display:inline");
    $("#reviseFaceID").fadeOut();
    $("#revisePassword").fadeOut();
    $("#revise").fadeOut();
    window.setTimeout(function(){$("#cancel").fadeIn();},500);

    $("#submit").fadeIn();
}

function cancelRevise(){    //取消修改

    $("#errorTips").html("");   //错误信息提示栏清除

    document.getElementById("name").setAttribute("style", "display:inline");
    document.getElementById("nameEdit").setAttribute("style", "display:none");
    document.getElementById("telephone").setAttribute("style", "display:inline");
    document.getElementById("telephoneEdit").setAttribute("style", "display:none");
    $("#cancel").fadeOut();
    window.setTimeout(function(){$("#reviseFaceID").fadeIn();},500);
    window.setTimeout(function(){$("#revisePassword").fadeIn();},500);
    window.setTimeout(function(){$("#revise").fadeIn();},500);

    $("#submit").fadeOut();
    $("#faceIDRegisterPart").fadeOut();
}

function submitRevise(){
    var newName=document.getElementById("nameEdit").value;
    //var newEmail=document.getElementById("emailEdit").value;
    var newTelephone=document.getElementById("telephoneEdit").value;

    //验证可否修改
    if($("#nameEdit").val()==""||$("#telephoneEdit").val()==""){
        $("#errorTips").html('<i class="icon-login icon-login-error"></i>'+"信息不得为空！");
    }
    else{

        //**后台验证手机是否注册过、用户名是否已存在**//

        if($("#nameEdit").val()=="1"){
            $("#errorTips").html('<i class="icon-login icon-login-error"></i>'+"用户名已存在！");
        }
        /*else if($("#emailEdit").val()=="1710342622@qq.com"){
            $("#errorTips").html('<i class="icon-login icon-login-error"></i>'+"邮箱已被注册！");
        }*/
        else if($("#telephoneEdit").val()=="4008-123-123"){
            $("#errorTips").html('<i class="icon-login icon-login-error"></i>'+"手机已被注册！");
        }
        else if(!checkPhone()){
            //block it
        }
        else{
            $.ajax(
                {
                    url: "http://localhost:8080/getNews",
                    data: {
                        clue:getUsername(),
                    },
                    async:false,
                    success: function (data) {

                            //保存新密码
                            $.ajax(
                                {
                                    url: "http://localhost:8080/updateInformation",
                                    data: {
                                        username:$("#nameEdit").val(),
                                        password:data[4],
                                        type:data[3],
                                        phoneNumber:$("#telephoneEdit").val(),
                                        mailAddress:getUsername(),
                                    },
                                    async:false,
                                    success: function (data) {
                                        window.setTimeout(function(){$("#errorTips").html('<i class="fa fa-check" style="color:limegreen"></i>'+" 密码修改成功！");},500);
                                    },
                                    error: function (xhr) {
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
            $("#submit").fadeOut(); //先fadeOut,下面html设置延迟,防止tips出来submit出现位移
            window.setTimeout(function(){$("#errorTips").html('<i class="fa fa-check" style="color:limegreen"></i>'+" 修改成功！");},500);

            window.setTimeout(function(){$("#errorTips").html("");},3000);   //3秒后提示自动消失
            $("#cancel").fadeOut();
            window.setTimeout(function(){$("#revisePassword").fadeIn();},500);
            window.setTimeout(function(){$("#revise").fadeIn();},500);

            //更新信息
            document.getElementById("name").innerText=document.getElementById("nameEdit").value;
            //document.getElementById("email").innerText=document.getElementById("emailEdit").value;
            document.getElementById("telephone").innerText=document.getElementById("telephoneEdit").value;

            document.getElementById("name").setAttribute("style", "display:inline");
            document.getElementById("nameEdit").setAttribute("style", "display:none");
            //document.getElementById("email").setAttribute("style", "display:inline");
            //document.getElementById("emailEdit").setAttribute("style", "display:none");
            document.getElementById("telephone").setAttribute("style", "display:inline");
            document.getElementById("telephoneEdit").setAttribute("style", "display:none");
        }
    }
}

//智能判断邮箱输入是否正确
document.getElementById("emailEdit").onblur = function(){
    var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    var email = $("#emailEdit").val();
    if(!myReg.test(email)){
        $("#errorTips").html('<i class="icon-login icon-login-error"></i>'+"请输入正确的邮箱地址！");
    }
    else{
        $("#errorTips").html("");
    }
}

//智能判断手机输入是否正确
//document.getElementById("telephoneEdit").onblur =
function checkPhone(){
    var myReg=/^1[34578]\d{9}$/;
    var phone = $("#telephoneEdit").val();
    if(!myReg.test(phone)){
        $("#errorTips").html('<i class="icon-login icon-login-error"></i>'+"请输入正确的手机号码！");
        return false;
    }
    else{
        $("#errorTips").html("");
        return true;
    }
}