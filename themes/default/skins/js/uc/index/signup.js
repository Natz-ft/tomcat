$.ajaxSetup({  
    async : false  
}); 

//点击触发更换校验码
function changeVerify_per(){
    var date = new Date();
    var ttime = date.getTime();
    var verifyImg = document.getElementById('verifyImg_per');
    var urlArray = verifyImg.src.split("&_=");
    verifyImg.src = urlArray[0] + '&_='+ttime;
    setTimeout(function(){
    	$.post(getVerifyCodeUrl,function(verify){
	   		$("#verifycode_hid_p").attr("value",verify);
		    $("#checknum_per").attr("value","");
   	});
    },'100');  
}
function changeVerify_per1(){
    var date = new Date();
    var ttime = date.getTime();
    var verifyImg = document.getElementById('verifyImg_per1');
    var urlArray = verifyImg.src.split("&_=");
    verifyImg.src = urlArray[0] + '&_='+ttime;
    setTimeout(function(){
    	$.post(getVerifyCodeUrl,function(verify){
	   		$("#verifycode_hid_p1").attr("value",verify);
		    $("#checknum_per1").attr("value","");
   	});
    },'100');  
}
function changeVerify_org(){
    var date = new Date();
    var ttime = date.getTime();
    var verifyImg = document.getElementById('verifyImg_org');
    var urlArray = verifyImg.src.split("&_=");
    verifyImg.src = urlArray[0] + '&_='+ttime;
    setTimeout(function(){
    $.post(getVerifyCodeUrl,function(verify){
		 $("#verifycode_hid_o").attr("value",verify);
		 $("#checknum_org").attr("value","");
	});
    },'100');  
}
$.post(getVerifyCodeUrl,function(verify){
	 $("#verifycode_hid_p").attr("value",verify);
});

function clearPwdInput(){
	document.getElementById('password_per').value="";
	document.getElementById('password_per1').value="";
	document.getElementById('checknum_per').value ="";
	document.getElementById('checknum_per1').value ="";
	document.getElementById('confirm_password_per').value ="";
	document.getElementById('confirm_password_per1').value ="";
	document.getElementById('password_org').value="";
	document.getElementById('checknum_org').value ="";
	document.getElementById('confirm_password_org').value ="";
}
$(document).ready(function(){
	jQuery.validator.addMethod("pswd_strength", function(value, element) {
		var pswdStr=testPassWordStrength(value);
		if(pswdStr<2){
			return false;
		}else{
			return true;}
		}, "密码强度过低，请选择使用字母、数字或特殊字符中任两种"); 
	
			
//校验规则初始化
$(function(){
	$("#register_form_per").validate({
		rules:{
			login_name:{
				required:true,
				loginName_rule:true,
				remote:checkLoginNameUrl
				},
			nick:{
				required:true,
				maxlength:20
					},
			password:{
				required:true,
				password_rule:true,
				pswd_strength:true 
				},
			confirm_password:{
				required:true,
				equalTo:"#password_per"
					},	
			login_email:{
				required:true,
				email:true,
				remote:checkEmailUrl
					},
			user_type:{
				required:true
				},
			login_allow:{
				required:true
				},
			checknum:{
				required:true,
				number:true,
				minlength:4,
				maxlength:4,
				equalToNum:"#verifycode_hid_p"
				}
			},
			
		messages:{
			login_name:{
				required:"请自定义登录用户名",
				loginName_rule:"格式不符合要求"
				},
			nick:{
					required:"请输入昵称",
					maxlength:"超出范围"
					},
			password:{
				required:"请输入密码",
				password_rule:"请按要求填写"
					},
			confirm_password:{
				required:"请输入确认密码",
				equalTo:"请与登录密码保持一致"
						},	
			login_email:{
				required:"请输入您的邮箱",
				email:"请输入正确的邮箱"
						},
			user_type:{
						required:"请选择一种注册类型"
					  },
			 login_allow:{
						required:"请接受该协议"
						},
			checknum:{
						required:"请输入验证码",
						number:"请正确输入验证码",
						minlength:"请输入四位验证码",
						maxlength:"请输入四位验证码",
						equalToNum:"输入错误！请重新输入！"
							}
			}
		});
});
//校验规则初始化
$(function(){
	$("#register_form_per1").validate({
		rules:{
			login_phone:{
				required:true,
				phone_rule:true
				//remote:checkEmailUrl
				},
			login_name:{
				required:true,
				loginName_rule:true,
				remote:checkLoginNameUrl
				},
			nick:{
				required:true,
				maxlength:20
					},
			password:{
				required:true,
				password_rule:true,
				pswd_strength:true 
				},
			confirm_password:{
				required:true,
				equalTo:"#password_per1"
					},
			user_type:{
				required:true
				},
			
			checknum:{
				required:true,
				number:true,
				minlength:4,
				maxlength:4,
				equalToNum:"#verifycode_hid_p1"
				}
			},
			
		messages:{
			login_phone:{
				required:"请输入您的手机号",
				phone_rule:"请输入正确的手机号"
						},
			login_name:{
				required:"请自定义登录用户名",
				loginName_rule:"格式不符合要求"
				},
			nick:{
					required:"请输入昵称",
					maxlength:"超出范围"
					},
			password:{
				required:"请输入密码",
				password_rule:"请按要求填写"
					},
			confirm_password:{
				required:"请输入确认密码",
				equalTo:"请与登录密码保持一致"
						},	
			
			checknum:{
						required:"请输入验证码",
						number:"请正确输入验证码",
						minlength:"请输入四位验证码",
						maxlength:"请输入四位验证码",
						equalToNum:"输入错误！请重新输入！"
							}
			}
		});
});

$(function(){
	$("#register_form_org").validate({
		rules:{
			login_name:{
				required:true,
				loginName_rule:true,
				remote:checkLoginNameUrl
				},
			nick:{
				required:true,
				maxlength:20
					},
			password:{
				required:true,
				password_rule:true,
				pswd_strength:true 
				},
			confirm_password:{
				required:true,
				equalTo:"#password_org"
					},	
			login_email:{
				required:true,
				email:true,
				remote:checkEmailUrl
					},
			user_type:{
				required:true
				},
			login_allow:{
				required:true
				},
			checknum:{
				required:true,
				number:true,
				minlength:4,
				maxlength:4,
				equalToNum:"#verifycode_hid_o"
				}
			},
			
		messages:{
			login_name:{
				required:"请自定义登录用户名",
				loginName_rule:"格式不符合要求"
				},
			nick:{
					required:"请输入昵称",
					maxlength:"超出范围"
					},
			password:{
				required:"请输入密码",
				password_rule:"请按要求填写"
					},
			confirm_password:{
				required:"请输入确认密码",
				equalTo:"请与上次输入密码相一致"
						},	
			login_email:{
				required:"请输入您的邮箱",
				email:"请输入正确的邮箱"
						},
			user_type:{
						required:"请选择一种注册类型"
					  },
			 login_allow:{
						required:"请接受该协议"
						},
			checknum:{
				required:"请输入验证码",
				number:"请正确输入验证码",
				minlength:"请输入四位验证码",
				maxlength:"请输入四位验证码",
				equalToNum:"输入错误！请重新输入！"
							}
			}
		});
});

$("#btn-submit_per").on("click",function(){
	//点击提交触发校验
	var validate=$("#register_form_per").valid();
	if(!validate){
		return false;
	}
	$("#passwordStrength_per").val(testPassWordStrength($("#password_per").val()));
	$("#confirm_password").val("");
	//密码加密
	$("#password_per").val(toMD5Str($("#password_per").val()));
	$("#confirm_password_per").val(toMD5Str($("#confirm_password_per").val()));
	//提交
	$("#register_form_per").ajaxSubmit({
		success:function(data) {
			if(data>0) {
					//激活邮箱界面
					if(typeof activateEmailUrl == "undefined") return;
					window.location.href = activateEmailUrl ;
				}else if(data=='verifyError') {
					dialog.error("验证码输入有误，请重新填写！",clearPwdInput);
				}else if(data==-1){
					dialog.error("保存未成功，请重新操作！",clearPwdInput);
				}else{
					dialog.error("系统错误，请重试！",clearPwdInput);
				}
			}
	});
});

$("#btn-submit_per1").on("click",function(){
	//点击提交触发校验
	var validate=$("#register_form_per1").valid();
	if(!validate){
		return false;
	}
	$("#passwordStrength_per1").val(testPassWordStrength($("#password_per1").val()));
	$("#confirm_password_per1").val("");
	//密码加密
	$("#password_per1").val(toMD5Str($("#password_per1").val()));
	$("#confirm_password_per1").val(toMD5Str($("#confirm_password_per1").val()));
	//提交
	$("#register_form_per1").ajaxSubmit({
		success:function(data) {
			if(data=='verifyError') {
				dialog.error("验证码输入有误，请重新填写！",clearPwdInput);
			}else if(data=='ExistError'){
				dialog.error("手机号码已经注册过，请重新更换手机号！",clearPwdInput);
			}else if(data==-1){
				dialog.error("保存未成功，请重新操作！",clearPwdInput);
			}else if(data=="CertNumError"){
				dialog.error("手机验证码已过期！",clearPwdInput);
			}else if(data=="vcodeError"){
				dialog.error("手机验证码不正确！",clearPwdInput);
			}else if(data>0){
				dialog.error("注册成功",function(){
					window.location.href = dataUrl ;
				});
			}else{
				dialog.error("系统错误，请重试！",clearPwdInput);
			}
		}
	});
});
$("#btn-submit_org").on("click",function(){
	//点击提交触发校验
	var validate=$("#register_form_org").valid();
	if(!validate){
		return false;
	 	}
	$("#passwordStrength_org").val(testPassWordStrength($("#password_org").val()));
	
	//密码加密
	$("#password_org").val(toMD5Str($("#password_org").val()));
	$("#confirm_password_org").val(toMD5Str($("#confirm_password_org").val()));
		//提交
		$("#register_form_org").ajaxSubmit({
			success:function(data) {
				if(data>0) {
						//激活邮箱界面
						if(typeof activateEmailUrl == "undefined") return;
						window.location.href = activateEmailUrl;
					}else if(data=='verifyError') {
						dialog.error("验证码输入有误，请重新填写！",clearPwdInput);
					}else if(data==-1){
						dialog.error("保存未成功，请重新操作！",clearPwdInput);
					}else{
						dialog.error("系统错误，请重试！",clearPwdInput);
					}
				}
		});
	});
changeVerify_per();
$("#btn-per").on("click",function(){
	$(".input").val("");
	$("#register_form_org").find(".form-tip").html("");
	$("#register_form_per1").find(".form-tip").html("");
	$("#btn-per").addClass("btn-per-hover");
	$("#btn-per1").removeClass("btn-per-hover");
	$("#btn-org").removeClass("btn-org-hover");
	changeVerify_per();
	$("#form_org_contain").css({display:"none"});
	$("#form_per_contain1").css({display:"none"});
	$("#form_per_contain").css({display:"block"});
});

$("#btn-per1").on("click",function(){
	$(".input").val("");
	$("#register_form_org").find(".form-tip").html("");
	$("#register_form_per").find(".form-tip").html("");
	$("#btn-per1").addClass("btn-per-hover");
	$("#btn-per").removeClass("btn-per-hover");
	$("#btn-org").removeClass("btn-org-hover");
	changeVerify_per1();
	$("#form_org_contain").css({display:"none"});
	$("#form_per_contain").css({display:"none"});
	$("#form_per_contain1").css({display:"block"});
	
});
$("#btn-org").on("click",function(){
	$(".input").val("");
	$("#register_form_per").find(".form-tip").html("");
	$("#register_form_per1").find(".form-tip").html("");
	$("#btn-per").removeClass("btn-per-hover");
	$("#btn-per1").removeClass("btn-per-hover");
	$("#btn-org").addClass("btn-org-hover");
	changeVerify_org();
	$("#form_per_contain").css({display:"none"});
	$("#form_per_contain1").css({display:"none"});
	$("#form_org_contain").css({display:"block"});
});

});
