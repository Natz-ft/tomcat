<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<website:style href="css/blockui_css.css"/>
<style>
.prompt-contain {
	color: #666;
	width: 640px;
	margin: 40px auto 150px;
	text-align: left;
}
.prompt-top { 
	background-position: 0 0;
	height: 5px;
	width: 100%;
}
.prompt-content {
	margin:2px 0px 0px 0px;
	background: white;
	width:100%;
	height:280px;
}
dt{
	font-size: 18px;
	padding: 15px 0;
	border-bottom: 1px solid #EEE;
	font-weight: bold;
}
.re-email {
	color: #3B5998;
	line-height: 25px;
	 font-size:12px;
	font-weight: normal;
	float: right;
}
.prompt-ok {
	background:url(${fn:getLink('images/prompt/prompt-ok.png')}) no-repeat;
	width: 68px;
	height: 68px;
	display: inline-block;
}
dd {
	float: left;
	margin: 0;
	padding: 15px 15px 10px 25px;
}
p {
	margin: 0px;
	font-size: 14px;
	line-height: 30px;
}
</style>
<div class="prompt-contain">
	<div class="prompt-top"></div>
	<div class="prompt-content">
		<dl>
			<dt>
				马上激活邮件，完成注册。
				<span class="re-email"> 
					<a href="javascript:void(0);" onclick="reSendEmail();" hideFocus="hidefocus">重新发送激活邮件</a> 
				</span>
			</dt>
			<dd style="width: 460px; height: 150px">
				<p>请填写您登记的邮箱：</p>
				<p><input type="text" id="loginEmail" name="loginEmail"  class="input" style="width: 200px;">&nbsp;&nbsp;<a href="javascript:void(0)" onclick="reSendEmail()" hideFocus="hidefocus">发送激活</a></p>
				<p>请您收取新邮件，并点击邮件里的"验证链接"完成注册。</p>
				<p>
					<a href="javascript:void(0)" onclick="checkEmail()" hideFocus="hidefocus">立即查看我的邮箱</a>
				</p>
				<p style="color: #999;">
					<strong>提示：</strong></br>如果没收到新邮件，可能会出现在您的垃圾邮件目录里 
				</p>
			</dd>
		</dl>
	</div>
</div>
<website:script src="js/jquery.blockUI.js"/>
<website:script src="js/dialog.js"/>
<script type="text/javascript">
function reSendEmail(){
	var loginEmails = $("#loginEmail").val();
	if(""==loginEmails || null == loginEmails){
		dialog.error("请填写注册邮箱！");
	}else{
		$.post("${fn:getLink('index/registerActivateEmail.do?method=reSendRegisterActivateEmail')}", {loginEmail:loginEmails},
				   function(data){
				     if(data>0){
				    	 dialog.success("已成功发送邮件，请注意查收！");
					 }else{
					    dialog.error("发送未成功，请重新点击发送！");
					 }
			});
	}
	
}
function checkEmail(){
	var loginEmails = $("#loginEmail").val();
	if(""==loginEmails || null == loginEmails){
		dialog.error("请填写注册邮箱！");
	}else{
		var email_url = "";
		var emailArr = loginEmails.split("@");
		var emailSuffix = emailArr[1];
		if ("hotmail.com"==emailSuffix) {
			email_url = "hotmail.com";
		} else if ("yahoo.com.cn"==emailSuffix) {
			email_url = "mail.cn.yahoo.com";
		} else if ("yahoo.cn"==emailSuffix) {
			email_url = "mail.cn.yahoo.com";
		} else if ("gmail.com"==emailSuffix) {
			email_url = "gmail.com";
		} else {
			email_url = "mail." + emailSuffix;
		}
		window.location.href = "http://" + email_url;
	}
}
</script>
