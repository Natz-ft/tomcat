<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<website:style href="css/uc/blockui_css.css"/>
<!-- action需要使用全局变量然后加控制器 -->
<style>
.form-contain .dd-input{
	width:205px;	
}
.form-contain{
	width: 600px;
	padding: 10px 0px 10px 190px;
}
</style>

<div class="step-contain">
	<span class="step step-start step-on-start">1、输入账户名</span>
	<span class="step step-afstart ">2、身份验证</span>
	<span class="step step-bfend ">3、重置密码</span>
	<span class="step step-end">4、完成</span>
</div>

<form method="post" id="getpwd_form" action="javascript:;">
	<div class="form-body form-signup-body form-contain">
		<input type="hidden" name="secPassword_url" value="${fn:getLink('uc/password/getPwd.do?method=getPwd')}">
		<input type="hidden" name="chooseSecPwd_url" value="${fn:getLink('uc/password/chooseSecPwd.jsp')}">
		<dl>
			<dt>
				<em>*</em>&nbsp;登录用户名：
			</dt>
			<dd class="dd-input">
				<input id="login_name" name="login_name" type="text" class="input" 
				style="width: 200px;"/>
			</dd>
			<dd class="form-tip" ></dd>
			<dd class="check_rule">登录用户名可能是您的用户名、邮箱或者手机号。</dd>
		</dl>

		<dl>
			<dt>
				<em>*</em>&nbsp;验证码：
			</dt>
			<dd class="dd-input">
				<input id="checknum" name="checknum" type="text" class="input"
					style="width: 200px; " /> 
			</dd>
			<dd class="form-tip" ></dd>
		</dl>
		
		<dl>
			<dt>
				<em></em>
			</dt>
			<dd>
				<a style="margin-left: 1px;"href="javascript:changeVerify();" hideFocus="hidefocus">
					<img src="${fn:getLink('uc/index/verify.jsp')}"
					id="verifyImg" alt="换一张" /></a>&nbsp;
				 <a href="javascript:changeVerify();" style="font-size: 12px;" hideFocus="hidefocus">看不清楚可以换一个</a>
			</dd>
		</dl>
	</div>
	<div class="form-submit">
		<dl>
			<dd>
				<a class="user_act_btn do" style="margin-right:20px;" href="javascript:void(0);" id="submit_btn" hideFocus="hidefocus"><span>提&nbsp;&nbsp;交</span></a>
				<a class="user_act_btn  back"  href="javascript:void(0);" id="cancle_btn" hideFocus="hidefocus"><span>重新输入</span></a>
			</dl>
			</dd>
		</dl>

	</div>
</form>
<website:script src="js/uc/jquery.form.js" />
<website:script src="js/uc/jquery.validate.js" />
<website:script src="js/uc/md5.js" />
<website:script src="js/uc/index/getPwd.js" />
<website:script src="js/uc/jquery.validate.ext.js" />
<website:script src="js/uc/jquery.blockUI.js" />
<website:script src="js/uc/dialog.js" />

<script>
//点击触发更换校验码
function changeVerify(){
    var date = new Date();
    var ttime = date.getTime();
    var verifyImg = document.getElementById('verifyImg');
    var urlArray = verifyImg.src.split("&_=");
    verifyImg.src = urlArray[0] + '&_='+ttime;
}
</script>