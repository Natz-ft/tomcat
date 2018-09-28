var tags = [];
var tag_datas = [];
$(function() {
	$.ajax({
		type : "POST",
		url : queryOrgUrl,
		data : {},
		dataType : "json",
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				tags.push(data[i].tag_name);
				tag_datas.push(data[i].count);
			}
			// 路径配置
			require.config({
				paths : {
					'echarts' : getRootPath()+'/js/utils/echarts/echarts'
				}
			});
			// 使用
			require([ 'echarts', 'echarts/chart/bar',// 使用柱状图就加载bar模块，按需加载
			'echarts/chart/line' ], function(ec) {
				// 基于准备好的dom，初始化echarts图表
				var myChart = ec.init(document.getElementById('sy_datashow'));
				option = {
					grid : {
						x : 50,
						y : 10,
						x2 : 10,
						y2 : 30
					},
					tooltip : {
						trigger : 'axis'
					},
					calculable : true,
					xAxis : [ {
						type : 'category',
						data : tags
					} ],
					yAxis : [ {
						type : 'value',
						axisLabel : {
							formatter : '{value}次'
						}
					} ],
					series : [ {
						name : '数量',
						type : 'bar',
						data : tag_datas
					} ]
				};
				// 为echarts对象加载数据
				myChart.setOption(option);
			});

		},
		error : function(data) {
			easyDialog.open({
				container : {
					content : '网络异常'
				},
				autoClose : 2000
			});
		}
	});

});
