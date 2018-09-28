<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib uri="/tags/website-function" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<website:html>
	 <website:head>
		<website:title>个人设置-账号管理</website:title>
		<website:meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
		<website:style href="libs/vendor/monui/css/monui.css" rel="stylesheet" />
		<website:style href="css/account/common.css" />
		<website:style href="css/base.css" />
		<website:style href="css/footer.css" />
		<website:style href="css/layout.css" />
		<website:style href="css/tool.css" />
		<website:style href="css/form.css" />
		<website:style href="css/common/index-cd.css" rel="stylesheet" />
		<website:style href="css/common/common-cd.css" rel="stylesheet" />
		<website:style href="libs/vendor/font-awesome/font-awesome.min.css"rel="stylesheet" />
		<website:script src="js/jquery.js" />
		<website:script src="libs/vendor/monui/js/form.js" />
		<website:style href="css/uc.css" />
		<website:style href="css/opendata.css" />
		<website:script src="js/headersch.js" />
		<website:script src="js/common/header.js"/>
		<!-- 弹窗 -->
		<website:style href="css/common/easydialog.css"/>
		<website:script src="js/utils/easydialog.min.js"/>
		<%-- 暂未添加  消息中心js --%> 
	</website:head>
	<body class="page-home main-page-home page-home-big-w account-body">
		<div class="header-holder">
			<website:widget path="public/header.jsp"/>
		</div> 
		<div class="content-holder clearfix">
			<website:widget path="open/menuNavN.jsp"/>
			<div class="contain-new clearfix" id="contain-new">
				<website:screenHolder/>
			</div>
    	</div>
		<div id="i_footer_public">
			<website:widget path="footer1.jsp"/>
		</div>
	</body>
</website:html>

