<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<!-- action需要使用全局变量然后加控制器 -->
<style>
.form-body dd {
	float: left;
	width: 340px;
	text-align: left;
}
.form-body .form-tip span.invalid {
	line-height: 15px;
}
</style>
<website:style href="css/uc/blockui_css.css"/>

	<div class="step-contain">
		<span class="step step-start ">1、输入账户名</span>
		<span class="step step-afstart">2、身份验证</span>
		<span class="step step-bfend step-on-bfend">3、重置密码</span>
		<span class="step step-end">4、完成</span>
	</div>


<form method="post" id="resetpwd_form" action="javascript:;">
	<div class="form-body form-signup-body form-contain"  style="width: 650px; margin: 0px auto;">
		<input type="hidden" name="submit_url" value="${fn:getLink('uc/password/resetPwd.do?method=resetPwd')}">
		<input type="hidden" name="login_url" value="${fn:getLink('index.jsp')}">
		<input type="hidden" name="getPwd_url" value="${fn:getLink('uc/password/getPwd.jsp')}">
	
		<dl>
			<dt>
				<em>*</em>&nbsp;创建密码：
			</dt>
			<dd>
				<input id="password" name="password" type="password" class="input "
				 width="200px"/>
			</dd>
			<dd class="form-tip" style="width:150px;line-height:20px;" ></dd>
			<dd class="check_rule">密码由6-15位字符、数字或符号组成</dd>
		</dl>

		<dl>
			<dt>
				<em>*</em>&nbsp;确认密码：
			</dt>
			<dd>
				<input id="confirm_password" name="confirm_password" type="password" class="input" 
				 width="200px"/>
			</dd>
			<dd class="form-tip" ></dd>
			<dd class="check_rule">请再次输入您设置的密码</dd>
		</dl>
   <input id="password_strength" name="password_strength" type="text"
				class="input" style="display: none" value="aa"/>
		
	</div>
	<div class="form-submit" style="width: 355px;">
		<dl>
			<dd style="text-align: left;line-height: 26px;height: 26px;">
				<a class="user_act_btn do" style="margin-right:32px;" href="javascript:void(0);" id="submit_btn" hideFocus="hidefocus"><span>提&nbsp;&nbsp;交</span></a>
				<a class="user_act_btn  back" href="javascript:;" id="cancle_btn" hideFocus="hidefocus"><span>重新输入</span></a>
			</dd>
		</dl>
	</div>
	
</form>
<script type="text/javascript" src="${fn:getLink('js/uc/jquery.form.js')}"></script>
<script type="text/javascript" src="${fn:getLink('js/uc/jquery.validate.js')}"></script>
<script type="text/javascript" src="${fn:getLink('js/uc/md5.js')}"></script>
<script type="text/javascript" src="${fn:getLink('js/uc/passwordStrength.js')}"></script>
<script type="text/javascript" src="${fn:getLink('js/uc/index/resetPwd.js')}"></script>
<script type="text/javascript" src="${fn:getLink('js/uc/jquery.validate.ext.js')}"></script>
<website:script src="js/uc/jquery.blockUI.js"/>
<website:script src="js/uc/dialog.js"/>
	
