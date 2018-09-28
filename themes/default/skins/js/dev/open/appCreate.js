define(function(require, exports, module){
	exports.init = function(){
		//默认渲染的分组
		renderGroup(['0']);
		
		// 初始化图标上传组件
		initIconUploader();
		
		require.async("dev/open/apptag.js", function(){
			initTag();
		});
		//获取用户类型
	//	renderUsertype();
		
		require.async("dev/open/appowner.js", function(){
			initAppOwnerEvent();
		});
		
		
		$("#appCreateBtn").click(function(){

			var app_name = $.trim($("#app_name").val());
			var pattern= /^(\w|[\u4E00-\u9FA5]){1,15}$/;
			if(app_name == ""){
				layer.tips("应用名称不能为空", $("#app_name"), 2);
				return;
			}
			if(!pattern.test(app_name)){
				layer.tips("应用名称不合法", $("#app_name"), 2);
				return;
			}
			//获取分组id
			var group_ids = $("#groups_render select:last").children("option:selected").attr("__for");
			
			if(group_ids == 0){
				layer.tips("请选择应用分类", $("#groups_render select:last"), 2);
				return;
			}
			group_ids = group_ids.split(',');
			
			group_ids.shift();
			group_ids = group_ids.join(',');
			
			//获取图片id
			var app_icon = $.trim($("#app_icon").val());
			if(app_icon == ""){
				layer.tips("应用图标不能为空",$(".up-pic-btn"),2);
				return;
			}
			
		    /*处理标签*/
		  $('input[name="app_tags"]').val(getTipsId());
		  $('input[name="app_tagnames"]').val(getTips());
		    
		    
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
			
			
		  /*获取用户类型*/
		  var usertypeArr = new Array();
		  $(".poplayer-tagBox-taglist li.select").each(function(){
			  usertypeArr.push($(this).attr("data-tag"));
		  });
		  //是否校验必填
		  if($("#usertype_render2").hasClass("valid")){
			  if(usertypeArr.length == 0){
				  	layer.tips("请选择用户类型", $("#usertype_render2"), 2);
					return;
			  }
		  }
			
		   var usertype = usertypeArr.join(',');
		  
		  
		   if(!$("input[name='agreement']").is(':checked')){
		   layer.tips("请接受平台协议", $("input[name='agreement']"), 2);
			   return;
		   }
		   
		   var appType=$("#app_type_type").val();
		   var description=$("#description").val();

		   /*获取用户类型结束*/
			var loader = layer.load("正在创建……");
			$.ajax({
				url: "appCreate.do?method=CreateAppProject",
				type: "POST",
				data: {
					app_name: app_name,
					group_id: group_ids,
					app_tags: $('input[name="app_tags"]').val(),
					app_tagnames: $('input[name="app_tagnames"]').val(),
					usertype: usertype,
					app_type: appType,
					description:description,
					app_icon:app_icon
				},
				dataType: "JSON",
				success: function(result){
					if(result.code == 1){
						layer.msg(result.msg, 1, 1, function(){
							if("mobile"==appType){
								window.location = "./app.htm?app_id="+result.data.key+"#mobile/create";
							}else if("inner"==appType){
								window.location = "./app.htm?app_id="+result.data.key+"#inner/create";
							}else if("outter"==appType){
								window.location = "./app.htm?app_id="+result.data.key+"#outter/create";
							}else{
								window.location = "./app.htm?app_id="+result.data.key;
							}
							
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
		
		
		//tag_suggest标签
		seajs.use("lib/tag_suggest",function(){
			var tagsArr = tagsStr.split(",");
			 $('#app_tag').tagSuggest({
			       tags: tagsArr
			   });
		});
		
		
		/**
		 * 上传图标
		 */
		function initIconUploader() {
			require("lib/swfupload/swfupload");
			require("lib/swfupload/plugins/swfupload.queue");
			require("lib/swfupload/handlers");
			require("lib/swfupload/fileprogress");

			var defaults  = {
					upload_url: rc_upload_url,
					file_post_name:'uploadfile',
					file_size_limit : "4096", // 4MB
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
					upload_success_handler : uploadIconsSuccess,
					upload_complete_handler : uploadComplete,

					// Button Settings
					button_placeholder_id : "upload_icon",
					button_width: 106,
					button_height: 33,
					button_text : "<span class='redText'>上传图片</span>",
		            button_text_style : ".redText { color: #FFFFFF;font-weight:bold; }",
					button_text_left_padding : 25,
		            button_text_top_padding : 7,
					button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
					button_cursor : SWFUpload.CURSOR.HAND,
					// Flash Settings
					flash_url : context_url + "../js/utils/swfupload/swfupload.swf",
					custom_settings : {
						showTarget: "show_icon",
						hiddenInput: "update_icon_result"
					},
					// Debug Settings
					debug: false
				};
			
			var swfUpload = new SWFUpload(defaults);
		}
		
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
	//渲染用户类型
	function renderUsertype(){
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
							html2 +="<li class='tag-trigger' onclick='selectTag(this)' data-tag='"+data[i]['USER_TYPE']+"' tag-name='"+data[i]['TYPE_NAME']+"'><span>"+data[i]['TYPE_NAME']+"<i>+</i></span></li>";
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

	//渲染类型分组
	function renderGroup(arr){
		var groupHtml = initGroup(arr);
		var html = "";
		for(var i=0; i<groupHtml.length; i++){
			html += "<select>";
				html+= groupHtml[i].join('');
			html += "</select>"
		}
		$("#groups_render").html(html);
		
		$("#groups_render select").change(function(){
			$this = $(this);
			var forids = $this.children("option:selected").attr("__for");
			renderGroup(forids.split(","));
		});
	}
	
	
	
	//initGroup([0 ,0001, 1])
	function initGroup(gids){
		var gids = gids || [];
		var groupsLevel = new Array();
		var groupHtml = new Array();
		
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
				groupHtml[i] = new Array();
				groupHtml[i].push("<option value='0' __for='0'>请选择</option>");
				for(var j=0; j<groupsLevel[i].length; j++){
					var curGids = gids.slice(0, i+1);
					curGids.push(groupsLevel[i][j]['id']);
					if(groupsLevel[i][j]['id'] == gids[i+1]){
						groupHtml[i].push("<option value='"+groupsLevel[i][j]['id']+"' __for='"+curGids.join(',')+"' selected>"+groupsLevel[i][j]['name']+"</option>");
					}else{
						groupHtml[i].push("<option value='"+groupsLevel[i][j]['id']+"' __for='"+curGids.join(',')+"'>"+groupsLevel[i][j]['name']+"</option>");
					}
				}
			}
			
		}
		return groupHtml;
	}
	//绑定事件
	
});
function selectTag(a){
    var tagName=$(a).attr("tag-name");
	var htm=tagName+"<a class='close' data-tag='"+tagName+"' title='取消' href='javascript:;' onclick='removeTag(this)'><em>×</em></a>"
	$(a).attr("class","select");
	$(a).removeAttr("onclick");
	$(a).html(htm);
}
function removeTag(a){
	var tagName=$(a).parent().attr("tag-name");
	var htm="<span>"+tagName+"<i>+</i></span>";
	var $li=$(a).parent();
	$li.attr("class","tag-trigger");
	$li.html(htm);
	$li.attr("onclick","selectTag(this)");
	event.cancelBubble=true;	
}