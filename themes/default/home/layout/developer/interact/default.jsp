<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<website:html>
<website:title>我的应用</website:title>
<website:style href="libs/vendor/monui/css/monui.css" rel="stylesheet" />
<website:style href="css/common/base.css" />
<website:style href="css/developer/layout.css" />
<website:style href="css/developer/tool.css" />
<website:style href="css/developer/opendata.css" />
<website:style href="css/developer/form.css" />
<website:style href="css/common/common.css" />
<website:widget path="components.jsp" />
<body>
	<website:widget path="header.jsp" />
	<div class="content-holder clearfix">
		<website:widget path="uc/open/menuNavN.jsp" />
		<div class="contain-new clearfix" id="contain-new">
			<website:screenHolder />
		</div>
	</div>
	<website:widget path="footer.jsp" />
</body>
</website:html>