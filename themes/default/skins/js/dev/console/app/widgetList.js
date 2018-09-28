define(function(require, exports, module){
	seajs.use("lib/jquery.blockUI.js");
	seajs.use("lib/dialog.js");
	//初始化
	exports.init = function(){
		var request = $A.service('request');
		var pagesize = request.getParameter('pagesize');
		var index = request.getParameter('index');
		var loader = layer.load("加载中……");
		if(typeof app_id == "undefined" || app_id==null || app_id == ""){
			data = {index: index, pagesize: pagesize};
		}else{
			data = {app_id: app_id,index: index, pagesize: pagesize};
		}
		//获取应用申请服务信息
		$.ajax({
			url: "./AppWidgets.do?method=GetAppWidgetList",
			type: "GET",
			data: data,
			dataType: "JSON",
			success: function(result){
					if(result==null){
						resultData = new Array();
					}else{
						resultData = result.data;
					}
					var wrapper = $A.service('wrapper').getWrapper('content-wrap');
					wrapper.loadWidget({
						id: 'showContent',
						tpl: {id: 'widgetListTpl'},
						data: {data:resultData},
						callback: bindEvents
					});
					
					//判断是否显示分页
					if(result!=null&&result.data!=null && result.data.totalPages!=null && result.data.totalPages > 1){
						require.async("lib/core", function(){
							//加载分页
							$("#paper").ui_paper({
								pagesize: result.data.pageSize,
								current: result.data.nowPage,
								count: result.data.count,
								url: '#widgetList'
								});
						});			
					}
					layer.close(loader);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				if(XMLHttpRequest.responseText.constructor === String){
					var errobj = JSON.parse(XMLHttpRequest.responseText);
					var errorInfo = errobj.errInfo == undefined?"网络不给力，请稍后再试":errobj.errInfo;
					layer.msg(errorInfo, 1, 0);
				}else{
					layer.msg("网络不给力，请稍后再试", 1, 0);
				}
			},
			timeout: 5000
		});
	}
	
	//页面渲染之后绑定事件
	function bindEvents(){
		
	}
	
	
});