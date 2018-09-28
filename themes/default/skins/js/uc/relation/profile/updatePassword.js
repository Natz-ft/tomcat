/**
 * 修改密码
 */
$.ajaxSetup({  
    async : false  
}); 

function clearPwdInput(){
	document.getElementById('opassword').value="";
	document.getElementById('new_password').value ="";
	document.getElementById('confirm_password').value="";
}

function successTo(){
	window.location.href = getRootPath()+"/profile/profile.htm";
}

$(document).ready(function(){
	jQuery.validator.addMethod("pswd_strength", function(value, element) {
		var pswdStr=testPassWordStrength(value);
		if(pswdStr<2){
			return false;
		}else{
			return true;}
		},"<font style='color: red;'>密码强度过低，请选择使用字母、数字或特殊字符中任两种</font>"); 
		
	
			
//校验规则初始化
$(function(){
	$("#user_form").validate({
		rules:{
			opassword:{
				required:true,
				},
			new_password:{
				required:true,
				password_rule:true,
				pswd_strength:true 
					},	
			confirm_password:{
				required:true,
				equalTo:"#new_password"
			}
			},
			
		messages:{
			
			opassword:{
				
				required:"<font style='color: red;'>请输入密码</font>",
					},
			new_password:{
				required:"<font style='color: red;'>请输入新密码</font>",
				password_rule:"<font style='color: red;'>请按要求填写,选择使用字母、数字或特殊字符中任两种,且密码长度不少于6位</font>"
						},	
			confirm_password:{
				required:"<font style='color: red;'>请再次输入以确认新密码</font>",
				equalTo:"<font style='color: red;'>请与新密码保持一致</font>"
						}
		}
			
		});
});
$("#confirmModify").on("click",function(){
	//点击提交触发校验
	var validate=$("#user_form").valid();
	if(!validate){
		return false;
	}
	$("#passwordStrength_per").val(testPassWordStrength($("#new_password").val()));
	//密码加密
	$("#pwd").val(toMD5Str($("#opassword").val()));
	$("#newpwd").val(toMD5Str($("#new_password").val()));
	$("#conpwd").val(toMD5Str($("#confirm_password").val()));
	//提交
	$("#user_form").ajaxSubmit({
		success:function(data) {
				if(data == 1) {
					dialog.info("修改成功！",successTo);
				}else if(data ==-1) {
					dialog.info("输入原密码不正确，请重新输入！",clearPwdInput);
				}else if(data == -2) {
					dialog.info("内容不全，请确认！",clearPwdInput);
				}else if(data == 0) {
					dialog.info("修改失败，请重试！",clearPwdInput);
				}
			}
	});
});


});
