define(function(require, exports, module){
	
	//初始化
	exports.init = function(){
	
		var request = $A.service("request");
		var type = request.getParameter('type');
		var page = request.getParameter('index');
		var pagesize = request.getParameter('pagesize');
		if(type == '') type = 'default'; 
		var loader = layer.load("加载中……");
		//获取应用申请服务信息
		$.ajax({
			url: "./app/services.do?method=getAppServices",
			type: "GET",
			data: {app_id: app_id, service_type: type, page: page, pagesize: pagesize},
			dataType: "JSON",
			success: function(result){
				if(result.code == 1){
					var wrapper = $A.service('wrapper').getWrapper('content-wrap');
					wrapper.loadWidget({
						id: 'showContent',
						tpl: {id: 'openServiceTpl'},
						data: $.extend(result.data, {cur_type: type}),
						callback: bindEvents
					});
					
					if(result.data.count > result.data.pageSize){ //多于一页，则加载分页
						require.async("lib/core", function(){
							//加载分页
							$("#paper").ui_paper({
								pagesize: result.data.pageSize,
								current: result.data.nowPage,
								count: result.data.count,
								url: '#serviceList!type='+type
								
							});
						});			
					}
					layer.close(loader);
				}else{
					layer.msg(result.msg, 2, 3);
				}
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
	
	function getServicePage(keyword){
		$('form.search_form').submit();
	}
	
	//页面渲染之后绑定事件
	function bindEvents(){
	
		//复选框
		$(".check-all").click(function() {
			if($(this).is(":checked")) {
				$(".check-all,.checkbox").prop("checked",true);
			} else {
				$(".check-all,.checkbox").prop("checked",false);
			}
		});
		
		$(".checkbox").click(function() {
			if($(".checkbox:checked").length == $(".checkbox").length) {
				$(".check-all").prop("checked",true);
			} else {
				$(".check-all").prop("checked",false);
			}
		});
		$('.search-input').bind('keypress', function(){
			if(event.keyCode == "13"){
				var val = $(this).val();
				if(val==''){
					layer.msg('请输入查询关键字', 2, -1);
				}
				else{
					getServicePage(val);
				}
				return false;
			}
		});
		//点击搜索图标的响应事件
		$('._begin_search_').click(function(){
			var val = $(this).prev().val();
			if(val==''){
				layer.msg('请输入查询关键字', 2, -1);
			}
			else{
				getServicePage(val);
			}
		});
		//单选删除按钮
		$("a[__singledel=true]").click(function(){
			$this = $(this);
			var sub_id = $this.attr('__id');
			
			//取消申请请求
			$.ajax({
				url: "./app/services.do?method=cancelApply",
				type: "POST",
				data: {sub_id: sub_id},
				dataType: "JSON",
				success: function(result){
					if(result.code == 1){
						layer.msg(result.msg, 1, 1, function(){
							var request = $A.service("request");
							request.refreshHash();
						});
					}else{
						layer.msg(result.msg, 2, 3);
						//$("#item"+sub_id).remove();
					}
				}
			});
		});
		
		$('#multidelBtn').click(function(){
			var sub_ids = new Array();
			$("input[name=checkitem]").each(function(){
				if(this.checked){
					sub_ids.push($(this).val());
				}
				
			});
			
			if(sub_ids.length > 0){
				//取消申请请求
				$.ajax({
					url: "./app/services.do?method=cancelApply",
					type: "POST",
					data: {sub_id: sub_ids.join(',')},
					dataType: "JSON",
					success: function(result){
						if(result.code == 1){
							
							layer.msg(result.msg, 1, 1, function(){
								var request = $A.service("request");
								request.refreshHash();
							});
							/*
							for(var i in sub_ids){
								$("#item"+sub_ids[i]).remove();
							}*/
						}else{
							layer.msg(result.msg, 2, 3);
						}
					},
					error: function(){
						layer.msg("网络不给力，请稍后再试……", 2, 3);
					},
					timeout: 5000
				});
			}else{
				layer.msg('请至少选择一个选项', 2, 2);
			}
			//alert($("input[name=checkitem]").val());
		});
		
	}
	
	
});