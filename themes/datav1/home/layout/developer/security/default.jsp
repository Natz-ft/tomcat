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
	<website:title>个人设置-安全管理</website:title>
	<website:meta httpEquiv="Content-Type"
		content="text/html; charset=utf-8" />
	<website:style href="css/base.css" />
	<website:style href="css/layout.css" />
	<website:style href="css/tool.css" />
	<website:style href="css/uc.css" />
	<website:style href="css/jquery-ui-1.8.18.custom.css" />
	<website:style href="css/form.css" />
	<website:script src="js/jquery.js" />
	<website:style href="css/opendata.css" />
	<website:script src="js/headersch.js" />
	<website:script src="js/common/header.js" />
	<!-- 弹窗 -->
	<website:style href="css/common/easydialog.css" />
	<website:script src="js/utils/easydialog.min.js" />
	<%-- 暂未添加  消息中心js --%>
</website:head>
<body class="page-home main-page-home page-home-big-w account-body">
	<div class="header-holder">
		<website:widget path="open/header.jsp" />
	</div>
	<div class="content-holder clearfix">
		<website:widget path="open/menuNavN.jsp" />
		<div class="contain-new clearfix" id="contain-new">
			<website:screenHolder />
		</div>
	</div>
	<div id="i_footer_public">
		<website:widget path="footer1.jsp" />
	</div>
</body>
</website:html>

