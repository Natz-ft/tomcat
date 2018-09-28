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
</style>
<website:style href="css/uc/blockui_css.css"/>
<form style="display:block;" action="javascript:;"
	method="post" id="getpwd_byque_form" >
	<div class="form-title" style="display: none;">
		<span>找回密码</span>
	</div>
	<div class="form-body form-signup-body form-contain">
	<input type="hidden" name="doGetByQue_url" value="${fn:getLink('uc/password/getPwd.do?method=getPwdByQue')}">
	<input type="hidden" name="getPwd_url" value="${fn:getLink('uc/password/getPwd.jsp')}">
		<dl>
			<dt>
				<em></em>&nbsp;密保问题：
			</dt>
			<dd style="width:200px;">
				<label id="question" style="color:#999">${security_question}</label>
			</dd>
		</dl>
		<dl style="width:600px;">
			<dt>
				<em>*</em>&nbsp; 密保答案：
			</dt>
			<dd style="width:200px;">
				<input id="answer" name="answer" type="text" class="input " 
				style="width: 180px; padding: 0px 0px 0px 2px;"/>
			</dd>
			<dd class="form-tip" ></dd>
			<dd class="check_rule">请输入密保答案</dd>
		</dl>
		<dl style="width:600px;">
			<dt>
				<em>*</em>&nbsp; 验证码：
			</dt>
			<dd style="width:200px;">
				<input id="checknum_que" name="checknum_que" type="text" class="input"
					style="width: 180px; padding: 0px 0px 0px 2px;" /> 
			</dd>
			<dd class="form-tip" ></dd>
		</dl>

		<dl>
			<dt>
				<em></em>
			</dt>
			<dd style="width:200px;">
				<a href="javascript:changeVerify_que();" hideFocus="hidefocus"> 
					<img src="${fn:getLink('uc/index/verify.jsp')}"
					id="verifyImg_que" alt="换一张" /></a>&nbsp;
				<a href="javascript:changeVerify_que();" style="font-size: 12px;" hideFocus="hidefocus">看不清楚可以换一个</a>
			</dd>
		</dl>
		<div class="form-submit">
			<dl>
				<dd style="text-align: left;line-height: 26px;height: 26px;">
					<a class="user_act_btn do" style="margin-right:32px;" href="javascript:void(0);" id="submit_btn_que" hideFocus="hidefocus"><span>提&nbsp;&nbsp;交</span></a>
					<a class="user_act_btn  back" href="javascript:;" onclick="rechoose(this)" hideFocus="hidefocus"><span>返&nbsp;&nbsp;回</span></a>
				</dd>
			</dl>
		</div>
	</div>
	
	</form>
	<website:script src="js/uc/jquery.blockUI.js"/>
	<website:script src="js/uc/dialog.js"/>
	<website:script src="js/uc/index/getPwdByQue.js" />
<script>
//点击触发更换校验码
function changeVerify_que(){
    var date = new Date();
    var ttime = date.getTime();
    var verifyImg = document.getElementById('verifyImg_que');
    var urlArray = verifyImg.src.split("&_=");
    verifyImg.src = urlArray[0] + '&_='+ttime;
}
</script>