define(function(require, exports, module){
	require("lib/jquery.validate.ext.js");
	require("lib/dialog.js");
	//初始化
	exports.init = function(){
		var loader = layer.load("加载中……");
		var request = $A.service("request");
		var widget_id = request.getParameter("id");
		$.ajax({
			url: "./AppWidgets.do?method=GetWidgetInfo",
			type: "GET",
			data: {id: widget_id,app_id:app_id},
			dataType: "JSON",
			success: function(result){
					var wrapper = $A.service('wrapper').getWrapper('content-wrap');
					wrapper.loadWidget({
						id: 'showContent',
						tpl: {id: 'editWidgetTpl'},
						data: {widget:result.widget,groups:result.groups,curApp:result.curApp,
								sites:result.sites,widget_group:result.widgetGroups,
								userType:result.userType},
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
			$("#app_editwidget_form").validate({
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
			
			function displayWidgetTpl(){
				  var tpl_width,tpl_height,tpl_title;
				  //width获取
				  var width = document.getElementsByName("tpl_width");
				  for(var i=0;i<width.length;i++)
				  {
				     if(width[i].checked)
				    	 tpl_width = width[i].value;
				  }
				  $("#widget_tpl_content").css("width",80*tpl_width+"px");
				 //height获取
				  var height = document.getElementsByName("tpl_height");
				  for(var i=0;i<height.length;i++)
				  {
				     if(height[i].checked)
				    	 tpl_height = height[i].value;
				  }
				  $("#widget_tpl_content").css("height",80*tpl_height+"px");
				  //height获取
				  var title = document.getElementsByName("tpl_title");
				  for(var i=0;i<title.length;i++)
				  {
				     if(title[i].checked)
				    	tpl_title = title[i].value;
				  } 
				  if(tpl_title == 1){
						$("#widget_tpl_title").css("display","block");
				  }else{
				   	$("#widget_tpl_title").css("display","none");
				  }
			} 
			displayWidgetTpl();
			
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
		$("#editwidget_form").bind("click",function(){
			var form_id = $(this).attr("form_id");
			var valid = $("#"+form_id).valid();
			//var valid=true;
			data={
				app_id:$("#app_id").val(),
				widget_id:$("#widget_id").val(),
				widget_title:$("#widget_title").val(),
				widget_url:$("#widget_url").val(),
				widget_description : $("#widget_description").val(),
				des_img:$("#upload_icon_img_value").val(),
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
					url:"./AppWidgets.do?method=UpdateAppWidget",
					data:data,
					type:"POST",
					dataType:"json",
					success:function(data){
						if(data==null || data.success==null){
							dialog.error("更新失败");
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
						dialog.error("更新失败");
					}
				});
			} 
			
		});
		$(function($){
		
			//用户权限选择
			var win = $('#roles-list'),role_input = $('#widget_role'),role_input2 = $('#widget_role2'),role_input3 = $('#widget_role3'),$body=$('body');
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
			var tag_init_val="",tag_init_name="";
			if(role_input2.val().indexOf(",")>-1){
				tag_init_val = role_input2.val().split(',');
			}
			if(role_input3.val().indexOf(",")>-1){
				tag_init_name = role_input3.val().split(',');
			}
			for(var tiv=0;tiv<tag_init_val.length;tiv++){
				var tagVal_temp = tag_init_name[tiv];
				//需要修改，增加id
				var tagid_temp = tag_init_val[tiv];
				if(tagid_temp!=""){
					var s_temp = '<span href="javascript:void(0)" class="tag-item" tagv="'+tagid_temp+'">'+tagVal_temp+'<a href="javascript:void(0)" class="tag-close"></a></span>';
					role_input.append(s_temp);
				}
			}
			
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
				
				var littleSetting = {
					//upload_url: "./app/versions.do?method=uploadPic",
					button_placeholder_id : "upload_btn",
					button_width: 64,
					button_height: 64,
					custom_settings : {
						progressTarget : "upload_icon_percent",
						showTarget: "upload_icon_img_box",
						statusTarget: "upload_icon_status",
						hiddenInput: "upload_icon_img_value"
					}
				};
				swfUploads = new SWFUpload($.extend({}, defaults, littleSetting));
					
		}
		//绑定图片删除按钮
		$("a[__upload_img_icon_delete=true]").click(function(){
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
			
			$("#"+uploadBox).removeClass("upload-done").addClass("upload-before");
			//将文件路径隐藏域附空
			$("#"+forimg).val("");
			
		});
		
		
		
	}
	
	
});