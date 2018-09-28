$.ajaxSetup({
	async: false
});


$.post(getVerifyCodeUrl, function(verify) {
	$("#verifycode_hid_p").attr("value", verify);
});

function clearPwdInput() {
	document.getElementById('password_per').value = "";
	document.getElementById('password_per1').value = "";
	document.getElementById('checknum_per').value = "";
	document.getElementById('confirm_password_per').value = "";
	document.getElementById('confirm_password_per1').value = "";
	document.getElementById('password_org').value = "";
	document.getElementById('confirm_password_org').value = "";
}


function loadAdressListP(){
var param = {parent_code:'0'};
$.ajax({
    	url:"./signUpReal.do?method=GetRegionList",
			type: "POST",
			data: param,
			dataType: "json",
			success: function(data){
				// var data1=data; 
				var html = '<option value="">请选择</option>';
         
				for(var i=0;i<data.length;i++){
                html +='<option value="'+data[i].region_code+'">'+data[i].abbr_name+'</option>';
         }
				$("#provence").append(html);
				
	  		},error:function(e){
				$("#total_count").text(0);
	  			dialog.info('请求失败，请稍后重试',function(){},3000);
	  			$('body .side-content>.dialog-loading').modal('hide');
	  		}
		});


}

function loadAdressListF(){
var param = {parent_code:'0'};
$.ajax({
    	url:"./signUpReal.do?method=GetRegionList",
			type: "POST",
			data: param,
			dataType: "json",
			success: function(data){
				// var data1=data; 
				var html = '<option value="">请选择</option>';
         
				for(var i=0;i<data.length;i++){
                html +='<option value="'+data[i].region_code+'">'+data[i].abbr_name+'</option>';
         }
				$("#provencef").append(html);
				
	  		},error:function(e){
				$("#total_count").text(0);
	  			dialog.info('请求失败，请稍后重试',function(){},3000);
	  			$('body .side-content>.dialog-loading').modal('hide');
	  		}
		});


}

$("#provencef").bind("change",function(){
						$("#cityf").empty(); 
            var region_code = $(this).val();
            var param = {parent_code:region_code};
            // var url = "./signUpReal.do?method=GetRegionList";
            $.ajax({
						    	url:"./signUpReal.do?method=GetRegionList",
									type: "POST",
									data: param,
									dataType: "json",
									success: function(data){
										// var data1=data; 
										var html = '<option value="">请选择</option>';
						         
										for(var i=0;i<data.length;i++){
						                html +='<option value="'+data[i].region_code+'">'+data[i].abbr_name+'</option>';
						         }
										$("#cityf").append(html);
										
							  		},error:function(e){
										$("#total_count").text(0);
							  			dialog.info('请求失败，请稍后重试',function(){},3000);
							  			$('body .side-content>.dialog-loading').modal('hide');
							  		}
						});

});

$("#provence").bind("change",function(){
						$("#city").empty(); 
            var region_code = $(this).val();
            var param = {parent_code:region_code};
            // var url = "./signUpReal.do?method=GetRegionList";
            $.ajax({
						    	url:"./signUpReal.do?method=GetRegionList",
									type: "POST",
									data: param,
									dataType: "json",
									success: function(data){
										// var data1=data; 
										var html = '<option value="">请选择</option>';
						         
										for(var i=0;i<data.length;i++){
						                html +='<option value="'+data[i].region_code+'">'+data[i].abbr_name+'</option>';
						         }
										$("#city").append(html);
										
							  		},error:function(e){
										$("#total_count").text(0);
							  			dialog.info('请求失败，请稍后重试',function(){},3000);
							  			$('body .side-content>.dialog-loading').modal('hide');
							  		}
						});

});

$("#cityf").bind("change",function(){
						$("#areaf").empty(); 
            var region_code = $(this).val();
            var param = {parent_code:region_code};
            // var url = "./signUpReal.do?method=GetRegionList";
            $.ajax({
						    	url:"./signUpReal.do?method=GetRegionList",
									type: "POST",
									data: param,
									dataType: "json",
									success: function(data){
										// var data1=data; 
										var html = '<option value="">请选择</option>';
						         
										for(var i=0;i<data.length;i++){
						                html +='<option value="'+data[i].region_code+'">'+data[i].abbr_name+'</option>';
						         }
										$("#areaf").append(html);
										
							  		},error:function(e){
										$("#total_count").text(0);
							  			dialog.info('请求失败，请稍后重试',function(){},3000);
							  			$('body .side-content>.dialog-loading').modal('hide');
							  		}
						});

});


$("#city").bind("change",function(){
						$("#area").empty(); 
            var region_code = $(this).val();
            var param = {parent_code:region_code};
            // var url = "./signUpReal.do?method=GetRegionList";
            $.ajax({
						    	url:"./signUpReal.do?method=GetRegionList",
									type: "POST",
									data: param,
									dataType: "json",
									success: function(data){
										// var data1=data; 
										var html = '<option value="">请选择</option>';
						         
										for(var i=0;i<data.length;i++){
						                html +='<option value="'+data[i].region_code+'">'+data[i].abbr_name+'</option>';
						         }
										$("#area").append(html);
										
							  		},error:function(e){
										$("#total_count").text(0);
							  			dialog.info('请求失败，请稍后重试',function(){},3000);
							  			$('body .side-content>.dialog-loading').modal('hide');
							  		}
						});

});




$(document).ready(function() {

	loadAdressListF();
	loadAdressListP();
	jQuery.validator.addMethod("pswd_strength", function(value, element) {
		var pswdStr = testPassWordStrength(value);
		if (pswdStr < 2) {
			return false;
		} else {
			return true;
		}
	}, "密码强度过低，请选择使用字母、数字或特殊字符中任两种");


	//校验规则初始化
	$(function() {
		$("#register_form_per1").validate({
			rules: {
				login_person_name: {
					required: true,
					loginName_rule: true,
					remote: checkLoginNameUrl
				},
				nick: {
					required: true,
					maxlength: 20
				},
				password: {
					required: true,
					password_rule: true,
					pswd_strength: true
				},
				confirm_password: {
					required: true,
					equalTo: "#password_per1"
				},
				login_email: {
					required: true,
					email: true,
					remote: checkEmailUrl
				},
				user_type: {
					required: true
				},
				login_allow: {
					required: true
				},
				checknum: {
					required: true,
					number: true,
					minlength: 4,
					maxlength: 4,
					equalToNum: "#verifycode_hid_p"
				},
				login_phone: {
                    required: true,
					phone_rule: true
				}
			},

			messages: {
				login_person_name: {
					required: "请自定义登录用户名",
					loginName_rule: "格式不符合要求"
				},
				nick: {
					required: "请输入昵称",
					maxlength: "超出范围"
				},
				password: {
					required: "请输入密码",
					password_rule: "请按要求填写"
				},
				confirm_password: {
					required: "请输入确认密码",
					equalTo: "请与登录密码保持一致"
				},
				login_email: {
					required: "请输入您的邮箱",
					email: "请输入正确的邮箱"
				},
				user_type: {
					required: "请选择一种注册类型"
				},
				login_allow: {
					required: "请接受该协议"
				},
				checknum: {
					required: "请输入验证码",
					number: "请正确输入验证码",
					minlength: "请输入四位验证码",
					maxlength: "请输入四位验证码",
					equalToNum: "输入错误！请重新输入！"
				},
                login_phone: {
                    required: '请输入手机号',
                    phone_rule: '请正确输入手机号'
                }
			}
		});
	});
	//校验规则初始化
	// $(function() {
	// 	$("#register_form_per1").validate({
	// 		rules: {
	// 			login_phone: {
	// 				required: true,
	// 				phone_rule: true
	// 				//remote:checkEmailUrl
	// 			},
	// 			login_name: {
	// 				required: true,
	// 				loginName_rule: true,
	// 				remote: checkLoginNameUrl
	// 			},
	// 			nick: {
	// 				required: true,
	// 				maxlength: 20
	// 			},
	// 			password: {
	// 				required: true,
	// 				password_rule: true,
	// 				pswd_strength: true
	// 			},
	// 			confirm_password: {
	// 				required: true,
	// 				equalTo: "#password_per1"
	// 			},
	// 			user_type: {
	// 				required: true
	// 			},

	// 			checknum: {
	// 				required: true,
	// 				number: true,
	// 				minlength: 4,
	// 				maxlength: 4,
	// 				equalToNum: "#verifycode_hid_p1"
	// 			}
	// 		},

	// 		messages: {
	// 			login_phone: {
	// 				required: "请输入您的手机号",
	// 				phone_rule: "请输入正确的手机号"
	// 			},
	// 			login_name: {
	// 				required: "请自定义登录用户名",
	// 				loginName_rule: "格式不符合要求"
	// 			},
	// 			nick: {
	// 				required: "请输入昵称",
	// 				maxlength: "超出范围"
	// 			},
	// 			password: {
	// 				required: "请输入密码",
	// 				password_rule: "请按要求填写"
	// 			},
	// 			confirm_password: {
	// 				required: "请输入确认密码",
	// 				equalTo: "请与登录密码保持一致"
	// 			},

	// 			checknum: {
	// 				required: "请输入验证码",
	// 				number: "请正确输入验证码",
	// 				minlength: "请输入四位验证码",
	// 				maxlength: "请输入四位验证码",
	// 				equalToNum: "输入错误！请重新输入！"
	// 			}
	// 		}
	// 	});
	// });

	$(function() {
		$("#register_form_org").validate({
			rules: {
				login_name: {
					required: true,
					loginName_rule: true,
					remote: checkLoginNameUrl
				},
				nick: {
					required: true,
					maxlength: 20
				},
				password: {
					required: true,
					password_rule: true,
					pswd_strength: true
				},
				confirm_password: {
					required: true,
					equalTo: "#password_org"
				},
				login_email: {
					required: true,
					email: true,
					remote: checkEmailUrl
				},
				user_type: {
					required: true
				},
				login_allow: {
					required: true
				},
				checknum: {
					required: true,
					number: true,
					minlength: 4,
					maxlength: 4,
					equalToNum: "#verifycode_hid_o"
				},
                contact_phone: {
                    required: true,
                    phone_rule: true
                }
			},

			messages: {
				login_name: {
					required: "请自定义登录用户名",
					loginName_rule: "格式不符合要求"
				},
				nick: {
					required: "请输入昵称",
					maxlength: "超出范围"
				},
				password: {
					required: "请输入密码",
					password_rule: "请按要求填写"
				},
				confirm_password: {
					required: "请输入确认密码",
					equalTo: "请与上次输入密码相一致"
				},
				login_email: {
					required: "请输入您的邮箱",
					email: "请输入正确的邮箱"
				},
				user_type: {
					required: "请选择一种注册类型"
				},
				login_allow: {
					required: "请接受该协议"
				},
				checknum: {
					required: "请输入验证码",
					number: "请正确输入验证码",
					minlength: "请输入四位验证码",
					maxlength: "请输入四位验证码",
					equalToNum: "输入错误！请重新输入！"
				},
                contact_phone: {
                    required: '请输入手机号',
                    phone_rule: '请正确输入手机号'
                }
			}
		});
	});

	$("#btn-submit_per").on("click", function() {
		//点击提交触发校验
		var validate = $("#register_form_per").valid();
		if (!validate) {
			return false;
		}
		$("#passwordStrength_per").val(testPassWordStrength($("#password_per").val()));
		$("#confirm_password").val("");
		//密码加密
		$("#password_per").val(toMD5Str($("#password_per").val()));
		$("#confirm_password_per").val(toMD5Str($("#confirm_password_per").val()));
		//提交
		$("#register_form_per").ajaxSubmit({
			success: function(data) {
				if (data > 0) {
					//激活邮箱界面
					if (typeof activateEmailUrl == "undefined") return;
					window.location.href = activateEmailUrl;
				} else if (data == 'verifyError') {
					dialog.error("验证码输入有误，请重新填写！", clearPwdInput);
				} else if (data == -1) {
					dialog.error("保存未成功，请重新操作！", clearPwdInput);
				} else {
					dialog.error("系统错误，请重试！", clearPwdInput);
				}
			}
		});
	});

	$("#btn-submit_per1").on("click", function() {
		//点击提交触发校验
		var validate = $("#register_form_per1").valid();
		if (!validate) {
			return false;
		}
		$("#passwordStrength_per1").val(testPassWordStrength($("#password_per1").val()));
		$("#confirm_password_per1").val("");
		//密码加密
		$("#password_per1").val(toMD5Str($("#password_per1").val()));
		$("#confirm_password_per1").val(toMD5Str($("#confirm_password_per1").val()));
		//提交
		debugger;
		$("#register_form_per1").ajaxSubmit({
			success: function(data) {
				if (data == 'verifyError') {
                                        dialog.error("验证码输入有误，请重新填写！", clearPwdInput);
                                } else if (data == '-2') {
                                        dialog.error("用户名已存在，请重新更换用户名！", clearPwdInput);
				} else if (data == '-3') {
                                        dialog.error("手机号码已经注册过，请重新更换手机号！", clearPwdInput);
				} else if (data == '-4') {
                                        dialog.error("验证码已失效，请重新获取！", clearPwdInput);
				} else if (data == '-5') {
                                        dialog.error("验证码不正确，请重新填写！", clearPwdInput);
                                } else if (data == -1) {
                                        dialog.error("保存未成功，请重新操作！", clearPwdInput);
                                } else if (data > 0) {
					dialog.error("注册成功", function() {
						window.location.href = dataUrl;
					});
				} else {
					dialog.error("系统错误，请重试！", clearPwdInput);
				}
			}
		});
	});
	$("#btn-submit_org").on("click", function() {
		//点击提交触发校验
		var validate = $("#register_form_org").valid();
		if (!validate) {
			return false;
		}
		$("#passwordStrength_org").val(testPassWordStrength($("#password_org").val()));

		//密码加密
		$("#password_org").val(toMD5Str($("#password_org").val()));
		$("#confirm_password_org").val(toMD5Str($("#confirm_password_org").val()));
		//提交
		$("#register_form_org").ajaxSubmit({
			success: function(data) {
				if (data > 0) {
					dialog.error("注册成功", function() {
						window.location.href = dataUrl;
					});
				} else if (data == 'verifyError') {
					dialog.error("验证码输入有误，请重新填写！", clearPwdInput);
				} else if (data == -1) {
					dialog.error("保存未成功，请重新操作！", clearPwdInput);
				} else {
					dialog.error("系统错误，请重试！", clearPwdInput);
				}
			}
		});
	});

	$("#btn-per").on("click", function() {
		$(".input").val("");
		$("#register_form_org").find(".form-tip").html("");
		$("#register_form_per1").find(".form-tip").html("");
		$("#btn-per").addClass("btn-per-hover");
		$("#btn-per1").removeClass("btn-per-hover");
		$("#btn-org").removeClass("btn-org-hover");

		$("#form_org_contain").css({
			display: "none"
		});
		$("#form_per_contain1").css({
			display: "none"
		});
		$("#form_per_contain").css({
			display: "block"
		});
	});

	$("#btn-per1").on("click", function() {
		$(".input").val("");
		$("#register_form_org").find(".form-tip").html("");
		$("#register_form_per").find(".form-tip").html("");
		$("#btn-per1").addClass("btn-per-hover");
		$("#btn-per").removeClass("btn-per-hover");
		$("#btn-org").removeClass("btn-org-hover");

		$("#form_org_contain").css({
			display: "none"
		});
		$("#form_per_contain").css({
			display: "none"
		});
		$("#form_per_contain1").css({
			display: "block"
		});

	});
	$("#btn-org").on("click", function() {
		$(".input").val("");
		$("#register_form_per").find(".form-tip").html("");
		$("#register_form_per1").find(".form-tip").html("");
		$("#btn-per").removeClass("btn-per-hover");
		$("#btn-per1").removeClass("btn-per-hover");
		$("#btn-org").addClass("btn-org-hover");

		$("#form_per_contain").css({
			display: "none"
		});
		$("#form_per_contain1").css({
			display: "none"
		});
		$("#form_org_contain").css({
			display: "block"
		});
	});

});
