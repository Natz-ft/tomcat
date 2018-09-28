<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<website:html>
<website:head>
	<website:style href="img/favicon.ico" rel="shortcut icon"
		type="image/x-icon" />
	<website:title>个人中心-我的信息</website:title>
	<website:meta httpEquiv="Content-Type"
		content="text/html; charset=utf-8" />
	<website:style href="css/base.css" />
	<website:style href="css/tool.css" />
	<website:style href="css/common/header.css" />
	<website:style href="css/form.css" />
	<website:script src="js/utils/jquery.js" />
	<website:script src="js/common/headersch.js" />
	<website:style href="css/uc.css" />
	<website:style href="css/opendata.css" />

	<style>
.content {
	width: 750px;
}
</style>
</website:head>
<body class="page-home main-page-home page-home-big-w account-body">
	<div class="header-holder">
		<website:widget path="header.jsp" />
	</div>
	<div class="content-holder clearfix">
		<website:widget path="open/menuNavN.jsp" />
		<div class="content" id="contain-new">
			<website:screenHolder />
		</div>
	</div>
	<website:widget path="footer1.jsp" />
</body>
</website:html>

