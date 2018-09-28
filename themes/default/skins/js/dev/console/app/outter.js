define(function(require, exports, module){ 
	var versionids;
	var curVersion;
	//计算当前的标志位 点亮标志位和通过标志位，提交审核按钮时使用
	//反正乱七八糟的东西
	var light_one;
	var light_two;
	var light_three;
	var light_four;
	
	exports.init = function(){
		var loader = layer.load("加载中……");
		var request = $A.service("request");
		var curVersionId = request.getParameter("version");
		
		//初始化
		versionids = new Array();
		//获取版本数据
		$.ajax({
			url: "./app/versions.do?method=getVersions",
			type: "GET",
			data: {app_id: app_id, app_type: "website", version: curVersionId},
			dataType: "JSON",
			cache: false,
			success: function(result){
				if(result.code == 1){
					layer.close(loader);
						
					curVersion = result.data.curVersion;
					
				
					//versionids.push(result.data.curVersion['feature_id']);
					if(result.data.curVersion['feature_id']){
						versionids.push(result.data.curVersion['feature_id']);
					}
					
					light_one = true;
					light_two = true;
					light_three = true;
					light_four = false;
					
					
					light_one = light_one && curVersion['version_name'] && curVersion['version_number'] && curVersion['app_url'];
					
				
					if('pic_info' in curVersion){
						light_two = curVersion['pic_info']['icon'] && curVersion['pic_info']['large_icon'] && curVersion['pic_info']['recommend'] && curVersion['pic_info']['preview'];
					}else{
						light_two = false;
					}
					
					light_three = light_three && curVersion['description'];
					
					if(curVersion['app_status'] == 0){
						curVersion['plevel'] = 1;
					}else if(curVersion['app_status'] == 1){
						curVersion['plevel'] = 2;
					}else if(curVersion['app_status'] == 2){
						curVersion['plevel'] = 4;
					}else if(curVersion['app_status'] == 3){
						curVersion['plevel'] = 1;
					}else if(curVersion['app_status'] == 4){
						curVersion['plevel'] = 1;
					}else if(curVersion['app_status'] == 5){
						curVersion['plevel'] = 3;
					}
					
					if(typeof curVersion['individual_information']!="undefined"){
						for(var i = 0,size=curVersion['individual_information'].length;i<size;i++){
							if(curVersion['individual_information'][i]['name']!=""&&curVersion['individual_information'][i]['description']!=null){
								light_four = true;
							}
						}
					}
					//
					var wrapper = $A.service('wrapper').getWrapper('content-wrap');
					wrapper.loadWidget({
						id: 'showContent',
						tpl: {id: 'appOutterTpl'},
						data: {
							list: result.data.versionList, 
							app: app, 
							curVersion: curVersion, 
							context_url: context_url,
							rcservice_url:rcservice_url,
							light_one: light_one,
							light_two: light_two,
							light_three: light_three,
							light_four: light_four,
							is_pm: is_pm
						},
						callback: bindEvents
					});
					
					
					//bindEvents();
					
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
	
	exports.destroy= function(){
		//销毁先前所有实例,若不销毁实例，导致资源过度占用报错
		if(typeof SWFUpload != 'undefined'){
			$.each(SWFUpload.instances, function(i, el){
				el.destroy();
			});
		}
	}
	
	
	function bindEvents(){
		//只对当前的版本生效
		require("lib/jquery-ui-1.8.20.custom.min");

		$(".version-title.current .btn-drop").html("[收&ensp;缩]");
		$(".version-title.current").siblings(".drop-detail").show();
		$(".version-title.current .btn-drop").click(function() {
			var dropDetail = $(this).parents(".version-title:first").siblings(".drop-detail");
			if(dropDetail.length == 0) return false;
			if(dropDetail.is(":hidden")) {
				$(this).html("[收&ensp;缩]");
			} else {
				$(this).html("[查&ensp;看]");
			}
			dropDetail.slideToggle();
		});
		
		String.prototype.isUrl = function(){
			var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
			+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
			+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
			+ "|" // 允许IP和DOMAIN（域名）
			+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
			+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
			+ "[a-z]{2,6})" // first level domain- .com or .museum
			+ "(:[0-9]{1,6})?" // 端口- :80
			+ "((/?)|" // a slash isn't required if there is no file name
			+ "(/[0-9a-z_A-Z!~*'().;?:@&=+$,%#-]+)+/?)$";
			var re = new RegExp(strRegex);
			return re.test(this);
	}

		//设置附加信息模块
		initIndividualInfoTpl();
		$(".drop-detail-cates").accordion({
			header: ".cate-head",
			autoHeight: false,
			create: function( event, ui ) {
				$target = $(event.target);
				var activeIndex = $target.accordion("option","active");
				//$target.find(".drop-detail-cate").eq(activeIndex).children(".cate-head").addClass("on");
			},
			changestart: function( event, ui ) {
				//ui.oldHeader.removeClass("on");
				//ui.newHeader.addClass("on");
			}
		});
		
		
		//根据当前的状态执行可编辑事件绑定
		//if(curVersion['app_status'] == 1 || curVersion['app_status'] == 2){
		//	disableEdit();
		//}else{
		//	ableEdit();
		//}	

		//绑定删除按钮事件
		$("a[__deleteVersionBtn=true]").click(function(){
			$this = $(this);
			var version_id = $this.attr("__version_id");
			
			layer.confirm("版本删除后不可恢复，要删除？", function(){
				layer.load("正在删除中……");
				$.ajax({
				url: "./app/versions.do?method=deleteVersion",
				type: "POST",
				data: {version_id: version_id},
				dataType: "JSON",
				success: function(result){
					if(result.code == 1){
						layer.msg(result.msg, 1, 1, function(){
							var request = $A.service("request");
							request.refreshHash();
						});
						//$("#version_"+version_id).remove();
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
			});}, "版本删除提示");;
			
		});
		//根据当前的状态执行可编辑事件绑定
		if(curVersion['plevel'] == 1){
			ableEdit();
		}else{
			disableEdit();
		}
		
		//设置打开方式
		if(typeof curVersion['website_app_open_type'] == "undefined"){
			curVersion['website_app_open_type']=0;
		}else{
			if(curVersion['website_app_open_type']!=0&&curVersion['website_app_open_type']!=1){
				curVersion['website_app_open_type']=0;
			}
		}
		$("input[name=website_app_open_type_"+curVersion['feature_id']+"][value="+curVersion['website_app_open_type']+"]").attr("checked",true);
		
		//设置开发模式
		if(typeof curVersion['dev_model'] == "undefined" || curVersion['dev_model'] == null){
			curVersion['dev_model']=app['dev_model'];
		}
		if(curVersion['dev_model']!=0&&curVersion['dev_model']!=1){
			curVersion['dev_model']=0;
		}
		$("input[name=dev_model_"+curVersion['feature_id']+"][value="+curVersion['dev_model']+"]").attr("checked",true);
		
	}
	
	function initIndividualInfoTpl(){
		//设置附加信息模块
		curVersion['light_four']= light_four;
		if($("#individualInfoTplforOutter").length==0){
			return;
		}
		var htm =template.render("individualInfoTplforOutter", curVersion);
	    $("#li_individual_info_"+curVersion['feature_id']).html(htm);
	}
	
	/*
	 * 切换到禁止编辑状态
	 */
	function disableEdit(){
		//禁用样式
		$("#form_body_" + curVersion['feature_id']).addClass('disabled');
		$("a.file-up-btn").click(function(){
			layer.tips("当前状态不允许编辑", this, 2);
		});
		//
		$(".disabled input").click(function(){
			layer.tips("当前状态不允许编辑", this, 2);
		});
		//禁用图片编辑
		$(".upload-img").click(function(){
			layer.tips("当前状态不允许编辑", this, 2);
		});
		
		//禁用版本删除按钮
		/*$("a[__deleteversionbtn=true]").click(function(){
			layer.tips("当前状态不允许编辑", this, 2);
		});*/
		//取消提交审核
		$("a[__cancelSubmitversionBtn=true]").click(function(){
			$this = $(this);
			var version_id = $this.attr("__version_id");
			
			$.ajax({
				url: "./app/versions.do?method=cancelSubmitVersion",
				type: "POST",
				data: {version_id: version_id},
				dataType: "JSON",
				success: function(result){
					if(result.code == 1){
						layer.msg(result.msg, 1, 1, function(){
							var request = $A.service("request");
							request.refreshHash();
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
		
		//绑定复制按钮事件
		$("a[__copyVersionBtn=true]").click(function(){
			
			$this = $(this);
			var individual_information = JSON.stringify(curVersion['individual_information']);
			curVersion['individual_information'] = individual_information;
			
			layer.confirm("版本复制后生成相同内容的新版本应用，要复制？", function(){
				layer.load("正在复制中……");
				curVersion['version_number']='';
				$.ajax({
				url: "./app/versions.do?method=copyVersion",
				type: "POST",
				data: curVersion,
				dataType: "JSON",
				success: function(result){
					if(result.code == 1){
						layer.msg(result.msg, 1, 1, function(){
							var request = $A.service("request");
							//request.changeHash("#mobile!"+Math.random());
							request.refreshHash();
						});
						//$("#version_"+version_id).remove();
					}else{
						layer.msg(result.msg, 2, 3, function(){
							var request = $A.service("request");
							//request.changeHash("#mobile!"+Math.random());
							request.refreshHash();
						});
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
			});}, "版本复制提示");
			
		});
		
		//禁用版本名
		$("#version_name_" + curVersion['feature_id']).attr("disabled", "disabled");
		//禁用版本号
		//$("#version_number_" + curVersion[''])
		$("#version_number_" + curVersion['feature_id']).attr("disabled", "disabled");
		
		//禁用应用地址
		$("#app_url_" + curVersion['feature_id']).attr("disabled", "disabled");
		
		//禁用升级说明
		$("#upgrade_instru_" + curVersion['feature_id']).attr("disabled", "disabled");
		
		//禁用描述文件
		$("#version_desc_" + curVersion['feature_id']).attr("disabled", "disabled");
		
		//禁用附加信息
		$("#ret-body-list-"+curVersion['feature_id']+" tr").find("td[id=name]").find('input').attr("disabled", "disabled");
		$("#ret-body-list-"+curVersion['feature_id']+" tr").find("td[id=description]").find('input').attr("disabled", "disabled");
		
		//禁用使用说明version_intruction_ac0e92611b7e404580c7e23166c399be
		$("#version_intruction_" + curVersion['feature_id']).attr("disabled", "disabled");
		//禁用常见问题version_intruction_ac0e92611b7e404580c7e23166c399be
		$("#version_problems_" + curVersion['feature_id']).attr("disabled", "disabled");
	}
	
	
	function ableEdit(){
		
		
		//绑定各个版本的提交按钮
		$("a[__submitInfoBtn=true]").click(function(){
			$this = $(this);
			var version_id = $this.attr("__version_id");
		
			var version_name = $("#version_name_"+version_id).val();
			var version_number = $("#version_number_"+version_id).val();
			var upgrade_instru = $("#upgrade_instru_" + version_id).val();
			var app_url = $("#app_url_"+version_id).val();
			var website_app_open_type = $("input[name=website_app_open_type_"+version_id+"]:checked").val();
			var dev_model = $("input[name=dev_model_"+version_id+"]:checked").val();
			
			var flag = 1;
			var trimReg = /^(\s*)|(\s*$)/g;
			var version_name_length = version_name.replace(trimReg,"").length;
			if(version_name_length  ==0 || version_name_length>15){
				$("#version_name_"+version_id).focus();
				layer.tips("版本名称长度在1-15个字符之间", $("#version_name_"+version_id), 2);
				flag = 0;
			}
			
			//添加名称验证
			var pattern_version_name = /^(\w|[\u4E00-\u9FA5]){1,20}$/;
			if(!pattern_version_name.test(version_name)){
				$("#version_name_"+version_id).focus();
				layer.tips("版本名称不合法", $("#version_name_"+version_id), 2);
				flag = 0;
			}
			//version_number = parseInt(version_number);
//			if(!(/^[0-9]{1,5}$/.test(version_number) && parseInt(version_number) > 0)){
//				$("#version_number_"+version_id).focus();
//				layer.tips("版本号应为大于0的整数且范围在1-99999", $("#version_number_"+version_id), 2);
//				flag = 0;
//			}
			var r = /^\d+(\.\d+)?$/;
			if(!r.test(version_number)){
				$("#version_number_"+version_id).focus();
				layer.tips("版本号应为整数或者小数", $("#version_number_"+version_id), 2);
				flag = 0;
			}
			
			//if(!app_url.isUrl() || "" == app_url){
			//	alert(!app_url.isUrl())
			//	alert("" == app_url)
			//	$("#app_url_"+version_id).focus();
			//	layer.tips("访问地址不能为空", $("#app_url_"+version_id), 2);
			//	flag = 0;
			//}
			
			if(upgrade_instru.length>500){
				$("#upgrade_instru_"+version_id).focus();
				layer.tips("升级说明描述内容过长", $("#upgrade_instru_"+version_id), 2);
				flag = 0;
			}
			
			if(!app_url){
				layer.tips("请填写地址", ("#app_url_" + version_id), 2);
				return;
			}
			
			var pattern= /^http:\/\//;
			var patterns= /^https:\/\//;
			if(!pattern.test(app_url) && !patterns.test(app_url)){
				layer.tips("请以http://或者https://开头", ("#app_url_" + version_id), 2);
				return;
			}
			
			var pattern= /^http:\/\/(.)+$/;
			var patterns= /^https:\/\/(.)+$/;
			if(!pattern.test(app_url) && !patterns.test(app_url)){
				layer.tips("请填写完整网站域名", ("#app_url_" + version_id), 2);
				return;
			}
			
			if(!flag) return;
			
			var dev_model = $("#dev_model_"+version_id).val();
		
			var loader = layer.load("保存中……");
			$.ajax({
				url: "./app/versions.do?method=updateVersionInfo",
				type: "POST",
				data: {
					version_id: version_id, 
					version_name: version_name, 
					version_number: version_number, 
					upgrade_instru: upgrade_instru,
					website_app_open_type:website_app_open_type,
					dev_model:dev_model,
					app_url: app_url,
					sso_url:app_url,
					validate_url:app_url
				},
				dataType: "JSON",
				success: function(result){
					if(result.code == 1){
						layer.msg(result.msg, 1, 1, function(){
							/*var request = $A.service("request");
							request.refreshHash();*/
							//调整为不刷新，然后自动打开下个tab
							var $dropDetailCate = $this.parents('.drop-detail-cate:first');
							$dropDetailCate.find('.cate-head').addClass('on');
							$dropDetailCate.next().find('.cate-head').click();
							light_one = true;
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
		
		//图标保存按钮
		$("a[__submitIconBtn=true]").click(function(){
			$this = $(this);
			var version_id = $this.attr("__version_id");
			
			//获取图标
			var little_con_arr = new Array();
			var large_con_arr = new Array();
			var advise_con_arr = new Array();
			var preview_con_arr = new Array();
			$("input[name=little_con_"+version_id+"]").each(function(){
				var thisval = $(this).val();
				if( thisval != ""){
					little_con_arr.push(thisval);
				}
			});
			
			$("input[name=large_con_"+version_id+"]").each(function(){
				var thisval = $(this).val();
				if(thisval != ""){
					large_con_arr.push(thisval);
				}
			});
			
			$("input[name=advise_con_"+version_id+"]").each(function(){
				var thisval = $(this).val();
				if(thisval != ""){
					advise_con_arr.push(thisval);
				}
			});
			
			$("input[name=preview_con_"+version_id+"]").each(function(){
				var thisval = $(this).val();
				if(thisval != ""){
					preview_con_arr.push(thisval);
				}
			});
			var postData = {};
			var flag1 = true;
			var flag2 = true;
			postData['version_id'] = version_id;
			if(little_con_arr.length > 0){
				postData['little_con'] = little_con_arr.join(',');
			}else{
				flag1 = false;
			}
			
			if(large_con_arr.length > 0){
				postData['large_con'] = large_con_arr.join(',');
			}else{
				flag2 = false;
			}
			
			if(advise_con_arr.length > 0){
				postData['advise_con'] = advise_con_arr.join(',');
			}else{
				flag1 = false;
			}
			
			if(preview_con_arr.length > 0){
				postData['preview_con'] = preview_con_arr.join(',');
			}else{
				flag2 = false;
			}
		    if(!flag1){
				layer.msg("请上传应用图标",1);
				return;
			}
			if(!flag2){
				layer.msg("请上传预览图片",1);
				return;
			}
			var loader = layer.load("保存中……");
			$.ajax({
				url: "./app/versions.do?method=updateVersionIcon",
				type: "POST",
				data: postData,
				dataType: "JSON",
				success: function(result){
					if(result.code == 1){
						layer.msg(result.msg, 1, 1, function(){
							var $dropDetailCate = $this.parents('.drop-detail-cate:first');
							$dropDetailCate.find('.cate-head').addClass('on');
							$dropDetailCate.next().find('.cate-head').click();
							light_two = true;
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
			
		});//保存图片结束
		
		
		//绑定各个版本的提交按钮
		$("a[__submitDetailBtn=true]").click(function(){
			
			$this = $(this);
			var version_id = $this.attr("__version_id");
		
			var version_desc = $("#version_desc_"+version_id).val();
			
			if(UE){
				var version_intruction = "";
				if($("#version_intruction_"+version_id).length==1){
					version_intruction = UE.getEditor('version_intruction_'+version_id).getContent();
				}
				var version_problems = "";
				if($("#version_problems_"+version_id).length==1){
					version_problems = UE.getEditor('version_problems_'+version_id).getContent();
				}
			}
			
			 function trim(str){ //删除左右两端的空格
			　　     return str.replace(/(^\s*)|(\s*$)/g, "");
			　　 }
			
			var flag = 1;
			if(trim(version_desc) == ""){
				$("#version_desc_"+version_id).focus();
				layer.tips("请填写应用描述", $("#version_desc_"+version_id),2);
				flag = 0;
			}
			if(version_desc.length>500){
				$("#version_desc_"+version_id).focus();
				layer.tips("应用描述不能超过500个字符", $("#version_desc_"+version_id),2);
				flag = 0;
			}
			
			if(!flag) return;
		
			var loader = layer.load("保存中……");
			$.ajax({
				url: "./app/versions.do?method=updateVersionDetail",
				type: "POST",
				data: {
					version_id: version_id,
					version_desc: version_desc,
					version_intruction : version_intruction.length>0 ? version_intruction : "",
					version_problems : version_problems.length>0 ? version_problems : ""
						},
				dataType: "JSON",
				success: function(result){
					if(result.code == 1){
						layer.msg(result.msg, 1, 1, function(){
							var $dropDetailCate = $this.parents('.drop-detail-cate:first');
							$dropDetailCate.find('.cate-head').addClass('on');
							$dropDetailCate.next().find('.cate-head').click();
							light_three = true;
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
		
		//绑定提交审核按钮
		$("a[__submitversionBtn=true]").click(function(){
			$this = $(this);
			var version_id = $this.attr("__version_id");
			
			if(!light_one){
				layer.msg("请先保存应用的基本信息",2,function(){
					$("#version_"+version_id+" .drop-detail-cate-basic").find('.cate-head').click();
				})
				return;
			}
			
			if(!light_two){
				layer.msg("请先保存应用的图片信息",2,function(){
					$("#version_"+version_id+" .drop-detail-cate-pic").find('.cate-head').click();
				})
				return;
			}
			
			if(!light_three){
				layer.msg("请先保存应用的详细信息",2,function(){
					$("#version_"+version_id+" .drop-detail-cate-detail").find('.cate-head').click();
				})
				return;
			}
			$.ajax({
				url: "./app/versions.do?method=submitVersion",
				type: "POST",
				data: {version_id: version_id},
				dataType: "JSON",
				success: function(result){
					if(result.code == 1){
						layer.msg(result.msg, 1, 1, function(){
							var request = $A.service("request");
							request.refreshHash();
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
		
		//禁用版本复制按钮
		$("a[__copyVersionBtn=true]").click(function(){
			layer.tips("当前状态不允许复制版本", this, 2);
		});
		
		//绑定图片删除按钮
		$("a[__upload_img_delete=true]").click(function(){
			$this = $(this);
			
			//获取版本号
			var version_id = $this.attr("__version_id");
			//图标的类型,图标并不一定保存到数据库中
			var type = $this.attr("__fortype");
			
			var forimg = $this.attr("__forimg");
			
			//要删除图片的路径
			var imgpath = $("#"+forimg).val();
			
			if(imgpath == ""){
				return;
			}
			//要改变状态的 上传box
			var uploadBox = $this.attr("__forbox");
			
			//ajax删除图片
			$.ajax({
				url: "./app/versions.do?method=deletePic",
				type: "POST",
				data: {version_id: version_id, type: type, path: imgpath},
				dataType: "JSON",
				success: function(result){
					if(result.code == 1){
						//改变上传box的状态，准备下次上传
						$("#"+uploadBox).removeClass("upload-done").addClass("upload-before");
						//将文件路径隐藏域附空
						$("#"+forimg).val("");
					}else{
						
						layer.msg("图片删除失败", 1, 2);	
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
		
		//组装开发者输入的附加信息
		var buildIndividualInfo = function(feature_id){
			var flag = true;
			var individualInfo = new Array();
			$("#ret-body-list-"+feature_id+" tr").each(function(index, item){
				var map = {};
				map['name'] = $(this).find("td[id=name]").find('input').val();
				map['description'] = $(this).find("td[id=description]").find('input').val();
				if((map['name'] == ""&&map['description']!= "" )||(map['name'] != ""&&map['description']== "" )){
					$("#version_desc_"+feature_id).focus();
					layer.tips("请填写完整的附加字段描述", $(this), 2);
					flag = false;
				}
				individualInfo.push(map);
			});
			var ret = JSON.stringify(individualInfo);
			$('input[name="individualInfo_'+feature_id+'"]').val(ret);
			return flag;
		}
		
		
	  //绑定各个版本的提交按钮
		$("a[__submitIndividualBtn=true]").click(function(){
			
			$this = $(this);
			var version_id = $this.attr("__version_id");
		
			if(buildIndividualInfo(version_id)==false){
				return;
			}
			var individual_information = $('input[name="individualInfo_'+version_id+'"]').val();
		
			var loader = layer.load("保存中……");
			$.ajax({
				url: "./app/versions.do?method=updateVersionIndividual",
				type: "POST",
				data: {
					version_id: version_id,
					individual_information:individual_information
					},
				dataType: "JSON",
				success: function(result){
					if(result.code == 1){
						layer.msg(result.msg, 1, 1, function(){
							var request = $A.service("request");
							request.refreshHash();
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
		
		if(versionids.length > 0){
			setUpload();
			setUeditor();//初始化ueditor
		}
	}
	

	function setUpload(){
		if(typeof upload_type !== "undefined" && upload_type == 'rc'){
			setUpload_rc();
		}else{
			setUpload_local();
		}
	}
	function setUpload_local(){

		require("lib/swfupload/swfupload");
		require("lib/swfupload/plugins/swfupload.queue");
		require("lib/swfupload/handlers");
		require("lib/swfupload/fileprogress");

		var defaults = {
				// Backend Settings
				upload_url: "./app/versions.do?method=SetLittleIcon&version_id=78d53f75b9a34c58b39ae5ceae5853d6",
				//post_params: {version_id: "78d53f75b9a34c58b39ae5ceae5853d6"},

				// File Upload Settings
				file_size_limit : "102400",	// 100MB
				file_types : "*.*",
				file_types_description : "All Files",
				file_upload_limit : "0",
				file_queue_limit : "1",
				
				prevent_swf_caching: false,

				// Event Handler Settings (all my handlers are in the Handler.js file)
				file_dialog_start_handler : fileDialogStart,
				file_queued_handler : fileQueued,
				file_queue_error_handler : fileQueueError,
				file_dialog_complete_handler : fileDialogComplete,
				upload_start_handler : uploadStart,
				upload_progress_handler : uploadProgress,
				upload_error_handler : uploadError,
				upload_success_handler : uploadSuccess,
				upload_complete_handler : uploadComplete,

				// Button Settings
				button_image_url : "",
				button_placeholder_id : "uploadc",
				button_width: 64,
				button_height: 64,
				button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
				button_cursor : SWFUpload.CURSOR.HAND,
				
				// Flash Settings
				flash_url : context_url + "js/util/swfupload/swfupload.swf",
				

				custom_settings : {
					//progressTarget : "progress_78d53f75b9a34c58b39ae5ceae5853d6",
					//showTarget: "show_78d53f75b9a34c58b39ae5ceae5853d6",
					//cancelButtonId : "btnCancel1"
				},
				
				// Debug Settings
				debug: false
			}
			
			var swfUploads = new Array();
			for(var i in versionids){
				swfUploads[versionids[i]] = new Array(); 
				
				
				var littleSetting = {
					upload_url: "./app/versions.do?method=uploadPic",
					file_size_limit : "20KB",
					button_placeholder_id : "upload_little_btn_" + versionids[i],
					button_width: 64,
					button_height: 64,
					file_types : "*.PNG;*.JPG",
					custom_settings : {
						progressTarget : "upload_little_percent_" + versionids[i],
						showTarget: "upload_little_img_box_" + versionids[i],
						statusTarget: "upload_little_status_" + versionids[i],
						hiddenInput: "upload_little_img_value_" + versionids[i]
						//cancelButtonId : "btnCancel1"
					}
				};
							
				swfUploads[versionids[i]]['little'] = new SWFUpload($.extend({}, defaults, littleSetting));
				
				
				var largeSetting = {
					upload_url: "./app/versions.do?method=uploadPic",
					file_size_limit : "20KB",
					button_placeholder_id : "upload_large_btn_" + versionids[i],
					button_width: 64,
					button_height: 64,
					file_types : "*.PNG;*.JPG",
					custom_settings : {
						progressTarget : "upload_large_percent_" + versionids[i],
						showTarget: "upload_large_img_box_" + versionids[i],
						statusTarget: "upload_large_status_" + versionids[i],
						hiddenInput: "upload_large_img_value_" + versionids[i]
						//cancelButtonId : "btnCancel1"
					}
				};
				
				swfUploads[versionids[i]]['large'] = new SWFUpload($.extend({}, defaults, largeSetting));
				
				var adviseSetting = {
					upload_url: "./app/versions.do?method=uploadPic",
					file_size_limit : "20KB",
					button_placeholder_id : "upload_advise_btn_" + versionids[i],
					button_width: 64,
					button_height: 64,
					file_types : "*.PNG;*.JPG",
					custom_settings : {
						progressTarget : "upload_advise_percent_" + versionids[i],
						showTarget: "upload_advise_img_box_" + versionids[i],
						statusTarget: "upload_advise_status_" + versionids[i],
						hiddenInput: "upload_advise_img_value_" + versionids[i]
						//cancelButtonId : "btnCancel1"
					}
				};
				
				swfUploads[versionids[i]]['advise'] = new SWFUpload($.extend({}, defaults, adviseSetting));
				
				
				for(var j=0; j<5; j++){
					var previewSetting = {
						upload_url: "./app/versions.do?method=uploadPic",
						file_size_limit : "50KB",
						button_placeholder_id : "upload_preview_btn_" + versionids[i] + "_" + j,
						button_width: 64,
						button_height: 64,
						file_types : "*.PNG;*.JPG",
						custom_settings : {
							progressTarget : "upload_preview_percent_" + versionids[i] + "_" + j,
							showTarget: "upload_preview_img_box_" + versionids[i] + "_" + j,
							statusTarget: "upload_preview_status_" + versionids[i] + "_" + j,
							hiddenInput: "upload_preview_img_value_" + versionids[i] + "_" + j
							//cancelButtonId : "btnCancel1"
						}
					};
					swfUploads[versionids[i]]['preview'] = new Array();
					swfUploads[versionids[i]]['preview'][j] = new SWFUpload($.extend({}, defaults, previewSetting));
				}
				
			}
			
	}

	function setUpload_rc(){
			require("lib/swfupload/swfupload");
			require("lib/swfupload/plugins/swfupload.queue");
			require("lib/swfupload/handlers");
			require("lib/swfupload/fileprogress");

			var defaults  = {
					// Backend Settings
					upload_url: rc_upload_url,//"./app/versions.do?method=SetLittleIcon&version_id=78d53f75b9a34c58b39ae5ceae5853d6",
					//post_params: {version_id: "78d53f75b9a34c58b39ae5ceae5853d6"},
					file_post_name:'uploadfile',
					// File Upload Settings
					file_size_limit : "4096",	// 2MB
					file_types : "*.jpg;*.png;*.jpeg;*.gif",
					file_types_description : "All Files",
					file_upload_limit : "0",
					file_queue_limit : "1",
					
					post_params: {
						uid : uid,
						type : "doc",
						folder_name : "appPics",
						update_uid : uid
							},
					
					prevent_swf_caching: false,

					// Event Handler Settings (all my handlers are in the Handler.js file)
					file_dialog_start_handler : fileDialogStart,
					file_queued_handler : fileQueued,
					file_queue_error_handler : fileQueueError,
					file_dialog_complete_handler : fileDialogComplete,
					upload_start_handler : uploadStart,
					upload_progress_handler : uploadProgress,
					upload_error_handler : uploadError,
					upload_success_handler : uploadSuccess,
					upload_complete_handler : uploadComplete,

					// Button Settings
					button_image_url : "",
					button_placeholder_id : "uploadc",
					button_width: 64,
					button_height: 64,
					button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
					button_cursor : SWFUpload.CURSOR.HAND,
					
					// Flash Settings
					flash_url : context_url + "js/util/swfupload/swfupload.swf",
					

					custom_settings : {
						//progressTarget : "progress_78d53f75b9a34c58b39ae5ceae5853d6",
						//showTarget: "show_78d53f75b9a34c58b39ae5ceae5853d6",
						//cancelButtonId : "btnCancel1"
					},
					
					// Debug Settings
					debug: false
				}
				
				var swfUploads = new Array();
				for(var i in versionids){
					swfUploads[versionids[i]] = new Array(); 
						var iconsSetting = {
								//upload_url: "./app/versions.do?method=uploadPic",
								button_placeholder_id : "upload_icons_btn_" + versionids[i],
								button_width: 106,
								button_height: 33,
								button_text : "<span class='redText'>上传图片</span>",
					            button_text_style : ".redText { color: #FFFFFF;font-weight:bold; }",
								button_text_left_padding : 25,
					            button_text_top_padding : 7,
								custom_settings : {
									showTarget: "show_icons_" + versionids[i],
									hiddenInput: "hiddenInput_" + versionids[i]
								},
								upload_success_handler : uploadIconsSuccess
							};
						swfUploads[versionids[i]]['icons'] = new SWFUpload($.extend({}, defaults, iconsSetting));
						
					for(var j=0; j<5; j++){
						var previewSetting = {
							//upload_url: "./app/versions.do?method=uploadPic",
							button_placeholder_id : "upload_preview_btn_" + versionids[i] + "_" + j,
							button_width: 64,
							button_height: 64,
							
							custom_settings : {
								progressTarget : "upload_preview_percent_" + versionids[i] + "_" + j,
								showTarget: "upload_preview_img_box_" + versionids[i] + "_" + j,
								statusTarget: "upload_preview_status_" + versionids[i] + "_" + j,
								hiddenInput: "upload_preview_img_value_" + versionids[i] + "_" + j
								//cancelButtonId : "btnCancel1"
							}
						};
						swfUploads[versionids[i]]['preview'] = new Array();
						swfUploads[versionids[i]]['preview'][j] = new SWFUpload($.extend({}, defaults, previewSetting));
					}
					
				}
		}


	
	function setUeditor(){
		require("lib/ueditor/ueditor.config.strategy");
		require("lib/ueditor/ueditor.parse");
		require("lib/ueditor/ueditor.all.min");
		//var uEditors = [];
		for(var i in versionids){
			//uEditors[versionids[i]] = new Array();
			if($("#version_intruction_"+versionids[i]).length==1){
				var editor_intruction = new UE.ui.Editor();
				editor_intruction.render("version_intruction_"+versionids[i]);
			}
			if($("#version_problems_"+versionids[i]).length==1){
				var editor_problems = new UE.ui.Editor();
				editor_problems.render("version_problems_"+versionids[i]);
			}
		}
	}

});