<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@page import="com.inspur.ucweb.utils.ConfUtil"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>

<style>
.form-body .select {
	width: 338px;
}
.form-body dl{
	padding: 0px;
	width: 750px;
}
.form-bind-body{
	padding-left:160px;
}
</style>

<!-- 单选框：已有账号、没有账号 -->
<div align="center" style="font-size:14px">
<input type="radio" name="status" value='yes' id="status_yes" onclick="updateShow(this)">
<label for="status_yes">已有账号&nbsp;&nbsp;</label>
<label>
<input type="radio" name="status" value='no' onclick="updateShow(this)"  checked="checked">
没有账号&nbsp;&nbsp;
</label>
</div>

<!-- 已有账号 div -->
<div id='has_account' style="display:none">
	<div class="form-body form-bind-body">
		<dl>
			<dt>
				<em>*</em>&nbsp;账号：
			</dt>
			<dd>
			<form action="${fn:getLink('uc/login/login.do?method=login')}" method="post" id="login_form" name="login_form" >
				<input id="account" name="account" type="text" class="input" />
				<input id="pwd" name ="pwd" type="hidden" value="">
				<input id="pwd2" name ="pwd2" type="hidden" value="">
				<input id="verify_code" name ="verify_code" type="hidden" value="">
			</form>
			</dd>
		</dl>
		<dl>
			<dt>
				<em>*</em>&nbsp;密码：
			</dt>
			<dd>
				<input id="pass" name="pass" type="password" class="input"/>
			</dd>
		</dl>
		<dl>
			<dt>
				<em>*</em>&nbsp;验证码：
			</dt>
			<dd>
				<input id="verify" name="verify"  type="text" class="text-verify" style="width:70px;" placeholder="验证码"  />
				<a href="javascript:changeVerify();" hideFocus="hidefocus"> 
					<img id="verifyImg" src="${fn:getLink('index/verify.jsp')}" alt="换一张" style="position:relative;top:6px;left:0px;"/>
				</a>&nbsp; 
				<a href="javascript:changeVerify();" hideFocus="hidefocus">换一张</a>
			</dd>
		</dl>
		</div>
		<div class="form-submit">
		<dl>
			<dd style="text-align: center">
				<a onclick="has_account_submit();" class="opt_btn" style="padding-left:30px;" href="javascript:void(0);" hideFocus="hidefocus">
					<span style="padding-right:30px;font-size:16px;">立即绑定</span>
				</a>
				<a onclick="skip();" class="opt_btn" style="padding-left:30px;" href="javascript:void(0);" hideFocus="hidefocus">
					<span style="padding-right:30px;font-size:16px;">跳过本步骤</span>
				</a>
			</dd>
		</dl>
	</div>
</div>

<!-- 没有账号 div -->
<div id='no_account' style="display:block">
<form action="${fn:getLink('index/bind.do?method=bind')}" method="post" id="register_form">
	
	<div class="form-body form-bind-body">
		<dl>
			<dt>
				<em>*</em>&nbsp;登录用户名：
			</dt>
			<dd>
				<input id="login_name" name="login_name" type="text" class="input" />
				<input id="type" name="type" type="hidden" value="no_account"  />
			</dd>
			<dd class="form-tip"></dd>
			<dd class="check_rule">字母开头，5-20位组成，允许字母数字下划线,可用于直接登录</dd>
		</dl>
		<dl>
			<dt>
				<em>*</em>&nbsp;昵称：
			</dt>
			<dd>
				<input id="nickname" name="nickname" type="text" class="input"
					value="<%=session.getAttribute("other_nick_name")==null?"":session.getAttribute("other_nick_name") %>" />
			</dd>
			<dd class="form-tip"></dd>
			<dd class="check_rule">不能超过20个字符串，汉字算一个字符</dd>
		</dl>

		<dl>
			<dt>
				<em>*</em>&nbsp;密码：
			</dt>
			<dd>
				<input id="password" name="password" type="password" class="input " />
			</dd>
			<dd class="form-tip"></dd>
			<dd class="check_rule">密码由6-15位字母、数字或特殊符号组成</dd>
		</dl>

		<dl>
			<dt>
				<em>*</em>&nbsp;登录邮箱：
			</dt>
			<dd>
				<input id="email" name="login_email" type="text" class="input" />
			</dd>
			<dd class="form-tip"></dd>
			<dd class="check_rule">请输入您的登录邮箱，可以用于直接登录</dd>
		</dl>
		<dl>
			<dt>
				<em>*</em>&nbsp;用户类型：
			</dt>
			<dd>
				<select name="user_type" id="user_type" class="select">
					<option value="">请选择</option>
					<option value="11">个人</option>
					<option value="21">单位</option>
				</select>
			</dd>
			<dd class="form-tip"></dd>
			<dd class="check_rule">
				请您选择用户类型，请确定您的选择，<span
					style="font-family: simhei; font-size: 14px; color: #666;"><strong>绑定后不得修改</strong></span>！
			</dd>
		</dl>
		<dl>
			<dt></dt>
			<dd>
				<input id="login_allow" name="login_allow" type="checkbox"
					class="checkbox" />&nbsp;&nbsp;&nbsp;我已阅读并接受
					<a href="${fn:getConfValue('global.index.odweb')}/register.html" target="_blank"	class="m-link" hideFocus="hidefocus">《服务条款》</a> 
					<label for="login_allow" class="error" generated="true"></label>
			</dd>
			<dd class="form-tip"></dd>
			<input id="passwordStrength" name="passwordStrength" type="text"
				class="input" style="display: none" />
		</dl>
	</div>
	<div class="form-submit">
		<dl>
			<dd style="text-align: center">
				<a onclick="btnClick();" class="opt_btn" style="padding-left:30px;" href="javascript:void(0);" hideFocus="hidefocus">
					<span style="padding-right:30px;font-size:16px;">立即绑定</span>
				</a>
				<a onclick="skip();" class="opt_btn" style="padding-left:30px;" href="javascript:void(0);" hideFocus="hidefocus">
					<span style="padding-right:30px;font-size:16px;">跳过本步骤</span>
				</a>
			</dd>
		</dl>
	</div>
	<!-- 跳过本步骤确认框 -->
	<div id="dialog-confirm-skip" title="dialog-confirm-skip" style="display: none">
		<p>
			<span class="ui-icon ui-icon-alert" ></span>
			<div>跳过本步骤，系统将会为您自动为您分配一个账号，以后您既可以使用第三方账号登录，也可以使用系统为你分配的账号登录，确定跳过本步骤？</div>
		</p>
	</div>
	
	<!-- 选择跳过本步骤后，展现自动分配的账号弹出框 -->
	<div id="skip-result" title="skip-result" style="display: none">
		<p>
			<span class="ui-icon ui-icon-alert" ></span>
			<div id='show-skip-result'></div>
		</p>
	</div>
</form>
</div>
<website:style href="css/tipbox.css"/>
<website:script src="js/md5.js" />
<website:script src="js/jquery.form.js" />
<website:script src="js/jquery-ui-1.8.18.custom.min.js" />
<website:script src="js/jquery.validate.js" />
<website:script src="js/passwordStrength.js" />
<website:script src="js/jquery.validate.ext.js" />
<website:script src="js/jquery-dom-ext.js" />
<website:script src="js/jquery.tipbox.js" />
<website:script src="js/base64.js" />
<website:script src="js/index/bind.js" />
<script type="text/javascript">
	var verifyUrl = "${fn:getLink('index/verify.jsp')}";
	var afterssoUrl = "${fn:getLink('index/index.do?method=aftersso')}";
	var activateEmailUrl = "${fn:getLink('index/activateEmail.jsp?account=')}";
	var checkLoginNameUrl= "${fn:getLink('index/index.do?method=checkLoginName')}";
	var checkEmailUrl= "${fn:getLink('index/index.do?method=checkEmail')}";
	var skipBindUrl = "${fn:getLink('index/bind.do?method=skipBind')}";
	var doBindUrl = "${fn:getLink('index/bind.do?method=bind')}";
	var loginUrl= "${fn:getLink('uc/login/login.jsp')}";
	var login_salt = "${login_salt}";
</script>
