// 路径配置
require.config({
	paths : {
		'echarts' : getRootPath() + '/libs/assets/echarts'
	}
});

var dataarr = new Array();
var data1_1arr = new Array();
var data1_2arr = new Array();
var options = new Array();
var timelinedata = [];
var default_org = '';
$(function() {
	$.ajax({
		type : "POST",
		url : queryOrgUrl,
		data : {
			"t" : new Date().getTime()
		},
		dataType : "json",
		success : function(data) {

			var temp = data.org_records.length / 15;
			var temp2 = data.org_records.length % 15;
			var pushMax = 1;
			if (temp2 == 0) {
				pushMax = temp;
			} else {
				pushMax = temp + 1;
			}
			for ( var i = 1; i <= pushMax; i++) {
				timelinedata.push(i + "");
				//循环处理
				var start = (i-1)*15; 
				var end = i*15;
				if(end > data.org_records.length){
					end = data.org_records.length;
				}
				var data1 = [];
				var data1_1 = [];
				var data1_2 = [];
				for( var j = start; j < end; j++){
					if (j == 0) {
						default_org = data.org_records[j].org_name;
					}
					if (j % 2 > 0) {
						data1.push("\n" + data.org_records[j].org_name);
					} else {
						data1.push(data.org_records[j].org_name);
					}
					if (data.openCountMax > 0) {
						data1_1.push(data.org_records[j].provide_cata_amount);
					} else {
						data1_1.push(0);
					}
					if (data.useCountMax > 0) {
						data1_2.push(data.org_records[j].provide_visit_use_amount);
					} else {
						data1_2.push(0);
					}
				}
				dataarr.push(data1);
				data1_1arr.push(data1_1);
				data1_2arr.push(data1_2);
				
				
			}
			//处理最后一批数据
			var len = dataarr.length-1;
			if (dataarr[len].length < 15) {
				var num = 15 - dataarr[len].length;
				var j = 0;
				while (j < num) {
					dataarr[len].push("");
					data1_1arr[len].push(0.0);
					data1_2arr[len].push(0.0);
					j++;
				}
				;
			}
			for ( var i = 0; i <= pushMax-1; i++) {
				 var option =  {
					tooltip : {
						'trigger' : 'axis'
					},
					legend : {
						x : 'center',
						'data' : [ 
						           {name:'数据集',textStyle:{color:'#fff'}},
						           {name:'下载次数',textStyle:{color:'#fff'}}
						         ],
						'selected' : {
							'数据集' : true,
							'下载次数' : true
						}
					},
					calculable : true,
					grid : {
						'y' : 80,
						'y2' : 85
					},
					xAxis : [ {
						'type' : 'category',
						'axisLabel' : {
							'interval' : 0,
							'textStyle': {
								　color: '#fff'
							}
						},
						'data' : dataarr[i],
						// 'axisLabel': {
					     //    'interval':0,
					     //    'rotate':40,
					     //    'textStyle': {
						// 		　color: '#fff'
						// 	}
					     // },
					     'axisLine':{
					    	 'lineStyle':{
					    		 color:'#fff'
					    	 }
					     }
					} ],

					yAxis : [ {
						'type' : 'value',
						'name' : '数据集',
						'axisLabel' : {
							'interval' : 0,
							'textStyle': {
								　color: '#fff'
							}
						},
						'axisLine':{
			                'lineStyle':{
			                    color:'#fff'
			                }
			            },
						'precision' : 3,
						'min' : 0,
						//'max' : 1
					}, {
						'type' : 'value',
						'name' : '下载次数',
						'axisLabel' : {
							'interval' : 0,
							'textStyle': {
								　color: '#fff'
							}
						},
						'axisLine':{
			                'lineStyle':{
			                    color:'#fff'
			                }
			            },
						'precision' : 3,
						'min' : 0,
						//'max' : 1
					} ],
					series : [ {
						'name' : '数据集',
						'type' : 'bar',
						'itemStyle' : {  
	                        'normal' : {  
	                            lineStyle:{  
	                                color:'#fff'  
	                            }  
	                        }  
						},
						'markLine' : {
							symbol : [ 'arrow', 'none' ],
							symbolSize : [ 4, 2 ],
							itemStyle : {
								normal : {
									lineStyle : {
										color : '#fff'
									},
									borderColor : '#fff',
									label : {
										position : 'left',
										textStyle : {
											color : '#fff'
										}
									}
								}
							},
							'data' : [ {
								'type' : 'average',
								'name' : '平均值'
							} ]
						},
						'data' : data1_1arr[i]
					}, {
						'name' : '下载次数',
						'yAxisIndex' : 1,
						'type' : 'bar',
						'data' : data1_2arr[i]
					} ]
				};
				options.push(option);
			}
			
			// 创建图表
			createOrgChart();
			var param = {
				name : default_org
			};
			eConsoleOrg(param);
		},
		error : function(data) {
			dialog.info('网络异常',function(){},2000);
		}
	});
});

// 使用
function createOrgChart() {
	require([ 'echarts', 'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
	'echarts/chart/line' ], function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('main1'));
		var ecConfig = require('echarts/config');
		myChart.on(ecConfig.EVENT.CLICK, eConsoleOrg);
		myChart.setOption({
			timeline : {
				type : 'number',
				data : timelinedata,
				label : {
					formatter : function(s) {
						return s.slice(0, timelinedata.length);
					}
				},
				autoPlay : true,
				playInterval : 5000
			},
			options : options
		});
	});
}

function eConsoleOrg(param) {
	if ((param.name == "") || (param.name == "平均值")) {
		return false;
	}
	option_view_org = {
		title : {
			x : 'center',
			y : 'top',
			itemGap : -20,
			text : "",
			textStyle : {
				fontSize : 20,
				fontFamily : "微软雅黑",
				color : '#fff'
			},
			subtextStyle : {
				fontFamily : "微软雅黑",
				fontSize : 15,
				color : '#fff',
				fontWeight : 'bold'
			}

		},
		tooltip : {
			trigger : 'axis'
		},
		calculable : true,
		polar : [ {
			indicator : [ {
				text : '数据量',
				max : 1
			}, {
				text : '浏览量',
				max : 1
			}, {
				text : '下载量',
				max : 1
			}, {
				text : '订阅量',
				max : 1
			}, {
				text : '数据集',
				max : 1
			} ],
			 name:{
		         	textStyle:{color:'#fff'}
		         },
			radius : '55%'
		} ],
		series : [ {
			name : '主题开放',
			type : 'radar',
			itemStyle : {
				normal : {
					areaStyle : {
						type : 'default'
					},
					textStyle:{
				        color:"#fff"
				    }
				}
			},
			data : []
		} ]
	};
	require([ 'echarts', 'echarts/chart/radar', // 使用柱状图就加载bar模块，按需加载
	'echarts/chart/pie' ], function(ec) {
		$.ajax({
			type : "POST",
			url : queryOrgAnalyseUrl,
			data : {
				"org_name" : param.name.replace(/[ ]/g,"").replace(/[\r\n]/g,""),//去除空格换行，否则报错
				"t" : new Date().getTime()
			},
			dataType : "json",
			success : function(data) {
/*
				option_view_org.title.text = data.org_name;
*/
                option_view_org.title.text = data.org_name + "开放数据分析";
				var value = [];
				value.push(data.dataAnalyse);
				value.push(data.visitAnalyse);
				value.push(data.downloadAnalyse);
				value.push(data.favAnalyse);
				value.push(data.cataAnalyse);
				option_view_org.series.push({
				/*name : replaceKeyWord(data.org_name,/指数/g),*/
					name : data.org_name + "开放数据分析",
					type : 'radar',
					itemStyle : {
						normal : {
							areaStyle : {
								type : 'radar'
							}
						}
					},
					itemStyle : {
						normal : {
							color : '#fff',
							areaStyle : {
								color : '#fff',
								type : 'default'
							}
						},
						emphasis : {
							color : '#fff',
							areaStyle : {
								color : '#fff',
								type : 'default'
							}
						}
					},
					data : [ {
						value : value,
						/*name :replaceKeyWord(data.org_name,/指数/g)*/
						name  : data.org_name + "开放数据分析"
					} ]
				});

				myChart_view = ec.init(document.getElementById('main2'));
				myChart_view.setOption(option_view_org);
			},
			error : function(data) {
				dialog.info('网络异常',function(){},2000);
			}
		});
	});
}

/**
 * 将指定关键字替换为空
 * @param value
 * @param word
 */
function replaceKeyWord(value,word) {
	if(value!=null&& value!=undefined){
		value.replace(word,"");

	}
}
