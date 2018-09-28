<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ page import="org.loushang.internet.util.ErrCodeUtil"%>
<%@page import="org.apache.commons.lang.StringEscapeUtils"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";

	request.setAttribute("homeUrl", basePath);
	String errMsg = "";
	Exception e1 = (Exception) request.getAttribute("jframe.exception");
	Exception e2 = (Exception) request.getAttribute("throwException");
	if(e1 != null ) {
		errMsg = e1.getMessage();
	} else if(e2 != null ) {
		errMsg = e2.getMessage();
	} else{
		String errCode = (String) request.getAttribute("errCode");
		errMsg = ErrCodeUtil.getErrInfo(errCode);
	}
	if(errMsg == null || errMsg.isEmpty()) {
		errMsg = "未知错误";
	}
	//对错误信息进行html编码，预防错误信息中包含xss危险代码（.do?method=<script>）
	errMsg = StringEscapeUtils.escapeHtml(errMsg);
	request.setAttribute("errMsg", errMsg);
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>出错了！</title>
<link href="jsp/errbase.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<div class="Prompt">
		<div class="Prompt_top"></div>
		<div class="Prompt_body">
			<h2 class="title">提示信息</h2>
			<div class="cont">
				<span class="Prompt_x"></span>
				<div class="Prompt_txt">
					<h2 class="error">${errMsg}</h2>
					<p>
						系统将在 <span id="num-counter" class="numc">8</span>
						秒后自动跳转至首页，如果不想等待，直接点击<a
							href="javascript:void(parent.location.reload())">这里</a> 跳转<br>
						或者 <a href="javascript:void(0);" onclick="stopJump(this)">停止</a>
						自动跳转
					</p>
				</div>
			</div>
		</div>
		<div class="Prompt_btm"></div>
	</div>
	<script type="text/javascript">
	var stopped = false;
	var numCounter = document.getElementById("num-counter");
	var counter = parseInt(numCounter.innerHTML);
	function jump(){
		if(stopped) return;
		numCounter.innerHTML = counter;
		counter --;
		if(counter < 0) {
			window.location.href = '${homeUrl}';
			parent.location.reload();
		} else {
			setTimeout(jump, 1000);
		}
	}
	function stopJump(aObj) {
		if(!stopped) {
			stopped = true;
			aObj.innerHTML = "继续";
		} else {
			stopped = false;
			aObj.innerHTML = "停止";
			jump();
		}
		
	}
	jump();
	</script>
</body>
</html>