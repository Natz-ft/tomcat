//jquery after ready
$(document).ready(function(){
	
	//pwd's validating rule
	jQuery.validator.addMethod("pswd_strength", function(value, element) {
		var pswdStr=testPassWordStrength(value);
		if(pswdStr<2){
			return false;
		}else{
			return true;}
		}, "密码强度过低，请选择使用字母、数字或特殊字符中任两种"); 
	
	//vadation init
	$(function(){
		$("#changePwd_form").validate({
			rules:{
				oldPassWord:{
					required:true,
					password_rule:true 
					},
				newPassWord:{
					required:true,
					password_rule:true,
					pswd_strength:true
					},
				confirm_password:{
					required:true,
					equalTo:"#newPassWord"
						}
				},
				
			messages:{
				newPassWord:{
					required:"请输入您的新密码",
					password_rule:"请按格式要求填写"
						},
				oldPassWord:{
					required:"当前密码非空",
					password_rule:"格式不正确"
						},
				confirm_password:{
					required:"请输入确认密码",
					equalTo:"请与上次输入密码相一致"
							}
				}
			});
	});
	
	//reset input
	function clearInput(){
		$("#newPassWord").val("");
		$("#confirm_password").val("");
		$("#oldPassWord").val("");
		$(".form-tip").html("");
	};
	
	//submit click
	$("#submit_btn").on("click",function(){
			var validate=$("#changePwd_form").valid();
			if(!validate){
				return false;
			}
			if($("#oldPassWord").val() == $("#newPassWord").val()){
				dialog.info("您设置新密码与当前密码相同，无需修改！");
				return false;
			}
			var password=$("#newPassWord").val();
			var grade=testPassWordStrength(password);
			$("#newPassWordStrength").val(grade);
			var newPassWord = toMD5Str($("#newPassWord").val());
			var oldPassWord = toMD5Str($("#oldPassWord").val());
			var newPassWordStrength = grade;
	    	$.ajax({
	    		url: suburl,
	    		type: "post",
	    		dataType: "JSON",
	    		data:{
	    			newPassWord:newPassWord,
	    			oldPassWord:oldPassWord,
	    			newPassWordStrength:newPassWordStrength
	    		},
	    		contentType:"application/x-www-form-urlencoded; charset=UTF-8",
	    		success: function(data){
					data = eval('('+data+')');
					if(data==1) {
						dialog.info("修改密码成功!",function(){
							$("#logout").click();
						});
					}else if(data==-1){
						 dialog.info("当前密码输入有误，请重新输入！");
					}else{
						dialog.info("保存失败，请稍后重试！");
					}
	    		},
	    		error: function(){
	    			layer.msg("加载失败",2,0);
	    		}
	    	});
			clearInput();
	});
	//cancle
	$("#clear_btn").on("click",clearInput);
});
