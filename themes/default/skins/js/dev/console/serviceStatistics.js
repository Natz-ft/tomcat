require.config({
	paths : {
		echarts : getRootPath() + '/vendor/echarts',
		theme : getRootPath() + '/vendor/echarts/echarts-themes'
	}
});

function showChart(chartId, xAxisData, yAxisData) {
	var line_option;
	switch (chartId) {
	case "all-count-chart":
		line_option = {
			title : {
				text : '趋势图',
				padding: [
				          5,  // 上
				          5, // 右
				          5,  // 下
				          15, // 左
				      ]
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : [ '使用次数' ]
			},
			toolbox : {
				feature : {
					saveAsImage : {}
				}
			},
			grid : {
				left : '3%',
				right : '4%',
				bottom : '3%',
				containLabel : true
			},
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : xAxisData
			} ],
			yAxis : [ {
				type : 'value'
			} ],
			series : [ {
				name : '使用次数',
				type : 'line',
				stack : '总量',
				areaStyle : {
					normal : {}
				},
				data : yAxisData
			} ]
		};
		break;
	case "loseRate-count-chart":
		line_option = {
			title : {
				text : '趋势图',
				padding: [
				          5,  // 上
				          5, // 右
				          5,  // 下
				          15, // 左
				      ]
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : [ '失败率' ]
			},
			toolbox : {
				feature : {
					saveAsImage : {}
				}
			},
			grid : {
				left : '3%',
				right : '4%',
				bottom : '3%',
				containLabel : true
			},
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : xAxisData
			} ],
			yAxis : [ {
				type : 'value',
				axisLabel : {
					formatter : '{value} %'
				}
			} ],
			series : [ {
				name : '失败率',
				type : 'line',
				stack : '总量',
				areaStyle : {
					normal : {}
				},
				data : yAxisData
			} ]
		};
		break;
	case "averageConsume-count-chart":
		line_option = {
			title : {
				text : '趋势图',
				padding: [
				          5,  // 上
				          5, // 右
				          5,  // 下
				          15, // 左
				      ]
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : [ '平均消耗(毫秒)' ]
			},
			toolbox : {
				feature : {
					saveAsImage : {}
				}
			},
			grid : {
				left : '3%',
				right : '4%',
				bottom : '3%',
				containLabel : true
			},
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : xAxisData
			} ],
			yAxis : [ {
				type : 'value'
			} ],
			series : [ {
				name : '平均消耗(毫秒)',
				type : 'line',
				stack : '总量',
				areaStyle : {
					normal : {}
				},
				data : yAxisData
			} ]
		};
		break;
	case "maxConsume-count-chart":
		line_option = {
			title : {
				text : '趋势图',
				padding: [
				          5,  // 上
				          5, // 右
				          5,  // 下
				          15, // 左
				      ]
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : [ '最大消耗(毫秒)' ]
			},
			toolbox : {
				feature : {
					saveAsImage : {}
				}
			},
			grid : {
				left : '1%',
				right : '1%',
				bottom : '3%',
				containLabel : true
			},
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : xAxisData
			} ],
			yAxis : [ {
				type : 'value'
			} ],
			series : [ {
				name : '最大消耗(毫秒)',
				type : 'line',
				stack : '总量',
				areaStyle : {
					normal : {}
				},
				data : yAxisData
			} ]
		};
		break;
	}
	require([ 'echarts', 'echarts/chart/line' ], function(ec, theme) {
		var lineChart = ec.init(document.getElementById(chartId), theme);
		lineChart.setOption(line_option);
	});
}

/**
 * 每日统计的次数
 * @returns
 */
function getCountByDay() {
	$.ajax({
		url : getRootPath() + '/dev/console/AppStatistics.do?method=GetCountByDay',
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
				showChart("all-count-chart", xAxisData, yAxisData);
			}
		},
		error : function(data) {
			console.log(data);
		}
	});
}
/**
 * 每日统计的失败率
 * @returns
 */
function getFailRateByDay() {
	$.ajax({
		url : getRootPath()
				+ '/dev/console/AppStatistics.do?method=GetFailRateByDay',
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
					yAxisData.push(Math.round(100 * tmpData.rate * 100) / 100);
				}
				showChart("loseRate-count-chart", xAxisData, yAxisData);
			}
		},
		error : function(data) {
			console.log(data);
		}
	});
}
/**
 * 每日统计的平均消耗
 * @returns
 */
function getAVGCostByDay() {
	$.ajax({
		url : getRootPath()
				+ '/dev/console/AppStatistics.do?method=GetAVGCostByDay',
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
					yAxisData.push(tmpData.avg_time);
				}
				showChart("averageConsume-count-chart", xAxisData, yAxisData);
			}
		},
		error : function(data) {
			console.log(data);
		}
	});
}
/**
 * 每日统计的最大消耗
 * @returns
 */
function getMaxCostByDay() {
	$.ajax({
		url : getRootPath()
				+ '/dev/console/AppStatistics.do?method=GetMaxCostByDay',
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
					yAxisData.push(tmpData.max_time);
				}
				showChart("maxConsume-count-chart", xAxisData, yAxisData);
			}
		},
		error : function(data) {
			console.log(data);
		}
	});
}

// 获取服务统计信息
function getServiceStatisticsInfo() {
	$.ajax({
		url : getRootPath()
				+ '/dev/console/AppStatistics.do?method=GetAppServiceStatisticsInfo',
		type : "post",
		dataType : "json",
		data : {
			appId : app_id
		},
		success : function(data) {
			console.log(data);
			if (data != null && data.data != null) {
				$('#td-count').html(data.data.useCount);
				$('#td-rate').html(Math.round(100 * data.data.failRate * 100) / 100 + "%");
				$('#td-average-consume').html(data.data.averageTime);
				$('#td-max-consume').html(data.data.maxCostTime);
			}
		},
		error : function(data) {
			console.log(data);
		}
	});
}
// 返回yyyy-MM-dd格式时间
function formartdate(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return year + "-" + (month < 10 ? ("0" + month) : month) + "-"
			+ (day < 10 ? ("0" + day) : day);
}

var startTime = "";
var endTime = "";
$(function() {
	getServiceStatisticsInfo();
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
	
	
	getCountByDay();
	$('#myTab a[href="#allCount"]').tab('show');

	$("#start_time").datetimepicker({
		language : 'cn',
		format : 'yyyy-mm-dd',
		autoclose : true,
		todayBtn : true,
		minView : 2
	}).on("changeDate", function(ev) {
		startTime = formartdate(ev.date);
		$("#start_time").datetimepicker("setEndDate", $("#end_time").val());
	});
	$("#end_time").datetimepicker({
		language : 'cn',
		format : 'yyyy-mm-dd',
		autoclose : true,
		todayBtn : true,
		minView : 2
	}).on("changeDate", function(ev) {
		endTime = formartdate(ev.date);
		$("#end_time").datetimepicker("setStartDate", $("#start_time").val());
	});
	$('#myTab a[href="#allCount"]').click(function(e) {
		getCountByDay();
		$(this).tab('show');
	});
	$('#myTab a[href="#loseRate"]').click(function(e) {
		getFailRateByDay();
		$(this).tab('show');
	});
	$('#myTab a[href="#averageConsume"]').click(function(e) {
		getAVGCostByDay();
		$(this).tab('show');
	});
	$('#myTab a[href="#maxConsume"]').click(function(e) {
		getMaxCostByDay();
		$(this).tab('show');
	});
	$('#query').click(function(e) {
		getCountByDay();
		getFailRateByDay();
		getAVGCostByDay();
		getMaxCostByDay();
	});

});
