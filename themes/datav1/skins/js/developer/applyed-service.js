$(function () {
	$("#servtime").click(function(event) {
		$(this).children('span').toggleClass('arrowup');
	});
	$(".serv_sx").hide();
	$("#servstate").click(function(event) {
		$(this).children('span').toggleClass('arrowup');
		$(".serv_sx").slideToggle();
	});
	
	
	var pageselectCallback = function(page_id, jq) {
		queryResByPage(page_id + 1);
		//执行查询，展现分页内容
	};
	
	// 创建分页元素
	var reloadPage = function(totlePage) {
		$("#Pagination").pagination(totlePage, {
			items_per_page: pageSize, 
			num_edge_entries: 2,
			num_display_entries: 8,
			callback: pageselectCallback
			//回调函数
		});
	};
	
	var queryResByPage = function(page) {
			var listUl= $("#applyTable");
			listUl.empty();
			$.ajax({
				url: applylist_url, 
				type: "POST",
				data:{
					method: "queryMyApplyList",
					index: page,
					pageSize: pageSize
				},
				success:function(data) {
				if(data != "" && data != null){
					var dataarr = new Array();
					for (var i = 0; i < data.records.length; i++) {
						var item = data.records[i];
						var time = new Date(item.subscribe_time).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
						dataarr.push("<tr>");
						dataarr.push("<td style=\"text-align:left;\">" + item.service_name + "</td>");
						dataarr.push("<td>" + item.app_name + "</td>");
						dataarr.push("<td>" + item.subscribe_time + "</td>");
						if(item.subscription_status == "created"){
							dataarr.push("<td>待审核</td>");
							dataarr.push("<td><a href=\"applyedServiceDetail.htm?apply_id=" + item.subscription_id + "\">查看明细</a><span>|</span><a href=\"javascript:deleteApply(" + item.subscription_id + ", '确认要删除该服务申请吗？')\">删除</a></td>");
						}else if(item.subscription_status == "passed"){
							dataarr.push("<td>审核通过</td>");
							dataarr.push("<td><a href=\"applyedServiceDetail.htm?apply_id=" + item.subscription_id + "\">查看明细</a><span>|</span><a href=\"javascript:cancleApply(" + item.subscription_id + ", '确认要取消订阅该服务吗？')\">取消订阅</a></td>");
						}else if(item.subscription_status == "rejected"){
							dataarr.push("<td>被驳回</td>");
							dataarr.push("<td><a href=\"javascript:deleteApply(" + item.subscription_id + ", '确认要删除该服务申请吗？')\">删除</a></td>");
						}else if(item.subscription_status == "cancalled"){
							dataarr.push("<td>已取消</td>");
							dataarr.push("<td><a href=\"javascript:deleteApply(" + item.subscription_id + ", '确认要删除该服务申请吗？')\">删除</a></td>");
						}
					}
					listUl.append(dataarr.join(''));
					if (page == 1 && data.count > pageSize) {
						reloadPage(data.count);
					}else if(page == 1){
						$("#Pagination").empty();
					}
				}
			},error:function(data) {
				easyDialog.open({
					container : {
						content : '网络异常'
					},
					autoClose : 2000
				});
			},dataType:"json"});
			
		};
		
		queryResByPage(1);
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

