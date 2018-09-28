define(function(require, exports, module){
	exports.init = function(){
		requestService();
	}
	
	function requestService(){
		var request = $A.service('request');
		var keyword = request.getParameter('keyword');
		var index = request.getParameter('index');
		var type = request.getParameter('type');
		
		layer.load("搜索服务中", 1);
		
		$.ajax({
			url: "./app/searchService.do?method=searchServices",
			type: "GET",
			data: {'keyword': keyword, 'index': index, 'type': type, 'app_id': app_id},
			dataType: "JSON",
			success: function(result){
				if(result == null){
					result = {};
					result['data'] = new Array();
					result['count'] = '0';
					result['nowPage'] = '0';
					result['pageSize'] = '10';
				}
				renderServicePage(keyword, result);
				bindEvents();
				$('.search-input-wrap input[name="keyword"]').val(keyword);
				layer.closeAll();
			}
		});
	}
	
	function bindEvents(){
		$('.search-input').bind('keypress', function(){
			if(event.keyCode == "13"){
				var val = $(this).val();
				if(val==''){
					layer.msg('请输入查询关键字', 2, -1);
					return false;
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
		var dlg = $.layer({
			type : 1,
			title : "选择申请级别",
			btns: 2,
			offset:['150px' , ''],
			border : '1px',
			area : ['600px','380px'],
			page : {dom : '#subServicePanel'},
			yes: function(index){
				doClickLevel(service_id, $this);
				layer.close(dlg);
			}
		});
	}
	
	function doClickLevel(service_id, $this){
		layer.load('请求中', 1);
		var levelid = $('input[name="level_id"]').val();
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
	
	function getServicePage(keyword){
		location.hash="#searchService!type=applyed&keyword="+keyword;
	}
	
	function renderServicePage(keyword, result){
		var html = template.render('SearchServiceTpl', result);
		var $div = $('div#showContent');
		if($div.length <= 0){
			$('div#content-wrap').html('<div id="showContent"></div>');
		}
		$('div#showContent').html(html);
		var count = result['count']; count = parseInt(count);
		var nowPage = result['nowPage']; nowPage = parseInt(nowPage);
		var pageSize = result['pageSize']; pageSize = parseInt(pageSize);
		if(count > pageSize){
			require.async("lib/core", function(){
				//加载分页
				$("#paper").ui_paper({
					pagesize: pageSize,
					current: nowPage,
					count: count,
					url: '#searchService!type=applyed&keyword='+keyword,
				});
			});
		}
		else{
			$("#paper").hide();
		}	
	}
});