/**
 * 修改之前请先看清描述信息
 * meta_id： 数据源ID
 * OperationType ： groups:分组统计  null：筛选
 * type  1 ： 筛选
 * condition：(当type=1时)
 * 1  : 等于  2 :不等于  3 :大于  4 :小于  5 :模糊匹配(like) 6 :包含(in)  7 :不包含(not in)
 * 当type=2时
 * 1：总数  2：平均值 3：求和 4：求追大致 5：求最小值
 * 
 *
 *
 *
 */

$(function() {
	//筛选模块确定
	$("#queding").click(function(){
		$("#newCataVeiwType").val("1");
		//检查是否存在筛选条件
		var count = $("#sxtiaojian").children("div[class='my']").length;
		if(count == 1){
			var html = $(".my").html();
			if(html == "没有筛选条件"){
				easyDialog.open({
					container : {
						content : '请先选择查询条件'
					},
					autoClose : 2000
				});
				return;
			}
		}
		var cata_id = $("#obj_id").val();
		var meta_id = $("#meta_id").val();
		var flag = true;
		var valueList = new Array();
		//筛选项列表，用于排重
		var keyList = new Array();
		var params = "";
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
		//拼接json字符串
		//格式： meta_id(数据表Id),groups(是否是分组筛选),paramMap 筛选条件
		params = "{'meta_id':'"+meta_id+"'},{'OperationType':'null'},"+params;
		 if(flag){
			$.ajax({
			    type: "POST",
			    url:getRootPath()+"/catalog/detail.do?method=QueryDataItemName",
			    data: {"cata_id":cata_id},
			    dataType: "json",
			    success: function(data){
			    	$(".contable").html("<table  class='tablesxfz' id='table1'></table><div id='pager1'></div>");
					$(".contable").slideDown();
					$(".conshaifen").slideUp();
					$("#golvtg").removeClass('golvsq');
			    	  var columnName = data;
			    	 var column = [];
			    	 var columnRule = [];
			    	for(var i=0;i<data.length;++i){
			    		var columnRuleMap = {};
						column.push(data[i]["name_cn"]);
						if(data[i]["meta_column_name_en"]!=null){
							columnRuleMap["name"] = data[i]["meta_column_name_en"];
							columnRuleMap["index"] = data[i]["meta_column_name_en"];
						}
			    		 columnRuleMap["width"]=60;
			    		 columnRuleMap["sortable"]=false;
			    		 columnRule.push(columnRuleMap);
			    	 }
			    	 jQuery("#table1").jqGrid({
							url:getRootPath()+"/catalog/detail.do?method=QueryDataItemByParams",
						    datatype: "json",
						    mtype: 'POST',
						    postData: {"params":params},
					       	width: 850,
					       	height: 462,
					       	rowNum: 20,
					       	rownumWidth:33,
						    autowidth: true,
						    altRows:true,//隔行变色
						    altclass:'ui-widget-content-altclass',//隔行变色样式
						    colNames:column,
						    colModel:columnRule,   
						    rowNum:20,//初始化时每一页显示的个数
						    rowList:[10,20,30],//每一页能显示的个数
						    pager: '#pager1',//如果不需要左下角的 自带的查询 刷新功能  就不用添加在最后一行的 jqGrid('navGrid','#pager_List'...
						    sortname: "",
				          	viewrecords: true,
				          	grouping:false,
				          	jsonReader:{repeatitems:false},
				          	groupingView : {
				          		groupField : ['name']
				          	},
				          	rownumbers: true,
				          	emptyrecords: "暂无数据"
						}).trigger("reloadGrid");
			    	 $(".sjtjbtn").show();
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
	});
	
	
	//统计信息
	$("#tjqueding").click(function(){
		$("#newCataVeiwType").val("2");
		var meta_id = $("#meta_id").val();
		var flag = true;
		var valueList = new Array();
		var keyList = new Array();
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
		valueList = new Array();
		keyList = new Array();
		// 分组部分
		$(".kshcontent[type='part1']").each(function(){
			 	var value =  $(this).find("select[name='key2']").val();
			    params = params + "{'key':'"+value+"',";
			    params = params + "'type':'4',";
			    params = params + "'value':'"+ value+"'},";
			    params = params + "{'key':'"+value+"',";
			    params = params + "'type':'5',";
			    params = params + "'value':'"+ value+"'},";
			    keyList.push(value);
			    valueList.push(value);
		});
		var nary=keyList.sort();
		for(var i=0;i<nary.length;i++){
			if (nary[i]==nary[i+1]){
				flag = false;
				easyDialog.open({
					container : {
						content : '分组选项重复'
					},
					autoClose : 2000
				});
				return flag;
			}
		}
		//统计部分
		valueList = new Array();
		keyList = new Array();
		$(".kshcontent[type='part2']").each(function(){
			 	var value =  $(this).find("select[name='key3']").val();
			 	var condition = $(this).find("select[name='value3']").val();
			    params = params + "{'key':'"+value+"',";
			    params = params + "'type':'2',";
			    if(null != condition && "" != condition  && typeof(condition) != undefined && "undefined" != condition){
			    	 params = params + "'condition':'"+condition+"',";
			    }else{
			    	 params = params + "'condition':'"+1+"',";
			    }
			    params = params + "'value':'"+ value+"'},";
			    keyList.push(value+"-"+condition);
			    valueList.push(value);
		});
		var nary=keyList.sort();
		for(var i=0;i<nary.length;i++){
			if (nary[i]==nary[i+1]){
				flag = false;
				easyDialog.open({
					container : {
						content : '统计选项重复'
					},
					autoClose : 2000
				});
				return flag;
			}
		}
		//排序部分
		var orderValueList = new Array();
		var ordereyList = new Array();
		$(".kshcontent[type='part3']").each(function(){
			 	var value =  $(this).find("select[name='key4']").val();
			 	var order = $(this).find("input[class='shunxu']").val();
			 	if(null != value && typeof(value) != undefined  && "" != value){
				    params = params + "{'key':'"+value+"',";
				    params = params + "'type':'3',";
				    params = params + "'condition': '"+order+"',";
				    params = params + "'value':'"+ value+"'},";
				    orderValueList.push(value);
				    ordereyList.push(value);
			 	}
		});
		var nary=ordereyList.sort();
		if(nary.length > 1){
			for(var i=0;i<nary.length;i++){
				if (nary[i]==nary[i+1]){
					flag = false;
					easyDialog.open({
						container : {
							content : '排序选项重复'
						},
						autoClose : 2000
					});
					return flag;
				}
			}
		}
		//拼接json字符串
		//格式： meta_id(数据表Id),groups(是否是分组筛选),paramMap 筛选条件
		params = "{'meta_id':'"+meta_id+"'},{'OperationType':'groups'},"+params;
	   if(flag){
			$.ajax({
			    type: "POST",
			    url: getRootPath()+"/catalog/detail.do?method=QueryDataItemByParamsName",
			    data: {"params":params},
			    dataType: "json",
			    success: function(data){
			    	$(".contable").html("<table  class='tablesxfz' id='table3'></table><div id='pager3'></div>");
					$(".contable").slideDown();
					$(".conshaifen").slideUp();
					$("#golvtg").removeClass('golvsq');
			    	 var columnName = data;
			    	 var column = [];
			    	 var columnRule = [];
			    	$.each(data,function(k,v){
						column.push(v);
			    		columnRule.push({name:k,index:k,sortable:false});
			    	 });
			    	 jQuery("#table3").jqGrid({
							url:getRootPath()+"/catalog/detail.do?method=QueryDataItemByParams",
						    datatype: "json",
						    mtype: 'POST',
						    postData: {"params":params},
					       	width: 850,
					       	height: 462,
					       	rowNum: 20,
					       	rownumWidth:33,
						    autowidth: true,
						    altRows:true,//隔行变色
						    altclass:'ui-widget-content-altclass',//隔行变色样式
						    colNames:column,
						    colModel:columnRule,   
						    rowNum:20,//初始化时每一页显示的个数
						    rowList:[10,20,30],//每一页能显示的个数
						    pager: '#pager3',//如果不需要左下角的 自带的查询 刷新功能  就不用添加在最后一行的 jqGrid('navGrid','#pager_List'...
						    sortname: params,
				          	viewrecords: true,
				          	grouping:false,
				          	jsonReader:{repeatitems:false},
				          	groupingView : {
				          		groupField : ['name']
				          	},
				          	rownumbers: true,
				          	emptyrecords: "暂无数据"
						}).trigger("reloadGrid");
			    	 var select1 = "<div id='selectKeyDiv'>数据项 <select name=\"1\" id=\"tjSelect\">";
			    	 var select2 = "<div id='selectValueDiv'>数据值 <select name=\"1\" id=\"tjSelectCount\" class='addsjztj'>";
			    	 $.each(columnName,function(key,values){
			    		 if(key.endWith("_count") || key.endWith("_avg") || key.endWith("_sum") || key.endWith("_max") || key.endWith("_min")){
			    			 select2 += "<option value=\""+key+"\">"+values+"</option>";
			    		 }else{
			    			 select1 += "<option value=\""+key+"\">"+values+"</option>";
			    		 }
			    	 });
			    	 select1 += "</select></div>";
			    	 select2 += "</select></div>";
			       $("#kshtj").html(select1 + select2);
			       $("#kshtj2").html(select1 + select2 +"<div class=\"addsxtj\">添加数据值</div>");
			       $(".sjtjbtn").show();
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
	});
	//点击增加数据项
	$(".addsxtj").live("click",function(){
		 var count = $("#tjSelectCount").first().children().length;
		 var selectCount = $("#kshtj2").find("div[id='selectValueDiv']").length
		 if(selectCount < count){
			var html =  $("#kshtj2").find("div[id='selectValueDiv']").last().html();
			$("#kshtj2").find("div[id='selectValueDiv']").last().after("<div id='selectValueDiv' class='addsjztj'>"+html+"<a class=\"deltiaojian3\"></a></div>");
		 }else{
				easyDialog.open({
					container : {
						content : '数据值超出最大值'
					},
					autoClose : 2000
				});
		 }
	});
	//点击删除统计项
	$(".deltiaojian3").live("click",function(){
		$(this).parent().remove();
	});
});
String.prototype.endWith=function(oString){  
	 var   reg=new   RegExp(oString+"$");  
	 return   reg.test(this);     
};
