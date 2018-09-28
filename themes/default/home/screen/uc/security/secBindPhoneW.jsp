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
$("#bindphone").addClass('menuon');
</script>
<div class="panel sec-show-panel">
	<p class="act-tip">把您常用的手机设为绑定手机，方便找回密码。<strong>该设置仅用于安全设定，不可用于登录，如需用于登录，您可以通过账号管理进行修改！</strong></p>
		
	<div class="m_step">
		 <ol class="clearfix">
		 	<li class="start">
		 		<div>
		 			<span class="index">1</span>
		 			<span class="desc">填写手机及短信激活码</span>
		 		</div>
		 	</li>
		 	<li class="end" style="width:220px;">
		 		<div style="width:100%;" id="end-step">
		 			<span class="index">2</span>
		 			<span class="desc">绑定成功</span>
		 		</div>
		 	</li>
		 </ol>
	</div>
	<div class="m_form">		
			<form id="bindphone_form" method="post" action="javascript:;">
				<input type="hidden" name="verifyPhone_url" value="${fn:getLink('uc/security/securityAction.do?method=verifyPhone')}">
				<input type="hidden" name="submit_url" value="${fn:getLink('uc/security/securityAction.do?method=bindPhone')}">
				<div class="form-title" style="display: none;">
					<span>..</span>
				</div>
				<div class="form-body form-signup-body">
					<c:if test="${!empty bindedPhone}">
						<dl>
							<dt>
								<em></em>&nbsp;已绑定：
							</dt>
							<dd class="dd-input">
								<label id="oldMobile" style="color:#999">${fn:phoneReplaced(bindedPhone)}</label>
							</dd>
						</dl>
					</c:if>
					 <dl>
						<dt>
							<em>*</em>&nbsp;新手机号：
						</dt>
						<dd class="dd-input">
							<input id="mobile" name="mobile" type="text" class="input "  autocomplete="off"/>
						</dd>
						<dd class="form-tip" ></dd>
					</dl>
					<dl>
						<dt>
							<em>*</em>&nbsp;激活码：
						</dt>
						<dd class="dd-input">
							<input id="vcode" name="vcode" type="text" class="input " autocomplete="off" style="float:left;width:180px;"/>
							<a  class="user_act_btn do" style="margin:0px;" href="javascript:void(0);" id="verify_btn"><span>免费获取短信验证码</span></a>
						</dd>
						<dd class="form-tip" ></dd>
						<dd id="verifyOK" class="check_rule">请输入短信验证码。</dd>
					</dl>
					<dl>
						<dt>
							<em>*</em>&nbsp;登录密码：
						</dt>
						<dd class="dd-input">
							<input id="phonepassword" name="password" type="password" class="input "  autocomplete="off"/>
						</dd>
						<dd class="form-tip" ></dd>
						<dd class="check_rule">请输入您平台账号的登录密码。</dd>
					</dl>
					<dl>
						<dt></dt>
						<dd style="margin-left:2px;">
							<a class="user_act_btn do" style="margin-right:32px;" href="javascript:void(0);" id="submit_btn" hideFocus="hidefocus"><span>免费绑定</span></a>
							<a class="user_act_btn back" href="javascript:void(0);" id="cancle_btn" hideFocus="hidefocus"><span>重新输入</span></a>
						</dd>
					</dl>
				</div>
			</form>
	</div>
	<div class="m_tip" style="text-align: center;">
		<h3 class="title">为什么要绑定手机？</h3>
		<div class="tip_text">绑定手机后，您可以方便的使用所有手机服务，还可以轻松找回忘记的登录密码。</div>
		<h3 class="title">绑定手机资费问题？</h3>
		<div class="tip_text">绑定手机是完全免费的，您无需支付任何费用，请放心绑定！</div>
		<h3 class="title">绑定手机后，手机号码是否会泄露给第三方？</h3>
		<div class="tip_text">您提供的手机号将作为保密信息，不会以任何形式提供给第三方使用。</div>
		<h3 class="title">如何解除手机绑定？</h3>
		<div class="tip_text">解除手机绑定功能在开发中，敬请期待！</div>
	</div>
</div>
<script type="text/javascript">
	var bind_phone="${bindedPhone}";
</script>
<website:script src="js/uc/jquery.form.js"/>
<website:script src="js/uc/jquery.validate.js"/>
<website:script src="js/uc/md5.js"/>
<website:script src="js/uc/jquery.validate.ext.js"/>
<website:script src="js/uc/jquery.blockUI.js"/>
<%-- <website:script src="js/uc/dialog.js"/> --%>
<website:script src="libs/assets/dialog/dialog.js" />
<website:script src="js/uc/security/bindPhone.js"/>