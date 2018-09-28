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
<style>
	.prompt-contain {
		color: #666;
		width: 640px;
		margin: 40px auto 150px;
		text-align: left;
	}
	
	.prompt-title {
		margin: 10px 25px;
	}
	
	.prompt-top {
		background-position: 0 0;
		height: 5px;
		width: 100%;
	}
	
	.prompt-content {
		margin: 2px 0px 0px 0px;
		background: white;
		width: 100%;
		height: 280px;
	}
	
	dt {
		font-size: 18px;
		padding: 15px 0;
		border-bottom: 1px solid #EEE;
		font-weight: bold;
	}
	
	.prompt-ok {
		background:
			url("${fn:getLink('images/prompt/prompt-ok.png')}")
			no-repeat;
		width: 68px;
		height: 68px;
		display: inline-block;
		margin：
	}
	
	.prompt-error {
		background:
			url("${fn:getLink('images/prompt/prompt-error.png')}")
			no-repeat;
		width: 68px;
		height: 73px;
		display: inline-block;
		margin：
	}
	
	dd {
		float: left;
		margin: 0;
		padding: 35px 25px;
	}
	
	p {
		margin: 0px;
		font-size: 14px;
		line-height: 30px;
	}
</style>

<div class="panel sec-show-panel">

	<c:if test="${flag == 1}">
		<div class="prompt-contain">
			<div class="prompt-top"></div>
			<div class="prompt-content">
				<dl>
					<dt>
						<span class="prompt-title"> 提示信息</span>
					</dt>
					<dd>
						<span class="prompt-ok"> </span>
					</dd>
					<dd style="width: 460px; height: 150px">

						<p>
							<strong style="font-size: 16px">安全邮箱绑定成功！</strong>
						</p>
					</dd>
				</dl>
			</div>
		</div>
	</c:if>
	<c:if test="${flag == -1}">
		<div class="prompt-content"
			style="color: #666; width: 640px; margin: 40px auto 150px; text-align: left;">
			<dl>
				<dt style="width:100%">
					<span class="prompt-title"> 提示信息</span>
				</dt>
				<dd>
					<span class="prompt-error"> </span>
				</dd>
				<dd style="width: 460px; height: 150px">

					<p>
						<strong style="font-size: 16px">抱歉：无效激活链接,请重新绑定安全邮箱。</strong>
					</p>
					<p style="color: #999;">
						系统将在<span style="color: #087AD3;">&nbsp;5&nbsp;</span>秒后自动跳转... <br>
						如果不想等待直接点击<a href="${fn:getLink('uc/security/secBindMailW.jsp')}" hideFocus="hidefocus">&nbsp;这里&nbsp;</a>转到注册页面
					</p>
				</dd>
			</dl>
		</div>
		<script type="text/javascript">
			setTimeout(function(){window.location.href="${fn:getLink('uc/security/secBindMailW.jsp')}";}, 5000 );
		</script>
	</c:if>
	<c:if test="${flag == 0}">
		<div class="prompt-content"
			style="color: #666; width: 640px; margin: 40px auto 150px; text-align: left;">
			<dl>
				<dt style="width:100%">
					<span class="prompt-title"> 提示信息</span>
				</dt>
				<dd>
					<span class="prompt-error"> </span>
				</dd>
				<dd style="width: 460px; height: 150px">

					<p>
						<strong style="font-size: 16px">抱歉：激活链接已失效，请重新发送激活邮件</strong>
					</p>
					<p style="color: #999;">
						系统将在<span style="color: #087AD3;">&nbsp;5&nbsp;</span>秒后自动跳转... <br>
						如果不想等待直接点击<a
							href="${fn:getLink('uc/security/activateSecEmail.jsp')}&flag=0"
							hideFocus="hidefocus">&nbsp;这里&nbsp;</a>转到邮箱激活页面
					</p>
				</dd>
			</dl>
		</div>
		<script type="text/javascript">
			setTimeout(
					function() {
						window.location.href = "${fn:getLink('security/activateSecEmail.jsp')}&flag=0";
					}, 5000);
		</script>
	</c:if>
	<c:if test="${flag == -2}">
		<div class="prompt-content"
			style="color: #666; width: 640px; margin: 40px auto 150px; text-align: left;">
			<dl>
				<dt>
					<span class="prompt-title"> 提示信息</span>
				</dt>
				<dd>
					<span class="prompt-error"> </span>
				</dd>
				<dd style="width: 460px; height: 150px">

					<p>
						<strong style="font-size: 16px">抱歉：暂时无法完成安全邮箱的绑定，请稍后重试。</strong>
					</p>
					<p style="color: #999;">错误原因：未知的错误</p>
				</dd>
			</dl>
		</div>
	</c:if>
	</div>
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
