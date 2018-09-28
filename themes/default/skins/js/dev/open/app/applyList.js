define(function(require, exports, module){
	
	//初始化
	exports.init = function(){
		var request = $A.service('request');
		var root_gid = request.getParameter('root_gid');
		var sec_gid = request.getParameter('sec_gid');
		var g_type = request.getParameter('g_type');
		var pagesize = request.getParameter('pagesize');
		var index = request.getParameter('index');
		var loader = layer.load("加载中……");
		//获取应用申请服务信息
		$.ajax({
			url: "./app/services.do?method=GetApplyServiceList",
			type: "GET",
			data: {app_id: app_id, root_gid: root_gid, sec_gid: sec_gid, g_type: g_type, index: index, pagesize: pagesize},
			dataType: "JSON",
			success: function(result){
				if(result.code == 1){
					var wrapper = $A.service('wrapper').getWrapper('content-wrap');
					wrapper.loadWidget({
						id: 'showContent',
						tpl: {id: 'applyListTpl'},
						data: result.data,
						callback: bindEvents
					});
					
					//判断是否显示分页
					if(result.data.serviceList.totalPages > 1){
						require.async("lib/core", function(){
							//加载分页
							$("#paper").ui_paper({
								pagesize: result.data.serviceList.pageSize,
								current: result.data.serviceList.nowPage,
								count: result.data.serviceList.count,
								url: '#applyList!root_gid='+root_gid+'&sec_gid='+sec_gid+'&g_type'+g_type
								});
						});			
					}
					layer.close(loader);
					
				}else{
					layer.msg(result.msg+"aa", 2, 3);
				}
			},
			error: function(){
				layer.msg("网络不给力，请稍后再试……");
			},
			timeout: 5000
		});
	}
	
	function getServicePage(keyword){
		$('form.search_form').submit();
		//location.hash="#searchService!type=applyed&keyword="+keyword;
	}
	
	function doApplyService($this){
		var $panel = layer.load('加载中...', 1);
		var service_id = $this.attr('__id');
		$.ajax({
			url: "./app/services.do?method=GetSubLevel",
			type: "POST",
			data: {},
			dataType: "JSON",
			success: function(result){
				layer.close($panel);
				var data = {};
				if(result != null){
					data["data"] = result;
					//console.log(data);
					var htm = template.render("subServiceTpl", data);
					$('div#subServicePanel').html(htm);
					
					showLevelPanel(service_id, $this);
				}
			}
		});
	}
	
	function cancelApply($this){
		var sub_id = $this.attr('__id');
		//取消申请请求
		$.ajax({
			url: "./app/SearchService.do?method=cancelApply",
			type: "POST",
			data: {sub_id: sub_id},
			dataType: "JSON",
			success: function(result){
				if(result=='1'){
					layer.msg("取消申请成功", 1, 1, function(){
						location.reload();
					});
					/*layer.msg("取消申请成功", 1, 1);
					$this.html("申请");
					$this.removeAttr("__singleCancelApply");
					$this.attr("__singleApply", "true");
					$this.unbind('click');
					$this.click(function(){
						var $this = $(this);
						doApplyService($this);
					});*/
				}else{
					layer.msg("取消申请失败", 1, -1);
				}
			}
		});
	}
	 
	//点击申请按钮申请服务
	function showLevelPanel(service_id, $this){
		/*var dlg = $.layer({
			type : 1,
			title : "选择申请级别",
			btns: 2,
			offset:['150px' , ''],
			border : [1],
			area : ['720px','380px'],
			page : {dom : '#subServicePanel'},
			yes: function(index){
				doClickLevel(service_id, $this);
				layer.close(dlg);
			}
		});*/
		//不再需要确认申请级别
		doClickLevel(service_id, $this);
	}
	
	function doClickLevel(service_id, $this){
		layer.load('请求中', 1);
//		var levelid = $('input[name="level_id"]').val();
		var levelid = 1;
		$.ajax({
			url: "./app/services.do?method=subService",
			type: "POST",
			data: {
				'service_ids': service_id, 
				'app_id': app_id,
				'level_id': levelid
			},
			dataType: "JSON",
			success: function(result){
				layer.closeAll();
				if(result['code']=='1'){
					layer.msg("申请成功", 1, 1, function(){
						location.reload();
					});
					/*layer.msg("申请成功", 1, 1);
					$this.html("取消");
					$this.removeAttr("__singleApply"); $this.attr("__singleCancelApply", "true");
					$this.unbind('click');
					$this.click(function(){
						var $this = $(this);
						cancelApply($this);
					});*/
				}else{
					layer.msg("申请失败", 1, -1);
				}
			}
		});
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
		
		
		/*$('.search-input').bind('keypress', function(){
			if(event.keyCode == "13"){
				var val = $(this).val();
				if(val==''){
					layer.msg('请输入查询关键字', 2, -1);
				}
				else{
					$('form.search_form').submit();
				}
				
			}
		});
		$('.search-input').submit(function(){
			var val = $('.search-input').val();
			if(val==''){
				layer.msg('请输入查询关键字', 2, -1);
				return false;
			}
			return true;
		});*/
		
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
		
		//服务申请事件
		$('a[__singleApply="true"]').click(function(){
			var $this = $(this);
			doApplyService($this);
		});
		
		//取消服务申请
		$("a[__singleCancelApply=true]").click(function(){
			cancelApply($(this));
		});
		
		//单选取消申请
		
		/*var singleCancelApply = function(){
			$("a[__singleCancelApply=true]").click(function(){
				$this = $(this);
				var sub_id = $this.attr('__id');
				
				//取消申请请求
				$.ajax({
					url: "./app/services.do?method=cancelApply",
					type: "POST",
					data: {sub_id: sub_id},
					dataType: "JSON",
					success: function(result){
						if(result.code == 1 && result.data == 1){
							//替换按钮
							$this.html("申请");
							$this.removeAttr("__singleCancelApply");
							$this.attr("__singleApply", "true");
							//重新绑定事件
							singleApply();
						}else{
							layer.msg(result.msg);
						}
					}
				});
			});
		}
		singleCancelApply(); //绑定事件
		
		//单机申请按钮申请
		var singleApply = function(){
			$("a[__singleApply=true]").click(function(){
				$this = $(this);
				var service_id = $this.attr('__id');
				
				//取消申请请求
				$.ajax({
					url: "./app/services.do?method=subService",
					type: "POST",
					data: {service_ids: service_id, app_id: app_id},
					dataType: "JSON",
					success: function(result){
						if(result.code == 1 && result.data == 1){
							//替换按钮
							$this.html("取消");
							$this.removeAttr("__singleApply");
							$this.attr("__singleCancelApply", "true");
							
							//重新绑定事件
							singleCancelApply();
						}else{
							layer.msg(result.msg);
						}
					}
				});
			});
		}
		
		singleApply(); //绑定单机申请事件
		*/
		
		
	}
	
	
});