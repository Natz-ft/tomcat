define(function(require, exports, module){
	
	//初始化
	exports.init = function(){
		seajs.use("dev/open/apptag.js", function(){
			initTag();
		});
		
		/*seajs.use("lib/tag_suggest",function(){
			var tagsArr="";
			$.ajax({
				
				url: "./app.do?method=getAllTags",
				type: "POST",
				success: function(data){
					//tag_suggest标签
					tagsStr = data;
					tagsArr = data.split(",");
					 $('#app_tag').tagSuggest({
					       tags: tagsArr
					   });
					setTips("文旭","2001");
		  		}
			});
		});*/
		
		
		var wrapper = $A.service('wrapper').getWrapper('content-wrap');
		wrapper.loadWidget({
			id: 'showContent',
			tpl: {id: 'appInfoEditTpl'},
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
		}else{
			renderGroup(['0']);
		}
		//设置所有者
		initAppOwnerTpl(app);
		//设置用户类型
		initUserTypeTpl(app);
		
		//保存按钮
		$("#submitBtn").click(function(){
			
			var app_name = $.trim($("#app_alias").val());
			if(app_name == ""){
				layer.tips("应用名称不能为空", $("#app_alias"), 2);
				return;
			}
			var pattern= /^(\w|[\u4E00-\u9FA5]){1,15}$/;
			if(!pattern.test(app_name)){
				layer.tips("应用名称不合法", $("#app_alias"), 2);
				return;
			}
			var authArr = new Array();
			$("input:checked[name=auth_type]").each(function(){
				authArr.push($(this).val());
			});
			//获取分组id
			var group_ids = $("#groups_render select:last").children("option:selected").attr("__for");
			
			
			if(group_ids == 0){
				layer.tips("请选择应用分类", $("#groups_render select:last"), 2);
				return;
			}
			group_ids = group_ids.split(',');
			
			group_ids.shift();
			group_ids = group_ids.join(',');
			
			var app_alias = $("#app_alias").val();
			
			var auth_type = authArr.join(',');
			
			var callback_url = $("#callback_url").val();
			
			/*处理应用所有者*/
		    var app_owner = "";
		    var app_owner_name = "";
		    if($("#app_owner").length==1){
		    	var app_owner_ele = $("#app_owner");
		    	app_owner = $.trim(app_owner_ele.val());
		    	if(app_owner_ele.hasClass("valid")){
					if(app_owner == ""){
						var tip = app_owner_ele.attr("valid-tip")?app_owner_ele.attr("valid-tip"):"应用所有者不能为空";
						layer.tips(tip, $("#app_owner_input"), 2);
						return;
					}
		    	}
		    	
				app_owner_name = $.trim($("#app_owner_input").attr("tempValue"));
				if(app_owner_name == ""){
					app_owner_name = app_owner;
				}
		    }
			
		    /*处理标签*/
			$("input[name='app_tags']").val(getTipsId());
			$("input[name='app_tagnames']").val(getTips());
			/*标签处理结束*/
			
			/*获取用户类型*/
			var usertypeArr = new Array();
			$(".poplayer-tagBox-taglist li.select").each(function(){
				usertypeArr.push($(this).attr("data-tag"));
			});
			//是否校验必填
			/*if($("#usertype_render2").hasClass("valid")){
				if(usertypeArr.length == 0){
				  	layer.tips("请选择用户类型", $("#usertype_render2"), 2);
					return;
			  }
			}*/
			var usertype = usertypeArr.join(',');
			  
			  $.ajax({
				url: "app.do?method=updateAppInfo",
				type: "POST",
				data:{
					app_id: app_id,
					app_alias: app_alias, 
					app_groups: group_ids,
					app_owner:app_owner,
					app_owner_name:app_owner_name,
					usertype: usertype,
					auth_type: auth_type,
					dev_model:$("input[name='dev_model']:checked").val(),
					callback_url: callback_url,
					app_tags: $('input[name="app_tags"]').val(),
					app_tagnames: $('input[name="app_tagnames"]').val()
					},
				dataType: "JSON",
				success: function(result){
					if(result.code == 0){
						$("#app_alias_nav").html(result.data.app_alias);
						app = result.data;//更新app
						layer.msg(result.msg, 2, 1, function(){
							var request = $A.service('request');
							request.changeHash('#');
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
	
	function initAppOwnerTpl(app){
		//设置所有者
		if($("#appOwnerTpl").length==0){
			return;
		}
		var htm =template.render("appOwnerTpl", app);
	    $("#dl_app_owner").html(htm);
	    
	    seajs.use("dev/open/appowner.js", function(){
	    	initAppOwnerEvent();
		});
	}
	function initUserTypeTpl(app){
		//设置所有者
		if($("#userTypeTpl").length==0){
			return;
		}
		var htm =template.render("userTypeTpl", app);
	    $("#dl_user_type").html(htm);
	    
	    var loader = layer.load("加载中……");
		$.ajax({
			url: "appCreate.do?method=getUserTypeList",
			type: "GET",
			data: {},
			async: false,
			//dataType: "JSONP",
			//jsonp: "jsonp",
			//jsonpCallback: 
			dataType: "JSON",
			//使用默认的回调
			success: function(result){
				if(result.code == 1){
					var data = result.data;
					var html2 = "";
					for(var i=0; i<data.length; i++){
						var selected = false;
						if("user_types" in app){
							for(var j=0; j< app['user_types'].length; j++){
								if(data[i]['USER_TYPE'] == app['user_types'][j]){
									selected = true;
								}
							}
						}
						if(selected == false){
							html2 += "<li class='tag-trigger' onclick='selectTag(this)' data-tag='"+data[i]['USER_TYPE']+"' tag-name='"+data[i]['TYPE_NAME']+"'><span>"+data[i]['TYPE_NAME']+"<i>+</i></span></li>";
						}else{
							html2 += "<li class='select' data-tag='"+data[i]['USER_TYPE']+"' tag-name='"+data[i]['TYPE_NAME']+"'>"+ data[i]['TYPE_NAME'] + 
								"<a class='close' data-tag='"+data[i]['TYPE_NAME']+"' title='取消' href='javascript:;' onclick='removeTag(this)'><em>×</em></a>"
								+"</li>";
						}
					}
					
					$("#usertype_render2").html(html2);
					
					layer.close(loader);

				}else{
					layer.msg(result.msg, 2, 3);
				}
				
			},
			error: function(){
				layer.msg('网络不给力，请刷新再试……', 2, 3);
			}
		});
	}
	
	//数组去重
	function unique(arr) {
		  var ret = []
		  var hash = {}
		  for (var i = 0; i < arr.length; i++) {
		    var item = arr[i]
		    var key = typeof(item) + item
		    if (hash[key] !== 1) {
		      ret.push(item)
		      hash[key] = 1
		    }
		  }

		  return ret
		}
	
	function renderGroup(arr){
		var groupResult = initGroup(arr);
		var html = "";
		for(var i=0; i< groupResult.length; i++){
			html += "<select>";
			html += "<option value='0' __for='0'>请选择分类</option>";
			if(groupResult[i]&& typeof groupResult[i].length != 'undefined'){
				for(var j=0; j< groupResult[i].length; j++){
					if(groupResult[i][j]['selected']){
						html += "<option value='"+groupResult[i][j]['id']+"' __for='"+groupResult[i][j]['pids']+"' selected>"+groupResult[i][j]['name']+" </option>";
					}else{
						//后台获取的arr数据中id顺序和级别顺序可能不一致，所以判断的selected状态不一定正确。
						//2014.8.8临时处理：保留原来的处理，另外渲染select时需要再判断一遍是否在arr中，在其中则选中
						var selected = false;
						for(var k=0; k<arr.length; k++){
							if(groupResult[i][j]['id'] == arr[k]){
								selected = true;
							}
						}
						if(selected == true){
							html += "<option value='"+groupResult[i][j]['id']+"' __for='"+groupResult[i][j]['pids']+"' selected>"+groupResult[i][j]['name']+" </option>";
						}else{
							html += "<option value='"+groupResult[i][j]['id']+"' __for='"+groupResult[i][j]['pids']+"'>"+groupResult[i][j]['name']+" </option>";
						}
					}
				}
			}
			
			html += "</select>";
		}
		$("#groups_render").html(html);
		
		//绑定change事件
		$("#groups_render select").change(function(){
			$this = $(this);
			var forids = $this.children("option:selected").attr("__for");
			renderGroup(forids.split(","));
		});
	}
	
	
	
	//initGroup([0 ,0001, 1])
	function initGroup(gids){
		//后台获取的gids数据中id顺序和级别顺序可能不一致，所以判断的selected状态不一定正确。
		//2014.8.8临时处理：保留原来的处理，另外渲染select时需要再判断一遍是否在gids中，在其中则选中
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
		var resArrayIndex=-1;
		for(var i=0; i<gids.length; i++){
			if(groupsLevel[i].length > 0){
				resArrayIndex++;
				groupResult[resArrayIndex] = new Array();
				for(var j=0; j<groupsLevel[i].length; j++){
					var curGids = gids.slice(0, i+1);
					curGids.push(groupsLevel[i][j]['id']);
					if(groupsLevel[i][j]['id'] == gids[i+1]){
						groupResult[resArrayIndex].push({
							id: groupsLevel[i][j]['id'],
							name: groupsLevel[i][j]['name'],
							pids: curGids.join(','),
							selected: true
						});
					}else{
						groupResult[resArrayIndex].push({
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

function selectTag(a){
    var tagName=$(a).attr("tag-name");
	var htm=tagName+"<a class='close' data-tag='"+tagName+"' title='取消' href='javascript:;' onclick='removeTag(this)'><em>×</em></a>"
	$(a).attr("class","select");
	$(a).removeAttr("onclick");
	$(a).html(htm);
}
function removeTag(a){
	debugger;
	var tagName=$(a).parent().attr("tag-name");
	var htm="<span>"+tagName+"<i>+</i></span>";
	var $li=$(a).parent();
	$li.attr("class","tag-trigger");
	$li.html(htm);
	$li.attr("onclick","selectTag(this)");
	event.cancelBubble=true;	
}