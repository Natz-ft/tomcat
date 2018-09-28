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
<website:style href="css/account.css"/>
<website:style href="css/index/signup.css"/>
<website:style href="css/blockui_css.css"/>
<style>
.input:focus{
	border-color: #71B83D;
	}
</style>
<div class="panel account-show-panel">
	<c:if test="${empty subAccountInfo }">
		<div style="width: 100%;">
			<div class="m_sum" style="margin-bottom: 0px; padding-bottom: 0px;">
				<h3 class="title">非法操作</h3>
			</div>
			<h2 style="font-size:14px; display:block; margin:10px 5px; padding-left:15px;">
				您没有权限编辑该子账号，请点击<a href="${fn:getLink('account/subAccount.jsp')}">这里</a>返回!</h2>
		</div>
	</c:if>
	<c:if test="${!empty subAccountInfo }">
		<div style="width: 100%;">
			<div class="m_sum" style="margin-bottom: 0px; padding-bottom: 0px;">
				<h3 class="title">子账号编辑</h3>
			</div>
			<div class="form-contain" style="width: 90%;">
				<form action="${fn:getLink('account/accountAction.do?method=editSubAccount')}"
					  method="post" id="edit_sub_account" style="margin-left: 50px;">
					<input id="password_strength" name="password_strength" type="hidden" type="text" class="input" />
					<div class="form-body form-signup-body">
						<dl>
							<dt>所属主账号：</dt>
							<dd style='line-height: 30px;'>
								<label>${parentNickName}</label>
							</dd>
						</dl>
						<dl>
							<dt><em>*</em>&nbsp;子账号昵称：</dt>
							<dd>
								<input id="nick_name" name="nick_name" type="text"
									class="input"
									value="${subAccountInfo.nick_name}" />
							</dd>
							<dd class="form-tip"></dd>
							<dd class="check_rule">不能超过20个字符串，汉字算一个字符</dd>
						</dl>
						<dl>
							<dt>
								<em>*</em>&nbsp;登录用户名：
							</dt>
							<dd>
								<input id="user_id" name="user_id" type="text"
									class="input"
									value="${subAccountInfo.user_id}" />
							</dd>
							<dd class="form-tip user_id"></dd>
							<dd class="check_rule">以字母开头，允许使用字母数字下划线，5-20位组成</dd>
						</dl>
						<dl>
							<dt>
								<em>*</em>&nbsp;登录邮箱：
							</dt>
							<dd>
								<input id="login_email" name="login_email" type="text" class="input"
									value="${subAccountInfo.login_email }" />
							</dd>
							<dd class="form-tip login_email"></dd>
							<dd class="check_rule">请正确填写子账号邮箱地址，该邮箱可用于子账号的登录</dd>
						</dl>
						<dl>
							<dt>
								登录手机：
							</dt>
							<dd>
								<input id="login_phone" name="login_phone" type="text" class="input"
									value="${subAccountInfo.login_phone}" />
							</dd>
							<dd class="form-tip login_phone"></dd>
							<dd class="check_rule">请输入子账号手机号，可用于子账号直接登录</dd>
						</dl>
		
						<dl style="width: 640px;">
							<dt>
								<em>*</em>&nbsp;登录密码：
							</dt>
							<dd>
								<input id="password" name="password" type="password"
									class="input " />
							</dd>
							<dd class="form-tip" style="width: 180px; line-height: 20px;"></dd>
							<dd class="check_rule">密码由6-15位字母、数字或特殊符号组成</dd>
						</dl>
		
						<dl>
							<dt>
								<em>*</em>&nbsp;确认密码：
							</dt>
							<dd>
								<input id="confirm_password" name="confirm_password"
									type="password" class="input" />
							</dd>
							<dd class="form-tip"></dd>
							<dd class="check_rule">请再次输入设置的密码</dd>
						</dl>
		
					</div>
					<div class="btn-contain">
						<dl>
							<dd style="text-align: center; width: 100%">
								<a class="user_act_btn do" style="margin-right:32px;"
									href="javascript:void(0);" id="submit_btn" hideFocus="hidefocus"><span>保存子账号</span></a>
								<a class="user_act_btn back"
									href="javascript:void(0);"
									id="cancel_btn" hideFocus="hidefocus"><span>重新输入</span></a>
							</dd>
						</dl>
					</div>
				</form>
			</div>
		</div>
<website:script src="js/jquery.form.js"/>
<website:script src="js/jquery.bgifrm-2.1.2.js"/>
<website:script src="js/jquery.validate.js"/>
<website:script src="js/md5.js"/>
<website:script src="js/passwordStrength.js"/>
<website:script src="js/jquery.validate.ext.js"/>
<website:script src="js/jquery.blockUI.js"/>
<website:script src="js/dialog.js"/>
<script type="text/javascript">
	var checkLoginNameUrl = "${fn:getLink('index/index.do?method=checkLoginName')}";
	var checkEmailUrl = "${fn:getLink('index/index.do?method=checkEmail')}";
	var subAccountUrl = "${fn:getLink('account/subAccount.jsp')}";
	var checkPhoneNum = "${fn:getLink('index/index.do?method=checkPhoneNum')}";
	var user_id_pre = "${subAccountInfo.user_id}";
	var login_phone_pre ="${subAccountInfo.login_phone}";
	var login_email_pre ="${subAccountInfo.login_email}";
</script>
<script language="javascript" src="${fn:getLink('js/account/subAccountEdit.js')}"></script>
</c:if>
</div>
