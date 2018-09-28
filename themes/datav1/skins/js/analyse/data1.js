/*
 * 主题指数
 * 路径配置
 */
require
		.config({
			paths : {
				'echarts' : getRootPath()+'/js/echarts'
			}
		});
// 使用
require([ 'echarts',  'echarts/chart/radar', // 使用柱状图就加载bar模块，按需加载
'echarts/chart/pie' ], function(ec) {
	option = {
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		legend : {
			orient : 'vertical',
			textStyle : {
				color : '#333',
				fontSize : '12',
				fontFamily : '微软雅黑'
			},
			x : 'left',
			y : 'top',
			data : []
		},
		toolbox : {
			show : false,
			feature : {
				mark : {
					show : true
				},
				dataView : {
					show : true,
					readOnly : false
				},
				restore : {
					show : true
				},
				saveAsImage : {
					show : true
				}
			}
		},
		calculable : true,
		series : []
	};
	//主题分类
	$.ajax({
		type : "POST",
		url : getRootPath()+"/analyse/index.do?method=getResGroup",
		data : {
			"t":new Date().getTime()
		},
		dataType : "json",
		success : function(data) {
			var datas = [];
			for (var i = 0; i < data.length; i++) {
				var obj = data[i];
				option.legend.data.push(obj.group_name);
				datas.push({
					value : obj.cata_amount,
					name : obj.group_name,
					group_code:obj.group_code
				});
			};
			option.series.push({
				name : '主题开放指数',
				type : 'pie',
				radius : [ '20%', '60%' ],
				center : [ '60%', '40%' ],
				roseType : 'radius',
				itemStyle : {
					normal : {
						label : {
							show : false
						},
						labelLine : {
							show : false
						}
					},
					emphasis : {
						label : {
							show : true
						},
						labelLine : {
							show : true
						}
					}
				},
				data : datas
			});
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('main3'));
			// 为echarts对象加载数据
			myChart.setOption(option);
			var ecConfig = require('echarts/config');
			//点击事件
			myChart.on(ecConfig.EVENT.CLICK, eConsole);
			setTimeout(function() {
				window.onresize = function() {
					myChart.resize();
				};
			}, 2000);
			eConsole({data:datas[0]});
			
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

function eConsole(param) {
	option_view = {
			title : {
				x : 'center',
				y : 'top',
				itemGap : -20,
				text : "",
				textStyle : {
					fontSize : 20,
					fontFamily : "微软雅黑",
					color : '#8A5E25'
				},
				subtextStyle : {
					fontFamily : "微软雅黑",
					fontSize : 15,
					color : '#8A5E25',
					fontWeight : 'bold'
				}

			},
			tooltip : {
				trigger : 'axis'
			},
			toolbox:{show:false,feature:{mark:{show:true},dataView:{show:true,readOnly:false},restore:{show:true},saveAsImage:{show:true}}},
			calculable : true,
			polar:[{indicator:[{text:'数据量指数',max:1},{text:'浏览量指数',max:1},{text:'下载量指数',max:1},{text:'订阅量指数',max:1},{text:'数据集指数',max:1}],
			radius : '60%'
		} ],
		series : [ {
			name : '主题开放指数',
			type : 'radar',
			itemStyle:{normal:{areaStyle:{type:'default'}}},
			data : []
		} ]
	};
	require([ 'echarts', 'echarts/chart/radar', // 使用柱状图就加载bar模块，按需加载
	'echarts/chart/pie' ], function(ec,b,c) {
				$.ajax({
					type : "POST",
					url : getRootPath()+"/analyse/index.do?method=getGroupAnalyse",
					data : {
						"index" : param.data.group_code,
						"t":new Date().getTime()
					},
					dataType : "json",
					success : function(data) {
						option_view.title.text = data.resGroup.name+"指数";
						var value = [];
						value.push(data.dataAnalyse);
						value.push(data.visitAnalyse);
						value.push(data.downloadAnalyse);
						value.push(data.favAnalyse);
						value.push(data.cataAnalyse);
						option_view.series.push({
							name : data.resGroup.name+"指数",
							type : 'radar',
							itemStyle:{normal:{areaStyle:{type:'default'}}},
							data : [{
									value : value,
									name : data.resGroup.name
							}]
						});
						
						myChart_view = ec.init(document.getElementById('main4'));
						myChart_view.setOption(option_view);
						setTimeout(function() {
							window.onresize = function() {
								myChart_view.resize();
							};
						}, 200);
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
