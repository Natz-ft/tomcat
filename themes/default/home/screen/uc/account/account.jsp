<%@page import="java.io.Writer"%>
<%@page import="java.util.*"%>
<%@page import="java.io.UnsupportedEncodingException"%>
<%@page import="java.net.URLDecoder"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<website:style href="css/uc/account.css" />
<website:style href="css/uc/account/acc.css"/>
<website:style href="css/uc/blockui_css.css"/>

<website:script src="libs/vendor/jquery.min.js" />
<website:script src="libs/vendor/jquery-migrate-1.4.1.min.js" />
<website:script src="libs/assets/dialog/dialog.js" />

<website:script src="js/uc/jquery.form.js"/>
<!-- 旧版本jquery，不在使用 -->
<%-- <website:script src="js/uc/jquery.js"/> --%>
<website:script src="js/uc/jquery.bgifrm-2.1.2.js"/>
<website:script src="js/uc/jquery.validate.js"/>
<website:script src="js/uc/md5.js"/>
<website:script src="js/uc/jquery.validate.ext.js"/>
<website:script src="js/uc/jquery.blockUI.js"/>
<%-- <website:script src="js/uc/dialog.js"/> --%>

<script type="text/javascript">
$("#personinfo").addClass('menuon');
</script>
							
<div class="panel account-show-panel">
	<!-- 账号信息的编辑 -->
	<div class="info-modify"  id="info-modify">
		
		<div class="m_warn m_warn_tip">
			<p>温馨提示：</p>
			<p>请您放心填写昵称、登录手机和登录邮箱，我们一定会妥善保管您的登录信息，确保账号安全。</p>
		</div>
		
		<div class="m_form" style="margin-top:0px;padding-top:0px;">
			<div class="form-body form-signup-body m_sum m_contain">
				<form action="javascrip:viod(0);" method="post" id="account_form">
					<dl>
						<dt>登录用户名：</dt>
						<dd style="width: 170px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
							${userBasic.user_id}
						</dd>
						<c:if test="${is_person && (authenLevel == 1 || authenLevel == 3 || authenLevel==4)}">
							<dd class="show-uname" style="width:100px;height: 35px;">
								<span class="m_warn" style="margin:0;">实名注册用户</span>
							</dd>
						</c:if>
						<c:if test="${authenLevel == 2}">
							<dd class="show-uname" style="width:100px;height:35px;">
									<span class="m_warn" style="margin:0;">认证用户</span>
							</dd>
						</c:if>
					</dl>
					<div class="flag-common">
						<dl>
							<dt>
								<em>*</em>&nbsp;
								<c:if test="${is_organ}"> 单位名称：</c:if>
								<c:if test="${!is_organ}"> 昵称：</c:if>
							</dt>
							<dd>
								<input id="nickname_input" name="nickname_input" type="text"
									class="input" value="${ userBasic.nick_name }" />
							</dd>
							<dd class="form-tip"></dd>
							<dd class="check_rule field">不能超过20个字符串，汉字算一个字符</dd>
						</dl>
					</div>
					<div class="flag-email-label">
						<dl>
							<dt>登录邮箱：</dt>
							<dd style="width: 160px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-right: 10px;">
								<c:if test="${ !empty userBasic.login_email }">
									<label id="oldEmail">${fn:getEmailReplaced(userBasic.login_email)}</label>
								</c:if>				
								<c:if test="${ empty userBasic.login_email }">
									尚未设置
								</c:if>				
							</dd>
							<dd style="width: 110px;">
								<span class="m_warn" style="margin: 0px; padding: 3px 5px;">
									<a id="btn_modifyEmail" href="javascript:void(0);" 
									hideFocus="hidefocus"><span>设置登录邮箱</span></a>
								</span>
							</dd>
						</dl>
					</div>
					<div style="display: none;" class="flag-email">
						<dl>
							<dt>
								<em>*</em>&nbsp;新邮箱：
							</dt>
							<dd style="width: 230px;">
								<input id="email_input" name="login_email" type="text"
									class="input field " style="width: 220px;" value="" />
							</dd>
							<dd class="form-tip" id="email-tip"></dd>
							<dd class="check_rule">请输入您的登录邮箱，可用于直接登录。</dd>
						</dl>
						<dl>
							<dt>
								<em>*</em>&nbsp;验证码：
							</dt>
							<dd class="dd-input" style="width: 230px;">
								<a class="user_act_btn do" style="margin: 0px; "
									href="javascript:void(0);" id="verify_email_btn"><span>获取邮箱验证码</span></a>
								<input id="vcode_email" name="vcode_email" type="text"
									class="input " style="width: 95px;float: left;" />
							</dd>
							<dd class="form-tip"></dd>
							<dd id="verifyOK_email" class="check_rule">请输入邮箱验证码</dd>
						</dl>
					</div>

					<div class="flag-phone-label">
					<dl>
						<dt>登录手机号：</dt>
						<dd style="width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; margin-right:10px;">
							<c:if test="${ !empty userBasic.login_phone }">
								<label id="oldMobile">${fn:phoneReplaced(userBasic.login_phone)}</label>
							</c:if>	
							<c:if test="${ empty userBasic.login_phone }">
								尚未设置
							</c:if>	
						</dd>
						<dd style="width:110px;">
							<span class="m_warn" style="margin:0px;padding:3px 5px;">
								<a id="btn_modifyPhone" href="javascript:void(0);" hideFocus="hidefocus"><span>设置登录手机号</span></a>
							</span>
						</dd>
					</dl>
				</div>
				<div style="display: none;" class="flag-phone">
					<dl>
						<dt>
							<em>*</em>&nbsp;新手机号：
						</dt>
						<dd style="width: 230px;">
							<input id="phoneNum_input" name="phoneNum" type="text"
								class="input field " style="width: 220px;" value="" />
						</dd>
						<dd class="form-tip" id="phone-tip"></dd>
						<dd class="check_rule">请输入您的手机号，可用于直接登录</dd>
					</dl>
					<dl>
						<dt>
							<em>*</em>&nbsp;验证码：
						</dt>
						<dd class="dd-input" style="width: 240px;">
							<a class="user_act_btn do" style="margin: 0px; "
								href="javascript:void(0);" id="verify_btn"><span>免费获取短信验证码</span></a>
							<input id="vcode" name="vcode" type="text" class="input "
								style="width: 68px;float: left;" />
						</dd>
						<dd class="form-tip"></dd>
						<dd id="verifyOK" class="check_rule">请输入短信验证码</dd>
					</dl>
				</div>
				<div class="flag-pwd" style="display:none;">
					<dl>
						<dt>
							<em>*</em>&nbsp;确认密码：
						</dt>
						<dd class="dd-input">
							<input id="confirmpassword" name="confirmpassword" type="password" class="input " style="width: 220px;"/>
						</dd>
						<dd class="form-tip" id="password-tip"></dd>
						<dd class="check_rule">密码由6-15位字符、数字或符号组成</dd>
					</dl>
				</div>
				<div class="flag-common">
					<dl>
						<dt>用户类型：</dt>
						<dd>
							${itemValue }
						</dd>
					</dl>
					<dl>
						<dt>账号创建时间：</dt>
						<dd>
							<c:if test="${!empty userBasic.ctime }">
								${fn:formatDateBySeconds(userBasic.ctime,null)}
							</c:if>
							<c:if test="${empty userBasic.ctime }">
								未知
							</c:if>
						</dd>
					</dl>
					<dl>
						<dt>账号状态：</dt>
						<dd>
							<c:if test="${ userBasic.status == 1 }">
								正常
							</c:if>
							<c:if test="${userBasic.status != 1 }">
								已失效
							</c:if>
						</dd>
					</dl>
					<c:if test="${sessionScope.developer_id == null}">
					<dl>
						<dd>
							<a href="${fn:getConfValue('global.index.odweb')}/dev/console/developer.htm">注册成为开发者</a>
						</dd>
					</dl>
					</c:if>
					</div>
					<div class="form-submit" style="display:none;">
					<dl>
						<dd style="text-align:center;width:340px;">
							<a id="btn-submit" class="user_act_btn do" style="margin-right:32px;" href="javascript:void(0);" hideFocus="hidefocus"><span>提交</span></a>
							<a id="btn-cancel" class="user_act_btn  back" href="javascript:void(0);" hideFocus="hidefocus"><span>取消</span></a>
						</dd>
					</dl>
	
				</div>
			</form>
		</div>
		</div>
</div>
</div>
<script type="text/javascript">
$(document).ready(function(){
	
	var previousEmail="${userBasic.login_email}";
	var previousNick="${userBasic.nick_name}";
	
	// validate init
	$("#account_form").validate({
			rules:{
				phoneNum:{
					required:true,
					phone_rule:true,
					remote:"${fn:getLink('uc/index/Index.do?method=checkPhoneNum')}"
				},
				vcode : {
					required : true,
					maxlength:4 
				},	
				vcode_email : {
					required : true,
					maxlength:4
				},
				login_email:{
					required:true,
					email:true,
					remote:"${fn:getLink('uc/index/Index.do?method=checkEmail')}"
				},
				nickname_input:{
					required:true,
					maxlength:20
				},
				confirmpassword : {
					required : true,
					password_rule : true 
				}
			
			},
			messages:{
				phoneNum:{
					required:"请输入手机号码",
					phone_rule:"请正确输入",
                    remote: '用户名已存在'
				},
				vcode : {
					required : "请输入手机验证码",
					maxlength: "验证码输入错误" 
				},
				vcode_email : {
					required : "请输入邮箱验证码",
					maxlength: "验证码输入错误" 
				},
				login_email:{
					required:"请输入邮箱",
					email:"请正确输入邮箱地址"
				},
				nickname_input:{
					required:"请输入昵称",
					maxlength:"超出范围"
				},
				confirmpassword : {
					required:"请输入密码",
					password_rule:"请按要求填写"
				}	
			}
	});
	// input "keyup" event
	$("input").on("keyup",function(){
		if(typeof($(".flag-pwd").attr("status"))=="undefined"||$(".flag-pwd").attr("status") =="hide"){
			$(".flag-pwd").attr("status","show");
			$(".flag-pwd").show();

			$(".form-submit").attr("status","show");
			$(".form-submit").show();
		}
		
	});
	// select "change" event
	$("select").on("change",function(){
		if(typeof($(".flag-pwd").attr("status"))=="undefined"||$(".flag-pwd").attr("status") =="hide"){
			$(".flag-pwd").attr("status","show");
			$(".flag-pwd").show();

			$(".form-submit").attr("status","show");
			$(".form-submit").show();
		}
		
	});
	//cancel
	$("#btn-cancel").click(function(){
		window.location.href="${fn:getLink('uc/account/account.jsp')}";
	});
	//submit phone	
	var phoneSubmit = function(){
		var body = $("body");
		var validate=$("#account_form").valid();
		if(!validate){
			return;
		}
		var password = toMD5Str(body.find("input[name='confirmpassword']").val());
		body.find("input[name='confirmpassword']").val("");
		var vcode = $.trim(body.find("input[name='vcode']").val());
		var data = {
				password:password,
				vcode:vcode
		}; 	
		$.ajax({
			url:"${fn:getLink('uc/account/accountAction.do?method=updateAccountPhone')}",
			data: data,
			type : "POST",
			success : function(data){
				data = eval('('+data+')');
				if(data=='-1' || data == '0'){
					dialog.info("验证码填写错误，请重新填写！");
					return;
				}else
				if(data=='-2'){
					//pwd info
					$("#password-tip").find("span").removeClass("valid").addClass("invalid");
					$("#password-tip").find("span").html("登录密码填写有误，请重新填写");
					return;
				}else
				if(data == '1'){
					dialog.success("保存成功！",function(){
						//submit phone  and email
				    	var flag = (typeof($(".flag-phone").attr("status")) != "undefined" && $(".flag-phone").attr("status")=="show");
				    	if(flag == false){
				    		flag = (typeof($(".flag-email").attr("status")) != "undefined" && $(".flag-email").attr("status")=="show");
				    	}
				    	if(flag){
				    		window.location.href="${fn:getLink('account/account.jsp')}";
				    	}
					});
				}else{
					dialog.info("保存失败！请稍后重试！");
				}
			}
		});
	};
	var emailSubmit = function(){
		var body = $("body");
		var validate=$("#account_form").valid();
		if(!validate){
			return false;
		}
		var newemail = $("#email_input").val();
		var pwds = $("#confirmpassword").val();
		var password = toMD5Str(pwds);
		var vcode_email = $.trim(body.find("input[name='vcode_email']").val());
		var data = {
					vcode:vcode_email,
					newLogin_email:newemail,
					password:password
		}; 
		$.ajax({
			url:"${fn:getLink('uc/account/accountAction.do?method=updateAccountEmail')}",
			data: data,
			type : "POST",
			success : function(data){
				data = eval('('+data+')');
				if(data=='-1' || data == '0'){
					dialog.info("验证码填写错误，请重新填写！");
					return;
				}
				if(data=='-2'){
					//pwd info
					$("#password-tip").find("span").removeClass("valid").addClass("invalid");
					$("#password-tip").find("span").html("登录密码填写有误，请重新填写");
					return;
				}
				if(data == '1'){
					dialog.success("保存成功！",function(){
						//submit phone  and email
				    	var flag = (typeof($(".flag-phone").attr("status")) != "undefined" && $(".flag-phone").attr("status")=="show");
				    	if(flag == false){
				    		flag = (typeof($(".flag-email").attr("status")) != "undefined" && $(".flag-email").attr("status")=="show");
				    	}
				    	if(flag){
				    		window.location.href="${fn:getLink('uc/account/account.jsp')}";
				    	}
					});
				}else{
					dialog.info("保存失败！请稍后重试！");
				}
			}
		});
	}
	//submit nickname
	var accountSubmit = function(){
		var body = $("body");
		//is changed
		if(previousNick==$("#nickname_input").val()){
			dialog.info("没有修改，无需提交！");
			return false;
		}
		
		var validate=$("#account_form").valid();
		if(!validate){
			return false;
		}
		var newNick = body.find("input[name='nickname_input']").val();
		var password = toMD5Str(body.find("input[name='confirmpassword']").val());
		body.find("input[name='confirmpassword']").val("");
		var data = {
					newNick : newNick,
					password:password
		}; 
		$.ajax({
			url:"${fn:getLink('uc/account/accountAction.do?method=updateAccount')}",
			data: data,
			type : "POST",
			success : function(data){
				data = eval('('+data+')');
				if(data==0){
					//pwd info
					$("#password-tip").find("span").removeClass("valid").addClass("invalid");
					$("#password-tip").find("span").html("登录密码填写有误，请重新填写");
					return;
				}
				if(data==1){
					newNick = newNick;
					$(".flag-pwd").attr("status", "hide");
					$(".flag-pwd").hide();
					$(".form-submit").attr("status","hide");
					$(".form-submit").hide();
					dialog.success("保存成功！",function(){
						//submit phone  and email
				    	var flag = (typeof($(".flag-phone").attr("status")) != "undefined" && $(".flag-phone").attr("status")=="show");
				    	if(flag == false){
				    		flag = (typeof($(".flag-email").attr("status")) != "undefined" && $(".flag-email").attr("status")=="show");
				    	}
				    	if(flag){
				    		window.location.href="${fn:getLink('account/account.jsp')}";
				    	}
					});
				}else{
					dialog.info("保存失败！请稍后重试！");
				}
			}
		});
	};
	//submit button
	$("#btn-submit").on("click",function(){
		var body = $("body");
		//submit phones
		if(typeof($(".flag-phone").attr("status")) != "undefined" && $(".flag-phone").attr("status")=="show"){
			phoneSubmit();																	
		}
		//submit mail
		else if(typeof($(".flag-email").attr("status")) != "undefined" && $(".flag-email").attr("status")=="show"){
			emailSubmit();																	
		}
		//submit nickname
		else{
			accountSubmit();	
		}
	});
	//在设置登录手机号与设置昵称之间切换
	$("#btn_modifyPhone").on("click",function(){
			$(".flag-common").hide();
			$(".flag-email-label").hide();
			$(".flag-phone").attr("status","show");
			$(".flag-phone").show();
			$("#btn_modifyPhone").parent().hide();
			$(".form-submit").attr("status","show");
			$(".form-submit").show();
	});
	//在设置登邮箱与设置昵称之间切换
	$("#btn_modifyEmail").on("click",function(){
			$(".flag-common").hide();
			$(".flag-phone-label").hide();
			$(".flag-email").attr("status","show");
			$(".flag-email").show();
			$("#btn_modifyEmail").parent().hide();
			$(".form-submit").attr("status","show");
			$(".form-submit").show();
	});
  	var body = $("body");
  	$("#verify_email_btn").click(emailClick);
	function emailClick(){
		var validate=$("#email_input").valid();
		if(!validate){
			return false;
		}
		var body = $("body");
		//get email code
		var data = {email : $("#email_input").val()};
		$.ajax({
			type : "POST",
			url : "${fn:getLink('uc/account/accountAction.do?method=verifyEmail')}",
			data : data,
			success : function(data) {
				data = eval('('+data+')');
				if(data == '0'){
					dialog.info("尚未登录，请先登录！");
				}else if(data == '1'){
					var color = $("#verifyOK_email").css("color");
					var value = $("#verifyOK_email")[0].firstChild.nodeValue;
					$("#verifyOK_email").css("color","red");
					$("#verifyOK_email")[0].firstChild.nodeValue = "已发送邮箱验证码，请查收并输入";
					$("#vcode_email").on("change",function(){
						$("#verifyOK_email").css("color",color);
						$("#verifyOK_email")[0].firstChild.nodeValue = value;
						});
					
					$("#verify_email_btn").addClass('back');
					emailSettime();
					$("#verify_email_btn").unbind("click",emailClick);
				}else if(data == '-1'){
					dialog.info("服务器异常，获取验证码失败。请稍后重试！");
				}else{
					var color = $("#verifyOK_email").css("color");
					var value = $("#verifyOK_email")[0].firstChild.nodeValue;
					$("#verifyOK_email").css("color","red");
					$("#verifyOK_email")[0].firstChild.nodeValue = "已发送邮箱验证码，请查收并输入"
					$("#vcode_email").on("change",function(){
					$("#verifyOK_email").css("color",color);
					$("#verifyOK")[0].firstChild.nodeValue = value;
					});
				}
			},
			error : function(data) {
				dialog.info("由于网络原因，获取验证码失败！");
			}
		});
	}
	
	var emailTimedown=30;
	function emailSettime(){
		if (emailTimedown == 0) {
		$("#verify_email_btn").removeClass("back");
		$("#verify_email_btn").attr("disabled", false);
		$("#verify_email_btn").find("span")[0].firstChild.nodeValue="获取邮箱验证码";
		$("#verify_email_btn").bind("click",emailClick);
		$("#verifyOK_email").css("color","gray");
		$("#verifyOK_email")[0].firstChild.nodeValue = "请输入邮箱验证码";
		emailTimedown = 30; 
		} else {  
			$("#verify_email_btn").find("span")[0].firstChild.nodeValue=emailTimedown+"s后重新发送";
			emailTimedown--; 
			setTimeout(function() { 
				emailSettime() 
				},1000) 
		} 
	}
	
  	var body = $("body");
  	$("#verify_btn").on("click",phoneClick);
  	function phoneClick(){
		var validate=$("#phoneNum_input").valid();
		if(!validate){
			return false;
		}
		var body = $("body");
		//get phone code
		var data = {mobile : $("#phoneNum_input").val()};
		$.ajax({
			type : "POST",
			url : "${fn:getLink('uc/account/accountAction.do?method=verifyPhone')}",
			data : data,
			success : function(data) {
				data = eval('('+data+')')
				if(data == '0'){
					dialog.info("尚未登录，请先登录！");
				}else if(data == '1'){
					var color = $("#verifyOK").css("color");
					var value = $("#verifyOK")[0].firstChild.nodeValue;
					$("#verifyOK").css("color","red");
					$("#verifyOK")[0].firstChild.nodeValue = "已发送手机验证码，请查收并输入";
					$("#vcode").on("change",function(){
						$("#verifyOK").css("color",color);
						$("#verifyOK")[0].firstChild.nodeValue = value;
						});
					$("#verify_btn").addClass('back');
					phoneSettime();
					$("#verify_btn").unbind("click",phoneClick);
				}else if(data == '-1'){
					dialog.info("服务器异常，获取验证码失败。请稍后重试！");
				}else{
					var color = $("#verifyOK").css("color");
					var value = $("#verifyOK")[0].firstChild.nodeValue;
					$("#verifyOK").css("color","red");
					$("#verifyOK")[0].firstChild.nodeValue = "已发送手机验证码，请查收并输入"
					$("#vcode").on("change",function(){
					$("#verifyOK").css("color",color);
					$("#verifyOK")[0].firstChild.nodeValue = value;
					});
					$("#verify_btn").addClass('back');
					phoneSettime();
					$("#verify_btn").unbind("click",phoneClick);
					dialog.success(data);
				}
			},
			error : function(data) {
				dialog.info("由于网络原因，获取验证码失败！");
			}
		});
	}
	var phoneTimedown=30;
	function phoneSettime(){
		if (phoneTimedown == 0) {
		$("#verify_btn").removeClass("back");
		$("#verify_btn").attr("disabled", false);
		$("#verify_btn").find("span")[0].firstChild.nodeValue="获取短信验证码";
		$("#verify_btn").bind("click",phoneClick);
		$("#verifyOK").css("color","gray");
		$("#verifyOK")[0].firstChild.nodeValue = "请输入短信验证码";
		phoneTimedown = 30; 
		} else {  
			$("#verify_btn").find("span")[0].firstChild.nodeValue=phoneTimedown+"s后重新发送";
			phoneTimedown--; 
			setTimeout(function() { 
				phoneSettime();
				},1000); 
		} 
	}
});
</script>

