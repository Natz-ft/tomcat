;(function(){
	define(function(require, exports, module){
		
		require("lib/jquery.validate.ext.js");
		require("lib/dialog.js");

		//初始化

		exports.init = function(){
			var loader = layer.load("加载中……");
			//获取应用申请服务信息
			var data;
			if(typeof app_id == "undefined" || app_id==null || app_id == ""){
				data = {};
			}else{
				data = {app_id: app_id};
			}
			$.ajax({
				url: "./AppWidgets.do?method=GetAppWidgetGroups",
				type: "GET",
				data: data,
				dataType: "JSON",
				success: function(result){
						var wrapper = $A.service('wrapper').getWrapper('content-wrap');
						wrapper.loadWidget({
							id: 'showContent',
							tpl: {id: 'createWidgetTpl'},
							data: {groups:result.groups,data:result.curApp,sites:result.sites,userType:result.userTypes},
							callback: bindEvents
						});
						
						layer.close(loader);
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
		
		//页面渲染之后绑定事件
		function bindEvents(){
			
			$("input[name=tpl_width]").change(function(){
				var value = $(this).val();
				$("#widget_tpl_content").css("width",80*value+"px");
			});
			$("input[name=tpl_height]").change(function(){
				var value = $(this).val();
				$("#widget_tpl_content").css("height",80*value+"px");
			});
			$("input[name=tpl_title]").change(function(){
				var value = $(this).val();
				if(value == 1){
			   		$("#widget_tpl_title").css("display","block");
				  }else{
				   	$("#widget_tpl_title").css("display","none");
				  }
			});
			$("textarea[name=widget_description]").change(function(){
				var des_num = $("#widget_description").val().length;
				if(500-des_num>0){
					$("#strconunt").html(500-des_num);
				}else{
					$("#strconunt").html(0);
				}
			});
			
			$(function() {
				$("#app_addwidget_form").validate({
					rules: {
						widget_title: {
							required: true,
							string: true,
							maxlength: 10
						},

						widget_url: {
							required: true,
							url: true
						},
						menu_action:{
							url: true
						},
						widget_description: {
							maxlength: 500
						}
					},
					messages: {
						widget_title: {
							required: "请输入插件的标题",
							string: "只能输入中英文、数字或下划线",
							maxlength: "不能超过10个字"
						},
						widget_url: {
							required: "请输入插件的调用地址",
							url: "请输入符合URL地址格式的字符串"
						},
						menu_action:{
							url:"请输入符合URL地址格式的字符串"
						},
						widget_description: {
							maxlength: "不能超过500个字"
						}
					}
				});
				setUpload();
			});
			
			function getWidgetW(){
				var intHot;
				var temp = document.getElementsByName("tpl_width");
				for(var i=0;i<temp.length;i++)
				{
				   if(temp[i].checked)
					   intHot  = temp[i].value;
				}
				return intHot;
			}
			function getWidgetH(){
				var intHot;
				var temp = document.getElementsByName("tpl_height");
				for(var i=0;i<temp.length;i++)
				{
				   if(temp[i].checked)
					   intHot  = temp[i].value;
				}
				return intHot;
			}
			function getWidgetT(){
				var intHot;
				var temp = document.getElementsByName("tpl_title");
				for(var i=0;i<temp.length;i++)
				{
				   if(temp[i].checked)
					   intHot  = temp[i].value;
				}
				return intHot;
			}
			$("#addwidget_form").bind("click",function(){
				var form_id = $(this).attr("form_id");
				var valid = $("#"+form_id).valid();
				//var valid=true;
				data={
					app_id:$("#app_id").val(),
					widget_title:$("#widget_title").val(),
					widget_url:$("#widget_url").val(),
					widget_description : $("#widget_description").val(),
					des_img:$("#upload_little_img_value").val(),
					menu_action:$("#menu_action").val(),
					group:$("#group").val(),
					widget_role:$("#widget_role2").val(),
					widget_site : $("#widget_site2").val(),
					widget_width:getWidgetW(),
					widget_height:getWidgetH(),
					widget_title2:getWidgetT()
				};
				 if(valid) {
					  $.ajax({
						url:"./AppWidgets.do?method=AddAppWidget",
						data:data,
						type:"POST",
						dataType:"json",
						success:function(data){
							if(data==null || data.success==null){
								dialog.error("数据保存失败");
							}else{
								if(data.success==1){
									dialog.success(data.info,function(){
						    			window.location.href = "#widgetList";
						         	});
								}else{
									dialog.error(data.info);
								}
							}
						},
						error:function(data){
							dialog.error("保存失败");
						}
					});
				} 
				
			});
			$(function() {
				//用户权限选择
				var win = $('#roles-list'),role_input = $('#widget_role'),role_input2 = $('#widget_role2'),$body=$('body');
				role_input.on('click',showTagWin);
				win.find('.dropdown-close:first').on('click',hideTagWin);

				function showTagWin(){
					win.show();
					$body.on('click.tagwin',function(e){
						var target = e.target;
						if(target == role_input[0] || target == win[0] || $.contains(win[0],target)){
							return false;
						} else {
							hideTagWin();
							$body.off('click.tagwin');
						}
					});
				}
				function hideTagWin(){
					win.hide();
				}
			 	//初始化标签栏
				var tag_init_val = role_input2.val().split(',');
				//role_input2.attr('num',tag_init_val.length-1);
				
				win.find('ul li span.tag-body a').on('click',function(e){
					var target = e.target,tagv,num;
					tagv = target.getAttribute('tagv');
					tagv2 = target.getAttribute('tagv2');
				//	num = parseInt(role_input2.attr('num'));
					if(role_input2.val().indexOf(tagv)>-1){
						return false;
					}else {
						role_input2.val(role_input2.val()+tagv+',');
						//role_input2.attr('num',num+1);
						var s = '<span href="javascript:void(0)" class="tag-item" tagv="'+tagv+'">'+tagv2+'<a href="javascript:void(0)" class="tag-close"></a></span>';
						role_input.append(s);
					}
				});
				role_input.find('.tag-item a.tag-close').live('click',function(e){
					//var num = parseInt(role_input2.attr('num'));
					var par = $(e.target.parentNode);
					 if(parseInt(role_input2.attr('num'))<=1) {
						 dialog.error("至少选择一个用户权限");
						  return;
					} 
					//role_input2.attr('num',num-1);
					var vl = role_input2.val(),tagv=par.attr("tagv");
					var i = vl.split(tagv+',');
					if(i.length==2){
						//长度一直都是2
						tagv = i[0]+i[1];
					} else {
						tagv = i[0];
					}
					role_input2.val(tagv);
					par.remove();
				});
				
			});
			/*$(function($){
				//区域选择
				var win = $('#sites-list'),site_input = $('#widget_site'),site_input2 = $('#widget_site2'),$body=$('body');
				site_input.on('click',showTagWin);
				win.find('.dropdown-close:first').on('click',hideTagWin);
				
				function showTagWin(){
					win.show();
					$body.on('click.tagwin',function(e){
						var target = e.target;
						if(target == site_input[0] || target == win[0] || $.contains(win[0],target)){
							return false;
						} else {
							hideTagWin();
							$body.off('click.tagwin');
						}
					});
				}
				function hideTagWin(){
					win.hide();
				}
				 //初始化标签栏
				var tag_init_val = site_input2.val().split(',');
				//site_input2.attr('num',tag_init_val.length-1);
				
				win.find('ul li span.tag-body a').on('click',function(e){
					var target = e.target,tagv,num;
					tagv = target.getAttribute('tagv');
					tagv2 = target.getAttribute('tagv2');
					//num = parseInt(site_input2.attr('num'));
					if(site_input2.val().indexOf(tagv)>-1  || num>=3 ){
						return false;
					}else {
						site_input2.val(site_input2.val()+tagv+',');
						//site_input2.attr('num',num+1);
						var s = '<span href="javascript:void(0)" class="tag-item" tagv="'+tagv+'">'+tagv2+'<a href="javascript:void(0)" class="tag-close"></a></span>';
						site_input.append(s);
					}
				});
				site_input.find('.tag-item a.tag-close').live('click',function(e){
					//var num = parseInt(site_input2.attr('num'));
					var par = $(e.target.parentNode);
					 if(parseInt(site_input2.attr('num'))<=1) {
						 dialog.error("至少选择一个用户权限");
						  return;
					} 
					//site_input2.attr('num',num-1);
					var vl = site_input2.val(),tagv=par.attr("tagv");
					var i = vl.split(tagv+',');
					if(i.length==2){
						//长度一直都是2
						tagv = i[0]+i[1];
					} else {
						tagv = i[0];
					}
					site_input2.val(tagv);
					par.remove();
				});
			});*/
			
			//图片上传
			function setUpload(){
				//加载相关上传插件
				require("lib/swfupload/swfupload");
				require("lib/swfupload/plugins/swfupload.queue");
				require("lib/swfupload/handlers");
				require("lib/swfupload/fileprogress");
				
				var swfUploads = "";

				var defaults = {
						// Backend Settings
						upload_url: rc_upload_url,//"http://rcservice.iop.com/upload",
						file_post_name:'uploadfile',
						// File Upload Settings
						file_size_limit : "10240",	// 10MB
						file_types : "*.jpg;*.png;*.gif;*.jpeg",
						file_types_description : "All Files",
						file_upload_limit : "0",
						file_queue_limit : "1",
						
						post_params: {
							uid : uid,
							type : "doc",
							folder_name : "appWidgetPics",
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
						},
						
						// Debug Settings
						debug: false
					}
					
					
					/*
					 * 单个页面使用太多swfupload实例，容易早场callstack error。 后期考虑改成iframe新建二级页面上传
					 */
					
						
						var littleSetting = {
							//upload_url: "./app/versions.do?method=uploadPic",
							button_placeholder_id : "upload_btn",
							button_width: 64,
							button_height: 64,
							custom_settings : {
								progressTarget : "upload_little_percent",
								showTarget: "upload_little_img_box",
								statusTarget: "upload_little_status",
								hiddenInput: "upload_little_img_value"
							}
						};
						swfUploads = new SWFUpload($.extend({}, defaults, littleSetting));
						
			}
			//绑定图片删除按钮
			$("a[__upload_img_delete=true]").click(function(){
				$this = $(this);
				
				//图标并不一定保存到数据库中
				var forimg = $this.attr("__forimg");
				
				var widget_id = $this.attr("__widget_id");
				//要删除图片的路径
				var imgpath = $("#"+forimg).val();
				
				if(imgpath == ""){
					return;
				}
				//要改变状态的 上传box
				var uploadBox = $this.attr("__forbox");
				if(widget_id!=""){
					//ajax删除图片
					$.ajax({
						url: "./app/versions.do?method=deletePic",
						type: "POST",
						data: {widget_id: widget_id, path: imgpath},
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
						error: function(){
							layer.msg("网络不给力，请稍后再试……", 2, -1);
						}
					});
				}else{
					$("#"+uploadBox).removeClass("upload-done").addClass("upload-before");
					//将文件路径隐藏域附空
					$("#"+forimg).val("");
				}
				
				
			});
			
			
		}
		
	});
})();
