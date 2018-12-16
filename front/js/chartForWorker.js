Date.prototype.DateAdd = function(strInterval, Number) {    //日期加减函数，前置声明
    var dtTmp = this;
    switch (strInterval) {
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd' :;return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
}


// 基于准备好的dom，初始化echarts实例
var abilityChart = echarts.init(document.getElementById('abilityChart'));
var tagNumChart = echarts.init(document.getElementById('tagNumChart'));
var categoryChart = echarts.init(document.getElementById('categoryChart'));

/** 变量初始化 **/
/** 每日标注图片数部分 **/
var date = new Date();
var lastMonthDate=[];    //最近一月日期(最近30天)
for(var i=29;i>=0;i--){
    lastMonthDate.push(date.DateAdd('d',-1*i).toLocaleDateString());
}
var lastMonthNum=[20, 32, 50, 32, 21, 54, 19, 33, 41, 22, 82, 91, 24, 29, 33, 10 ,20, 32, 11, 34, 90, 30, 110 ,20, 32, 0, 34, 190, 130, 120];     /*最近一月数据*/

$.ajax(
    {
        url: "http://localhost:8080/getNTIAN",
        data: {
            email:getUsername(),
            days:30
        },
        async:false,
        success: function (data) {
            for(var i=0;i<30;i++){
                lastMonthNum[i]=data[i];
            }
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

/** 能力值部分 **/
//当前用户
var accuracy=0.8;       //准确率
var efficiency=4.1;     //效率
var loginDay=75;        //登录天数
var registerDay=100;    //注册天数
var activeness=loginDay/registerDay;  //计算活跃度
var breadth=3;          //任务广度
var depth=18;           //任务深度

//平均水平
var averageAccuracy=0.85;
var averageEfficiency=3;
var averageLoginDay=72;        //登录天数
var averageRegisterDay=100;    //注册天数
var averageActiveness=averageLoginDay/averageRegisterDay;  //计算活跃度
var averageBreadth=2;
var averageDepth=10;

//最高水平
var maxEfficiency=6;             /* 系统worker最高效率 */
var maxBreadth=6;             /* 系统worker最高标注广度 */
var maxDepth=32;           /* 系统worker最高标注深度 */

$.ajax(
    {
        url: "http://localhost:8080/getAccuracyOfOneWorker",
        data: {
            email:getUsername()
        },
        async:false,
        success: function (data) {
            accuracy=data;
        },
        error: function (xhr) {
            //alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)
$.ajax(
    {
        url: "http://localhost:8080/getEfficencyOfOneWorker",
        data: {
            email:getUsername()
        },
        async:false,
        success: function (data) {
            efficiency=data;
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

$.ajax(
    {
        url: "http://localhost:8080/AllLoginDays",
        data: {
            email:getUsername()
        },
        async:false,
        success: function (data) {
            loginDay=data;
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)
$.ajax(
    {
        url: "http://localhost:8080/AllRegisterDays",
        data: {
            email:getUsername()
        },
        async:false,
        success: function (data) {
            registerDay=data;
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

$.ajax(
    {
        url: "http://localhost:8080/getCategoryNum",
        data: {
            email:getUsername()
        },
        async:false,
        success: function (data) {
            breadth=data;
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

$.ajax(
    {
        url: "http://localhost:8080/getBiaozhuShenduOfOneWorker",
        data: {
            email:getUsername()
        },
        async:false,
        success: function (data) {
            depth=data;
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

//总体
$.ajax(
    {
        url: "http://localhost:8080/getAverageAccuracy",
        async:false,
        success: function (data) {
            averageAccuracy=data;
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

$.ajax(
    {
        url: "http://localhost:8080/getAverageEfficency",
        async:false,
        success: function (data) {
            averageEfficiency=data;
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

$.ajax(
    {
        url: "http://localhost:8080/getAverageLoginDays",
        async:false,
        success: function (data) {
            averageLoginDay=data;
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

$.ajax(
    {
        url: "http://localhost:8080/getAverageRegisterDays",
        async:false,
        success: function (data) {
            averageRegisterDay=data;
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

$.ajax(
    {
        url: "http://localhost:8080/getAverageCategories",
        async:false,
        success: function (data) {
            averageBreadth=data;
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

$.ajax(
    {
        url: "http://localhost:8080/getBiaozhuShendu",
        async:false,
        success: function (data) {
            averageDepth=data[0];
            maxDepth=data[1];
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

$.ajax(
    {
        url: "http://localhost:8080/getHighestEfficencyWorker",
        async:false,
        success: function (data) {
            maxEfficiency=data;
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

$.ajax(
    {
        url: "http://localhost:8080/getHighestCategoryNum",
        async:false,
        success: function (data) {
            maxBreadth=data;
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }

)



//参数调整
maxBreadth = (maxBreadth > 2*averageBreadth)? 2*averageBreadth:maxBreadth;   //排除离散点对雷达图形状的干扰
maxDepth = (maxDepth > 2*averageDepth)? 2*averageDepth:maxDepth;   //排除离散点对雷达图形状的干扰
breadth = (breadth>maxBreadth)? maxBreadth:breadth;     //记为满分
depth = (depth>maxDepth)? maxDepth:depth;     //记为满分

var userAbilityData = [accuracy,efficiency,activeness,breadth,depth];                                     //当前worker能力值
var averageAbilityData = [averageAccuracy,averageEfficiency,averageActiveness,averageBreadth,averageDepth];   //所有worker平均能力值

/** 任务种类统计部分 **/
var categoryName=['Nature','Food','Human','Animal','Cartoon','Other'];     /*种类名*/
var categoryNum=new Array();
for(var i=0;i<categoryName.length;i++) {
    $.ajax(
        {
            url: "http://localhost:8080/GetNumByType",
            data: {
                email: getUsername(),
                kind:categoryName[i]
            },
            async: false,
            success: function (data) {
                categoryNum.push(data);
            },
            error: function (xhr) {
                alert('动态页有问题噶！\n\n' + xhr.responseText);
            },
            traditional: true,
        }
    )
}
//var categoryNum=[2,8,0,1,3,5];     /*对应种类的完成个数*/

//任务种类柱状图
categoryOption = {
    title: {
        text: 'Category preference',
        left: 'center',
        textStyle: {
            color:'#34495e',
            fontFamily:'Josefin Sans',
        }
    },
    tooltip: {},
    toolbox: {
        feature: {
            dataView: {readOnly: true},
        },
        iconStyle: {
            borderColor:'#34495e'
        },
        right:'70px'
    },
    xAxis: {
        type: 'category',
        data: categoryName,
        axisLabel: {
            interval: 0,
            rotate:40
        }
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name: 'Category preference',
        data: categoryNum,
        type: 'bar'
    }]
};

//能力雷达图
abilityOption = {
    //backgroundColor: '#161627',
    title: {
        text: 'Ability analyze',
        left: 'center',
        textStyle: {
            color:'#34495e',
            fontFamily:'Josefin Sans',
        }
    },
    tooltip: {},
    legend: {
        bottom: 5,
        data: ['Your Ability Analysis', 'Average Ability Analysis']
    },
    radar: {
        indicator: [
            {name: 'Accuracy', max: 1},
            {name: 'Efficiency', max: maxEfficiency},
            {name: 'Activeness', max: 1},
            {name: 'Breadth', max: maxBreadth},
            {name: 'Depth', max: maxDepth},
        ],
        shape: 'circle',
        splitNumber: 5,
        name: {
            textStyle: {
                color: 'rgb(52, 73, 94)'
            }
        },
        splitLine: {
            lineStyle: {
                color: [
                    'rgba(52, 73, 94, 0.15)', 'rgba(52, 73, 94, 0.25)',
                    'rgba(52, 73, 94, 0.4)', 'rgba(52, 73, 94, 0.6)',
                    'rgba(52, 73, 94, 0.8)', 'rgba(52, 73, 94, 1)'
                ].reverse()
            }
        },
        splitArea: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(52, 73, 94, 0.5)'
            }
        }
    },
    series: [
        {
            name: 'Ability analysis',
            type: 'radar',
            lineStyle: {
                normal: {
                    width: 1,
                    opacity: 0.5
                }
            },
            data : [
                {
                    value : userAbilityData,
                    name : 'Your Ability Analysis'
                },
                {
                    value : averageAbilityData,
                    name : 'Average Ability Analysis'
                }
            ],
            areaStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        },
    ]
};

//每日标注图片数
var tagNumOptionLastMonth = {
    title: {
        text: 'Number of picture tagged per day',
        subtext: 'data range : last month',
        left: 'center',  //居中
        textStyle:{                     //设置主标题风格
            color:'#34495e',
            fontFamily:'Josefin Sans',
        },
    },
    tooltip: {},
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: true},
            magicType: {type: ['bar']},     //'line', 'bar'
            restore: {},
        },
        iconStyle: {
            borderColor:'#34495e'
        },
        right:'30px'
    },
    xAxis: {
        type: 'category',
        data: lastMonthDate
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name:'Number of picture tagged per day',
        data: lastMonthNum,
        type: 'line',
        markPoint: {
            data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值',}     //symbolRotate:'180'             //旋转
            ]
        },
        markLine: {
            data: [
                {type: 'average', name: '平均值'}
            ]
        }
    }],
};


//显示图表
abilityChart.setOption(abilityOption);
tagNumChart.setOption(tagNumOptionLastMonth);
categoryChart.setOption(categoryOption);



function showOrHideStatistics(){
    if(document.getElementById("showStatistics").classList.toString().indexOf("down")!=-1){    //show Statistics
        $("#showStatistics").removeClass("fa-caret-down");
        $("#showStatistics").addClass("fa-caret-right");
        $("#statistics").slideUp(800);
    }
    else{   //hide Statistics
        $("#showStatistics").removeClass("fa-caret-right");
        $("#showStatistics").addClass("fa-caret-down");
        $("#statistics").slideDown(800);
    }
}

function showOrHideCharts(){
    if(document.getElementById("showCharts").classList.toString().indexOf("down")!=-1){    //show Charts
        $("#showCharts").removeClass("fa-caret-down");
        $("#showCharts").addClass("fa-caret-right");
        $("#charts").slideUp(800);
    }
    else{   //hide Charts
        $("#showCharts").removeClass("fa-caret-right");
        $("#showCharts").addClass("fa-caret-down");
        $("#charts").slideDown(800);
    }
}

