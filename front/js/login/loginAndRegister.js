           //初始化帐号信息
            var storage = window.localStorage;
            var username=storage["usernameForCOUNTS"];
            var hasStored = storage["hasStored"];
            //根据'window.localStorage'的值填充页面的用户名
            if(hasStored=="yes"){
                document.getElementById("username").value=username;
                document.getElementById("checkBox").classList.add("active"); //保持记住帐号模式
            }else{
                document.getElementById("username").value="";
            }

            //登录
            document.getElementById("login").onclick=function(){

                //如果没有错误输入信息且用户名密码非空（防止页面加载直接点击登录）则执行登录验证
                if(document.getElementById("errorTips").innerText==""&&$("#username").val()!=""&&$("#password").val()!="") {
                    //判断是否要记住帐号
                    var username = $("#username").val();
                    var storage = window.localStorage;
                    if (document.getElementById("checkBox").classList.length == 3) {    //说明有了active类，checkbox选中
                        //存储到loaclStage
                        storage["usernameForCOUNTS"] = username;
                        storage["hasStored"] = "yes";
                    }
                    else {
                        //否则清空'window.localStorage'
                        storage["hasStored"] = "no";
                        storage["usernameForCOUNTS"] = "";
                    }

                    //登录中
                    this.setAttribute("style", "display:none");
                    document.getElementById("loginING").setAttribute("style", "display:block");

                    //登录验证操作,为了页面效果可以适当设置延迟
                    var isLogin=false;
                    var loginProblem;
                    var position;
                    var id=username.toString();
                    var password=$("#password").val().toString();
                    var idlist=new Array();
                    var passwordlist=new Array();
                    //alert(idlist);
                    //idlist=coding(id);
                    //passwordlist=coding(password);
                    //var temp="1";
                    //alert(coding(temp));

                    $.ajax(
                        {
                            url: "http://localhost:8080/encoding",
                            data: {
                                s:id
                            },
                            async:false,
                            success: function (data) {
                                idlist=data;
                            },
                            error: function (xhr) {
                                //alert('动态页有问题噶！\n\n' + xhr.responseText);
                            },
                            traditional: true,
                        }
                    )
                    $.ajax(
                        {
                            url: "http://localhost:8080/encoding",
                            data: {
                                s:password
                            },
                            async:false,
                            success: function (data) {
                                passwordlist=data;
                            },
                            error: function (xhr) {
                                //alert('动态页有问题噶！\n\n' + xhr.responseText);
                            },
                            traditional: true,
                        }
                    )
                    //alert(idlist);
                    //alert(passwordlist);
                    $.ajax(
                        {
                            url: "http://localhost:8080/login",
                            data: {
                                id:idlist,
                                password:passwordlist
                            },
                            success: function (data) {
                                if(data=="登录成功"){
                                    isLogin=true;
                                }
                                else{
                                    loginProblem=data;
                                }

                                if(isLogin){

                                    /*获得身份信息*/

                                    $.ajax(
                                        {
                                            url: "http://localhost:8080/getNews",
                                            data: {
                                                clue:username.toString(),
                                            },
                                            async:false,
                                            success: function (data) {
                                                position=data[3];
                                                //设置cookie
                                                var d = new Date();
                                                d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));    //1个月？
                                                var expires = "expires=" + d.toUTCString();
                                                document.cookie = "username=" + username + ";"  + expires + "; path=/";
                                                document.cookie = "position=" + position + ";"  + expires + "; path=/";
                                                //alert(document.cookie);

                                                //跳转到相应界面
                                                if (position == "worker") {     //重新登录成功后跳转到内容界面
                                                    //最好能返回登录前选择的界面
                                                    window.location.href = "index.html#start";
                                                }
                                                else if(position=="administer"){
                                                    window.location.href = "administer.html#statistics";
                                                }
                                                else if(position=="boss"){
                                                    window.location.href = "boss.html#release";
                                                }
                                            },
                                            error: function (xhr) {
                                                //alert('动态页有问题噶！\n\n' + xhr.responseText);
                                            },
                                            traditional: true,
                                        }
                                    )




                                }
                                else{
                                    $("#errorTips2").html('<i class="icon-login icon-login-error"></i>'+loginProblem);
                                    document.getElementById("loginING").setAttribute("style", "display:none");
                                    this.setAttribute("style", "display:block");
                                }

                            },
                            error: function (xhr) {

                                var d=xhr.responseText;
                                if(d=="登录成功"){
                                    isLogin=true;
                                }
                                else{
                                    loginProblem=d;
                                }

                                if(isLogin){

                                    /*获得身份信息*/

                                    $.ajax(
                                        {
                                            url: "http://localhost:8080/getNews",
                                            data: {
                                                clue:username.toString(),
                                            },
                                            async:false,
                                            success: function (data) {
                                                position=data[3];
                                                //设置cookie
                                                var d = new Date();
                                                d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));    //1个月？
                                                var expires = "expires=" + d.toUTCString();
                                                document.cookie = "username=" + username + ";"  + expires + "; path=/";
                                                document.cookie = "position=" + position + ";"  + expires + "; path=/";
                                                //alert(document.cookie);
                                                //跳转到相应界面
                                                if (position == "worker") {     //重新登录成功后跳转到内容界面
                                                    //最好能返回登录前选择的界面
                                                    window.location.href = "index.html#start";
                                                }
                                                else if(position=="administer"){
                                                    window.location.href = "administer.html#statistics";
                                                }
                                                else if(position=="boss"){
                                                    window.location.href = "boss.html#release";
                                                }
                                            },
                                            error: function (xhr) {
                                                //alert('动态页有问题噶！\n\n' + xhr.responseText);
                                            },
                                            traditional: true,
                                        }
                                    )




                                }
                                else{
                                    $("#errorTips2").html('<i class="icon-login icon-login-error"></i>'+loginProblem);
                                    document.getElementById("loginING").setAttribute("style", "display:none");
                                    this.setAttribute("style", "display:block");
                                }

                            },
                            traditional: true,
                        }
                    )

                }
            }

            //消除登录验证信息
            document.getElementById("username").onfocus=function(){
                $("#errorTips2").html("");
            }
            document.getElementById("password").onfocus=function(){
                $("#errorTips2").html("");
            }


            //跳转到注册
            document.getElementById("toRegister").onclick=function(){
                $("#login-container").slideUp(800);
                window.setTimeout(function(){$("#register-container").slideDown(1000);},1000);

                //清空表单
                $("#workerChoice").click();//还原
                $("#name").val("");
                $("#email").val("");
                $("#verification").val("");
                $("#telephone").val("");
                $("#password1").val("");
                $("#password2").val("");
                //清空错误提示信息
                $("#errorTips3").html("");
                $("#hasSent").fadeOut();
                $("#getVerification").fadeIn();

            }

            //跳转到faceID
           document.getElementById("toFaceID").onclick=function(){
               $("#login-container").slideUp(800);
               window.setTimeout(function(){$("#faceID-container").slideDown(1000);},1000);
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

               function hasUserMedia(){//判断是否支持调用设备api，因为浏览器不同所以判断方式不同哦
                   return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
               }
               if(hasUserMedia()){
                   //alert(navigator.mozGetUserMedia)
                   navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
                   var video=document.querySelector("video");
                   var canvas=document.querySelector("canvas");
                   var streaming = false;
                   navigator.getUserMedia({
                       video:true,//开启视频
                       audio:false//先关闭音频，因为会有回响，以后两台电脑通信不会有响声
                   },function(stream){//将视频流交给video
                       video.src=window.URL.createObjectURL(stream);
                       streaming = true;
                   },function(err){
                       console.log("capturing",err);
                   });
                   document.querySelector("#facelogin").addEventListener("click",function(event){
                       if(streaming){
                           //alert(video.clientHeight)
                           //canvas.width = video.clientWidth;
                           //canvas.height= video.clientHeight;
                           var face_token="";
                           canvas.width = 800;
                           canvas.height = 800;
                           var context = canvas.getContext('2d');

                           context.drawImage(video,20,20);
                           //var dataUrl;
                           var image=canvasToImage(canvas);
                           /*image.onload = function() { //image.onload是等待图片加载完毕，等待图片加载完毕之后，才能对图片进行操作
                               dataUrl=getImageBase64(image,"png");
                               alert(dataUrl);



                           }*/

                           var imgSrc=image.src.replace("data:image/png;base64,","");
                           var username="";
                           $.ajax(
                               {
                                   url: "https://api-cn.faceplusplus.com/facepp/v3/search",
                                   type: 'POST',
                                   data: {
                                       api_key:"aHpzPgyzDOlEYVYuJ_VsQpxWsvxJOikm",
                                       api_secret:"gqZsmpof97Vws-qgn6MRAO3mltrLm8Az",
                                       image_base64:imgSrc,
                                       outer_id:"set",

                                   },
                                   dataType: 'JSON',
                                   async:false,
                                   success: function (data) {
                                       //alert(username=data.results[0].user_id);
                                       //alert(data.results[0].confidence);
                                       if(data.results[0].confidence>80){
                                           username=data.results[0].user_id;
                                           username=username.replace("#","@");
                                           //alert(username);
                                           $.ajax(
                                               {
                                                   url: "http://localhost:8080/getNews",
                                                   data: {
                                                       clue:username.toString(),
                                                   },
                                                   async:false,
                                                   success: function (data) {
                                                       position=data[3];
                                                       //设置cookie
                                                       var d = new Date();
                                                       d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));    //1个月？
                                                       var expires = "expires=" + d.toUTCString();
                                                       document.cookie = "username=" + username + ";"  + expires + "; path=/";
                                                       document.cookie = "position=" + position + ";"  + expires + "; path=/";
                                                       //alert(document.cookie);
                                                       //跳转到相应界面
                                                       if (position == "worker") {     //重新登录成功后跳转到内容界面
                                                           //最好能返回登录前选择的界面
                                                           window.location.href = "index.html#start";
                                                       }
                                                       else if(position=="administer"){
                                                           window.location.href = "administer.html#statistics";
                                                       }
                                                       else if(position=="boss"){
                                                           window.location.href = "boss.html#release";
                                                       }
                                                   },
                                                   error: function (xhr) {
                                                       //alert('动态页有问题噶！\n\n' + xhr.responseText);
                                                   },
                                                   traditional: true,
                                               }
                                           )
                                       }
                                       else{
                                           alert("未检测到已注册人脸，请进行注册");
                                       }
                                   },
                                   error: function (xhr) {
                                       alert('动态页有问题噶！\n\n' + xhr.responseText);
                                   },
                                   traditional: true,
                               }
                           )

                       }
                   })
               }else{
                   alert("浏览器暂不支持");
               }


           }

            //注册人员类型的选择，workerBox是在下层的，无法click,所以通过两个被隐藏的radio按钮
            document.getElementById("workerChoice").onclick=function(){
                $("#workerBox").removeClass("fa-square-o");
                $("#workerBox").addClass("fa-check-square-o");
                $("#bossBox").removeClass("fa-check-square-o");
                $("#bossBox").addClass("fa-square-o");
            }

            document.getElementById("bossChoice").onclick=function(){
                $("#bossBox").removeClass("fa-square-o");
                $("#bossBox").addClass("fa-check-square-o");
                $("#workerBox").removeClass("fa-check-square-o");
                $("#workerBox").addClass("fa-square-o");
            }

           //获取验证码
           document.getElementById("getVerification").onclick=function(){
                /*判断邮箱是否注册过*/
                var is=false;
                var email=$("#email").val().toString();


               $.ajax(
                   {
                       url: "http://localhost:8080/isMailExits",
                       data: {
                           mailAddress:email
                       },
                       async:false,
                       success: function (data) {
                           if(data.toString()=="1"){
                               is=true;
                               if(!checkEmail()){
                                   $("#errorTips3").html('<i class="icon-login icon-login-error"></i>'+"请输入正确的邮箱地址！");
                               }
                               else if(!is){
                                   $("#errorTips3").html('<i class="icon-login icon-login-error"></i>'+"邮箱已注册！");
                               }
                               else{   /*发送验证码*/
                                   $.ajax(
                                       {
                                           url: "http://localhost:8080/getVertificationCode",
                                           data: {
                                               mailAddress:email
                                           },
                                           async:false,
                                           success: function (data) {
                                           },
                                           error: function (xhr) {
                                               //alert('动态页有问题噶！\n\n' + xhr.responseText);
                                           },
                                           traditional: true,
                                       }
                                   )
                                   /*修改按钮*/
                                   document.getElementById("getVerification").innerHTML="已发送！";
                                   $("#getVerification").fadeOut();
                                   window.setTimeout(function(){$("#hasSent").fadeIn();},500);
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

            //注册
            document.getElementById("register").onclick=function(){
                //判断手机和邮箱格式正确
                if(document.getElementById("errorTips3").innerText!="请输入正确的手机号！"
                    &&document.getElementById("errorTips3").innerText!="请输入正确的邮箱地址！"){

                    $("#errorTips3").html("");  //先清空

                    if($("#name").val()==""||$("#email").val()==""||$("#telephone").val()==""||$("#password1").val()==""||$("#password2").val()==""){
                        $("#errorTips3").html('<i class="icon-login icon-login-error"></i>'+"请填写完整信息！");
                    }
                    else if($("#verification").val()=="") {
                        $("#errorTips3").html('<i class="icon-login icon-login-error"></i>' + "请输入验证码！");
                    }
                    else if($("#password1").val()!=$("#password2").val()) {
                        $("#errorTips3").html('<i class="icon-login icon-login-error"></i>' + "两次密码输入不一致！");
                    }
                    else{
                        //注册中
                        this.setAttribute("style", "display:none");
                        document.getElementById("registerING").setAttribute("style", "display:block");
                        //获取注册信息
                        var position=$('input:radio[name="position"]:checked').val().toString();
                        if(position=="众包工人"){
                            position="worker";
                        }
                        else if("众包发起者"){
                            position="boss";
                        }
                        var name=$("#name").val().toString();
                        var email=$("#email").val().toString();
                        var telephone=$("#telephone").val().toString();
                        var password=$("#password1").val().toString();
                        var verification=$("#verification").val().toString();
                        var isSuccess=false;
                        var problem="";
                        $.ajax(
                            {
                                url: "http://localhost:8080/validate",
                                data: {
                                    mailAddress:email,
                                    key:verification
                                },
                                async:false,
                                success: function (data) {
                                    if(data=="1"){
                                        $.ajax(
                                            {
                                                url: "http://localhost:8080/register",
                                                data: {
                                                    username:name,
                                                    password:password,
                                                    type:position,
                                                    phoneNumber:telephone,
                                                    mailAddress:email
                                                },
                                                success: function (data) {
                                                    if(data=="1"){
                                                        isSuccess=true;
                                                    }
                                                    else{
                                                        problem=data;
                                                    }
                                                    /*验证验证码操作,为了页面效果可以适当设置延迟*/
                                                    if(isSuccess){
                                                        //alert("注册成功，请前往邮箱激活帐号！");
                                                        alert("注册成功！");
                                                        $("#register-container").slideUp(800);
                                                        window.setTimeout(function(){$("#login-container").slideDown(1000);},1000);
                                                        //防止再次点击注册呈现"注册中"
                                                        document.getElementById("registerING").setAttribute("style", "display:none");
                                                        this.setAttribute("style", "display:block");
                                                    }
                                                    else{       //输出返回的错误信息
                                                        $("#errorTips3").html('<i class="icon-login icon-login-error"></i>'+problem);
                                                        document.getElementById("registerING").setAttribute("style", "display:none");
                                                        this.setAttribute("style", "display:block");
                                                    }

                                                },
                                                error: function (xhr) {
                                                    //alert('动态页有问题噶！\n\n' + xhr.responseText);
                                                },
                                                traditional: true,
                                            }
                                        )
                                    }
                                    else{
                                        $("#errorTips3").html('<i class="icon-login icon-login-error"></i>'+'验证码错误');
                                        document.getElementById("registerING").setAttribute("style", "display:none");
                                        this.setAttribute("style", "display:block");
                                    }
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
                                url: "http://localhost:8080/register",
                                data: {
                                    username:name,
                                    password:password,
                                    type:position,
                                    phoneNumber:telephone,
                                    mailAddress:email
                                },
                                success: function (data) {
                                    if(data=="1"){
                                        isSuccess=true;
                                    }
                                    else{
                                        problem=data;
                                    }
                                    /*验证验证码操作,为了页面效果可以适当设置延迟
                                    if(isSuccess){
                                        //alert("注册成功，请前往邮箱激活帐号！");
                                        alert("注册成功！");
                                        $("#register-container").slideUp(800);
                                        window.setTimeout(function(){$("#login-container").slideDown(1000);},1000);
                                        //防止再次点击注册呈现"注册中"
                                        document.getElementById("registerING").setAttribute("style", "display:none");
                                        this.setAttribute("style", "display:block");
                                    }
                                    else{       //输出返回的错误信息
                                        $("#errorTips3").html('<i class="icon-login icon-login-error"></i>'+problem);
                                        document.getElementById("registerING").setAttribute("style", "display:none");
                                        this.setAttribute("style", "display:block");
                                    }

                                },
                                error: function (xhr) {
                                    alert('动态页有问题噶！\n\n' + xhr.responseText);
                                },
                                traditional: true,
                            }
                        )*/


                    }
                }
            }

            //智能判断手机号输入是否正确
            document.getElementById("telephone").onblur = function(){
                if($("#telephone").val().length!=11){
                    $("#errorTips3").html('<i class="icon-login icon-login-error"></i>'+"请输入正确的手机号！");
                }
                else{
                    $("#errorTips3").html("");
                }
            }

            //智能判断邮箱输入是否正确
            function checkEmail(){
                var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
                var email = $("#email").val();
                if(!myReg.test(email)){
                    $("#errorTips3").html('<i class="icon-login icon-login-error"></i>'+"请输入正确的邮箱地址！");
                    return false;
                }
                else{
                    $("#errorTips3").html("");
                    return true;
                }
            }

            //返回按钮
            document.getElementById("back").onclick=function(){
                $("#register-container").slideUp(800);
                window.setTimeout(function(){$("#login-container").slideDown(1000);},1000);
            }

           document.getElementById("back2").onclick=function(){
               $("#faceID-container").slideUp(800);
               window.setTimeout(function(){$("#login-container").slideDown(1000);},1000);
           }
            //直接跳转到注册
            window.onload=function () {     //加载完毕
                var url = window.location.href;//获取当前浏览器的url
                index = url.indexOf("register");//判断当前url是否有flag，如果有，说明是注册请求
                if(index !=-1) {    //跳转到注册
                    $("#toRegister").click();
                }
            }

