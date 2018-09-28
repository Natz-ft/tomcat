define(function(require, exports, module){
	exports.init = function(){
		var wrapper = $A.service('wrapper').getWrapper('content-wrap');
		wrapper.loadWidget({
			id: 'showContent',
			tpl: {id: 'appGuide'},
			data: app,
			css: "../themes/skins/css-open/select-app-type.css",
			callback: bindEvents
		});
	}
	
	//页面渲染之后绑定事件
	function bindEvents(){
		$(".item").click(function(e){
			$(".item").removeClass("item-select");
			$(this).addClass("item-select");
			$("#app_type").val($(this).attr("apptype"));
			if($(this).attr("apptype")=="mobile"){
				$(".access-types").removeClass("hidden");
			}else if(!$(".access-types").hasClass("hidden")){
				$("input:radio[name='access_type']").attr("checked",false);
				$(".access-types").addClass("hidden");
			}
			$(".form-body input").removeAttr("disabled");  
			$("#disableBtn").hide();
			$("#postBtn").show();
		});
		//表单提交
		$("#postBtn").click(function(){
			var version_name = $("#version_name").val();
			var version_no = $("#version_no").val();
			var app_type=$("#app_type").val();
			var platform_type =app_type=="mobile"?$("input[name=access_type]:checked").val():undefined;
			
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
			
			var targetHash="#"+app_type;
			if(app_type=="website"){
				targetHash="#outter";
			}
			
			var loader = layer.load("正在创建中……");
			$.ajax({
				url: "./app/versions.do?method=createVersion",
				type: "POST",
				data: {
					app_id: app_id,
					app_type: app_type,
					version_name: version_name,
					version_no: version_no,
					platform_type:platform_type
				},
				dataType: "JSON",
				success: function(result){
					if(result.code == 1){
						layer.msg(result.msg, 1, 1, function(){
							var request = $A.service('request');
							request.changeHash(targetHash);
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