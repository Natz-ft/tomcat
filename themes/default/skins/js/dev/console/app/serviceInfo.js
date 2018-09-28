	define(function(require, exports, module){
	exports.init =function(){
		requestServiceInfo();
	};
	
	function requestServiceInfo(){
		var request = $A.service('request');
		var service_id = request.getParameter("service_id");
		var panel = layer.load('加载服务详情', 1);
		$.ajax({
			url:"./serviceInfo.do?method=getServiceInfo",
			type:"POST",
			data:{"service_id":service_id},
			dataType:"JSON",
			success:function(result){
				//console.log(result);
					layer.close(panel);
					var data = {'data' : result};
					var wrapper = $A.service('wrapper').getWrapper('content-wrap');
					wrapper.loadWidget({
						id:'showContent',
						tpl:{id:'serviceInfoTpl'},
						data: data,
						callback:bindEvents
					});
				}
		});
	}
	
	function bindEvents(){
		
	}
});
	