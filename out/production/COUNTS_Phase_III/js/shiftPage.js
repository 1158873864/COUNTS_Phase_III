<!-- Tag�����л� -->

var shouldStartCount=false;     //���photoͼ��ʱ�Ƿ���Ҫ���¿�ʼ��ʱ

    $( document ).ready(function() {
        $("#tagPhoto").fadeOut();  //����start��������fadeOut

        $("#photo").click(function(){
	        $('#tagPhoto').removeClass('animated slideOutRight');   //�Ƴ�ԭ�ж���
            $('#start').removeClass('animated slideInLeft');

            $("#start").fadeOut(300);	//������Ϊ
            //$("#tagPhoto").fadeIn(1000);
            window.setTimeout(function(){$("#tagPhoto").fadeIn();},300);
            $('#start').addClass('animated slideOutLeft');	//���ö���
            $('#tagPhoto').addClass('animated slideInRight');

            document.getElementById("down").href="#tagPhoto";	//�޸�������ͷ������
            
	        var tempt=document.getElementById("temptItem").cloneNode(true);	//��������п�¡(ֱ�Ӹ�ֵ�������)����ֹremove���޷��ٴ����
            tempt.style.display="";	//���display��ʽ(��ΪĬ��ֵblock inline)
            $("#changeableNav").append(tempt);//���Ԥ�ȴ����õ�Ԫ��
            document.getElementById("changeableItem").style.paddingRight=5+'px';//�޸�ԭmenu����ұ߾�

            $('#changeableNav').removeClass("active");//�ƽ�active��
            $('#changeableItem').attr("href","javascript:void(0)");//�����ӷ�ֹ��ת��ˢ�µ��·���Let's tag����Ķ�����ȫ

            window.setTimeout(function(){document.getElementById('down').click();},500);  //ͨ�����������ͷ���SmoothScrollЧ��

            if(shouldStartCount==true){
                startCount();        //˵��֮ǰ�Ǵ�task������ˡ�tagPhoto����������ʱ�ģ����ڻ�ȥ��ֱ����ʾ�����������棨��ע���棩������Ҫ���¿�ʼ��ʱ
            }

        });

        $("#changeableItem").click(function(){
	        $('#start').removeClass('animated slideOutLeft');	//�Ƴ�ԭ�ж���
            $('#tagPhoto').removeClass('animated slideInRight');

            $("#tagPhoto").fadeOut(300);//������Ϊ
	        window.setTimeout(function(){$("#start").fadeIn();},300);	//�����ӳ٣�Ϊ�˽��fadeOut��������szl��������- -
	        $('#tagPhoto').addClass('animated slideOutRight');   //���ö���

            if($('#changeableItem').attr("href")!="#start"){    //ͨ����ͷ�������ж�����start���滹��tagPhoto���棬��tagPhoto�����������Ӷ���
                $('#start').addClass('animated slideInLeft');
            }
            
            document.getElementById("down").href="#start";	//�޸�������ͷ������
            
            var parent=document.getElementById("changeableNav");//�Ƴ�photo��menu
            var child=document.getElementById("temptItem");
            parent.removeChild(child);

            document.getElementById("changeableItem").style.paddingRight=15+'px';//��ԭԭmenu����ұ߾�

            $('#changeableItem').attr("href","#start");//��ԭLet's tag�����ӵ�ַ

            window.setTimeout(function(){document.getElementById('changeableItem').click();},500);  //ͨ�����Let' tag������Ҳ������������ͷ�����SmoothScrollЧ��

            stopCount();        //��task������ˡ�tagPhoto����������ʱ������ʱ
            shouldStartCount=judgeShouldStartCount();
        });

    });

    //tempItem�ĵ��Ч��
    function toTagPhoto(){
        document.getElementById('down').click(); //ͨ�����������ͷ���SmoothScrollЧ��,��ΪtempItem���ֵ�ʱ��down�ض���#tagPhoto���ӣ����Ժ�OK
    }

