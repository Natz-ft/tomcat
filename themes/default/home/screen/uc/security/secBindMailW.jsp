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
<website:style href="css/uc/sec.css"/>
<website:style href="css/uc/blockui_css.css"/> 
<script type="text/javascript">
$("#secemail").addClass('menuon');
</script>
<div class="panel sec-show-panel">
	<p class="act-tip">把您常用的邮箱设为安全邮箱，是一种方便、安全的密码找回方式。</p>
	<div class="m_step m_step2">
		 <ol class="clearfix">
		 	<li class="start">
		 		<div>
		 			<span class="index">1</span>
		 			<span class="desc">填写邮箱</span>
		 		</div>
		 	</li>
		 	<li class="end">
		 		<div class="middle">
		 			<span class="index">2</span>
		 			<span class="desc">邮箱验证</span>
		 		</div>
		 		<div>
		 			<span class="index">3</span>
		 			<span class="desc">绑定成功</span>
		 		</div>
		 	</li>
		 </ol>
	</div>
	<div class="m_form">
		<form id="bindmail_form" method="post" action="javascript:;">
			<input type="hidden" name="submit_url"
				value="${fn:getLink('uc/security/securityAction.do?method=bindMail')}">
			<input type="hidden" name="activate_url"
				value="${fn:getLink('uc/security/activateSecEmail.jsp')}">
			<div class="form-title" style="display: none;">
				<span>..</span>
			</div>
			<div class="form-body form-signup-body">
				<c:if test="${!empty bindedMail}">
					<dl>
						<dt>
							<em>*</em>&nbsp;当前安全邮箱：
						</dt>
						<dd class="dd-input">
							<input id="oldMail" name="oldMail" type="text" class="input "
								style="width: 130px;"></input><span id="emailSuffix">${emailSuffix} <span>
						</dd>
						<dd class="form-tip"></dd>
					</dl>
				</c:if>
				<dl>
					<dt>
						<em>*</em>&nbsp;新安全邮箱：
					</dt>
					<dd class="dd-input">
						<input id="newMail" name="newMail" type="text" class="input "  autocomplete="off"/>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<dl>
					<dt>
						<em>*</em>&nbsp;确认登录密码：
					</dt>
					<dd class="dd-input">
						<input id="secmailpassword" name="password" type="password"
							class="input "  autocomplete="off"/>
					</dd>
					<dd class="form-tip"></dd>
					<dd class="check_rule">是您登录平台的密码，不是常用邮箱的登录密码。</dd>
				</dl>
				
				<dl>
					<dt></dt>
					<dd style="margin-left:2px;">
						<a class="user_act_btn do" style="margin-right: 32px;"
							href="javascript:;" id="submit_btn" hideFocus="hidefocus"><span>免费绑定</span></a>
						<a class="user_act_btn back" href="javascript:;"
							id="cancle_btn" hideFocus="hidefocus"><span>重新输入</span></a>
					</dd>
				</dl>
				
				
			</div>
			<!-- <div class="form-submit">
				<dl style="width:99%;">
					<dd style="text-align: center">
						<a class="user_act_btn do" style="margin-right: 32px;"
							href="javascript:;" id="submit_btn" hideFocus="hidefocus"><span>免费绑定</span></a>
						<a class="user_act_btn back" href="javascript:;"
							id="cancle_btn" hideFocus="hidefocus"><span>重新输入</span></a>
					</dd>
				</dl>
			</div> -->
		</form>
	</div>
	<div class="m_tip">
		<h3 class="title">为什么要设置安全邮箱？</h3>
		<div class="tip_text">当您记不清一站通账户密码时，我们会根据您的申请，将重置密码邮件发送到您绑定的邮箱中，帮助您方便快捷的找回登录密码。</div>
		<h3 class="title">如何使用安全邮箱找回密码？</h3>
		<div class="tip_text">您在密码找回页，按流程引导填写您的登录名和绑定的邮箱，系统校验成功后会向您的邮箱中发送密码重置的邮件，点击重置邮件中的链接地址进行密码重置工作。</div>
	</div>
</div>

<website:script src="js/uc/jquery.form.js"/>
<website:script src="js/uc/jquery.validate.js"/>
<website:script src="js/uc/md5.js"/>
<website:script src="js/uc/security/bindMail.js"/>
<website:script src="js/uc/jquery.validate.ext.js"/>
<website:script src="js/uc/jquery.blockUI.js"/>
<%-- <website:script src="js/uc/dialog.js"/> --%>
<website:script src="libs/assets/dialog/dialog.js" />
