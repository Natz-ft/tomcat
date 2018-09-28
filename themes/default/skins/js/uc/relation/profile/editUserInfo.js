/**
 * 编辑用户信息
 */
$.ajaxSetup({  
    async : false  
}); 

function clearPwdInput(){
	document.getElementById('avatar').value="";
	document.getElementById('nick_name').value ="";
	document.getElementById('login_email').value="";
	document.getElementById('login_phone').value="";
}
$(function(){
	var form = $("#user_form");
	form.validate({
	    rules: {
	    	nick_name: "required",
	    	org_code : "required",
	    	login_email:"required",
	        login_phone:"required"
	    },
	    messages: {
	    	nick_name: "<font style='color: red;'>请填写昵称</font>",
	    	org_code : "<font style='color: red;'>请填写所属部门</font>",
	    	login_email : "<font style='color: red;'>请填写电子邮箱</font>",
	    	login_phone: "<font style='color: red;'>请填写电话号码</font>"
	    }
	    
    });
});
$("#submitChangedInfo").on("click",function(){
	var form = $("#user_form");
	var validate=form.valid();
	if(!validate){
		return false;
	}
	//提交
	form.ajaxSubmit({
		success:function(data) {
				if(data == 1) {
					dialog.info("提交成功",function(){
						var docid = $("#docid").val();
						var nick_name = $("#nick_name").val();
						$('#resetnickName', window.parent.document).val(nick_name);
						if(docid!=null && docid!=''){
							$('#resetdocId', window.parent.document).val(docid);
							$('#resetPhoto', window.parent.document).val(__rcservicedown+"/doc?doc_id="+docid);
						}
						parent.resetUserPhoto();
						window.location.href = getRootPath()+"/profile/profile.htm";
					});
				}else if(data == 0) {
					dialog.alert("提交失败");	
				}else if(data == -1) {
					dialog.info("信息未改变，请重新编辑",clearPwdInput);
				}
				
					
			}
	});
});

function setUploadf(){
	var defaults = {
		// Backend Settings
		upload_url: __rcservice,
		file_post_name:'uploadfile',
		// File Upload Settings
		file_size_limit : "2048",	// 200k
		file_types : "*.jpg;*.png;*.gif;*.jpeg",
		file_types_description : "All Files",
		file_upload_limit : "0",
		file_queue_limit : "1",
		post_params: {
			uid : uid,
			type : "doc",
			folder_name : "",
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
		upload_success_handler : uploadSuccessIII,
		upload_complete_handler : uploadComplete,

		// Button Settings
		button_image_url : "",
		button_placeholder_id : "upload_btnf",
		button_width: 200,
		button_height: 30,
		button_text:'<span class="btnStyle" style="width:100%;height:30px;" onClick="clearError()">上传图片</span>',
		button_text_style: ".btnStyle {color: #ffffff; font-size:12px;text-align:center;background-color:#53bee6;}",
		button_text_top_padding:8,
		button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
		button_cursor : SWFUpload.CURSOR.HAND,
		flash_url :resourceUrl,
		custom_settings : {
		},
		debug: false
	}
	var littleSetting = {
		button_placeholder_id : "upload_btnf",
		button_width: 150,
		button_height: 30,
		custom_settings : {
			progressTarget : "upload_little_percent",
			showTarget: "upload_little_img_box",
			statusTarget: "upload_little_status",
			hiddenInput: "docid",
			logoErroTarget:"logo_error_div"
		}
	};
	swfUploads = new SWFUpload($.extend({}, defaults, littleSetting));
	
}

$(document).ready(function() {
	setUploadf();
});