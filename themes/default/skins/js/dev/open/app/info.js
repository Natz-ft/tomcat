define(function(require, exports, module){
	var usertypes;
	//初始化
	exports.init = function(){
		go();
	}
	//初始化
	function go(){
		//应用的授权类型
		var userTypeNamesArr = new Array();
		if("user_types" in app){
			for(var i=0; i< app['user_types'].length; i++){
				for(var j=0; j<usertypes.length; j++){
					if(usertypes[j]['USER_TYPE'] == app['user_types'][i]){
						userTypeNamesArr.push(usertypes[j]['TYPE_NAME']);
					}
				}
			}
		}
		app['userTypeNames'] = userTypeNamesArr.join(',');
		var wrapper = $A.service('wrapper').getWrapper('content-wrap');
		wrapper.loadWidget({
			id: 'showContent',
			tpl: {id: 'appInfoTpl'},
			data: app,
			callback: bindEvents
		});
	}
	
	//页面渲染之后绑定事件
	function bindEvents(){
	
		//渲染分类id
		if('groupList' in app){
			var group_ids = new Array();
			for(var i=0; i<app.groupList.length; i++){
				if(app.groupList[i] != null){
					group_ids.push(app.groupList[i]['id']);
				}
			}
			group_ids.unshift('0');
			renderGroup(group_ids);
		}
		//设置所有者
		initAppOwnerTpl(app);
		//设置用户类型
		initUserTypeTpl(app);
		
		//删除按钮
		$("#delBtn").click(function(){
			$.ajax({
				url: "./app.do?method=checkAppCanDel",
				type: "POST",
				data: {app_id: app_id},
				dataType: "JSON",
				success: function(data){
					if(data.code == 1){
						layer.confirm("删除本应用后无法恢复，确定要删除吗？", function(){
							layer.load("正在删除……");
							$.ajax({
								url: "./app.do?method=deleteApp",
								type: "GET",
								data: {app_id: app_id},
								dataType: "JSON",
								success: function(result){
									if(result.code == 1){
										layer.msg(result.msg, 2, 1, function(){
											window.location = "./appList.htm";
										});
									}else {
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
						}, "删除确认");
					}else {
						layer.msg(data.msg, 2, 3);
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
		
		//重置密钥按钮
		$("#reset_secret_btn").click(function(){
			layer.confirm("重置将导致原token失效，导致相关服务均不可用，请慎用此功能。", function(){
				layer.load("正在重置……");
				$.ajax({
					url: "./app.do?method=resetKey",
					type: "GET",
					data: {app_id: app_id},
					dataType: "JSON",
					success: function(result){
						if(result.code == 0){
							app['client_secret'] = result.data;
							$("#app_secret_show").html(result.data);
							layer.msg("重置成功", 1, 1);
						}else{
							layer.msg("操作失败，请稍后重试", 2, 3);
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
			}, "重置AppSecret");
		
		});
		//应用统计按钮
		$("#appStatisticsBtn").click(function(){
			location.href = "./appStatistics.htm?app_id=" + app_id;
		});
		//应用统计按钮
		$("#serviceStatisticsBtn").click(function(){
			location.href = "./serviceStatistics.htm?app_id=" + app_id;
		});
	}
	
	function initAppOwnerTpl(app){
		//设置所有者
		if($("#appOwnerInfoTpl").length==0){
			return;
		}
		var htm =template.render("appOwnerInfoTpl", app);
	    $("#dl_app_owner_info").html(htm);
	}
	function initUserTypeTpl(app){
		//设置所有者
		if($("#userTypeInfoTpl").length==0){
			return;
		}
		var htm =template.render("userTypeInfoTpl", app);
	    $("#dl_user_type_info").html(htm);
	}
	
	function renderGroup(arr){

		var groupResult = initGroup(arr);
		var html = "";
		var tempArr = new Array();
		for(var i=0; i< groupResult.length; i++){
			//html += "<select>";
			//html += "<option value='0' __for='0'>请选择分类</option>";
			if(groupResult[i]&& typeof groupResult[i].length != 'undefined'){
				for(var j=0; j< groupResult[i].length; j++){
					if(groupResult[i][j]['selected']){
						//html += "<option value='"+groupResult[i][j]['id']+"' __for='"+groupResult[i][j]['pids']+"' selected>"+groupResult[i][j]['name']+" </option>";
						tempArr.push(groupResult[i][j]['name']);
					}else{
						//html += "<option value='"+groupResult[i][j]['id']+"' __for='"+groupResult[i][j]['pids']+"'>"+groupResult[i][j]['name']+" </option>";
						
						//后台获取的arr数据中id顺序和级别顺序可能不一致，所以判断的selected状态不一定正确。
						//2014.8.8临时处理：保留原来的处理，另外渲染select时需要再判断一遍是否在arr中，在其中则选中
						var selected = false;
						for(var k=0; k<arr.length; k++){
							if(groupResult[i][j]['id'] == arr[k]){
								selected = true;
							}
						}
						if(selected == true){
							tempArr.push(groupResult[i][j]['name']);
						}
					}
					
				}
			}
			
			//html += "</select>";
		}
		$("#groups_render").html(tempArr.join('、'));
		
		
	}
	
	
	
	//initGroup([0 ,0001, 1])
	function initGroup(gids){
		var gids = gids || [];
		var groupsLevel = new Array();
		var groupResult = new Array();
		
		for(var i=0; i<gids.length; i++){
			groupsLevel[i] = new Array();
			for(var j=0; j< groups.length; j++){
				if(groups[j]['pid'] == gids[i]){
					groupsLevel[i].push(groups[j]);
				}
			}
		}
		
		for(var i=0; i<gids.length; i++){
		
			if(groupsLevel[i].length > 0){
				groupResult[i] = new Array();
		
				for(var j=0; j<groupsLevel[i].length; j++){
					var curGids = gids.slice(0, i+1);
					curGids.push(groupsLevel[i][j]['id']);
					if(groupsLevel[i][j]['id'] == gids[i+1]){
						groupResult[i].push({
							id: groupsLevel[i][j]['id'],
							name: groupsLevel[i][j]['name'],
							pids: curGids.join(','),
							selected: true
						});
					}else{
						groupResult[i].push({
							id: groupsLevel[i][j]['id'],
							name: groupsLevel[i][j]['name'],
							pids: curGids.join(','),
							selected: false
						});
					}
				}
			}
			
		}
		//return groupHtml;
		return groupResult;
	}
	
	
});