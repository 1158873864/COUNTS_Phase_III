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
var loginInfoLastWeekChart = echarts.init(document.getElementById('loginInfoLastWeek'));
var loginInfoLastMonthChart = echarts.init(document.getElementById('loginInfoLastMonth'));

/** 数据部分Start **/
var date = new Date();
var lastWeekDate=[];    //最近一周日期
for(var i=6;i>=0;i--){
    lastWeekDate.push(date.DateAdd('d',-1*i).toLocaleDateString());
}
var lastWeekNum=new Array();
//var lastWeekNum=[40 ,20, 32, 0, 34, 60, 45, 34];     /*最近一周数据*/
$.ajax(
    {
        url: "http://localhost:8080/getNTIANZong",
        data: {
            days:7
        },
        async: false,
        success: function (data) {
            for(var i=0;i<data.length;i++){
                lastWeekNum.push(data[i]);
            }
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

var lastMonthDate=[];    //最近一月日期(最近30天)
for(var i=29;i>=0;i--){
    lastMonthDate.push(date.DateAdd('d',-1*i).toLocaleDateString());
}
var lastMonthNum=new Array();
$.ajax(
    {
        url: "http://localhost:8080/getNTIANZong",
        data: {
            days:30
        },
        async: false,
        success: function (data) {
            for(var i=0;i<data.length;i++){
                lastMonthNum.push(data[i]);
            }
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)
//var lastMonthNum=[20, 32, 50, 32, 21, 54, 19, 33, 41, 22, 82, 91, 24, 29, 33, 10 ,20, 32, 11, 34, 90, 30, 40 ,20, 32, 0, 34, 60, 45, 34];     /*最近一月数据*/
/** 数据部分End **/

var accuracyChart = echarts.init(document.getElementById('accuracy'));
var accuracyInterval=['0-9','10-19','20-29','30-39','40-49','50-59','60-69','70-79','80-89','90-100'];
//var accuracyNum=[2,3,5,8,9,6,4,2,1,1];     /*对应区间内accuracy的个数*/
var accuracyNum=new Array();
$.ajax(
    {
        url: "http://localhost:8080/getAccuracy",
        async: false,
        success: function (data) {
            for(var i=0;i<data.length;i++){
                accuracyNum.push(data[i]);
            }
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)


var efficiencyChart = echarts.init(document.getElementById('efficiency'));
var efficiencyInterval=['0-9','10-19','20-29','30-39','40-49','50-59','60-69','70-79','80-89','90-100'];
//var efficiencyNum=[1,3,4,8,9,10,4,2,1,0];
var efficiencyNum=new Array();
$.ajax(
    {
        url: "http://localhost:8080/getEfficency",
        async: false,
        success: function (data) {
            for(var i=0;i<data.length;i++){
                efficiencyNum.push(data[i]);
            }
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

var activenessChart = echarts.init(document.getElementById('activeness'));
var activenessInterval=['0-9','10-19','20-29','30-39','40-49','50-59','60-69','70-79','80-89','90-100'];
//var activenessNum=[1,3,4,4,6,10,7,3,2,1];
var activenessNum=new Array();
var login=new Array();
var register=new Array();
$.ajax(
    {
        url: "http://localhost:8080/getLoginDays",
        async: false,
        success: function (data) {
            for(var i=0;i<data.length;i++){
                login.push(data[i]);
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
        url: "http://localhost:8080/getRegisterDays",
        async: false,
        success: function (data) {
            for(var i=0;i<data.length;i++){
                register.push(data[i]);
            }
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

for(var i=0;i<login.length;i++){
    activenessNum.push(login[i]/register[i]);
}

accuracyConfidence=0.95;
efficiencyConfidence=0.95;
activenessConfidence=0.95;

accuracyBottom=35;
accuracyAverage=45;
accuracyTop=69;
efficiencyBottom=33;
efficiencyAverage=45;
efficiencyTop=52;
activenessBottom=49;
activenessAverage=56;
activenessTop=64;

loginaverage=1;
registeraverage=1;
accuracytemp=5;
efficiencytemp=7;
activenesstemp=8.4;

$.ajax(
    {
        url: "http://localhost:8080/getAverageAccuracy",
        async: false,
        success: function (data) {
            accuracyAverage=data;
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
        async: false,
        success: function (data) {
            efficiencyAverage=data;
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
        async: false,
        success: function (data) {
            loginaverage=data;
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
        async: false,
        success: function (data) {
           registeraverage=data;
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

activenessAverage=loginaverage/registeraverage;

$.ajax(
    {
        url: "http://localhost:8080/getT_distribution",
        async: false,
        data:{list:accuracyNum},
        success: function (data) {
            accuracytemp=data;
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

$.ajax(
    {
        url: "http://localhost:8080/getT_distribution",
        async: false,
        data:{list:efficiencyNum},
        success: function (data) {
            efficiencytemp=data;
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

$.ajax(
    {
        url: "http://localhost:8080/getT_distribution",
        async: false,
        data:{list:activenessNum},
        success: function (data) {
            activenesstemp=data;
        },
        error: function (xhr) {
            alert('动态页有问题噶！\n\n' + xhr.responseText);
        },
        traditional: true,
    }
)

accuracyTop=accuracytemp+accuracyAverage;
accuracyBottom=accuracyAverage-accuracytemp;
efficiencyTop=efficiencyAverage+efficiencytemp;
efficiencyBottom=efficiencyAverage-efficiencytemp;
activenessTop=activenessAverage+activenesstemp;
activenessBottom=activenessAverage-activenesstemp;



//准确率
accuracyOption = {
    title: {
        text: 'Accuracy of Workers',
        subtext: 'confidence level : '+accuracyConfidence,
        left: 'center',
        textStyle: {
            color:'#34495e',
            fontFamily:'Josefin Sans',
        },
        padding: [
            0,  // 上
            0, // 右
            25,  // 下
            0, // 左
        ]
    },
    tooltip: {
    },
    toolbox: {
        feature: {
            dataView: {readOnly: true},
        },
        iconStyle: {
            borderColor:'#34495e'
        },
        right:'70px'
    },
    xAxis: [
        {
            type: 'category',
            name: '%',
            data: accuracyInterval,
            axisLabel: {
                interval: 0,
                //rotate:40
            }
        },
        {
            type: 'value',
            splitNumber:'10',
            max:'100',
            splitLine:{
                show:false  //去除网格
            }
        }],
    yAxis: {
        type: 'value'
    },
    series: [{
        name: 'Accuracy of Workers',
        data: accuracyNum,
        type: 'line',
        smooth: true,

    },
        {
            name: '置信区间',
            type: 'line',
            data: [0],
            xAxisIndex: 1,
            markLine: {
                data: [
                    {name: '置信区间下限', xAxis: accuracyBottom},
                    {name: '置信区间上限', xAxis: accuracyTop},
                    {name: '平均值', xAxis: accuracyAverage}
                ]
            }
        }]
};
accuracyChart.setOption(accuracyOption);



//效率
efficiencyOption = {
    title: {
        text: 'Efficiency of Workers',
        subtext: 'confidence level : '+efficiencyConfidence,
        left: 'center',
        textStyle: {
            color:'#34495e',
            fontFamily:'Josefin Sans',
        },
        padding: [
            0,  // 上
            0, // 右
            25,  // 下
            0, // 左
        ]
    },
    tooltip: {
    },
    toolbox: {
        feature: {
            dataView: {readOnly: true},
        },
        iconStyle: {
            borderColor:'#34495e'
        },
        right:'70px'
    },
    xAxis: [{
        type: 'category',
        name: 'score',
        data: efficiencyInterval,
        axisLabel: {
            interval: 0,
            //rotate:40
        }
    },
        {
            type: 'value',
            splitNumber:'10',
            max:'100',
            splitLine:{
                show:false  //去除网格
            }
        }],
    yAxis: {
        type: 'value'
    },
    series: [{
        name: 'Efficiency of Workers',
        data: efficiencyNum,
        type: 'line',
        smooth: true,
    },
        {
            name: '置信区间',
            type: 'line',
            data: [0],
            xAxisIndex: 1,
            markLine: {
                data: [
                    {name: '置信区间下限', xAxis: efficiencyBottom},
                    {name: '置信区间上限', xAxis: efficiencyTop},
                    {name: '平均值', xAxis: efficiencyAverage}
                ]
            }
        }]
};
efficiencyChart.setOption(efficiencyOption);


//效率
activenessOption = {
    title: {
        text: 'Activeness of Workers',
        subtext: 'confidence level : '+activenessConfidence,
        left: 'center',
        textStyle: {
            color:'#34495e',
            fontFamily:'Josefin Sans',
        },
        padding: [
            0,  // 上
            0, // 右
            25,  // 下
            0, // 左
        ]
    },
    tooltip: {
    },
    toolbox: {
        feature: {
            dataView: {readOnly: true},
        },
        iconStyle: {
            borderColor:'#34495e'
        },
        right:'70px'
    },
    xAxis: [{
        type: 'category',
        name: 'score',
        data: activenessInterval,
        axisLabel: {
            interval: 0,
            //rotate:40
        }
    },
        {
            type: 'value',
            splitNumber:'10',
            max:'100',
            splitLine:{
                show:false  //去除网格
            }
        }],
    yAxis: {
        type: 'value'
    },
    series: [{
        name: 'Activeness of Workers',
        data: activenessNum,
        type: 'line',
        smooth: true,
    },
        {
            name: '置信区间',
            type: 'line',
            data: [0],
            xAxisIndex: 1,
            markLine: {
                data: [
                    {name: '置信区间下限', xAxis: activenessBottom},
                    {name: '置信区间上限', xAxis: activenessTop},
                    {name: '平均值', xAxis: activenessAverage}
                ]
            }
        }]
};
activenessChart.setOption(activenessOption);



// 图表
var optionLastWeek = {
    title: {
        text: 'Number of workers login per day',
        subtext: 'data range : last week',
        left: 'center',  //居中
        textStyle:{                     //设置主标题风格
            color:'#34495e',
            fontFamily:'Josefin Sans',

        },
    },
    tooltip: {},
    toolbox: {
        feature: {
            magicType: {type: ['bar']},
            restore: {},
        },
        iconStyle: {
            borderColor:'#34495e'
        }
    },
    xAxis: {
        type: 'category',
        data: lastWeekDate
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name:'Number of workers login per day',
        data: lastWeekNum,
        itemStyle : {
            normal : {
                color:'#1abc9c',    //折点颜色
                lineStyle:{
                    color:'#1abc9c' //线条颜色
                }
            }
        },
        type: 'line',
    }],
};

var optionLastMonth = {
    title: {
        text: 'Number of workers login per day',
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
        }
    },
    xAxis: {
        type: 'category',
        data: lastMonthDate
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name:'Number of workers login per day',
        data: lastMonthNum,
        type: 'line',
        markPoint: {
            data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
            ]
        },
        markLine: {
            data: [
                {type: 'average', name: '平均值'}
            ]
        }
    }],
};

// 使用刚指定的配置项和数据显示图表。
loginInfoLastWeekChart.setOption(optionLastWeek);
loginInfoLastMonthChart.setOption(optionLastMonth);



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

