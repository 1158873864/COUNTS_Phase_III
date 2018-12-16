
function showDirectory(){
    $("#fileUpload").click();   //触发文件表单
}

function changeFileName(){  //显示上传文件名
    document.getElementById("releaseTask").value=document.getElementById("fileUpload").files[0].name;

    if(document.getElementById("fileUpload").files[0].type!="application/zip"){
        $("#formatTip").html('<i class="icon-login icon-login-error"></i>'+'<span style="font-style: normal">任务须为.zip压缩包格式！<\span>');
    }
    else{
        document.getElementById("formatTip").innerHTML='<i class="fa fa-check" style="color:limegreen"></i>';
    }
}

function showOrHideList(){
    if(document.getElementById("showList").classList.toString().indexOf("down")!=-1){    //show List
        $("#showList").removeClass("fa-caret-down");
        $("#showList").addClass("fa-caret-up");
        $("#requests").slideDown();
    }
    else{   //hide List
        $("#showList").removeClass("fa-caret-up");
        $("#showList").addClass("fa-caret-down");
        $("#requests").slideUp();
    }
}

function addAttribute(){
    var attribute = document.createElement("div");
    attribute.setAttribute("class", "attribute");

    //删除按钮
    var removeAttribute = document.createElement("i");
    removeAttribute.setAttribute("class", "fa fa-minus removeAttribute");
    removeAttribute.setAttribute("style","margin-left:78px"); //跟第一个属性对齐
    removeAttribute.setAttribute("onclick","removeThisAttribute(this)");

    var attributeNameTitle = document.createElement("label");
    attributeNameTitle.setAttribute("class", "attributeNameTitle");
    attributeNameTitle.innerHTML="属性名 / Attribute Name";
    attributeNameTitle.setAttribute("style","margin-left:10px"); //跟第一个属性对齐
    var attributeName = document.createElement("input");
    attributeName.setAttribute("class", "attributeName");
    attributeName.setAttribute("type", "text");
    attributeName.setAttribute("style","margin-left:13px"); //跟第一个属性对齐

    var wrapper = document.createElement("div");
    wrapper.setAttribute("style","display: inline-block; margin-left:3px"); //跟第一个属性对齐

    var alternativesTitle = document.createElement("label");
    alternativesTitle.setAttribute("class", "alternativesTitle");
    alternativesTitle.innerHTML="备选项 / Alternatives";
    var alternatives = document.createElement("input");
    alternatives.setAttribute("class", "alternatives");
    alternatives.setAttribute("type", "text");
    alternatives.setAttribute("style","margin-left:13px"); //跟第一个属性对齐

    wrapper.appendChild(alternativesTitle.cloneNode(true));
    wrapper.appendChild(alternatives.cloneNode(true))

    attribute.appendChild(removeAttribute.cloneNode(true));
    attribute.appendChild(attributeNameTitle.cloneNode(true));
    attribute.appendChild(attributeName.cloneNode(true));
    attribute.appendChild(wrapper.cloneNode(true));

    document.getElementById("attributeList").appendChild(attribute.cloneNode(true));
}

//删除属性条
function removeThisAttribute(removeButtonForThisAttribute){
    var parent=removeButtonForThisAttribute.parentNode.parentNode;
    var child=removeButtonForThisAttribute.parentNode;
    parent.removeChild(child);
}

var category;   //全局变量，用以存放分类菜单
var categoryForTagMethod;   //全局变量，用以存放标注方式菜单

$(function() {
    category = new DropDown( $('#category') );  //页面加载后新建一个分类菜单
    category.reset();

    // 标注类型的分类菜单
    categoryForTagMethod = new DropDownForTagMethod( $('#categoryForTagMethod') );
    categoryForTagMethod.reset();
});

function submitRelease(){
    var tips=document.getElementsByClassName("tip");
    var len=tips.length;
    var canRelease=true;

    var type;
    if(categoryForTagMethod.getValue()=="整体标注"){
        type="0";
    }
    else if(categoryForTagMethod.getValue()=="矩形选区"){
        type="1";
    }
    else if(categoryForTagMethod.getValue()=="不规则曲线"){
        type="2";
    }

    var attributeArray= new Array();    //属性数组
    var alternativeArray=new Array();   //备选项数组
    var allAttributes = document.querySelector("#attributeList").getElementsByClassName("attribute");
    var len = allAttributes.length;

    /*** 测试用
    if(true){
        getImagesOfTask("test");    //加载测试集

        $('#upload-file-form').removeClass('animated slideOutRight');   //移除原有动画
        $('#testPart').removeClass('animated slideInLeft');

        $("#upload-file-form").fadeOut(300);
        window.setTimeout(function(){$("#testPart").fadeIn();},300);
        $('#upload-file-form').addClass('animated slideOutLeft');	//设置动画
        $('#testPart').addClass('animated slideInRight');

        //步骤进度+1
        $('#step1').removeClass('activeStep');
        $('#step1 li').removeClass('activeStepCount');
        $('#step1').addClass('finishedStep');
        $('#step1 li').addClass('finishedStepCount');

        $('#step2').removeClass('step');
        $('#step2 li').removeClass('stepCount');
        $('#step2').addClass('activeStep');
        $('#step2 li').addClass('activeStepCount');
    }
    **/
    if($("#taskTile").val()==""||$("#maximumTagger").val()==""||$("#scorePerTag").val()==""||$("#scoreRequest").val()==""){
        $("#releaseTip").html('<i class="icon-login icon-login-error"></i>'+'<span style="font-style: normal">请填写完整信息！<\span>');
    }
    else if($("#releaseTask").val()==""){  //未选中文件,不能在onchange里面，因为没有change
        $("#releaseTip").html('');
        $("#formatTip").html('<i class="icon-login icon-login-error"></i>'+'<span style="font-style: normal">任务不得为空！<\span>');
    }
    else if($("#taskTile").val()=="樱桃小丸子"){  /* 判断任务标题是否重复 */
        $("#releaseTip").html('');
        $("#titleTip").html('<i class="icon-login icon-login-error"></i>'+'<span style="font-style: normal">任务描述已存在！<\span>');
    }
    else if(allAttributes[0].getElementsByClassName("attributeName")[0].value==""||allAttributes[0].getElementsByClassName("alternatives")[0].value==""){
        $("#releaseTip").html('<i class="icon-login icon-login-error"></i>'+'<span style="font-style: normal">第一条待标注属性为必填字段，请完整填写！<\span>');
    }
    else{
        if(document.getElementById("fileUpload").files[0].type=="application/zip"){ //如果是正确的文件类型
            for(var i=0;i<len;i++){
                if(tips[i].innerHTML.toString().indexOf("icon-login-error")!=-1){   //存在错误
                    canRelease=false;
                    break;
                }
            }

            if(canRelease){
                var fd=new FormData($("#upload-file-form")[0]);
                //生成两个数组
                for (var i = 0; i < len; i++) {
                    var attrName=allAttributes[i].getElementsByClassName("attributeName")[0].value;
                    var alter=allAttributes[i].getElementsByClassName("alternatives")[0].value;
                    if(attrName!="" && alter!=""){      //对于其余不完整属性条直接跳过
                        attributeArray.push(allAttributes[i].getElementsByClassName("attributeName")[0].value.toString());
                        alternativeArray.push(allAttributes[i].getElementsByClassName("alternatives")[0].value.replace(/，/g,",").toString());//统一为英文逗号，g表示全局匹配，即replaceAll
                    }
                }
                var is=0;
                if(alternativeArray.length==1){
                    is=1;
                }

                $.ajax({
                    url: "http://localhost:8080//upload",
                    type: "POST",
                    data: fd,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    async:false,
                    success: function () {
                        $.ajax(
                            {
                                url: "http://localhost:8080/createTask",
                                data: {
                                    biaozhutype:type,
                                    days:$("#dueTime").val(),
                                    attributes:attributeArray,
                                    choices:alternativeArray,
                                    SponsorName:getUsername(),
                                    taskType:category.getValue(),
                                    taskName:$("#taskTile").val(),
                                    maxlabelNum:$("#maximumTagger").val(),
                                    reward:$("#scorePerTag").val(),
                                    minaccumulatepoint:$("#scoreRequest").val(),
                                    is:is
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
                        // Handle upload success
                        // ...
                    },
                    error: function (xhr) {
                        //alert(xhr.responseText);
                        // Handle upload error
                        // ...
                    }
                });
                /*
                 * 提交任务 并且 创建、加载测试集(创建一个只有图片信息没有标注信息的测试集)
                 * 测试集名称与任务名相同，存在不同的表中
                 */
                getImagesOfTask($("#taskTile").val());  //加载测试集

                $('#upload-file-form').removeClass('animated slideOutRight');   //移除原有动画
                $('#testPart').removeClass('animated slideInLeft');

                $("#upload-file-form").fadeOut(300);
                window.setTimeout(function(){$("#testPart").fadeIn();},350);
                $('#upload-file-form').addClass('animated slideOutLeft');	//设置动画
                $('#testPart').addClass('animated slideInRight');

                //步骤进度+1
                $('#step1').removeClass('activeStep');
                $('#step1 li').removeClass('activeStepCount');
                $('#step1').addClass('finishedStep');
                $('#step1 li').addClass('finishedStepCount');

                $('#step2').removeClass('step');
                $('#step2 li').removeClass('stepCount');
                $('#step2').addClass('activeStep');
                $('#step2 li').addClass('activeStepCount');
            }
        }
    }
}

//发布任务集
function submitTestSet(){
    tests=document.getElementsByClassName("image");
    len=tests.length;
    var canSubmit=true;
    for(var i=0;i<len;i++){
        if(tests[i].getAttribute("onclick")!=null){
            alert("请对所有测试集进行标注！");
            canSubmit=false;
            break;
        }
    }

    if(canSubmit){
        /**
         * 可以进行测试集的确认工作
         * 比如通过添加标记位确认这个测试集是完整的，在每次对测试集进行遍历时顺便删除没有标志位的测试集的任务达到保证每个任务都有测试集的目的
         */

        $('#step2').removeClass('activeStep');
        $('#step2 li').removeClass('activeStepCount');
        $('#step2').addClass('finishedStep');
        $('#step2 li').addClass('finishedStepCount');

        $('#step3').removeClass('step');
        $('#step3 li').removeClass('stepCount');
        $('#step3').addClass('activeStep');
        $('#step3 li').addClass('activeStepCount');

        window.setTimeout(function(){
            alert("测试集顺利提交,任务发布成功！");
            location.reload();  //刷新界面以便发布下一个任务
        },600);

    }
}

function checkNonNegative(inputId,tipID){
    var myReg=/^\d+$/;
    var myNum = document.getElementById(inputId).value;
    if(!myReg.test(myNum)){
        document.getElementById(tipID).innerHTML='<i class="icon-login icon-login-error"></i>'+'<span style="font-style: normal">请输入非负整数<\span>';
    }
    else{
        document.getElementById(tipID).innerHTML='<i class="fa fa-check" style="color:limegreen"></i>';
    }
}

function checkPositiveOnly(inputId,tipID){
    var myReg=/^[1-9]\d*$/;
    var myNum = document.getElementById(inputId).value;
    if(!myReg.test(myNum)){
        document.getElementById(tipID).innerHTML='<i class="icon-login icon-login-error"></i>'+'<span style="font-style: normal">请输入正整数<\span>';
    }
    else{
        document.getElementById(tipID).innerHTML='<i class="fa fa-check" style="color:limegreen"></i>';
    }
}