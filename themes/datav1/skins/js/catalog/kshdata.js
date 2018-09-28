function statisticDataShow(){
	$("#newCataVeiwType").val("3");
	var title = $("#dataCatalogTitle").html();
	//展示类型 0：饼状图 1：柱状图 2：折线图3：散点图 4：流图
	var type = $("#picTypeText").val();
	var meta_id = $("#meta_id").val();
	//判断是否选择统计条件
	if("3" == type || 3 == type){
		easyDialog.open({
			container : {
				content : '暂未开通'
			},
			autoClose : 2000
		});
		return;
	}
	var tjSelectCountHtml = $("#tjSelectCount").first().find("option:selected").text();
	var selectKeyDiv = null;
	if("1" == type || "2" == type || 1 == type || 2 == type){
		 selectKeyDiv = $("#kshtj2").find("select[id='tjSelect']").html();
	}else{
		 selectKeyDiv = $("#kshtj").find("select[id='tjSelect']").html();
	}
	if(null == selectKeyDiv || "null" == selectKeyDiv || typeof(selectKeyDiv) == undefined){
		easyDialog.open({
			container : {
				content : '请先选择数据统计项'
			},
			autoClose : 2000
		});
		return false;
	}
	//获得提交参数
	var tjSelect = "";
	var tjSelectValue = "";
	var sortArray = [];
	if(0 != type && "0" != type){
		 tjSelect = $("#kshtj2").find("select[id='tjSelect']").val();
		 $("#kshtj2").find("select[id='tjSelectCount']").each(function(){
			 tjSelectValue = tjSelectValue+$(this).val()+",";
			 sortArray.push($(this).val());
		 });
	}else{
		tjSelect = $("#kshtj").find("select[id='tjSelect']").val();
		tjSelectValue = $("#kshtj").find("select[id='tjSelectCount']").val();
	}
	//判断统值是否重复
	if(0 != type && "0" != type){
		sortArray.sort();
		if(sortArray.length > 1){
			for(var i=0;i<sortArray.length;i++){
				if (sortArray[i]==sortArray[i+1]){
					easyDialog.open({
						container : {
							content : '统计值重复'
						},
						autoClose : 2000
					});
					return false;
				}
			}
		}
	}
	//参数去掉，
	if(tjSelectValue.indexOf(",") > -1){
		tjSelectValue = tjSelectValue.substring(0,tjSelectValue.length-1);
	}
	//拼接筛选项参数
	var valueList = [];
	var keyList = [];
	var params = "";
	//筛选部分
	$(".mytiaojian").each(function(){
		//筛选值
	 	var value = $(this).find("input[name='value1']").val();
	 	//筛选项
	 	var key =  $(this).find("select[name='key1']").val();
	 	//筛选值的数据类型
	 	var fieldType = $(this).find("select[name='key1']").find("option:selected").attr("type");
	 	//筛选条件
	 	var condition1 = $(this).find("select[name='condition1']").val()
	 	//拼装json格式请求参数
	    params = params + "{'key':'"+key+"',";
	    params = params + "'type':'1','fieldType':'"+fieldType+"',";
	    params = params + "'condition':'"+ condition1 +"',";
	    params = params + "'value':'"+ value+"'},";
	    keyList.push(key);
	    valueList.push(value);
	});
	//筛选项排重操作
	if(keyList.length > 1){
		var nary=keyList.sort();
		for(var i=0;i<nary.length;i++){
			if (nary[i]==nary[i+1]){
				flag = false;
				easyDialog.open({
					container : {
						content : '筛选项重复'
					},
					autoClose : 2000
				});
				return flag;
			}
		}
	}
	if(keyList.length > 0){
		//筛选值去空
		for(var i in valueList){
			if("" == valueList[i] || 'null' == valueList[i] || 'undefined' == valueList[i] || typeof(valueList[i]) == undefined){
				flag = false;
				easyDialog.open({
					container : {
						content : '筛选项的值不能为空'
					},
					autoClose : 2000
				});
				return false;
			}
			
		}
	}
	params = "{'meta_id':'"+meta_id+"'},{'OperationType':'null'},"+params;
	//请求后台
	$.ajax({
	    type: "POST",
	    url: getRootPath()+"/catalog/detail.do?method=QueryDataPicByParams",
	    data: {"meta_id":meta_id,"tjSelect":tjSelect,"tjSelectValue":tjSelectValue,"params":params},
	    dataType: "json",
	    success:function(data){
	    	var option = null;
	    	var columNameList = data[0];
	    	var columnValueList = data[1]
	    	if("0" == type || 0 == type){
	    		var xArray = [];
	    		var yArray = [];
	    		$.each(columnValueList,function(i,item){
	    			xArray.push(item[tjSelect]);
	    			var map = {};
	    			map["name"] = item[tjSelect];
	    			map["value"] = item[tjSelectValue];
	    			yArray.push(map);
	    		});
	    		option = {
	    			    title : {text: title, subtext: '饼状图',    x:'center' },
	    			    tooltip : {  trigger: 'item', formatter: "{a} <br/>{b} : {c} ({d}%)" },
	    			    legend: { orient : 'vertical',  x : 'left',  data:xArray    },
	    			    calculable : true,
	    			    series : [ { name:tjSelectCountHtml,  type:'pie',   radius : '55%',   center: ['50%', '60%'],    data:yArray } ]
	    			};
	    			                    
		    	require(['echarts','echarts/chart/pie','echarts/chart/bar','echarts/chart/line','echarts/chart/force'],function (ec) {
		    		myChart = ec.init(document.getElementById('kshdraw'));
		    		myChart.setOption(option); 
		    	});
	    	}else if("1" == type || 1 == type){
		    	var titleArray = [];
	    		var xArray = [];
	    		var yArray = [];
	    		var columnNames = tjSelectValue.split(",")
	    		for(var i = 0 ;i < columnNames.length;i++){
	    			titleArray.push(columNameList[columnNames[i]]);
	    		}
    			$.each(columnValueList,function(i,item){
    				xArray.push(item[tjSelect]);
    			});
	    		for(var i = 0 ;i < columnNames.length;i++){
	    			var key = columnNames[i];
	     			var map = {};
	    			map["name"] = columNameList[key];
	    			map["type"] = "bar";
	    			var valueList = [];
	    			$.each(columnValueList,function(i,item){
	    				valueList.push(item[key]);
	    			});
	    			map["data"] = valueList;
	    			yArray.push(map);
	    		}
	    		option1 = {
	    			    title : { text: title,  subtext: '柱状图' },
	    			    tooltip : {  trigger: 'axis' },
	    			    legend: { data:titleArray },
	    			    calculable : true,
	    			    xAxis : [    {type : 'category', data : xArray } ],
	    			    yAxis : [{  type : 'value',scale:true}],
	    			    series : yArray
	    			};
		    	require(['echarts','echarts/chart/pie','echarts/chart/bar','echarts/chart/line','echarts/chart/force'],function (ec) {
		    		myChart = ec.init(document.getElementById('kshdraw'));
		    		myChart.setOption(option1); 
		    	});               
    		}else if("2" == type || 2 == type){
		    	var titleArray = [];
	    		var xArray = [];
	    		var yArray = [];
	    		var columnNames = tjSelectValue.split(",")
	    		for(var i = 0 ;i < columnNames.length;i++){
	    			titleArray.push(columNameList[columnNames[i]]);
	    		}
    			$.each(columnValueList,function(i,item){
    				xArray.push(item[tjSelect]);
    			});
	    		for(var i = 0 ;i < columnNames.length;i++){
	    			var key = columnNames[i];
	     			var map = {};
	    			map["name"] = columNameList[key];
	    			map["type"] = "line";
	    			var valueList = [];
	    			$.each(columnValueList,function(i,item){
	    				valueList.push(item[key]);
	    			});
	    			map["data"] = valueList;
	    			yArray.push(map);
	    		}
	    		option2 = {
	    			    title : { text: title, subtext: '折线图'  },
	    			    tooltip : { trigger: 'axis' },
	    			    legend: {data:titleArray },
	    			    calculable : true,
	    			    xAxis : [  { type : 'category', boundaryGap : false, data : xArray } ],
	    			    yAxis : [ { scale:true,type : 'value', axisLabel : {  formatter: '{value}' } } ],
	    			    series : yArray
	    			};
		    	require(['echarts','echarts/chart/pie','echarts/chart/bar','echarts/chart/line','echarts/chart/force'],function (ec) {
		    		myChart = ec.init(document.getElementById('kshdraw'));
		    		myChart.setOption(option2); 
		    	});  
	    	}else if(4 == type || "4" == type){
		    	var titleArray = [];
	    		var xArray = [];
	    		var yArray = [];
	    		var columnNames = tjSelectValue.split(",")
	    		for(var i = 0 ;i < columnNames.length;i++){
	    			titleArray.push(columNameList[columnNames[i]]);
	    		}
    			$.each(columnValueList,function(i,item){
    				xArray.push(item[tjSelect]);
    			});
	    		for(var i = 0 ;i < columnNames.length;i++){
	    			var key = columnNames[i];
	     			var map = {};
	    			map["name"] = columNameList[key];
	    			map["type"] = "scatter";
	    			var valueList = [];
	    			$.each(columnValueList,function(i,item){
	    				var value = [];
	    				value.push(item[tjSelect]);
	    				value.push(item[key]);
	    				valueList.push(value);
	    			});
	    			map["data"] = valueList;
	    			yArray.push(map);
	    		}
	    		option4 = {
	    			    title : {text: title, subtext: '散点图'},
	    			    legend: { data:titleArray  },
	    			    xAxis : [ {   type : 'category',     scale:true, data:xArray }  ],
	    			    yAxis : [ {    type : 'value',    scale:true,    axisLabel : {         formatter: '{value} '    }   } ],
	    			    series : yArray
	    			};
		    	require(['echarts','echarts/chart/pie','echarts/chart/bar','echarts/chart/line','echarts/chart/force'],function (ec) {
		    		myChart = ec.init(document.getElementById('kshdraw'));
		    		myChart.setOption(option4); 
		    	});  
	    			                    
	    	}else if(5 == type || "5" == type){
		    	var titleArray = [];
	    		var xArray = [];
	    		var yArray = [];
	    		var columnNames = tjSelectValue.split(",")
	    		for(var i = 0 ;i < columnNames.length;i++){
	    			titleArray.push(columNameList[columnNames[i]]);
	    		}
    			$.each(columnValueList,function(i,item){
    				xArray.push(item[tjSelect]);
    			});
	    		for(var i = 0 ;i < columnNames.length;i++){
	    			var key = columnNames[i];
	     			var map = {};
	    			map["name"] = columNameList[key];
	    			map["type"] = "line";
	    			map["itemStyle"] ={normal: {areaStyle: {type: 'default'}}}
	    			map["smooth"] = true;
	    			var valueList = [];
	    			$.each(columnValueList,function(i,item){
	    				valueList.push(item[key]);
	    			});
	    			map["data"] = valueList;
	    			yArray.push(map);
	    		}
	    		option5 = {
	    				title : { text: title, subtext: '流图'  },
	    			    tooltip : { trigger: 'axis' },
	    			    legend: { data:titleArray },
	    			    calculable : true,
	    			    xAxis : [ {  type : 'category',   boundaryGap : false,     data : xArray    } ],
	    			    yAxis : [ {   type : 'value'  } ],
	    			    series : yArray
	    			};
		    	require(['echarts','echarts/chart/pie','echarts/chart/bar','echarts/chart/line','echarts/chart/force'],function (ec) {
		    		myChart = ec.init(document.getElementById('kshdraw'));
		    		myChart.setOption(option5); 
		    	});  
	    			                    
	    	}
	    	$("#kshdiv").slideDown();
	    	$(".sjksh").show();	
	    },
		error : function(dataq) {
			easyDialog.open({
				container : {
					content : '网路异常'
				},
				autoClose : 2000
			});
		}
	});
}

function relactionCatalogChartShow(cata_id){
	//请求后台
	$.ajax({
	    type: "POST",
	    url: getRootPath()+"/catalog/detail.do?method=QueryRelationCatalogData",
	    data: {"cata_id":cata_id},
	    dataType: "json",
	    success:function(data){
	    	//展示标题
	    	var title = data["title"];
	    	//字段值
	    	var labelMap = data["label"];
	    	//可视化类型，pie，line....
	    	var type = labelMap["type"];
	    	//统计项名称
	    	var label = labelMap["label"];
	    	//统计值名称
	    	var valueNames = labelMap["value"];
	    	//查询结果
	    	var valueList = data["value"];
	    	//字段描述
	    	var metaList = data["meta"]
	    	if("pie" == type){
	    		var xArray = [];
	    		var yArray = [];
	    		var showTitle = "";
	    		$.each(metaList,function(i,item){
	    			var name = item["name_en"];
	    			if(name.toLowerCase() == valueNames.toLowerCase()){
	    				showTitle = item["name_cn"];
	    			}
	    		});
	    		$.each(valueList,function(i,item){
	    			xArray.push(item[label]);
	    			var map = {};
	    			map["name"] = item[label];
	    			map["value"] = item[valueNames];
	    			yArray.push(map);
	    		});
	    		option = {
	    			    title : {text: title, subtext: '饼状图',    x:'center' },
	    			    tooltip : {  trigger: 'item', formatter: "{a} <br/>{b} : {c} ({d}%)" },
	    			    legend: { orient : 'vertical',  x : 'left',  data:xArray    },
	    			    calculable : true,
	    			    series : [ { name:showTitle,  type:'pie',   radius : '55%',   center: ['50%', '60%'],    data:yArray } ]
	    			};
	    			                    
		    	require(['echarts','echarts/chart/pie','echarts/chart/bar','echarts/chart/line','echarts/chart/force'],function (ec) {
		    		myChart = ec.init(document.getElementById('relation_kshdraw'));
		    		myChart.setOption(option); 
		    	});
	    	
	    	}
	    	//折线图
	    	if("line" == type || "column" == type){
		    	var titleArray = [];
	    		var xArray = [];
	    		var yArray = [];
	    		var columnNames = valueNames.split(",")
	    		$.each(valueList,function(i,item){
	    			xArray.push(item[label]);
	    		});
	    		for(var i = 0 ;i < columnNames.length;i++){
	    			var key = columnNames[i];
	    			if(key.indexOf("as ") > -1){
	    				key = key.substring(key.indexOf("as ") +3);
	    			}
	     			var map = {};
		    		$.each(metaList,function(i,item){
		    			var name = item["name_en"];
		    			if(name.toLowerCase() == key.toLowerCase()){
		    				map["name"]  = item["name_cn"];
		    				titleArray.push(item["name_cn"]);
		    			}
		    		});
		    		if("line" == type){
		    			map["type"] = "line";
		    		}else{
		    			map["type"] = "bar";
		    		}
	    			var yValueList = [];
	    			$.each(valueList,function(i,item){
	    				yValueList.push(item[key]);
	    			});
	    			map["data"] = yValueList;
	    			yArray.push(map);
	    		}
	    		var subtext ="柱状图";
	    		if("line" == type){
	    			subtext ="折线图";
	    		}
	    		option1 = {
	    			    title : { text: title,  subtext: subtext },
	    			    tooltip : {  trigger: 'axis' },
	    			    legend: { data: titleArray },
	    			    calculable : true,
	    			    xAxis : [    {type : 'category', data : xArray } ],
	    			    yAxis : [{  type : 'value',scale:true}],
	    			    series : yArray
	    			};
		    	require(['echarts','echarts/chart/pie','echarts/chart/bar','echarts/chart/line','echarts/chart/force'],function (ec) {
		    		myChart = ec.init(document.getElementById('relation_kshdraw'));
		    		myChart.setOption(option1); 
		    	});               
    		}
	    },
		error : function(dataq) {
			easyDialog.open({
				container : {
					content : '网路异常'
				},
				autoClose : 2000
			});
		}
	});
}

