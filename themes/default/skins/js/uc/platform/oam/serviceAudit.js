function init_service_audit(param){
	var count = parseInt(param['count']); 
	var pagesize = parseInt(param['pageSize']);
	var nowPage = parseInt(param['nowPage']);
	if(count > pagesize){
		$("#paper").show();
		$("#paper").ui_paper({
			count : count,
			pagesize : pagesize,
			current : nowPage,
			fun : "nextServiceAuditPageHandler"
		});
	}
	else{
		$("#paper").hide();
	}
}

function nextServiceAuditPageHandler(data){
	location.href = './serviceAudit.htm?pageindex='+data.index;
}

function doPassServiceHandler(service_id){
	layer.load('加载中……', 1);
	var param = {};
	param['service_id'] = service_id;
	$.ajax({
		url: './serviceAudit.do?method=passService',
		type: "GET",
		data: param,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(data){
			layer.closeAll();
			if(data=='1'){
				layer.msg('审核服务成功', 1, 1, function(){
					location.reload();
				});
				
			}
			else{
				layer.msg('审核服务失败,请稍后重试!', 2, -1);
			}
  		}
	});
}

function doRejectServiceHandler(service_id){
	layer.load('加载中……', 1);
	var param = {};
	param['service_id'] = service_id;
	$.ajax({
		url: './serviceAudit.do?method=rejectService',
		type: "GET",
		data: param,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(data){
			layer.closeAll();
			if(data=='1'){
				layer.msg('驳回服务成功', 1,1, function(){
					location.reload();
				});
			}
			else{
				layer.msg('驳回服务失败,请稍后重试!', 1, 0);
			}
  		}
	});
}