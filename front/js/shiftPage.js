<!-- Tag界面切换 -->

var shouldStartCount=false;     //点击photo图标时是否需要重新开始计时

    $( document ).ready(function() {
        $("#tagPhoto").fadeOut();  //除了start其它都先fadeOut

        $("#photo").click(function(){
	        $('#tagPhoto').removeClass('animated slideOutRight');   //移除原有动画
            $('#start').removeClass('animated slideInLeft');

            $("#start").fadeOut(300);	//设置行为
            //$("#tagPhoto").fadeIn(1000);
            window.setTimeout(function(){$("#tagPhoto").fadeIn();},300);
            $('#start').addClass('animated slideOutLeft');	//设置动画
            $('#tagPhoto').addClass('animated slideInRight');

            document.getElementById("down").href="#tagPhoto";	//修改下拉箭头的链接
            
	        var tempt=document.getElementById("temptItem").cloneNode(true);	//在这里进行克隆(直接赋值则会引用)，防止remove后无法再次添加
            tempt.style.display="";	//清除display样式(变为默认值block inline)
            $("#changeableNav").append(tempt);//添加预先创建好的元素
            document.getElementById("changeableItem").style.paddingRight=5+'px';//修改原menu项的右边距

            $('#changeableNav').removeClass("active");//移交active类
            $('#changeableItem').attr("href","javascript:void(0)");//空链接防止跳转或刷新导致返回Let's tag界面的动画不全

            window.setTimeout(function(){document.getElementById('down').click();},500);  //通过点击下拉箭头获得SmoothScroll效果

            if(shouldStartCount==true){
                startCount();        //说明之前是从task界面点了“tagPhoto”导航回来时的，现在回去会直接显示具体的任务界面（标注界面），所以要重新开始计时
            }

        });

        $("#changeableItem").click(function(){
	        $('#start').removeClass('animated slideOutLeft');	//移除原有动画
            $('#tagPhoto').removeClass('animated slideInRight');

            $("#tagPhoto").fadeOut(300);//设置行为
	        window.setTimeout(function(){$("#start").fadeIn();},300);	//设置延迟，为了解决fadeOut不发生的szl独创方法- -
	        $('#tagPhoto').addClass('animated slideOutRight');   //设置动画

            if($('#changeableItem').attr("href")!="#start"){    //通过剪头的链接判断是在start界面还是tagPhoto界面，在tagPhoto界面就跳过添加动画
                $('#start').addClass('animated slideInLeft');
            }
            
            document.getElementById("down").href="#start";	//修改下拉箭头的链接
            
            var parent=document.getElementById("changeableNav");//移除photo子menu
            var child=document.getElementById("temptItem");
            parent.removeChild(child);

            document.getElementById("changeableItem").style.paddingRight=15+'px';//复原原menu项的右边距

            $('#changeableItem').attr("href","#start");//复原Let's tag的链接地址

            window.setTimeout(function(){document.getElementById('changeableItem').click();},500);  //通过点击Let' tag导航（也可以是下拉箭头）获得SmoothScroll效果

            stopCount();        //从task界面点了“tagPhoto”导航回来时结束计时
            shouldStartCount=judgeShouldStartCount();
        });

    });

    //tempItem的点击效果
    function toTagPhoto(){
        document.getElementById('down').click(); //通过点击下拉箭头获得SmoothScroll效果,因为tempItem出现的时候down必定与#tagPhoto连接，所以很OK
    }

