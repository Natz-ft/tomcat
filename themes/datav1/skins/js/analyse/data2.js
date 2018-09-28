// 路径配置
require
		.config({
			paths : {
				'echarts' :  getRootPath()+'/js/echarts'
			}
		});
var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
//开放指数
var data1_1 = [];
var data2_1 = [];
var data3_1 = [];
var data4_1 = [];
//访问指数
var data1_2 = [];
var data2_2 = [];
var data3_2 = [];
var data4_2 = [];

var timelinedata = [];
var default_org = '';
$(function () {
	$.ajax({
		type : "POST",
		url :queryOrgUrl,
		data : {
			"t":new Date().getTime()
		},
		dataType : "json",
		success : function(data){
//			if(data.org_records.length<=15){
//				timelinedata.push("1");
//			}else if(data.org_records.length<=30){
//				timelinedata.push("1");
//				timelinedata.push("2");
//			}else if(data.org_records.length<=45){
//				timelinedata.push("1");
//				timelinedata.push("2");
//				timelinedata.push("3");
//			}else if(data.org_records.length<=60){
//				timelinedata.push("1");
//				timelinedata.push("2");
//				timelinedata.push("3");
//				timelinedata.push("4");
//			}
			
			var temp  = data.org_records.length/15;
			var temp2 = data.org_records.length%15;
			var pushMax = 1;
			if(temp2==0){
				pushMax = temp;
			}else{
				pushMax = temp + 1;
			}
			for(var i =1;i<=pushMax;i++){
				timelinedata.push(i+"");
			}
			
			
			for (var i = 0; i < data.org_records.length; i++) {
				if(i==0){
					default_org = data.org_records[i].org_name;
				}
				if(i<15){
					if(i%2>0){
						data1.push("\n"+data.org_records[i].org_name);
					}else{
						data1.push(data.org_records[i].org_name);
					}
					if(data.maxCata>0){
						data1_1.push(data.org_records[i].cata_amount/data.maxCata);
					}else{
						data1_1.push(0.0);
					}
					if(data.maxVisit>0){
						data1_2.push(data.org_records[i].visit_amount/data.maxVisit);
					}else{
						data1_2.push(0.0);
					}
				}else if(i<30){
					if(i%2>0){
						data2.push(data.org_records[i].org_name);
					}else{
						data2.push("\n"+data.org_records[i].org_name);
					}
					if(data.maxCata>0){
						data2_1.push(data.org_records[i].cata_amount/data.maxCata);
					}else{
						data2_1.push(0.0);
					}
					if(data.maxVisit>0){
						data2_2.push(data.org_records[i].visit_amount/data.maxVisit);
					}else{
						data2_2.push(0.0);
					}
				}else if(i<45){
					if(i%2>0){
						data3.push("\n"+data.org_records[i].org_name);
					}else{
						data3.push(data.org_records[i].org_name);
					}
					if(data.maxCata>0){
						data3_1.push(data.org_records[i].cata_amount/data.maxCata);
					}else{
						data3_1.push(0.0);
					}
					if(data.maxVisit>0){
						data3_2.push(data.org_records[i].visit_amount/data.maxVisit);
					}else{
						data3_2.push(0.0);
					}
				}else{
					if(i%2>0){
						data4.push("\n"+data.org_records[i].org_name);
					}else{
						data4.push(data.org_records[i].org_name);
					}
					if(data.maxCata>0){
						data4_1.push(data.org_records[i].cata_amount/data.maxCata);
					}else{
						data4_1.push(0.0);
					}
					if(data.maxVisit>0){
						data4_2.push(data.org_records[i].visit_amount/data.maxVisit);
					}else{
						data4_2.push(0.0);
					}
				}
			}
			if(data2.length<15){
				var num = 15-data2.length;
				var j=0;
				while(j<num){
					data2.push("");
					data2_1.push(0.0);
					data2_2.push(0.0);
					j++;
				};
			}
			if(data3.length<15){
				var num = 15-data3.length;
				var j=0;
				while(j<num){
					data3.push("");
					data3_1.push(0.0);
					data3_2.push(0.0);
					j++;
				};
			}
			if(data4.length<15){
				var num = 15-data4.length;
				var j=0;
				while(j<num){
					data4.push("");
					data4_1.push(0.0);
					data4_2.push(0.0);
					j++;
				};
			}
			//创建图表
			createOrgChart();
			var param = {name:default_org};
			eConsoleOrg(param);
		},
		error:function(data){
			easyDialog.open({
				container : {
					content : '网络异常'
				},
				autoClose : 2000
			});
		}
	});
});


// 使用
function createOrgChart(){
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
	          			label:{formatter:function(s){return s.slice(0,timelinedata.length);}},
	          			autoPlay : true,
	          			playInterval : 5000
	          		},
	          		options : [
	          				{
	          					tooltip : {'trigger' : 'axis'},
	          					legend:{x:'center','data':['开放指数','使用指数'],'selected':{'开放指数':true,'使用指数':true}},
	          					toolbox:{'show':true,x:'center',y:'40','feature':{'mark':{'show':false},'dataView':{'show':false,'readOnly':true},'magicType':{'show':true,'type':['line','bar']},'restore':{'show':true},'saveAsImage':{'show':true}}},
	          					calculable : true,
	          					grid : {'y' : 80,'y2' : 85},
	          					xAxis : [ {
	          						'type' : 'category',
	          						'axisLabel' : {
	          							'interval' : 0
	          						},
	          						'data' : data1
	          					} ],

	          					yAxis:[{'type':'value','name':'部门开放指数','precision': 3,'min':0,'max':1},{'type':'value','name':'部门使用指数','precision': 3,'min':0,'max':1}],
	          					series:[{'name':'开放指数','type':'bar','markLine':{symbol:['arrow','none'],symbolSize:[4,2],itemStyle:{normal:{lineStyle:{color:'orange'},borderColor:'orange',label:{position:'left',formatter:function(a,b,c){return Math.round(c);},textStyle:{color:'orange'}}}},'data':[{'type':'average','name':'平均值'}]},'data':data1_1},{'name':'使用指数','yAxisIndex':1,'type':'bar','data':data1_2}]
	          				},
	          				{
	          					tooltip : {'trigger' : 'axis'},
	          					legend:{x:'center','data':['开放指数','使用指数'],'selected':{'开放指数':true,'使用指数':true}},
	          					toolbox:{'show':true,x:'center',y:'40','feature':{'mark':{'show':false},'dataView':{'show':false,'readOnly':true},'magicType':{'show':true,'type':['line','bar']},'restore':{'show':true},'saveAsImage':{'show':true}}},
	          					calculable : true,
	          					grid : {'y' : 80,'y2' : 85},
	          					xAxis : [ {
	          						'type' : 'category',
	          						'axisLabel' : {
	          							'interval' : 0
	          						},
	          						'data' : data2
	          					} ],
	          					yAxis:[{'type':'value','name':'部门开放指数','precision': 3,'min':0,'max':1},{'type':'value','name':'部门使用指数','precision': 3,'min':0,'max':1}],
	          					series:[{'name':'开放指数','type':'bar','markLine':{symbol:['arrow','none'],symbolSize:[4,2],itemStyle:{normal:{lineStyle:{color:'orange'},borderColor:'orange',label:{position:'left',formatter:function(a,b,c){return Math.round(c);},textStyle:{color:'orange'}}}},'data':[{'type':'average','name':'平均值'}]},'data':data2_1},{'name':'使用指数','yAxisIndex':1,'type':'bar','data':data2_2}]
	          				},
	          				{
	          					tooltip : {'trigger' : 'axis'},
	          					legend:{x:'center','data':['开放指数','使用指数'],'selected':{'开放指数':true,'使用指数':true}},
	          					toolbox:{'show':true,x:'center',y:'40','feature':{'mark':{'show':false},'dataView':{'show':false,'readOnly':true},'magicType':{'show':true,'type':['line','bar']},'restore':{'show':true},'saveAsImage':{'show':true}}},
	          					calculable : true,
	          					grid : {'y' : 80,'y2' : 85},
	          					xAxis : [ {
	          						'type' : 'category',
	          						'axisLabel' : {
	          							'interval' : 0
	          						},
	          						'data' : data3
	          					} ],
	          					yAxis:[{'type':'value','name':'部门开放指数','precision': 3,'min':0,'max':1},{'type':'value','name':'部门使用指数','precision': 3,'min':0,'max':1}],
	          					series:[{'name':'开放指数','type':'bar','markLine':{symbol:['arrow','none'],symbolSize:[4,2],itemStyle:{normal:{lineStyle:{color:'orange'},borderColor:'orange',label:{position:'left',formatter:function(a,b,c){return Math.round(c);},textStyle:{color:'orange'}}}},'data':[{'type':'average','name':'平均值'}]},'data':data3_1},{'name':'使用指数','yAxisIndex':1,'type':'bar','data':data3_2}]
	          				},
	          				{
	          					tooltip : {'trigger' : 'axis'},
	          					legend:{x:'center','data':['开放指数','使用指数'],'selected':{'开放指数':true,'使用指数':true}},
	          					toolbox:{'show':true,x:'center',y:'40','feature':{'mark':{'show':false},'dataView':{'show':false,'readOnly':true},'magicType':{'show':true,'type':['line','bar']},'restore':{'show':true},'saveAsImage':{'show':true}}},
	          					calculable : true,
	          					grid : {'y' : 80,'y2' : 85},
	          					xAxis : [ {
	          						'type' : 'category',
	          						'axisLabel' : {
	          							'interval' : 0
	          						},
	          						'data' : data4
	          					} ],
	          					yAxis:[{'type':'value','name':'部门开放指数','precision': 3,'min':0,'max':1},{'type':'value','name':'部门使用指数','precision': 3,'min':0,'max':1}],
	          					series:[{'name':'开放指数','type':'bar','markLine':{symbol:['arrow','none'],symbolSize:[4,2],itemStyle:{normal:{lineStyle:{color:'orange'},borderColor:'orange',label:{position:'left',formatter:function(a,b,c){return Math.round(c);},textStyle:{color:'orange'}}}},'data':[{'type':'average','name':'平均值'}]},'data':data4_1},{'name':'使用指数','yAxisIndex':1,'type':'bar','data':data4_2}]
	          				} ]
	          	});
	          });
}

function eConsoleOrg(param) {
	if(param.name==""||param.name=="平均值"){
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
					color : '#004B85'
				},
				subtextStyle : {
					fontFamily : "微软雅黑",
					fontSize : 15,
					color : '#004B85',
					fontWeight : 'bold'
				}

			},
			tooltip : {
				trigger : 'axis'
			},
			toolbox:{show:false,feature:{mark:{show:true},dataView:{show:true,readOnly:false},restore:{show:true},saveAsImage:{show:true}}},
			calculable : true,
			polar:[{indicator:[{text:'数据量指数',max:1},{text:'浏览量指数',max:1},{text:'下载量指数',max:1},{text:'订阅量指数',max:1},{text:'数据集指数',max:1}],
			radius : '55%'
		} ],
		series : [ {
			name : '主题开放指数',
			type : 'radar',
			itemStyle:{normal:{areaStyle:{type:'default'}}},
			data : []
		} ]
	};
	require([ 'echarts', 'echarts/chart/radar', // 使用柱状图就加载bar模块，按需加载
	'echarts/chart/pie'], function(ec) {
				$.ajax({
					type : "POST",
					url : queryOrgAnalyseUrl,
					data : {
						"org_name" : param.name,
						"t":new Date().getTime()
					},
					dataType : "json",
					success : function(data) {
						option_view_org.title.text = data.organization.org_name+"指数";
						var value = [];
						value.push(data.dataAnalyse);
						value.push(data.visitAnalyse);
						value.push(data.downloadAnalyse);
						value.push(data.favAnalyse);
						value.push(data.cataAnalyse);
						option_view_org.series.push({
							name : data.organization.org_name+"指数",
							type : 'radar',
							itemStyle:{normal:{areaStyle:{type:'radar'}}},
							itemStyle: {
				                normal: {
				                	color:'#004B85',
				                    areaStyle: {
				                        color:'#008dd5',
				                        type: 'default'
				                    }
				                },
				                emphasis: {
                    				color:'#008dd5',
                    				areaStyle: {
                        				color:'#004B85',
                        				type: 'default'
                    				}
                				}
				            },
							data : [{
									value : value,
									name : data.organization.org_name
							}]
						});
						
						myChart_view = ec.init(document.getElementById('main2'));
						myChart_view.setOption(option_view_org);
						setTimeout(function() {
							window.onresize = function() {
								option_view_org.resize();
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
