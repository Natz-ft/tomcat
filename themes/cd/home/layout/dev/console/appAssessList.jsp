<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib uri="/tags/website-function" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<website:html>
	<website:title>应用评价</website:title>
	<website:widget path="dev/components.jsp"/>
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

