<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>

<style type="text/css">
.mid_c{
	width:88%;
	padding:0 50px 30px 50px;
	min-height:100px;
	_height:100px;
	background:#fff;
	position:relative;
}
.return_way,.return_way_content{
	font-size:14px;
	color:#666;
	padding:10px 0 0 0;
	position:relative;
	width:100%;
}
.re_choose{
	width:100%;
	border-top:1px dotted #bad0db;
	text-align:center;
	font-size:14px;
}
.bymail_content,.byphone_content,.byask_content{
	position:relative;
	width:560px;
	padding:33px 0 0 94px;
	font-size:14px;
	color:#666;
}
.messageinfo{
	position:relative;
	font-size: 14px;
}
.em{
	color: red;
}
dt {
	position:relative;
	width:85px;
	float:left;
	line-height: 25px;
}
dd {
	position:relative;
	height:35px;
	float:left;
}
dl{
	display:inline-block;
	color: #666;
	overflow: hidden;
	width:400px;
	zoom: 1;
}
.messageinfo{
	width:500px;
}
input{
	margin:1px;
	height:25px;
}
input.bind_btn{
	width:97px;
	height:31px;
	line-height:31px;
	border:0;
	background:url(${fn:getLink('uc/images/btn/uc-reg-btn.png')}) no-repeat 0 0;
	font-size:14px;
	font-weight:bold;
	text-align:center;
	cursor:pointer;
	color:#087ad3;
	margin:10px 0 23px;
	float:left;
}
.radio{
	height:auto;
}
/*选择找回方式*/
.return_way
{
	position: relative;
	padding:0px;
	width:315px;
	margin: 0px auto;
	color: #666;
	font-size: 14px;
	padding-top:30px;
}
.return_way UL
{
	padding: 0px;
	zoom: 1;
	overflow: hidden;
}
.return_way UL LI
{
	position: relative;
	display: block;
	width:315px;
	height:75px;
	float: left;
	margin-bottom:20px;
	font-size: 12px;
	cursor: pointer;
}
.return_way UL LI A:link
{
	position: absolute;
	width:315px;
	line-height:75px;
	background: url(${fn:getLink('images/uc/btn/return_way.png')}) no-repeat;
	_background: url(${fn:getLink('images/uc/btn/return_way.gif')}) no-repeat;
	overflow: hidden;
	text-align: center;
	padding-left:20px;
	color: #666;
	font-size: 13px;
}
.return_way UL LI EM
{
	position: absolute;
	top: 13px;
	left: 20px;
	display: block;
	width: 50px;
	height: 50px;
	background: url(${fn:getLink('images/uc/btn/return_way.png')}) no-repeat;
	_background: url(${fn:getLink('images/uc/btn/return_way.png')}) no-repeat;
	overflow: hidden;
	cursor: pointer;
	
}
.return_way UL LI EM.mail
{
	background-position: 0px -326px;
}
.return_way UL LI EM.phone
{
	background-position: 0px -105px;
}
.return_way UL LI EM.que
{
	background-position: 0px -182px;
}
.return_way UL LI EM.service
{
	background-position: 0px -255px;
}
.form-body {
	padding-left:250px;
}
</style>

	<div class="step-contain">
		<span class="step step-start ">1、输入账户名</span>
		<span class="step step-afstart step-on-afstart">2、身份验证</span>
		<span class="step step-bfend ">3、重置密码</span>
		<span class="step step-end">4、完成</span>
	</div>

	<input type="hidden" name="resetpwd_url" value="${fn:getLink('uc/password/resetPwd.jsp') }">
	<input type="hidden" name="choosesecpwd_url" id="choosesecpwd_url" value="${fn:getLink('uc/password/chooseSecPwd.jsp')}">
	<input type="hidden" name="login_name" value="${user_id}">
	<div name="return_way" class="return_way">
		<ul>
		
		<% if("1".equals(String.valueOf(request.getAttribute("hasSecMail")))){ %>
			<li>
				<a id="check_email" href="javascript:;" onclick="radioClick(this)" hideFocus="hidefocus">
				<em class="mail"></em>通过“绑定邮箱”找回登录密码</a>
			</li>
		<% }
		if("1".equals(String.valueOf(request.getAttribute("hasSecPhone")))){ %>
			<li>
				<a id="check_phone" href="javascript:;" onclick="radioClick(this)" hideFocus="hidefocus">
				<em class="phone"></em>通过“绑定手机”找回密码</a>
			</li>
		<% }
		if("1".equals(String.valueOf(request.getAttribute("hasSecAsk")))){ %>
			<li>
				<a id="check_question" href="javascript:;" onclick="radioClick(this)" hideFocus="hidefocus">
				<em class="que"></em>通过“密保问题”找回密码</a>
			</li>
		<% } %>
			<li>
				<a href="javascript:;" onclick="return false;" hideFocus="hidefocus">
				<em class="service"></em>通过客服找回密码（暂未启用）</a>
			</li>
		</ul>
	</div>
	<div name="return_way_content" class="return_way_content" style="display:none;">
		<div name="byMailContent" style="display:none;width:100%;height:100%">
			<% if("1".equals(String.valueOf(request.getAttribute("hasSecMail")))){ %>
				<website:widget path="uc/password/getPwdByMail.jsp"/>
			<%}%>
		</div>
		<div name="byPhoneContent" style="display:none;width:100%;height:100%">
			<% if("1".equals(String.valueOf(request.getAttribute("hasSecPhone")))){%>
				<website:widget path="uc/password/getPwdByPhone.jsp"/>
			<%} %>
		</div>
		<div name="byQueContent" style="display:none;width:100%;height:100%">
			<% if("1".equals(String.valueOf(request.getAttribute("hasSecAsk")))){ %>
				<website:widget path="uc/password/getPwdByQue.jsp"/>
			<% }%>
		</div>
		
	</div>
<website:script src="js/uc/jquery.form.js" />
<website:script src="js/uc/jquery.validate.js" />
<website:script src="js/uc/md5.js" />
<website:script src="js/uc/jquery.validate.ext.js" />
<script type="text/javascript" >
	function radioClick(t){
		$("body").find("div[name='byMailContent']").css("display","none");
		$("body").find("div[name='byPhoneContent']").css("display","none");
		$("body").find("div[name='byQueContent']").css("display","none");
		switch(t.id){
			case "check_email":
				$("body").find("div[name='byMailContent']").css("display","block");
				break;
			case "check_phone":
				$("body").find("div[name='byPhoneContent']").css("display","block");
				break;
			case "check_question":
				$("body").find("div[name='byQueContent']").css("display","block");
				break;
		}
		$("body").find("div[name='return_way']").css("display","none");
		$("body").find("div[name='return_way_content']").css("display","block");
		$("body").find("div[name='re_choose']").css("display","block");
	}
	function rechoose(t){
		window.location.href = $("#choosesecpwd_url")[0].value + "&user=" + $("body").find("input[name='login_name']").val();
	}

</script>