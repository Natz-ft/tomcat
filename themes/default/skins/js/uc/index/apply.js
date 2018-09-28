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
	document.getElementById('checknum_per').value ="";
	document.getElementById('checknum_org').value ="";
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
	$("#applyfor_form_per").validate({
		rules:{
			nickname:{
				required:true,
				maxlength:20
			},
			login_email:{
				required:true,
				email:true,
				remote:checkEmailUrl
			},
			phoneNum:{
				required:false,
				phone_rule:true,
				remote:checkPhoneUrl
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
			nickname:{
				required:"请输入您的姓名",
				maxlength:"超出范围"
			},
			login_email:{
				required:"请输入您的邮箱",
				email:"请输入正确的邮箱"
			},
			phoneNum:{
				phone_rule:"请输入正确的手机号",
				remote:"该手机号已登记"
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
$(function(){
	$("#applyfor_form_org").validate({
		rules:{
			login_name:{
				required:true,
				loginName_rule:true,
				remote:checkLoginNameUrl
			},
			tel_phone:{
				required:false,
				telephone_rule:true
			},
			nickname:{
				required:true,
				maxlength:20
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
			tel_phone:{
				telephone_rule:"请输入正确电话号码"
			},
			nickname:{
				required:"请输入单位名称",
				maxlength:"超出范围"
			},
			login_email:{
				required:"请输入单位邮箱",
				email:"请输入正确的邮箱地址"
			},
			user_type:{
				required:"请选择一种申请类型"
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
	var validate=$("#applyfor_form_per").valid();
	if(!validate){
		return false;
	}
	$("#applyfor_form_per").ajaxSubmit({
		success:function(data) {
			if(data>0) {
				dialog.alert("申请已发送！我们会及时受理您的申请，并通过您填写的邮箱进行回复！请注意查收邮件！");
				}else if(data=='verifyError') {
					dialog.error("验证码输入有误，请重新填写！",clearPwdInput);
				}else{
					dialog.error("发送申请失败!"+data,clearPwdInput);
				}
			}
	});
});
$("#btn-submit_org").on("click",function(){
	//点击提交触发校验
	var validate=$("#applyfor_form_org").valid();
	if(!validate){
		return false;
	 	}
		$("#applyfor_form_org").ajaxSubmit({
			success:function(data) {
				if(data>0) {
					dialog.alert("申请已发送！我们会及时受理你的申请，并通过你填写的邮箱进行回复！请注意查收邮件！");
					}else if(data=='verifyError') {
						dialog.error("验证码输入有误，请重新填写！",clearPwdInput);
					}else{
						dialog.error("发送申请失败!"+data,clearPwdInput);
					}
				}
		});
	});
changeVerify_per();
$("#btn-per").on("click",function(){
	$(".input").val("");
	$("#applyfor_form_org").find(".form-tip").html("");
	$("#btn-per").addClass("btn-per-hover");
	$("#btn-org").removeClass("btn-org-hover");
	changeVerify_per();
	$("#form_org_contain").css({display:"none"});
	$("#form_per_contain").css({display:"block"});
});
$("#btn-org").on("click",function(){
	$(".input").val("");
	$("#applyfor_form_per").find(".form-tip").html("");
	$("#btn-per").removeClass("btn-per-hover");
	$("#btn-org").addClass("btn-org-hover");
	changeVerify_org();
	$("#form_per_contain").css({display:"none"});
	$("#form_org_contain").css({display:"block"});
});

});
