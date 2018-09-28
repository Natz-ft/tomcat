<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib uri="/tags/website-function" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<website:html>
	 <website:head>
		<website:title>个人设置-账号管理</website:title>
		<website:meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
		<website:style href="libs/uc/vendor/monui/css/monui.css" rel="stylesheet" />
		<%-- <website:style href="css/uc/account/common.css" /> --%>
		<%-- <website:style href="css/common/common.css" rel="stylesheet" /> --%>
		<website:style href="css/uc/base.css" />
		<website:style href="css/uc/footer.css" />
		<website:style href="css/uc/layout.css" />
		<website:style href="css/uc/tool.css" />
		<website:style href="css/uc/form.css" />
		<%-- <website:script src="js/uc/jquery.js" /> --%>
		<website:script src="libs/vendor/jquery.min.js" />
		<website:script src="libs/vendor/jquery-migrate-1.4.1.min.js" />
		<website:script src="libs/uc/vendor/monui/js/form.js" />
		<website:style href="css/uc/uc.css" />
		<website:style href="css/uc/opendata.css" />
		<website:script src="js/uc/headersch.js" />
		<website:script src="js/uc/common/header.js"/>
		<!-- 弹窗 -->
		<website:style href="css/uc/common/easydialog.css"/>
		<website:script src="js/uc/utils/easydialog.min.js"/>
	</website:head>
	<body class="page-home main-page-home page-home-big-w account-body">
		<div class="header-holder">
			<website:widget path="header.jsp"/>
		</div> 
		<div class="content-holder clearfix">
			<website:widget path="uc/open/menuNavN.jsp"/>
			<div class="contain-new clearfix" id="contain-new">
				<website:screenHolder/>
			</div>
    	</div>
		<website:widget path="footer.jsp"/>
	</body>
</website:html>

