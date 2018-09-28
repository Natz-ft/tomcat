function myChartShow() {
	var option = {
		grid : {
			x : 50,
			y : 30,
			x2 : 30,
			y2 : 30
		},
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : [ '访问量', '下载量', '评论量', '评分量', '订阅量' ]
		},

		calculable : true,
		xAxis : [],
		yAxis : [ {
			type : 'value'
		} ],
		series : []
	};

	var date = $("#birthYear").val() + $("#birthMonth").val();
	// 使用
	require([ 'echarts', 'echarts/chart/line' ], function(ec) {
		$.ajax({
			type : "POST",
			url : resoucrceurl,
			data : {
				catalogId : $("#obj_id").val(),
				"date" : date
			},
			dataType : "json",
			success : function(data) {
				// 基于准备好的dom，初始化echarts图表
				var myChart = ec.init(document.getElementById('fwltj'));
				var views = null;
				var downloads = null;
				var comments = null;
				var secores = null;
				var orders = null;
				var date = null;
				$.each(data, function(k, v) {
					switch (k) {
					case 'views':
						views = v;
						break;
					case 'downloads':
						downloads = v;
						break;
					case 'comments':
						comments = v;
						break;
					case 'grade':
						secores = v;
						break;
					case 'favs':
						orders = v;
						break;
					case 'day':
						date = v;
						break;
					}
				});
				option.xAxis.push({
					type : 'category',
					boundaryGap : false,
					data : date
				});
				option.series.push({
					name : '访问量',
					type : 'line',
					data : views
				});

				option.series.push({
					name : '下载量',
					type : 'line',
					data : downloads
				});

				option.series.push({
					name : '评论量',
					type : 'line',
					data : comments
				});
				option.series.push({
					name : '评分量',
					type : 'line',
					data : secores
				});

				option.series.push({
					name : '订阅量',
					type : 'line',
					data : orders
				});
				// 为echarts对象加载数据
				myChart.setOption(option);
			}
		});

	});
}
