
$(function(){
	/**
	 * ‘选择应用’弹出框
	 */
	$("#app_name_handler").click(function(){
		queryAppByPage(1);
		$('#appModal').modal('show');
	});
	var queryAppByPage = function(appPage) {
		$.ajax({
            url: service_apply_url,
            async: false,
            data: {
            	method : "getAppList",
                "index": appPage
            },
			success: function(data) {
				$("#app_list").html("");
				if(data.list != "" && data.list != null){
					var dataarr = new Array();
					for (var i = 0; i < data.list.length; i++) {
						var obj = data.list[i];
						dataarr.push("<tr><td>"+obj.app_alias+"</td>");
						dataarr.push("<td><a onclick=\"chooseApp('"+obj.app_id+"','"+obj.app_alias+"')\" data-dismiss=\"modal\">选择</a></td></tr>");
					}
					$("#app_list").append(dataarr.join(''));
					if (appPage == 1) {
						appReloadPage(data.count);
					}
				}else{
					if (appPage == 1) {
						appReloadPage(0);
					}
					$("#app_pagination").empty();
					$("#app_list").append("<tr><td colspan='2'>暂无应用数据</td></tr>");
				}
			},
			error: function(data) {
				alert('网络异常');
			},dataType:"json"
		});
	};
	var appPageSelectCallback = function(page_id, jq) {
		queryAppByPage(page_id + 1);	//执行查询，展现分页内容
	};
	var appReloadPage = function(totlePage) {
		$("#app_pagination").pagination(totlePage, {
			num_edge_entries: 0,
			num_display_entries: 5, 
			items_per_page: 7,
			callback: appPageSelectCallback	//回调函数
		});
	};
	/**
	 * '选择服务'弹出框
	 */
	$("#service_name_handler").click(function(){
		queryserviceByPage(1);
		$('#serviceModal').modal('show');
	});
	var queryserviceByPage = function(servicePage) {
		$.ajax({
            url: service_apply_url,
            async: false,
            data: {
            	method : "getServiceList",
                "index": servicePage
            },
			success: function(datas) {
				$("#service_list").html("");
				if(datas.data != "" && datas.data != null){
					var dataarr = new Array();
					for (var i = 0; i < datas.data.length; i++) {
						var obj = datas.data[i];
						dataarr.push("<tr><td>"+obj.service_name+"</td>");
						dataarr.push("<td>"+obj.version_name+"</td>");
						dataarr.push("<td><a onclick=\"chooseService('"+obj.service_id+"','"+obj.service_name+"')\" data-dismiss=\"modal\">选择</a></td></tr>");
					}
					$("#service_list").append(dataarr.join(''));
					if (servicePage == 1) {
						serviceReloadPage(datas.count);
					}
				}else{
					if (servicePage == 1) {
						serviceReloadPage(0);
					}
					$("#service_pagination").empty();
					alert('暂无数据');
				}
			},
			error: function(data) {
				alert('网络异常');
			},dataType:"json"
		});
	};
	var servicePageSelectCallback = function(page_id, jq) {
		queryserviceByPage(page_id + 1);	//执行查询，展现分页内容
	};
	var serviceReloadPage = function(totlePage) {
		$("#service_pagination").pagination(totlePage, {
			num_edge_entries: 0,
			num_display_entries: 5, 
			items_per_page: 7,
			callback: servicePageSelectCallback	//回调函数
		});
	};
	
});

	/**
	 * 选择应用
	 * @param feature_id
	 * @param app_alias
	 */
	function chooseApp(feature_id, app_alias){
		$("#app_name").val(app_alias);
		$("#app_id").val(feature_id);
		document.getElementById("appModal").style.display = "none";
	}
	/**
	 * 选择服务
	 * @param service_id
	 * @param service_name
	 */
	
	function chooseService(service_id, service_name){
		$("#service_name").val(service_name);
		$("#service_id").val(service_id);
		document.getElementById("serviceModal").style.display = "none";
	}
	
	function closewinser(){
		document.getElementById("serviceModal").style.display = "none";
	}
	
	function closewinapp(){
		document.getElementById("appModal").style.display = "none";
	}

//提交表单
function submitApplyForm(){
	if($("#service_name").val().trim()=='') {
		$("#service_namewar").html("请选择申请资源!");
		return false;
	}
	if($("#app_name").val().trim()=='') {
		$("#app_namewar").html("请选择所属应用!");
		return false;
	}
	if($("#contact_name").val().trim()=='') {
		$("#contact_namewar").html("请填写联系人!");
		return false;
	}
	if($("#phone").val().trim()=='') {
		$("#phonewar").html("请填写联系方式!");
		return false;
	}
	if($("#start_time").val().trim()=='') {
		$("#timewar").html("请选择开始时间!");
		return false;
	}
	if($("#end_time").val().trim()=='') {
		$("#timewar").html("请选择结束时间!");
		return false;
	}
	if($("textarea[name='description']").val().trim()=='') {
		$("#descriptionwar").html("请填写申请理由!");
		return false;
	}

	$.ajax({
        url: service_apply_url,
        type:"post",
        data: {
        	method : "addApply",
        	"subscription_id": $("#subscription_id").val(),
        	"service_id": $("#service_id").val(),
        	"app_id": $("#app_id").val(),
        	"start_time": startTime,
        	"end_time":endTime,
        	"level_id":$("input[name='level_id']:checked").val(),
        	"apply_reason": $("textarea[name='description']").val()
        },
		success: function(data) {
			if(data > 0){
				layer.msg('提交成功',2,1,function(){
					window.location.href = "applyedServiceList.htm";
				});
			}else{
				layer.msg('提交失败',2,0);
			}
		},
		error: function(data) {
			alert('网络异常');
		},dataType:"json"
	});
}