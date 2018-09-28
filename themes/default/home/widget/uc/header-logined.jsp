<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<website:style href="images/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
<style>
.belogin-page-home .common-header .logo{
	width: 350px;
}
a.logo-box{
	float: left;
	height: 72px;
	line-height: 72px;
	font-size: 28px;
	color: #333;
}
a.logo-box img{
	vertical-align: top;
}
</style>
<div class="header common-header">
	<div class="logo">
		<a class="logo-box" href="${fn:getLink('uc/login/login.jsp')}" hideFocus="hidefocus" target="_blank">
			<img class="uc-header-logo-img" src="${dmp_name.param_value}"/>
		</a>
	</div>
</div>
