var grid = new Datatable();
var collectiongrid = new Datatable();
$(function () {
	applyedService("passed","applyedService-passed");
	$('#myTab a[href="#passed"]').tab('show');
	$('#myTab a[href="#passed"]').click(function (e) {
		grid.getDataTable().destroy();
		grid = new Datatable();
		applyedService("passed","applyedService-passed");
		$(this).tab('show');
	})
	$('#myTab a[href="#created"]').click(function (e) {
		grid.getDataTable().destroy();
		grid = new Datatable();
		applyedService("created,rejected,cancalled","applyedService-created");
		$(this).tab('show');
	})
	
	collectiongrid.init({
		src: $("#applyedService-collection"),
		onSuccess: function(collectiongrid) {},
		onError: function(collectiongrid) {},
		dataTable: {
			"columns": [{
				"data": "object_name"
			},
			/*{
				"data": "object_extend_param",
				"bSortable": false
			},*/
			{
				"data": "Object_extend_param",
				"bSortable": false
			},
			{
				"data": "id",
				"sClass":"text-center"
			}
			],
			"columnDefs": [
			            /*   {
			            	   "targets": [1],
			            	   "render": function(data, type, full) {
			            		   var text = data;
			            		   if(data==null || data == ""){
			            			   text = "--";
			            		   }
			            		   return text;
			            	   }
			               },*/
			               {
			            	   "targets": [1],
			            	   "render": function(data, type, full) {
			            		   var text = data;
			            		   if(data==null || data == ""){
			            			   text = "--";
			            		   }
			            		   return text;
			            	   }
			               },	{
			            	   "targets": [2],
			            	   "render": function(data, type, full) {
			            		   var text = "<a style=\"margin-right: 10px;\" href=\"javascript:void()\" onclick=\"serviceDetail('"+full.object_id+"')\">查看详情</a>";
			            		   text = text + "<a style=\"margin-right: 10px;\" href=\"javascript:void()\" onclick=\"serviceApply('"+full.object_id+"')\">申请</a>";
			            		   text = text + "<a style=\"margin-right: 10px;\" href=\"javascript:void()\" onclick=\"cancelcollection("+data+")\">取消收藏</a>";
			            		   return text;
			            	   }
			               }
			               ],
			               "pageLength": 10,
			               "ajax": {
			            	   'url': collectionlist,
			            	   'data' : function (d) {
			            	   }
			               }
		}
	});
	
	$('#myTab a[href="#collection"]').click(function (e) {
		collectiongrid.getDataTable().ajax.reload();
		$(this).tab('show');
	})
});

function cancleApply(apply_id,msg){
	if (confirm(msg) == true) {
		$.ajax({url:applylist_url, data:{
			method: "CancleApply",
			apply_id: apply_id
		},success:function(data) {
			window.location.href = applylist_url;
		},error:function(data) {
			easyDialog.open({
				container : {
					content : '网络异常'
				},
				autoClose : 2000
			});
		},dataType:"json"});
    } else {
    }
}

function reApply(apply_id,msg){
	if (confirm(msg) == true) {
		$.ajax({url:applylist_url, data:{
			method: "ReApply",
			apply_id: apply_id
		},success:function(data) {
			window.location.href = applylist_url;
		},error:function(data) {
			easyDialog.open({
				container : {
					content : '网络异常'
				},
				autoClose : 2000
			});
		},dataType:"json"});
	} else {
	}
}

function deleteApply(apply_id,msg){
	if (confirm(msg) == true) {
		$.ajax({url:applylist_url, data:{
			method: "deleteApply",
			apply_id: apply_id
		},success:function(data) {
			window.location.href = applylist_url;
		},error:function(data) {
			easyDialog.open({
				container : {
					content : '网络异常'
				},
				autoClose : 2000
			});
		},dataType:"json"});
    } else {
    }
}

function cancelcollection(id){
	if (confirm("确定取消收藏？") == true) {
		$.ajax({url:applylist_url, data:{
			method: "CancleCollection",
			obj_id: id,
			status: "0"
		},success:function(data) {
			easyDialog.open({
				container : {
					content : data.msg
				},
				autoClose : 2000
			});
			collectiongrid.getDataTable().ajax.reload();
		},error:function(data) {
			easyDialog.open({
				container : {
					content : '网络异常'
				},
				autoClose : 2000
			});
		},dataType:"json"});
    } else {
    }
}

function editApply(app_id, service_id, subscription_id) {
	window.location.href = "serviceApply.htm?app_id=" + app_id + "&service_id=" + service_id + "&subscription_id=" + subscription_id;
}

function applyedService(status,tableId){
	grid.init({
        src: $("#"+tableId),
        onSuccess: function(grid) {},
        onError: function(grid) {},
        dataTable: {
            "columns": [{
                "data": "service_name"
            	},
                {
                    "data": "app_name",
                    "bSortable": false
                },
                {
                    "data": "subscribe_time",
                    "bSortable": false
                },
                {
                    "data": "subscription_id",
                    "sClass":"text-center"
                }
            ],
            "columnDefs": [
   				{
				    "targets": [1],
				    "render": function(data, type, full) {
				        var text = data;
				        if(data==null || data == ""){
				        	text = "--";
				        }
				        return text;
				    }
				},
				{
				    "targets": [2],
				    "render": function(data, type, full) {
				        var text = data;
				        if(data==null || data == ""){
				        	text = "--";
				        }
				        return text;
				    }
				},	{
                    "targets": [3],
                    "render": function(data, type, full) {
                        var text = "";
						if(full.subscription_status == "created"){
							text = "<a href=\"applyedServiceDetail.htm?apply_id=" + data + "\">查看明细</a><span>  </span><a href=\"javascript:deleteApply(" + data + ", '确认要删除该服务申请吗？')\">删除</a>";
						}else if(full.subscription_status == "passed"){
							text = "<a href=\"applyedServiceDetail.htm?apply_id=" + data + "\">查看明细</a><span>  </span><a href=\"javascript:cancleApply(" + data + ", '确认要取消申请该服务吗？')\">取消申请</a>";
						}else if(full.subscription_status == "rejected"){
							text = "<a href=\"javascript:reApply(" + data + ", '确认要重新申请该服务申请吗？')\">重新申请</a><span>  </span>";
							text += "<a href=\"javascript:editApply('" + full.app_id + "','" + full.service_id + "','" + data + "')\">编辑</a><span>  </span>";
							text += "<a href=\"javascript:deleteApply(" + data + ", '确认要删除该服务申请吗？')\">删除</a>";
						}else if(full.subscription_status == "cancalled"){
							text = "<a href=\"javascript:reApply(" + data + ", '确认要重新申请该服务申请吗？')\">重新申请</a><span>  </span>";
							text += "<a href=\"javascript:editApply('" + full.app_id + "','" + full.service_id + "','" + data + "')\">编辑</a><span>  </span>";
							text += "<a href=\"javascript:deleteApply(" + data + ", '确认要删除该服务申请吗？')\">删除</a>";
						}
                        return text;
                    }
                }
            ],
            "pageLength": 10,
            "ajax": {
                'url': applylist,
                'data' : function (d) {
                	d.status = status;
                }
            }
        }
    });
}

function serviceDetail(service_id){
	window.location.href= serviceDetailUrl+service_id;
}

function serviceApply(service_id){
	location.href = serviceApplyUrl+service_id;
}
