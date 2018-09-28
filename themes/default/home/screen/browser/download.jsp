<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%
	String path = request.getContextPath();
	pageContext.setAttribute("path",path);
%>

<!-- <html> -->
<head>
<meta http-equiv="Content-Type" content="text/html;">
<link style="text/css" rel="stylesheet"
	href="${path }/css/browser/browserInfo.css" />
</head>
<body>
	<div>
		<div class="container" id="upgrade-browser">
			<p id="we">您当前浏览器版本过低，存在安全风险。</p>
			<p id="please">请使用以下浏览器之一：</p>
			<div id="browsers">
				<a class="br1" href="https://www.google.com/intl/cn/chrome/browser/">Chrome</a>
				<a class="br2" href="http://www.mozilla.org/zh-CN/firefox/new/">Firefox</a>
				<a class="br3" href="http://www.apple.com/safari/">Safari</a> <a
					class="br4"
					href="http://windows.microsoft.com/zh-CN/internet-explorer/download-ie">IE
					8-11</a>
			</div>
		</div>
	</div>
</body>

<!-- </html> -->