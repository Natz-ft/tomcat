<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" buffer="none"%>
<%@page import="com.inspur.ucweb.utils.ConfUtil"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<website:title>${title}</website:title>
<website:head>
	<website:meta httpEquiv="X-UA-Compatible" content="IE=edge" />
	<website:style href="css/uc/base.css" />
	<website:style href="css/uc/layout.css" />
	<website:style href="css/uc/tool.css" />
	<website:style href="css/uc/form.css" />
	<website:style href="css/uc/common.css" />
	<website:style href="css/uc/index/loginPage.css" />
	<website:style href="css/uc/jquery-ui-1.8.18.custom.css" />
	<website:style href="css/uc/slides-min.css" />
	<script type="text/javascript">
		var sys_ucURL = "${fn:getConfValue('global.index.odweb')}";
	</script>
	<website:script src="js/uc/jquery.js" />
	<website:script src="js/uc/scrolltopcontrol.js" />
	<website:script src="js/uc/jquery.slides.min.js" />
</website:head>
<%
	String helpUrl = ConfUtil.getValue("service_helpUrl");
	String faqUrl = ConfUtil.getValue("service_faqUrl");
	String feedbackUrl = ConfUtil.getValue("service_feedbackUrl");
	String logoUrl = ConfUtil.getValue("service_logoUrl");
%>
<body>
		<website:screenHolder />
</body>

</html>