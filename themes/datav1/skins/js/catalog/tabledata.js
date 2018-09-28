//jQGrid列表
function showDataItems(){
	var cata_id = $("#obj_id").val();
	var table_id = $("#table_id").val();
	var database_type = $("#database_type").val();
	$.ajax({
	    type: "POST",
	    url: getRootPath()+"/catalog/detail.do?method=QueryDataItemName",
	    data: {"cata_id":cata_id},
	    dataType: "json",
	    success: function(data){
	         var column = [];
	         var columnRule = [];
	         for(var i=0;i<data.length;i++){
	        	 column.push(data[i]["name_cn"]);
	        	 var columnRuleMap = {};
	        	 if(data[i]["meta_column_name_en"]!=null){
	        		 columnRuleMap["name"] = data[i]["meta_column_name_en"];
		     		 columnRuleMap["index"] = data[i]["meta_column_name_en"];
		     		 columnRuleMap["fixed"]=true;
	        	 }else{
	        		 columnRuleMap["name"] = "";
		     		 columnRuleMap["index"] = "";
		     		 columnRuleMap["fixed"]=true;
	        	 }
	        	 columnRule.push(columnRuleMap);
	         }
		   	 var paramData = {"cata_id":cata_id,"table_id":table_id,"database_type":database_type};
		   	jQuery("#table2").jqGrid({
				url:getRootPath()+"/catalog/detail.do?method=QueryDataItem",
			    datatype: "json",
			    mtype: 'POST',
			    postData: paramData,
		       	width: 850,
		       	height: 462,
		       	rowNum: 20,
		       	rownumWidth:33,
			    autowidth: false,
			    altRows:true,//隔行变色
			    altclass:'ui-widget-content-altclass',//隔行变色样式
			    colNames:column,
			    colModel:columnRule,   
			    rowNum:20,//初始化时每一页显示的个数
			    rowList:[10,20,30],//每一页能显示的个数
			    pager: '#pager2',//如果不需要左下角的 自带的查询 刷新功能  就不用添加在最后一行的 jqGrid('navGrid','#pager_List'...
			    sortname: '',
	          	viewrecords: true,
	          	grouping:false,
	          	groupingView : {
	          		groupField : ['name']
	          	},
	          	rownumbers: true,
	          	emptyrecords: "暂无数据"
			});
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







