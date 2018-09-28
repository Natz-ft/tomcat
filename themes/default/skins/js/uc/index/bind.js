function changeVerify(){
	if(typeof verifyUrl == "undefined")return;
    var date = new Date();
    var url = verifyUrl;
    var ttime = date.getTime();
    verifyImg.src = url + '&_='+ttime;
}

var ajaxInit_no_account={
		success:function(data) {
			//如果新注册成功，并且与外部账号绑定成功，则执行单点登录
			if(data == '1') {
				//aftersso中会对登录类型进行校验，如果session中不存在sso_type，则仍然会跳转至用户中心home页面，所以此处不再进行登录类型的判断，直接跳转至aftersso。
				if(typeof afterssoUrl == "undefined")return;
				window.location.href=afterssoUrl;
			}else {
				alert("出错了!"+data);
			}
		}
	};
//提交ajax登录请求
var ajaxInit_has_account={
		success:function(data) {
			//登录成功，执行绑定
			if(data == 1 || data == -3 || data == 10){
				$.ajax({
					url:doBindUrl,
					data: {type:'has_account'},
					type : "POST",
					success : function(data){
						//登录成功，并且绑定成功......
						if(data == '1'){
							//aftersso中会对登录类型进行校验，如果session中不存在sso_type，则仍然会跳转至用户中心home页面，所以此处不再进行登录类型的判断，直接跳转至aftersso。
							if(typeof afterssoUrl == "undefined")return;
							window.location.href=afterssoUrl;
						}else{
							$("#account").tipBox({tips:data,relatedTo:"#pass"});
						}
					}
				});
			}else if(data== -5){
				var msg = "系统中不存在该用户！";
				$("#account").tipBox({tips:msg,relatedTo:"#pass"});
				changeVerify();//刷新验证码
			}else if(data == -2){
				$("#verify").tipBox({tips:"验证码不正确！"});
				changeVerify();//刷新验证码
			}else if(data == -1){
				$("#account").tipBox({tips:"用户名或密码错误！",relatedTo:"#pass"});
				changeVerify();//刷新验证码
			}else if(data == 0){
				//跳转至激活页面超链接，传参 account
				var account = document.getElementById('account').value;
				var url = activateEmailUrl+account;
				var msg = "账户尚未激活。<a style='color:blue' href='"+url+"' hideFocus='hidefocus'>去激活？</a>";
				$("#account").tipBox({tips:msg,relatedTo:"#password"});
			}else if(data == 2){
				$("#account").tipBox({tips:"账号已被锁定，请1小时后重试！",relatedTo:"#pass"});
				changeVerify();//刷新验证码
			}else if(data == 9){
				$("#account").tipBox({tips:"账号已被禁用！",relatedTo:"#pass"});
				changeVerify();//刷新验证码
			}else if(data == 3){
				$("#account").tipBox({tips:"该用户已被删除！",relatedTo:"#pass"});
				changeVerify();//刷新验证码
			}else{
				$("#account").tipBox({tips:"系统错误！请稍后重试！",relatedTo:"#pass"});
			}
		}
	};

//校验规则初始化
$(function(){
	$("#register_form").validate({
		rules:{
			login_name:{
				required:true,
				loginName_rule:true,
				remote:checkLoginNameUrl
				},
			nickname:{
				required:true,
				maxlength:20
					},
			password:{
				required:true,
				password_rule:true 
				},
			confirm_password:{
				required:true,
				equalTo:"#password"
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
				}
			},
			
		messages:{
			login_name:{
				required:"请自定义登录用户名",
				loginName_rule:"格式不符合要求"
				},
			nickname:{
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
						required:"请接受《服务条款》"
						}
			}
		});
});
//点击提交触发校验并确认提交的对话框
function btnClick(){
var validate=$("#register_form").valid();
if(!validate){
	return false;
	}
registerSave();
}

//不存在本地账户时的提交
function registerSave(){
    var password=$("#password").val();
    var grade=testPassWordStrength(password);
    $("#passwordStrength").val(grade);
	document.getElementById('password').value=toMD5Str(document.getElementById('password').value);
	$("#register_form").ajaxSubmit(ajaxInit_no_account);
}
//已存在本地账户时的提交
function has_account_submit(){
	var password = document.getElementById('pass').value;
	document.getElementById('pwd').value = toMD5Str(toMD5Str(password) + login_salt);
	document.getElementById('verify_code').value = document.getElementById('verify').value;
	$("#login_form").ajaxSubmit(ajaxInit_has_account);
}
//更新展现，显示、隐藏
function updateShow(obj){
	if(obj.value=="yes"){
		document.getElementById('no_account').style.display="none";  
		document.getElementById('has_account').style.display="block";  
	}else if(obj.value=="no"){
		document.getElementById('has_account').style.display="none";  
		document.getElementById('no_account').style.display="block";  
	}else{
		alert("未知的value："+obj.value);
	}
}
//刷新验证码
function changeVerify(){
    var date = new Date();
    var ttime = date.getTime();
    var verifyImg = document.getElementById('verifyImg');
    var urlArray = verifyImg.src.split("&_=");
    verifyImg.src = urlArray[0] + '&_='+ttime;
}
//注册事件
$(document).ready(function(){
	document.getElementById('verify').onkeydown=function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];   
		if(e && e.keyCode==13){ // enter 键
			has_account_submit();
		}
	}; 
	document.getElementById('pass').onkeydown=function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];   
		if(e && e.keyCode==13){ // enter 键
			document.getElementById('verify').focus();
		}
	}; 
	//jquery.ui弹出框初始化
	var btn_dialog1=$("#dialog-confirm-skip").dialog({
	      autoOpen:false,
		  bgiframe: true,
		  title:"确定跳过本步骤",
		  modal: true,
		  buttons: {
		      '确定': function() {
		    	$(this).dialog('close');
				$.ajax({
					url:skipBindUrl,
					type : "POST",
					success : function(data){
						 /**
						  * -2   越权访问
						  * -1 当前外部账号已经与本地系统账号绑定
						  * 0  未知的系统错误
						  * 1 绑定成功
						  */
						if(data.indexOf(',') != -1 && data.indexOf('1') == 0){
							var user_id = data.substring(2);
							$("#show-skip-result").html('系统已自动为您分配了本地账号:'+user_id+'，初始密码: 111111，为了您的账号安全，建议您登录后在安全中心对密码进行修改！');
							$("#skip-result").dialog('open');
						}else if(data == '-2'){
							alert('非法操作！');
							window.location.href=loginUrl;
						}else if(data == '-1'){
							alert('当前外部账号已经与本地系统账号绑定，请直接登录！');
						}else{
							alert('未知的系统错误！');
						}
					}
				});
	       },
	       '取消':function() {
	    	   $(this).dialog('close');
		       }
		     }
		  }
	);
	var btn_dialog2=$("#skip-result").dialog({
	   	  autoOpen:false,
		  bgiframe: true,
		  title:"提示",
		  modal: true,
		  buttons: {
		      '确定': function() {
		    	$(this).dialog('close');
		    	if(typeof afterssoUrl == "undefined")return;
				window.location.href=afterssoUrl;
	     }
		 }
		 }
	);
});
function skip(){
	$("#dialog-confirm-skip").dialog('open');
}