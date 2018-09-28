var grid = new Datatable();

$(function() {
	grid.init({
		src : $("#applyedData-passed"),
		onSuccess : function(grid) {
		},
		onError : function(grid) {
		},
		dataTable : {
			"columns" : [ {
				"data" : "cata_name",
				"bSortable" : false
			}, {
				"data" : "apply_time",
				"bSortable" : false
			}, {
				"data" : "start_date",
				"bSortable" : false
			},
 			{
				"data" : "download_allow_num",
				"bSortable" : false
			}, 
			{
				"data" : "status",
				"bSortable" : false
			} ,
			{
				"data" : "status",
				"bSortable" : false
			}],
			"columnDefs" : [ 
			{
				"targets" : [ 0 ],
				"render" : function(data, type, full) {
				   var text = "<a onclick=\"detail('"+full.cata_id+"')\">"+data+"</a>";
					if (data == null || data == "") {
						text = "--";
					}
					return text;
				}
			},
			{   
				"targets" : [ 1 ],
			    "render" : function (data, type, full) {
				   var text = data;
				   if(data == null || data == ""){
					   text = "--";
				   }
				   return text;
			   }
			},
			{
				"targets" : [ 2 ],
				"render" : function(data, type, full) {
					var text = data;
					if (full.start_date != null && full.start_date != "" && full.end_date != null && full.end_date != "" ){
						text = (full.start_date||"") + '-' + (full.end_date||"");
					} else {
						text = "--"
					}
					return text;
				}
			},
			{
				"targets" : [3],
				"render" : function(data, type, full){
					var text = "" ;
					if(data == -1){
						text = "无限制"
					} else {
						text = data;
					}
					return text ;
				}
			},
			{
				"targets" : [ 4 ],
				"render" : function(data, type, full) {
					switch (data) {
					case -1:
						return "已过期";
					case 0:
						return "待审核";
					case 3:
						return "审批通过";
					case 4:
						return "审批驳回";
					case 5:
						return "草稿";
					}
				} },
				{
					"targets" : [ 5 ],
					"render" : function(data, type, full) {
						var text = "";
					      switch (data) {
					      case -1:
					    	  text = "<a onclick=\"doApply('"+full.cata_id+"')\">"+"重新申请"+"</a>";
					    	  return text;
					      case 0:
					    	  text = "--";
					    	  return text;
					      case 3:
					    	  text = "--";
					    	  return text;
					      case 4:
					    	  text = "<a onclick=\"doApply('"+full.cata_id+"')\">"+"重新申请"+"</a>";
					    	  return text;
					      case 5:
					    	  text = "--";
					    	  return text;
					      }
					}
				}],
			"pageLength" : 10,
			"ajax" : {
				'url' : getRootPath() + '/catalog/catalog.do?method=getApplyData'
			}
		}
	});
});
function detail(id){
	window.location.href = getRootPath()+"/catalog/catalogDetail.htm?cata_id="+id;
}
//重新申请的功能 +
function doApply(id){
	debugger;
	window.location.href = getRootPath()+"/catalog/catalogApply.htm?cata_id="+id;
}