<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<!-- action需要使用全局变量然后加控制器 -->

<%@page import="com.inspur.ucweb.utils.UCUtil"%>
<style>
.error {
	margin-left: 2px;
	color: red;
	font-size: 12px;
    text-align: left;
    background-color: #FFE7E7;
}
label.error{
	background: transparent;
}
.form-body dd {
	float: left;
	width: 100%;
	text-align: left;
}
</style>


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
	/* background-color: #; */
}

.prompt-content {
	margin:2px 0px 0px 0px;
	background: white;
	width:100%;
	height:280px;
}
</style>
<website:style href="css/uc/blockui_css.css"/>
<form style="display:block;" action="javascript:;"
	method="post" id="getpwd_bymail_form" >
	<div class="form-body form-signup-body form-contain">
		<input type="hidden" name="doGetByMail_url" value="${fn:getLink('uc/password/getPwd.do?method=getPwdByMail')}">
		<input type="hidden" name="activateGetPwd_url" value="${fn:getLink('uc/password/activateGetPwd.jsp')}">
		<input type="hidden" name="getpwd_url" value="${fn:getLink('uc/password/getPwd.jsp')}">
		<dl style="margin-left: 70px;padding: 0px 0px 5px;">
			<dt>
				<em></em>&nbsp;已绑定安全邮箱：
			</dt>
			<dd style="width:200px;">
				<label id="oldMail" style="color:#999">${security_email}</label>
			</dd>
		</dl>
		<div class="form-submit">
			<dl>
				<dd style="text-align: left;line-height: 26px;height: 26px;">
					<a class="user_act_btn do" style="margin-right:32px;" href="javascript:void(0);" id="submit_btn_mail" hideFocus="hidefocus"><span>提&nbsp;&nbsp;交</span></a>
					<a class="user_act_btn  back" href="javascript:;" onclick="rechoose(this)" hideFocus="hidefocus"><span>返&nbsp;&nbsp;回</span></a>
				</dd>
			</dl>
		</div>
	</div>
	
	</form>
	<div id="mail_prompt_contain" class="prompt-contain" style="display:none;">
		<div class="prompt-top"></div>
		<div class="prompt-content">
			<dl>
				<dd style="width: 460px; height: 150px">
					<p>我们已经将邮件发送到您绑定的安全邮箱：${security_email}</p>
					<p>请您收取新邮件，并点击邮件里的"验证链接"找回密码。</p>
					<p>
						<a target="_blank" href="http://${email_url}" class="" hideFocus="hidefocus">立即查看我的邮箱</a>
					</p>
					<p style="color: #999;">
						<strong>提示：</strong></br>如果没收到新邮件，可能会出现在您的垃圾邮件目录里 
					</p>
				</dd>
			</dl>
		</div>
	</div>
<website:script src="js/uc/jquery.blockUI.js"/>
<website:script src="js/uc/dialog.js"/>
<website:script src="js/uc/index/getPwdByMail.js" />
