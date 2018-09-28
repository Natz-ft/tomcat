<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<!-- action需要使用全局变量然后加控制器 -->
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
	width: 600px;
	text-align: left;
}
/*-----绑定按钮-----*/
.form-submit .btn-bind,.form-submit .btn-reg{
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
	method="post" id="getpwd_byphone_form" >
	<div class="form-body form-signup-body form-contain">
	<input type="hidden" name="doGetByPhone_url" value="${fn:getLink('uc/password/getPwd.do?method=getPwdByPhone')}">
	<input type="hidden" name="verifyPhone_url" value="${fn:getLink('uc/password/getPwd.do?method=verifyPhone')}">
	<input type="hidden" name="getPwd_url" value="${fn:getLink('uc/password/getPwd.jsp')}">
	
		<dl>
			<dt>
				<em></em>&nbsp; 已绑定手机：
			</dt>
			<dd style="width:200px;">
				<label id="mobile" style="color:#999">${security_phone}</label>
			</dd>
		</dl>
		<dl style="width:600px;">
			<dt>
				<em>*</em>&nbsp; 短信激活码：
			</dt>
			<dd style="width:250px;line-height:26px;">
				<a style="margin: 0px;" id="verify_btn" class="user_act_btn do" href="javascript:void(0);">
					<span>免费获取短信激活码</span>
				</a>
				<input id="vcode" name="vcode" type="text" style="width:80px;margin:0px;*margin-top:1px;display:inline-block;float:none;" class="input ">
			</dd>
			<dd class="form-tip" ></dd>
			<dd id="verifyOK" class="check_rule">请输入短信激活码</dd>
		</dl>
		<div class="form-submit">
			<dl>
				<dd style="text-align: left;line-height: 26px;height: 26px;">
					<a class="user_act_btn do" style="margin-right:32px;" href="javascript:void(0);" id="submit_btn_phone" hideFocus="hidefocus"><span>提&nbsp;&nbsp;交</span></a>
					<a class="user_act_btn  back" href="javascript:;" onclick="rechoose(this)" hideFocus="hidefocus"><span>返&nbsp;&nbsp;回</span></a>
				</dd>
			</dl>
		</div>
	</div>
	
	</form>
	<website:script src="js/uc/jquery.blockUI.js"/>
	<website:script src="js/uc/dialog.js"/>
	<website:script src="js/uc/index/getPwdByPhone.js" />
