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
<style>
.cause-tips{
	width: 80%;
	height: 123px;
	margin: 50px auto;
	background: url(${fn:getLink('images/bj.png')}) 0 0;
	border: 1px solid #e5e5e5;
	background-repeat: repeat-x;
	font-size: 14px;
}
.explain-contain{
	width: 750px;
	margin: 0px 40px;
	padding: 0px 0px 20px 0px;
}
.success-img{
	width:80px;
	height:86px;
	float:left;
	margin:18px 20px 15px 35px;
}
.tip-cause{
	display:block;
	float:left;
	line-height:24px;
	width:500px;
	margin-top:45px;
	color:#333333;
}
.cause-detail{
	color:#F17303;
	display:inline-block;
	width:180px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	height:24px;
}
.cause-explain{
	font-size:14px;
	line-height:26px;
	margin:0;
	padding:0;
}
</style>
<div class="panel account-show-panel">
	<div class="content-title">
		<span class="title-icon"></span><span>实名认证</span>
	</div>
	
	
	<div class="cause-tips">
		<img class="success-img" src="${fn:getLink('images/success-authen.png')}">
		<div class="tip-cause" >
			恭喜您，通过我们的实名认证审核，您可以使用订阅功能订阅相关信息！
		</div>
	</div>
</div>




