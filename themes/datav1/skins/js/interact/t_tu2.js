$(document).ready(
		function() {
			for (var j = 0; j < items_zhutu.length; j++) {
				var item = items_zhutu[j];
				createZhuTu(item);

			}
			function createZhuTu(item) {
				require([ 'echarts', 'echarts/chart/bar'], function(ec) {
					$.ajax({
						type : "POST",
						url : faqUrl,
						data : {
							"item" : item,
							"faq_id":faq_id
						},
						dataType : "json",
						success : function(data) {
							var myChart = ec.init(document
									.getElementById("zhutu" + item));
							// 基于准备好的dom，初始化echarts图表
							option = {

								calculable : true,
								grid : {
									x : 0,
									y : 30,
									y2 : 30,
									x2 : 20
								},
								xAxis : [ ],
								yAxis : [ {
									type : 'value',
									axisLabel : {
										formatter : '{value} ms'
									}
								} ],
								series : []

							};
							// 循环
							var datas = [];
							var dataname = [];
							for (var j = 0; j < data.length; j++) {
								dataname.push(data[j].ITEM_CONTENT);
								datas.push(data[j].COUNT);
							}
							
							option.xAxis.push({
								type : 'category',
								data : dataname
							}, {
								type : 'category',
								axisLine : {
									show : false
								},
								axisTick : {
									show : false
								},
								axisLabel : {
									show : false
								},
								splitArea : {
									show : false
								},
								splitLine : {
									show : false
								},
								data : dataname
							} );
							
							option.series.push({
								name : 'ECharts2 - 2w数据',
								type : 'bar',
								itemStyle : {
									normal : {
										color : 'rgba(181,195,52,1)',
										label : {
											show : true,
											textStyle : {
												color : '#27727B'
											}
										}
									}
								},
								data : datas
							});
							// 为echarts对象加载数据
							myChart.setOption(option);
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
			}
		});