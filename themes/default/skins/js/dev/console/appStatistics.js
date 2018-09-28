console.log(require);    
require.config({
        paths: {
            echarts: getRootPath()+'/vendor/echarts',
            theme: getRootPath()+'/vendor/echarts/echarts-themes'
        }
    });

function showChart(xAxisData, yAxisData) {
	line_option = {
//		    title: {
//		        text: '折线图堆叠'
//		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['新增用户数']
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    toolbox: {
		        feature: {
		            saveAsImage: {}
		        }
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: xAxisData
		    },
		    yAxis: {
		        type: 'value'
		    },
		    series: [
		        {
		            name:'新增用户数',
		            type:'line',
		            stack: '总量',
		            data:yAxisData
		        }
		    ]
		};
	require(['echarts','echarts/chart/line'],function(ec,theme){
        var lineChart = ec.init(document.getElementById("app-count-chart"),theme);
        lineChart.setOption(line_option);
    });
}

/**
 * 每日新增用户
 * @returns
 */
function getNewUserByDay() {
	$.ajax({
		url : getRootPath()
				+ '/dev/console/AppStatistics.do?method=GetNewUserByDay',
		type : "post",
		dataType : "json",
		data : {
			appId : app_id,
			start_time:startTime,
			end_time:endTime
		},
		success : function(data) {
			console.log(data);
			if (data != null && data.data != null) {
				var length = data.data.length;
				var xAxisData = new Array();
				var yAxisData = new Array();
				for (var i = 0; i < length; i++) {
					var tmpData = data.data[i];
					xAxisData.push(tmpData.days);
					yAxisData.push(tmpData.count);
				}
				showChart(xAxisData, yAxisData);
			}
		},
		error : function(data) {
			console.log(data);
		}
	});
}

var startTime = "";
var endTime = "";
//返回yyyy-MM-dd格式时间
function formartdate(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return year + "-" + (month < 10 ? ("0" + month) : month) + "-"
			+ (day < 10 ? ("0" + day) : day);
}

$(function() {
	// 初始化时间 一周前到现在
	var initEndDate = new Date();
	var initEndDateMiliSecond = initEndDate.getTime();
	var initStartDate = new Date();
	var initStartDateMiliSecond = initEndDateMiliSecond - 6 * 24 * 3600 * 1000;
	initStartDate.setTime(initStartDateMiliSecond);
	startTime = formartdate(initStartDate);
	endTime = formartdate(initEndDate);
	
	$("#start_time").val(startTime);
	$("#end_time").val(endTime);
	// 获取新增用户数据
	getNewUserByDay();
	
	var grid = new Datatable();

    grid.init({
        src: $("#appStatistics-table"),
        onSuccess: function(grid) {},
        onError: function(grid) {},
        loadingMessage: 'Loading...',
        dataTable: {
            "columns": [
            {
                "data": "days",
                "bSortable": false,
            },
            {
                "data": "count",
                "bSortable": false,
                "sWidth":"50%",
                'sClass': "text-center"
            }],
            "columnDefs": [{
                "targets": [0],
                "render": function(data, type, full) {
         		   var text = data;
         		   if(data==null || data == ""){
         			   text = "--";
         		   }
         		   return text;
         	   }
            }],
            "pageLength": 10,
            "ajax": {
                "url": getRootPath() + '/dev/console/AppStatistics.do?method=GetNewUserByDay',
				"data":function (d) {
					d.appId = app_id;
					d.start_time = startTime;
					d.end_time = endTime;
         	   },
            },
            "order": [[0, "des"]]
        }
    });
    

    $("#start_time").datetimepicker({
        language: 'cn',
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: true,
        minView : 2
    }).on("changeDate",function(ev){
    	startTime = formartdate(ev.date);
        $("#start_time").datetimepicker("setEndDate", $("#end_time").val());
    });
    $("#end_time").datetimepicker({
        language: 'cn',
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: true,
        minView : 2
    }).on("changeDate", function (ev) {
    	endTime = formartdate(ev.date);
        $("#end_time").datetimepicker("setStartDate", $("#start_time").val());
    });
    
    $('#query').click(function (e) {
    	// 刷新表格
    	grid.getDataTable().ajax.reload();
    	getNewUserByDay();
	});
});
