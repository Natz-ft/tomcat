define(function(require, exports, module){
	exports.init = function(){
		var wrapper = $A.service('wrapper').getWrapper('content-wrap');
		wrapper.loadWidget({
			id: 'showContent',
			tpl: {id: 'appInnerCreateTpl'},
			data: {app: app},
			callback: bindEvents
		});
	}
	
	function bindEvents(){
		//绑定提交按钮事件
		$("#postBtn").click(function(){
			var app_type = "inner";
			var version_name = $("#version_name").val();
			var version_no = $("#version_no").val();
			var platform_type = 'inner';
			
			if(version_name == ""){
				layer.tips("版本名称不能为空", $("#version_name"), 2);
				return;
			}

			if(version_name.length>15){
				layer.tips("版本名称长度不能超过15个字符", $("#version_name"), 2);
				return;
			}

//			if(!(/^[0-9]*$/.test(version_no) && parseInt(version_no) > 0)){
//				layer.tips("版本号应为大于0的整数", $("#version_no"), 2);
//				return;
//			}
			var r = /^\d+(\.\d+)?$/;
			if(!r.test(version_no)){
				layer.tips("版本号应为整数或小数", $("#version_no"), 2);
				return;
			}
			var loader = layer.load("正在创建中……");
			$.ajax({
				url: "./app/versions.do?method=createVersion",
				type: "POST",
				data: {
					app_id: app_id,
					app_type: app_type,
					platform_type: platform_type,
					version_name: version_name,
					version_no: version_no
				},
				dataType: "JSON",
				success: function(result){
					if(result.code == 0){
						layer.msg(result.msg, 1, 1, function(){
							var request = $A.service('request');
							request.changeHash("#inner");
						});
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
				}
				
			});
			
		});
	}
});