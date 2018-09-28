$(document).ready(function(){
	
	var user_id_validate=true;
	var login_email_validate=true;
	var login_phone_validate=true;
	jQuery.validator.addMethod("pswd_strength", function(value, element) {
		var pswdStr=testPassWordStrength(value);
		if(pswdStr<2){
			return false;
		}else{
			return true;}
		}, "密码强度过低，请选择使用字母、数字或特殊字符中任两种"); 
			
	$(function(){
		$("#edit_sub_account").validate({
			rules:{
				user_id:{
					required:true,
					loginName_rule:true
					},
				nick_name:{
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
					equalTo:"#password"
						},	
				login_email:{
					required:true,
					email:true
						},
				login_phone:{
					phone_rule:function(){
										if($("#login_phone").val()!=""){
											return true;
										}else{
											return false;
										}
									}
					}
				},
				
			messages:{
				user_id:{
					required:"请自定义登录用户名",
					loginName_rule:"格式不符合要求"
					},
				nick_name:{
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
				login_phone:{
					phone_rule:"请正确输入"
					}
				}
			});
	});


$("#submit_btn").on("click",function(){
	
	if(user_id_validate && login_email_validate && login_phone_validate){
		$(".form-tip").find("span").html("");
	}else{
		return false;
	}
	//validate
	var validate=$("#edit_sub_account").valid();
	if(!validate){
		return false;
	}
	$("#password_strength").val(testPassWordStrength($("#password").val()));
	$("#confirm_password").val("");
	//pwd jiami
	$("#password").val(toMD5Str($("#password").val()));
	$("#edit_sub_account").ajaxSubmit({
		success:function(data) {
			data = eval('('+data+')');
			if(data==1) {
				$("#password").val("");
					dialog.success("修改成功！",function(){
						window.location.href = subAccountUrl;
					});
			}else if(data==0) {
				dialog.error("失败，请重试！");
			}else {
				dialog.error("系统错误，请稍后刷新重试！");
			}
		}
	});
});

$("#cancel_btn").click(function(){
	$("input").val("");
});
	
	
(function(){
	//user_id
		$("#user_id").blur(function() {
			var isChange = (user_id_pre !=$("#user_id").val());
			var isMatchCondition = $(".user_id").find("span").hasClass("valid") ;
			if(isChange && isMatchCondition){
				$(".user_id").find("span").removeClass("valid");
				$.ajax({
					url : checkLoginNameUrl,
					data : {login_name:$("#user_id").val()},
					type : "GET",
					success: function(res) {
						if(res=='true') {
								$(".user_id").find("span").addClass("valid");
								user_id_validate=true;
							}else {
								$(".user_id").find("span").addClass("invalid");
								user_id_validate=false;
								$(".user_id").find("span").html("该用户名已登记，请换一个试试");
							}
						}
				});
			}
		});
		$("#user_id").focusin(function() {
			$(".user_id").html("");
		});
		
		//login_email
		$("#login_email").blur(function() {
			var isChange = (login_email_pre !=$("#login_email").val());
			var isMatchCondition = $(".login_email").find("span").hasClass("valid") ;
			if(isChange && isMatchCondition){
				$(".login_email").find("span").removeClass("valid");
				$.ajax({
					url : checkEmailUrl,
					data : {login_email:$("#login_email").val()},
					type : "GET",
					success: function(res) {
						if(res=='true') {
								$(".login_email").find("span").addClass("valid");
								login_email_validate=true
							}else {
								$(".login_email").find("span").addClass("invalid");
								login_email_validate=false;
								$(".login_email").find("span").html("该邮箱已登记，请换一个试试");
							}
						}
				});
			}
		});
		$("#login_email").focusin(function() {
			$(".login_email").html("");
		});
		
		
		//login_email
		$("#login_phone").blur(function() {
			
			var isChange =($("#login_phone").val()!="")&&(login_phone_pre !=$("#login_phone").val());
			var isMatchCondition = $(".login_phone").find("span").hasClass("valid") ;
			if(isChange && isMatchCondition){
				$(".login_phone").find("span").removeClass("valid");
				$.ajax({
					url : checkPhoneNum,
					data : {phoneNum :$("#login_phone").val()},
					type : "GET",
					success: function(res) {
						res = eval('('+res+')');
						if(res=='true') {
								$(".login_phone").find("span").addClass("valid");
								login_phone_validate=true;
							}else {
								$(".login_phone").find("span").addClass("invalid");
								login_phone_validate=false;
								$(".login_phone").find("span").html("该手机已登记，请换一个试试");
							}
						}
				});
			}
		});
		$("#login_phone").focusin(function() {
			$(".login_phone").html("");
		});
	})();
});